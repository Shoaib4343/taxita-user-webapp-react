// src/context/RollingPLContext.js
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import toast from 'react-hot-toast';
import { getProfitAndLoss } from '../services/dashboard';
import { useAuth } from './AuthContext';
import { useTradingYear } from './TradingYearContext';

// ===== CONSTANTS =====
const initialState = {
  profitLossData: {
    total_income: 0,
    fuel: 0,
    oil: 0,
    car_tax: 0,
    insurance: 0,
    servicing_repairs: 0,
    tyres: 0,
    vehicle_rental_lease: 0,
    vehicle_loan_interest: 0,
    other_motor_expenses: 0,
    sub_total_motor_expenses: 0,
    radio_rent: 0,
    radio: 0,
    capital_allowances: 0,
    percentage_adj: {
      private_use_adj_car: 0,
      private_use_adj_phone: 0,
      radio_rent_cash: 0,
      radio_rent_card_bank: 0,
      radio_rent_acc_contract: 0,
      radio_rent_sub_contract: 0
    },
    total_radio_rent: 0,
    mobile_telephone_costs: 0,
    driver_licence_badge_medical: 0,
    repair_renewals_equipment: 0,
    legal_accountancy_costs: 0,
    car_cleaning_valeting: 0,
    wages_to_employee: 0,
    use_of_home_as_office: 0,
    misc_sundry_expenses: 0,
    parking_toll_charges: 0,
    sub_total_additional_expenses: 0,
    sub_total_motor_additional_expenses: 0,
    total_expenses: 0,
    net_profit_loss: 0,
    add_private_use_adjustment_car: 0,
    add_private_use_adjustment_telephone: 0,
    vehicle_disposal: 0,
    total_net_balance: 0
  },
  loading: {
    fetching: false,
    exporting: false,
  },
  errors: {
    fetching: null,
    exporting: null,
  },
  fetched: false
};

const ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_PROFIT_LOSS_DATA: 'SET_PROFIT_LOSS_DATA',
  SET_ERROR: 'SET_ERROR',
  SET_FETCHED: 'SET_FETCHED',
  SET_EXPORTING: 'SET_EXPORTING',
  SET_EXPORT_ERROR: 'SET_EXPORT_ERROR',
  CLEAR_ERRORS: 'CLEAR_ERRORS',
  RESET_STATE: 'RESET_STATE'
};

// ===== REDUCER =====
const rollingPLReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: { ...state.loading, [action.key]: action.payload }
      };

    case ACTIONS.SET_PROFIT_LOSS_DATA:
      return {
        ...state,
        profitLossData: action.payload,
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

    case ACTIONS.SET_EXPORTING:
      return {
        ...state,
        loading: { ...state.loading, exporting: action.payload }
      };

    case ACTIONS.SET_EXPORT_ERROR:
      return {
        ...state,
        errors: { ...state.errors, exporting: action.payload },
        loading: { ...state.loading, exporting: false }
      };

    case ACTIONS.CLEAR_ERRORS:
      return {
        ...state,
        errors: { fetching: null, exporting: null }
      };

    case ACTIONS.RESET_STATE:
      return initialState;

    default:
      return state;
  }
};

// ===== CONTEXT SETUP =====
const RollingPLContext = createContext();

export const RollingPLContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(rollingPLReducer, initialState);
  const { auth } = useAuth();
  const { apiRefreshTrigger } = useTradingYear();

  // ===== HELPER FUNCTIONS =====
  const clearErrors = () => {
    dispatch({ type: ACTIONS.CLEAR_ERRORS });
  };

  const resetState = () => {
    dispatch({ type: ACTIONS.RESET_STATE });
  };

  // Format currency values
  const formatCurrency = (amount) => {
    if (!amount || amount === 0) return "£ 0.00";
    return `£ ${parseFloat(amount).toLocaleString('en-GB', { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    })}`;
  };

  // ===== MAIN FUNCTIONS =====
  const fetchProfitLossData = async (force = false) => {
    // Don't fetch if not authenticated
    if (!auth.isAuthenticated) return null;
    
    // Don't fetch if already fetched and not forcing
    if (state.fetched && !force) return state.profitLossData;

    dispatch({ type: ACTIONS.SET_LOADING, key: 'fetching', payload: true });

    try {
      const response = await getProfitAndLoss();
      
      // The API returns data directly, not wrapped in a success object
      const data = response.data || initialState.profitLossData;
      
      dispatch({ type: ACTIONS.SET_PROFIT_LOSS_DATA, payload: data });
      
      // Only show success toast on first fetch or forced refresh
      if (!state.fetched || force) {
        // toast.success("Rolling P&L data loaded successfully!");
        console.log("Rolling P&L data loaded successfully!");
      }
      
      return data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to load Rolling P&L data. Please try again.";
      dispatch({ type: ACTIONS.SET_ERROR, key: 'fetching', payload: errorMessage });
      
      // Show error toast
      toast.error(errorMessage);
      console.error("Error fetching Rolling P&L data:", error);
      return null;
    }
  };

  // Export/Download PDF functionality
  const exportToPDF = async () => {
    if (!auth.isAuthenticated) {
      toast.error("You must be logged in to export data");
      return false;
    }

    if (!state.profitLossData || !state.fetched) {
      toast.error("No data available to export");
      return false;
    }

    dispatch({ type: ACTIONS.SET_EXPORTING, payload: true });
    
    // Show loading toast
    const loadingToastId = `export-${Date.now()}`;
    toast.loading("Preparing PDF export...", { id: loadingToastId });

    try {
      // Simulate PDF generation (replace with actual API call when available)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For now, create a simple data export
      const exportData = {
        ...state.profitLossData,
        exported_at: new Date().toISOString(),
        trading_year: "2025-2026" // This should come from trading year context
      };

      // Create downloadable blob
      const dataStr = JSON.stringify(exportData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = window.URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `rolling-pl-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      // Show success toast
      toast.success("Rolling P&L data exported successfully!", { id: loadingToastId });
      
      dispatch({ type: ACTIONS.SET_EXPORTING, payload: false });
      return true;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to export data. Please try again.";
      dispatch({ type: ACTIONS.SET_EXPORT_ERROR, payload: errorMessage });
      
      // Show error toast
      toast.error(errorMessage, { id: loadingToastId });
      console.error("Export failed:", error);
      return false;
    }
  };

  const refreshData = async () => {
    console.log("RollingPLContext: Refreshing data due to trading year change");
    await fetchProfitLossData(true);
  };

  // ===== EFFECTS =====
  
  // Initial fetch when user is authenticated
  useEffect(() => {
    if (auth.isAuthenticated && !state.fetched) {
      fetchProfitLossData();
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
    profitLossData: state.profitLossData,
    fetched: state.fetched,
    
    // Loading states
    isLoading: state.loading.fetching,
    isExporting: state.loading.exporting,
    
    // Error states
    fetchError: state.errors.fetching,
    exportError: state.errors.exporting,
    
    // Actions
    fetchProfitLossData,
    exportToPDF,
    refreshData,
    clearErrors,
    resetState,
    
    // Helper functions
    formatCurrency,
    
    // Computed values for motor expenses
    getMotorExpenses: () => [
      { label: "Fuel", amount: formatCurrency(state.profitLossData.fuel) },
      { label: "Oil", amount: formatCurrency(state.profitLossData.oil) },
      { label: "Car tax", amount: formatCurrency(state.profitLossData.car_tax) },
      { label: "Insurance", amount: formatCurrency(state.profitLossData.insurance) },
      { label: "Servicing/repairs", amount: formatCurrency(state.profitLossData.servicing_repairs) },
      { label: "Tyres", amount: formatCurrency(state.profitLossData.tyres) },
      { label: "Depreciation Expense", amount: formatCurrency(state.profitLossData.capital_allowances) },
      { label: "Vehicle rental/lease", amount: formatCurrency(state.profitLossData.vehicle_rental_lease) },
      { label: "Vehicle loan interest", amount: formatCurrency(state.profitLossData.vehicle_loan_interest) },
      { label: "Other motor expenses", amount: formatCurrency(state.profitLossData.other_motor_expenses) },
      { label: "Subtotal for Motor Expenses", amount: formatCurrency(state.profitLossData.sub_total_motor_expenses) },
    ],
    
    // Computed values for additional expenses
    getAdditionalExpenses: () => [
      { label: "Radio Rent / Commission fee / Subscription fee", amount: formatCurrency(state.profitLossData.total_radio_rent) },
      { label: `Deductions % (Cash ${state.profitLossData.percentage_adj?.radio_rent_cash || 0}%, Card/Bank ${state.profitLossData.percentage_adj?.radio_rent_card_bank || 0}%, Account/Contract ${state.profitLossData.percentage_adj?.radio_rent_acc_contract || 0}%, Sub Contract ${state.profitLossData.percentage_adj?.radio_rent_sub_contract || 0}%)`, amount: formatCurrency(0) },
      { label: "Mobile/telephone costs", amount: formatCurrency(state.profitLossData.mobile_telephone_costs) },
      { label: "Driver/licences/badge/medical", amount: formatCurrency(state.profitLossData.driver_licence_badge_medical) },
      { label: "Repairs/renewals to equipment", amount: formatCurrency(state.profitLossData.repair_renewals_equipment) },
      { label: "Legal and accountancy costs", amount: formatCurrency(state.profitLossData.legal_accountancy_costs) },
      { label: "Car cleaning/valeting", amount: formatCurrency(state.profitLossData.car_cleaning_valeting) },
      { label: "Wages to employee", amount: formatCurrency(state.profitLossData.wages_to_employee) },
      { label: "Use of home as office", amount: formatCurrency(state.profitLossData.use_of_home_as_office) },
      { label: "Misc/sundry expenses", amount: formatCurrency(state.profitLossData.misc_sundry_expenses) },
      { label: "Parking/Toll charges", amount: formatCurrency(state.profitLossData.parking_toll_charges) },
      { label: "Subtotal for Additional expenses", amount: formatCurrency(state.profitLossData.sub_total_additional_expenses) },
    ],
    
    // Computed values for profit/loss
    getProfitLoss: () => [
      { label: "Total Expenses", amount: formatCurrency(state.profitLossData.total_expenses) },
      { label: "Net Profit / (Loss)", amount: formatCurrency(state.profitLossData.net_profit_loss) },
      { label: `Add private use adjustment car (${state.profitLossData.percentage_adj?.private_use_adj_car || 0}%)`, amount: formatCurrency(state.profitLossData.add_private_use_adjustment_car) },
      { label: `Add private use adjustment telephone (${state.profitLossData.percentage_adj?.private_use_adj_phone || 0}%)`, amount: formatCurrency(state.profitLossData.add_private_use_adjustment_telephone) },
      { label: "Adjusted Net Profit / (Loss)", amount: formatCurrency(state.profitLossData.total_net_balance) },
    ]
  };

  return (
    <RollingPLContext.Provider value={contextValue}>
      {children}
    </RollingPLContext.Provider>
  );
};

// ===== CUSTOM HOOK =====
export const useRollingPL = () => {
  const context = useContext(RollingPLContext);
  if (!context) {
    throw new Error('useRollingPL must be used within a RollingPLProvider');
  }
  return context;
};

export default RollingPLContext;