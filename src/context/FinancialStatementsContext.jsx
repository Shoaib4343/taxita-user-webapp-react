// src/context/FinancialStatementsContext.js
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import toast from 'react-hot-toast';
import { getFinancialsApi, downloadFinancialApi } from '../services/dashboard';
import { useAuth } from './AuthContext';
import { useTradingYear } from './TradingYearContext';

// ===== CONSTANTS =====
const initialState = {
  statements: [],
  loading: {
    fetching: false,
    downloading: {},
  },
  errors: {
    fetching: null,
    downloading: {},
  },
  fetched: false
};

const ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_STATEMENTS: 'SET_STATEMENTS',
  SET_ERROR: 'SET_ERROR',
  SET_FETCHED: 'SET_FETCHED',
  SET_DOWNLOADING: 'SET_DOWNLOADING',
  SET_DOWNLOAD_ERROR: 'SET_DOWNLOAD_ERROR',
  CLEAR_ERRORS: 'CLEAR_ERRORS',
  RESET_STATE: 'RESET_STATE'
};

// ===== REDUCER =====
const financialStatementsReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: { ...state.loading, [action.key]: action.payload }
      };

    case ACTIONS.SET_STATEMENTS:
      return {
        ...state,
        statements: action.payload,
        loading: { ...state.loading, fetching: false },
        errors: { ...state.errors, fetching: null },
        fetched: true
      };

    case ACTIONS.SET_ERROR:
      return {
        ...state,
        errors: { ...state.errors, [action.key]: action.payload },
        loading: { ...state.loading, [action.key]: false }
      };

    case ACTIONS.SET_FETCHED:
      return {
        ...state,
        fetched: action.payload
      };

    case ACTIONS.SET_DOWNLOADING:
      return {
        ...state,
        loading: {
          ...state.loading,
          downloading: { ...state.loading.downloading, [action.id]: action.payload }
        }
      };

    case ACTIONS.SET_DOWNLOAD_ERROR:
      return {
        ...state,
        errors: {
          ...state.errors,
          downloading: { ...state.errors.downloading, [action.id]: action.payload }
        },
        loading: {
          ...state.loading,
          downloading: { ...state.loading.downloading, [action.id]: false }
        }
      };

    case ACTIONS.CLEAR_ERRORS:
      return {
        ...state,
        errors: { fetching: null, downloading: {} }
      };

    case ACTIONS.RESET_STATE:
      return initialState;

    default:
      return state;
  }
};

// ===== CONTEXT SETUP =====
const FinancialStatementsContext = createContext();

export const FinancialStatementsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(financialStatementsReducer, initialState);
  const { auth } = useAuth();
  const { apiRefreshTrigger } = useTradingYear();

  // ===== HELPER FUNCTIONS =====
  const clearErrors = () => {
    dispatch({ type: ACTIONS.CLEAR_ERRORS });
  };

  const resetState = () => {
    dispatch({ type: ACTIONS.RESET_STATE });
  };

  // ===== MAIN FUNCTIONS =====
  const fetchFinancialStatements = async (force = false) => {
    // Don't fetch if not authenticated
    if (!auth.isAuthenticated) return [];
    
    // Don't fetch if already fetched and not forcing
    if (state.fetched && !force) return state.statements;

    dispatch({ type: ACTIONS.SET_LOADING, key: 'fetching', payload: true });

    try {
      const response = await getFinancialsApi();
      
      if (response.data.success) {
        const statements = response.data.data || [];
        dispatch({ type: ACTIONS.SET_STATEMENTS, payload: statements });
        
        // Only show success toast on first fetch or forced refresh with data
        if ((!state.fetched || force) && statements.length > 0) {
          // toast.success("Financial statements loaded successfully!");
          console.log("Financial statements loaded successfully!");
        }
        
        return statements;
      } else {
        throw new Error("Failed to fetch financial statements");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to load financial statements. Please try again.";
      dispatch({ type: ACTIONS.SET_ERROR, key: 'fetching', payload: errorMessage });
      
      // Show error toast
      toast.error(errorMessage);
      console.error("Error fetching financial statements:", error);
      return [];
    }
  };

  const downloadFinancialDocument = async (id, fileName) => {
    if (!auth.isAuthenticated) {
      toast.error("You must be logged in to download documents");
      return false;
    }

    dispatch({ type: ACTIONS.SET_DOWNLOADING, id, payload: true });
    
    // Show loading toast
    toast.loading("Preparing download...", { id: `download-${id}` });

    try {
      const response = await downloadFinancialApi(id);
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      // Show success toast
      toast.success(`${fileName} downloaded successfully!`, { id: `download-${id}` });
      
      dispatch({ type: ACTIONS.SET_DOWNLOADING, id, payload: false });
      return true;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to download file. Please try again.";
      dispatch({ type: ACTIONS.SET_DOWNLOAD_ERROR, id, payload: errorMessage });
      
      // Show error toast
      toast.error(errorMessage, { id: `download-${id}` });
      console.error("Error downloading file:", error);
      return false;
    }
  };

  const refreshStatements = async () => {
    console.log("FinancialStatementsContext: Refreshing data due to trading year change");
    await fetchFinancialStatements(true);
  };

  // ===== EFFECTS =====
  
  // Initial fetch when user is authenticated
  useEffect(() => {
    if (auth.isAuthenticated && !state.fetched) {
      fetchFinancialStatements();
    }
  }, [auth.isAuthenticated]);

  // Reset state when user logs out
  useEffect(() => {
    if (!auth.isAuthenticated && state.fetched) {
      resetState();
    }
  }, [auth.isAuthenticated]);

  // Listen for trading year changes and refresh data
  useEffect(() => {
    if (apiRefreshTrigger > 0 && auth.isAuthenticated) {
      refreshStatements();
    }
  }, [apiRefreshTrigger, auth.isAuthenticated]);

  // ===== CONTEXT VALUE =====
  const contextValue = {
    // State
    statements: state.statements,
    fetched: state.fetched,
    
    // Loading states
    isLoading: state.loading.fetching,
    downloadingStates: state.loading.downloading,
    
    // Error states
    fetchError: state.errors.fetching,
    downloadErrors: state.errors.downloading,
    
    // Actions
    fetchFinancialStatements,
    downloadFinancialDocument,
    refreshStatements,
    clearErrors,
    resetState,
    
    // Helper function to check if a specific document is downloading
    isDownloading: (id) => !!state.loading.downloading[id]
  };

  return (
    <FinancialStatementsContext.Provider value={contextValue}>
      {children}
    </FinancialStatementsContext.Provider>
  );
};

// ===== CUSTOM HOOK =====
export const useFinancialStatements = () => {
  const context = useContext(FinancialStatementsContext);
  if (!context) {
    throw new Error('useFinancialStatements must be used within a FinancialStatementsProvider');
  }
  return context;
};

export default FinancialStatementsContext;