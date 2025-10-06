
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { previousTradingYearApi } from '../services/dashboard';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const TradingYearContext = createContext();

export const useTradingYear = () => {
  const context = useContext(TradingYearContext);
  if (!context) {
    throw new Error('useTradingYear must be used within a TradingYearProvider');
  }
  return context;
};

export const TradingYearProvider = ({ children }) => {
  const [tradingYears, setTradingYears] = useState([]);
  const [activeTradingYear, setActiveTradingYear] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [fetched, setFetched] = useState(false);
  const [error, setError] = useState(null);
  const [apiRefreshTrigger, setApiRefreshTrigger] = useState(0);
  
  const { auth } = useAuth();

  // Reset state when user logs out
  const resetState = useCallback(() => {
    setTradingYears([]);
    setActiveTradingYear(null);
    setLoading(true);
    setRefreshing(false);
    setFetched(false);
    setError(null);
    setApiRefreshTrigger(0);
  }, []);

  // Simple method to trigger API refresh across the app
  const triggerApiRefresh = useCallback(() => {
    setApiRefreshTrigger(prev => prev + 1);
  }, []);

  // Fetch trading years data with optimizations
  const fetchTradingYears = useCallback(async (showToast = false, force = false) => {
    if (!auth.isAuthenticated) return null;
    if (fetched && !force) return tradingYears;

    try {
      setRefreshing(true);
      setError(null);
      
      const res = await previousTradingYearApi();
      console.log('res of the context for the id ', res.data)
      
      if (res.data.success && res.data.data) {
        setTradingYears(res.data.data);
        
        // Find active trading year - priority order
        let activeYear = res.data.data.find(year => year.status === 'Active');
        if (!activeYear) {
          activeYear = res.data.data.find(year => year.status === 'Current Trading Year');
        }
        if (!activeYear) {
          // If no active year, find the most recent non-closed, non-finalised year
          activeYear = res.data.data.find(year => 
            year.status !== 'Closed' && 
            year.status !== 'Year Closed' && 
            year.status !== 'Finalised'
          );
        }
        if (!activeYear && res.data.data.length > 0) {
          activeYear = res.data.data[0];
        }
        
        if (activeYear) {
          const generateEndDate = (tradingYear) => {
            try {
              const years = tradingYear.split('-');
              if (years.length === 2) {
                const endYear = parseInt(years[1]);
                return `${endYear}-08-26`;
              }
            } catch (error) {
              console.error('Error generating end date:', error);
            }
            return '2026-08-26';
          };

          const completeActiveYear = {
            ...activeYear,
            tradingyear_enddate: activeYear.tradingyear_enddate || generateEndDate(activeYear.trading_year),
            tradingyear_startdate: activeYear.tradingyear_startdate || `${activeYear.trading_year.split('-')[0]}-04-06`,
            active_trading_year: activeYear.active_trading_year || (activeYear.status === 'Active' ? 1 : 0),
            close: activeYear.close || 0,
            trading_status: activeYear.trading_status || 1,
            finalise_year: activeYear.finalise_year !== undefined ? activeYear.finalise_year : (activeYear.status === 'Finalised' ? 1 : 0)
          };
          
          setActiveTradingYear(completeActiveYear);
        } else {
          setActiveTradingYear(null);
        }

        setFetched(true);

        if (showToast) {
          toast.success('Trading years data refreshed');
        }
        
        return res.data.data;
      }
    } catch (error) {
      console.error('Error fetching trading years:', error);
      const errorMessage = error.response?.data?.message || 'Failed to fetch trading years data';
      setError(errorMessage);
      
      if (showToast) {
        toast.error('Failed to refresh trading years data');
      }
      throw error;
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [auth.isAuthenticated, fetched, tradingYears]);

  // Optimized method to update active trading year after activation
  const updateActiveTradingYear = useCallback(async (newActiveYearData) => {
    if (!auth.isAuthenticated) return false;
    
    try {
      if (newActiveYearData) {
        const generateEndDate = (tradingYear) => {
          try {
            const years = tradingYear.split('-');
            if (years.length === 2) {
              const endYear = parseInt(years[1]);
              return `${endYear}-08-26`;
            }
          } catch (error) {
            console.error('Error generating end date:', error);
          }
          return '2026-08-26';
        };

        const completeNewActiveYear = {
          ...newActiveYearData,
          tradingyear_enddate: newActiveYearData.tradingyear_enddate || generateEndDate(newActiveYearData.trading_year),
          tradingyear_startdate: newActiveYearData.tradingyear_startdate || `${newActiveYearData.trading_year.split('-')[0]}-04-06`,
          active_trading_year: 1,
          close: newActiveYearData.close || 0,
          trading_status: 1,
          finalise_year: newActiveYearData.finalise_year !== undefined ? newActiveYearData.finalise_year : (newActiveYearData.status === 'Finalised' ? 1 : 0)
        };
        
        setActiveTradingYear(completeNewActiveYear);

        // Dispatch custom event to notify other components
        window.dispatchEvent(new CustomEvent('tradingYearActivated', {
          detail: { activatedYear: completeNewActiveYear.trading_year }
        }));
      }
      
      // Use Promise.all to run these operations concurrently for faster execution
      const [refreshResult] = await Promise.all([
        fetchTradingYears(false, true),
        // Trigger API refresh immediately without waiting
        Promise.resolve(triggerApiRefresh())
      ]);
      
      return true;
    } catch (error) {
      console.error('Error updating active trading year:', error);
      return false;
    }
  }, [auth.isAuthenticated, fetchTradingYears, triggerApiRefresh]);

  // Method to refresh trading years data
  const refreshTradingYears = useCallback(async () => {
    if (!auth.isAuthenticated) return null;
    const result = await fetchTradingYears(true, true);
    
    if (result) {
      // Trigger API refresh immediately without waiting
      triggerApiRefresh();
    }
    
    return result;
  }, [auth.isAuthenticated, fetchTradingYears, triggerApiRefresh]);

  // Get trading year status configuration
  const getTradingYearStatus = useCallback((year) => {
    if (!year) return 'Unknown';
    return year.status || 'Unknown';
  }, []);

  // Get active trading year info
  const getActiveTradingYearInfo = useCallback(() => {
    if (!activeTradingYear) {
      return {
        tradingYear: '2025-2026',
        tradingyear_enddate: '2026-08-26',
        tradingyear_startdate: '2025-04-06'
      };
    }

    return {
      tradingYear: activeTradingYear.trading_year,
      tradingyear_enddate: activeTradingYear.tradingyear_enddate,
      tradingyear_startdate: activeTradingYear.tradingyear_startdate,
      status: activeTradingYear.status,
      finalise_year: activeTradingYear.finalise_year,
      close: activeTradingYear.close
    };
  }, [activeTradingYear]);

  // Check if current year is finalised
  const isCurrentYearFinalised = useCallback(() => {
    return activeTradingYear && (activeTradingYear.status === 'Finalised' || activeTradingYear.finalise_year === 1);
  }, [activeTradingYear]);

  // Effect to fetch data when user becomes authenticated
  useEffect(() => {
    if (auth.isAuthenticated) {
      if (!fetched) {
        fetchTradingYears();
      }
    }
  }, [auth.isAuthenticated, fetched, fetchTradingYears]);

  // Effect to reset state when user logs out
  useEffect(() => {
    if (!auth.isAuthenticated && fetched) {
      resetState();
    }
  }, [auth.isAuthenticated, fetched, resetState]);

  const contextValue = {
    // State
    tradingYears,
    activeTradingYear,
    loading,
    refreshing,
    fetched,
    error,
    apiRefreshTrigger,

    // Methods
    fetchTradingYears,
    updateActiveTradingYear,
    refreshTradingYears,
    getActiveTradingYearInfo,
    getTradingYearStatus,
    resetState,
    triggerApiRefresh,
    isCurrentYearFinalised,

    // Computed values
    activeYearInfo: getActiveTradingYearInfo()
  };

  return (
    <TradingYearContext.Provider value={contextValue}>
      {children}
    </TradingYearContext.Provider>
  );
};