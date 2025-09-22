// src/context/SelfAssessmentContext.js
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import toast from 'react-hot-toast';
import { selfAssessmentReturnsPostApi, selfAssessmentReturnsGetAllApi } from '../services/dashboard';
import { useAuth } from './AuthContext';
import { useTradingYear } from './TradingYearContext';

// ===== CONSTANTS =====
const initialState = {
  selfAssessmentData: null,
  loading: {
    fetching: false,
    saving: false,
  },
  errors: {
    fetching: null,
    saving: null,
  },
  fetched: false,
  hasExistingData: false
};

const ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_DATA: 'SET_DATA',
  SET_ERROR: 'SET_ERROR',
  SET_FETCHED: 'SET_FETCHED',
  SET_HAS_EXISTING_DATA: 'SET_HAS_EXISTING_DATA',
  RESET_STATE: 'RESET_STATE',
  CLEAR_ERRORS: 'CLEAR_ERRORS'
};

// ===== REDUCER =====
const selfAssessmentReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: { ...state.loading, [action.key]: action.payload }
      };

    case ACTIONS.SET_DATA:
      return {
        ...state,
        selfAssessmentData: action.payload,
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

    case ACTIONS.SET_HAS_EXISTING_DATA:
      return {
        ...state,
        hasExistingData: action.payload
      };

    case ACTIONS.CLEAR_ERRORS:
      return {
        ...state,
        errors: { fetching: null, saving: null }
      };

    case ACTIONS.RESET_STATE:
      return initialState;

    default:
      return state;
  }
};

// ===== CONTEXT SETUP =====
const SelfAssessmentContext = createContext();

export const SelfAssessmentContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(selfAssessmentReducer, initialState);
  const { auth } = useAuth();
  const { apiRefreshTrigger } = useTradingYear();

  // ===== HELPER FUNCTIONS =====
  const showToast = (message, type = 'success') => {
    if (type === 'success') {
      // toast.success(message);
      console.log(message);
    } else if (type === 'error') {
      toast.error(message);
    } else {
      toast(message);
    }
  };

  const clearErrors = () => {
    dispatch({ type: ACTIONS.CLEAR_ERRORS });
  };

  const resetState = () => {
    dispatch({ type: ACTIONS.RESET_STATE });
  };

  // ===== MAIN FUNCTIONS =====
  const fetchSelfAssessmentData = async (force = false) => {
    // Don't fetch if not authenticated
    if (!auth.isAuthenticated) return null;
    
    // Don't fetch if already fetched and not forcing
    if (state.fetched && !force) return state.selfAssessmentData;

    dispatch({ type: ACTIONS.SET_LOADING, key: 'fetching', payload: true });

    try {
      const response = await selfAssessmentReturnsGetAllApi();
      
      if (response.data.status && response.data.data) {
        const data = response.data.data;
        dispatch({ type: ACTIONS.SET_DATA, payload: data });
        dispatch({ type: ACTIONS.SET_HAS_EXISTING_DATA, payload: true });
        
        // Only show success toast on first fetch or forced refresh
        if (!state.fetched || force) {
          showToast("Self Assessment data loaded successfully!", "success");
        }
        
        return data;
      } else {
        // No existing data found - this is normal for new users
        dispatch({ type: ACTIONS.SET_DATA, payload: null });
        dispatch({ type: ACTIONS.SET_HAS_EXISTING_DATA, payload: false });
        return null;
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to load self assessment data";
      dispatch({ type: ACTIONS.SET_ERROR, key: 'fetching', payload: errorMessage });
      
      // Don't show error toast for 404 (no data) - it's normal for new users
      if (error.response?.status !== 404) {
        showToast(errorMessage, "error");
      }
      
      console.log("No existing self assessment data found or error:", error);
      return null;
    }
  };

  const saveSelfAssessmentData = async (formData) => {
    if (!auth.isAuthenticated) {
      showToast("You must be logged in to save data", "error");
      return false;
    }

    dispatch({ type: ACTIONS.SET_LOADING, key: 'saving', payload: true });

    try {
      const response = await selfAssessmentReturnsPostApi(formData);
      
      if (response.data.status) {
        // Update local state with new data
        dispatch({ type: ACTIONS.SET_DATA, payload: formData });
        dispatch({ type: ACTIONS.SET_HAS_EXISTING_DATA, payload: true });
        
        const message = state.hasExistingData 
          ? "Self Assessment information updated successfully!" 
          : "Self Assessment information saved successfully!";
        
        showToast(message, "success");
        return true;
      } else {
        throw new Error(response.data.message || "Save operation failed");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to save information. Please try again.";
      dispatch({ type: ACTIONS.SET_ERROR, key: 'saving', payload: errorMessage });
      showToast(errorMessage, "error");
      console.error("❌ Save API Error:", error);
      return false;
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, key: 'saving', payload: false });
    }
  };

  const refreshData = async () => {
    console.log("SelfAssessmentContext: Refreshing data due to trading year change");
    await fetchSelfAssessmentData(true);
  };

  // ===== EFFECTS =====
  
  // Initial fetch when user is authenticated
  useEffect(() => {
    if (auth.isAuthenticated && !state.fetched) {
      fetchSelfAssessmentData();
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
      refreshData();
    }
  }, [apiRefreshTrigger, auth.isAuthenticated]);

  // ===== CONTEXT VALUE =====
  const contextValue = {
    // State
    selfAssessmentData: state.selfAssessmentData,
    hasExistingData: state.hasExistingData,
    fetched: state.fetched,
    
    // Loading states
    isLoading: state.loading.fetching,
    isSaving: state.loading.saving,
    
    // Error states
    fetchError: state.errors.fetching,
    saveError: state.errors.saving,
    
    // Actions
    fetchSelfAssessmentData,
    saveSelfAssessmentData,
    refreshData,
    showToast,
    clearErrors,
    resetState
  };

  return (
    <SelfAssessmentContext.Provider value={contextValue}>
      {children}
    </SelfAssessmentContext.Provider>
  );
};

// ===== CUSTOM HOOK =====
export const useSelfAssessment = () => {
  const context = useContext(SelfAssessmentContext);
  if (!context) {
    throw new Error('useSelfAssessment must be used within a SelfAssessmentProvider');
  }
  return context;
};

export default SelfAssessmentContext;