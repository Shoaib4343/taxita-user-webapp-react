// src/context/WeeklyIncomeContext.jsx
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import toast from 'react-hot-toast';
import { weeklyIncomeApi } from '../services/dashboard';
import { useAuth } from './AuthContext';
import { useTradingYear } from './TradingYearContext';

// ===== CONSTANTS =====
const initialState = {
  weeklyData: [],
  loading: false,
  error: null,
  fetched: false
};

const ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_DATA: 'SET_DATA',
  SET_ERROR: 'SET_ERROR',
  SET_FETCHED: 'SET_FETCHED',
  CLEAR_ERROR: 'CLEAR_ERROR',
  RESET_STATE: 'RESET_STATE'
};

// ===== REDUCER =====
const weeklyIncomeReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
        error: action.payload ? null : state.error // Clear error when loading starts
      };

    case ACTIONS.SET_DATA:
      return {
        ...state,
        weeklyData: action.payload,
        loading: false,
        error: null,
        fetched: true
      };

    case ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };

    case ACTIONS.SET_FETCHED:
      return {
        ...state,
        fetched: action.payload
      };

    case ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };

    case ACTIONS.RESET_STATE:
      return initialState;

    default:
      return state;
  }
};

// ===== CONTEXT SETUP =====
const WeeklyIncomeContext = createContext();

export const WeeklyIncomeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(weeklyIncomeReducer, initialState);
  const { auth } = useAuth();
  const { apiRefreshTrigger } = useTradingYear();

  // Debug logging
  console.log('WeeklyIncomeProvider state:', {
    dataLength: state.weeklyData.length,
    loading: state.loading,
    fetched: state.fetched,
    hasError: !!state.error
  });

  // ===== HELPER FUNCTIONS =====
  const clearError = () => {
    dispatch({ type: ACTIONS.CLEAR_ERROR });
  };

  const resetState = () => {
    dispatch({ type: ACTIONS.RESET_STATE });
  };

  // ===== MAIN FUNCTIONS =====
  const fetchWeeklyIncome = async (force = false, showToast = false) => {
    console.log('fetchWeeklyIncome called:', { 
      force, 
      showToast, 
      isAuthenticated: auth.isAuthenticated,
      fetched: state.fetched,
      hasData: state.weeklyData.length > 0,
      loading: state.loading
    });

    // Don't fetch if not authenticated
    if (!auth.isAuthenticated) {
      console.log('WeeklyIncome: Not authenticated, skipping fetch');
      return [];
    }
    
    // Don't fetch if already fetched and not forcing
    if (state.fetched && !force && state.weeklyData.length >= 0) {
      console.log('WeeklyIncome: Using cached data, no API call needed');
      return state.weeklyData;
    }

    console.log('WeeklyIncome: Making API call...');
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });

    try {
      const response = await weeklyIncomeApi();
      console.log('WeeklyIncome API response:', response.data);
      
      if (response.data.success) {
        const data = response.data.data || [];
        dispatch({ type: ACTIONS.SET_DATA, payload: data });
        
        // Only show success toast on first fetch or forced refresh with data
        if (showToast && data.length > 0) {
          toast.success("Weekly income data loaded successfully!");
        }
        
        console.log('WeeklyIncome: Data fetched and cached successfully');
        return data;
      } else {
        throw new Error(response.data.message || "Failed to fetch weekly income");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to load weekly income. Please try again.";
      dispatch({ type: ACTIONS.SET_ERROR, payload: errorMessage });
      
      // Show error toast
      toast.error(errorMessage);
      console.error("Error fetching weekly income:", error);
      return [];
    }
  };

  const refreshWeeklyIncome = async () => {
    console.log("WeeklyIncomeContext: Refreshing data due to trading year change");
    return await fetchWeeklyIncome(true, false);
  };

  // ===== EFFECTS =====
  
  // Initial fetch when user is authenticated
  useEffect(() => {
    if (auth.isAuthenticated && !state.fetched) {
      console.log('WeeklyIncome: Auth detected, fetching data for first time');
      fetchWeeklyIncome(false, false); // Don't show toast on auto-fetch
    }
  }, [auth.isAuthenticated, state.fetched]);

  // Reset state when user logs out
  useEffect(() => {
    if (!auth.isAuthenticated && state.fetched) {
      console.log('WeeklyIncome: User logged out, resetting state');
      resetState();
    }
  }, [auth.isAuthenticated, state.fetched]);

  // Listen for trading year changes and refresh data
  useEffect(() => {
    if (apiRefreshTrigger > 0 && auth.isAuthenticated && state.fetched) {
      console.log('WeeklyIncome: Trading year changed, refreshing data');
      refreshWeeklyIncome();
    }
  }, [apiRefreshTrigger, auth.isAuthenticated, state.fetched]);

  // ===== CONTEXT VALUE =====
  const contextValue = {
    // State
    weeklyData: state.weeklyData,
    isLoading: state.loading,
    error: state.error,
    fetched: state.fetched,
    
    // Actions
    fetchWeeklyIncome,
    refreshWeeklyIncome,
    clearError,
    resetState,
    
    // Helper properties
    hasData: state.weeklyData.length > 0,
    isReady: state.fetched && !state.loading
  };

  return (
    <WeeklyIncomeContext.Provider value={contextValue}>
      {children}
    </WeeklyIncomeContext.Provider>
  );
};

// ===== CUSTOM HOOK =====
export const useWeeklyIncome = () => {
  const context = useContext(WeeklyIncomeContext);
  if (!context) {
    throw new Error('useWeeklyIncome must be used within a WeeklyIncomeProvider');
  }
  return context;
};

export default WeeklyIncomeContext;