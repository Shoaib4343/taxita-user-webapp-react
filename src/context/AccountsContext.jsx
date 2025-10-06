import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getAccountsApi } from '../services/dashboard';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const AccountsContext = createContext();

export const useAccounts = () => {
  const context = useContext(AccountsContext);
  if (!context) {
    throw new Error('useAccounts must be used within an AccountsProvider');
  }
  return context;
};

export const AccountsProvider = ({ children }) => {
  const [accounts, setAccounts] = useState([]);
  const [incomeAccounts, setIncomeAccounts] = useState([]);
  const [expenseAccounts, setExpenseAccounts] = useState([]);
  const [motorExpenses, setMotorExpenses] = useState([]);
  const [additionalExpenses, setAdditionalExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [fetched, setFetched] = useState(false);
  const [error, setError] = useState(null);
  const [apiRefreshTrigger, setApiRefreshTrigger] = useState(0);
  
  const { auth } = useAuth();

  // Icon mappings
  const incomeIconMapping = {
    cash_account: { icon: 'FaWallet', color: "bg-emerald-500" },
    card_account: { icon: 'FaCreditCard', color: "bg-blue-500" },
    contract_account: { icon: 'PoundSterlingIcon', color: "bg-purple-500" },
    sub_contract_account: { icon: 'FaFileInvoice', color: "bg-yellow-500" },
    rental_income_account: { icon: 'FaCar', color: "bg-red-500" },
  };

  const expenseIconMapping = {
    // Motor Expenses
    fuel: { icon: 'FaGasPump', color: "bg-red-500" },
    oil: { icon: 'FaOilCan', color: "bg-yellow-500" },
    car_tax: { icon: 'FaCar', color: "bg-blue-500" },
    insurance: { icon: 'FaShieldAlt', color: "bg-green-500" },
    servicing_repairs: { icon: 'FaTools', color: "bg-purple-500" },
    tyres: { icon: 'FaDotCircle', color: "bg-pink-500" },
    vehicle_rental_lease: { icon: 'FaCarSide', color: "bg-indigo-500" },
    vehicle_loan_interest: { icon: 'FaMoneyCheckAlt', color: "bg-orange-500" },
    other_motor_expenses: { icon: 'FaCogs', color: "bg-gray-500" },
    
    // Additional Expenses
    radio_rent: { icon: 'FaDotCircle', color: "bg-blue-500" },
    mobile_telephone_costs: { icon: 'FaPhoneAlt', color: "bg-green-500" },
    driver_licence_badge_medical: { icon: 'FaIdBadge', color: "bg-red-500" },
    repair_renewals_equipment: { icon: 'FaWrench', color: "bg-yellow-500" },
    legal_accountancy_costs: { icon: 'FaBalanceScale', color: "bg-purple-500" },
    car_cleaning_valeting: { icon: 'FaSoap', color: "bg-pink-500" },
    wages_to_employee: { icon: 'FaUserTie', color: "bg-indigo-500" },
    use_of_home_as_office: { icon: 'FaHome', color: "bg-orange-500" },
    misc_sundry_expenses: { icon: 'FaBox', color: "bg-gray-500" },
    parking_toll_charges: { icon: 'FaParking', color: "bg-teal-500" },
  };

  // Reset state when user logs out
  const resetState = useCallback(() => {
    setAccounts([]);
    setIncomeAccounts([]);
    setExpenseAccounts([]);
    setMotorExpenses([]);
    setAdditionalExpenses([]);
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

  // Map account data with icons
  const mapAccountData = useCallback((account, isIncome = true) => {
    const iconMapping = isIncome ? incomeIconMapping : expenseIconMapping;
    const iconConfig = iconMapping[account.short_name] || {
      icon: isIncome ? 'FaWallet' : 'FaCogs',
      color: "bg-gray-500"
    };
    
    return {
      id: account.id,
      title: account.name,
      short_name: account.short_name,
      category_name: account.category_name,
      description: account.description,
      type_id: account.type_id,
      iconName: iconConfig.icon,
      color: iconConfig.color,
      created_at: account.created_at,
      updated_at: account.updated_at
    };
  }, []);

  // Fetch accounts data with optimizations
  const fetchAccounts = useCallback(async (showToast = false, force = false) => {
    if (!auth.isAuthenticated) return null;
    if (fetched && !force) return accounts;

    try {
      setRefreshing(true);
      setError(null);
      
      const response = await getAccountsApi();
      console.log('Accounts API response:', response.data);
      
      if (response.data && Array.isArray(response.data)) {
        const allAccounts = response.data;
        setAccounts(allAccounts);
        
        // Filter and map income accounts (type_id === 1)
        const incomeData = allAccounts
          .filter(account => account.type_id === 1)
          .map(account => mapAccountData(account, true));
        setIncomeAccounts(incomeData);
        
        // Filter and map expense accounts (type_id === 2)
        const expenseData = allAccounts
          .filter(account => account.type_id === 2)
          .map(account => mapAccountData(account, false));
        setExpenseAccounts(expenseData);
        
        // Separate motor expenses and additional expenses
        const motor = expenseData.filter(expense => 
          expense.category_name === "Motor Expenses"
        );
        const additional = expenseData.filter(expense => 
          expense.category_name !== "Motor Expenses"
        );
        
        setMotorExpenses(motor);
        setAdditionalExpenses(additional);

        setFetched(true);

        if (showToast) {
          toast.success('Accounts data refreshed successfully');
        }
        
        return allAccounts;
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (error) {
      console.error('Error fetching accounts:', error);
      const errorMessage = error.response?.data?.message || 'Failed to fetch accounts data';
      setError(errorMessage);
      
      if (showToast) {
        toast.error('Failed to refresh accounts data');
      }
      throw error;
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [auth.isAuthenticated, fetched, accounts, mapAccountData]);

  // Method to refresh accounts data
  const refreshAccounts = useCallback(async () => {
    if (!auth.isAuthenticated) return null;
    const result = await fetchAccounts(true, true);
    
    if (result) {
      // Trigger API refresh immediately without waiting
      triggerApiRefresh();
    }
    
    return result;
  }, [auth.isAuthenticated, fetchAccounts, triggerApiRefresh]);

  // Get account by ID
  const getAccountById = useCallback((id) => {
    return accounts.find(account => account.id === parseInt(id));
  }, [accounts]);

  // Get accounts by type
  const getAccountsByType = useCallback((typeId) => {
    return accounts.filter(account => account.type_id === parseInt(typeId));
  }, [accounts]);

  // Get accounts by category
  const getAccountsByCategory = useCallback((categoryName) => {
    return accounts.filter(account => 
      account.category_name?.toLowerCase() === categoryName?.toLowerCase()
    );
  }, [accounts]);

  // Check if accounts are loaded
  const isAccountsLoaded = useCallback(() => {
    return fetched && !loading && accounts.length > 0;
  }, [fetched, loading, accounts.length]);

  // Effect to fetch data when user becomes authenticated
  useEffect(() => {
    if (auth.isAuthenticated) {
      if (!fetched) {
        fetchAccounts();
      }
    }
  }, [auth.isAuthenticated, fetched, fetchAccounts]);

  // Effect to reset state when user logs out
  useEffect(() => {
    if (!auth.isAuthenticated && fetched) {
      resetState();
    }
  }, [auth.isAuthenticated, fetched, resetState]);

  const contextValue = {
    // State
    accounts,
    incomeAccounts,
    expenseAccounts,
    motorExpenses,
    additionalExpenses,
    loading,
    refreshing,
    fetched,
    error,
    apiRefreshTrigger,

    // Methods
    fetchAccounts,
    refreshAccounts,
    getAccountById,
    getAccountsByType,
    getAccountsByCategory,
    resetState,
    triggerApiRefresh,
    isAccountsLoaded,

    // Icon mappings (for components that need them)
    incomeIconMapping,
    expenseIconMapping
  };

  return (
    <AccountsContext.Provider value={contextValue}>
      {children}
    </AccountsContext.Provider>
  );
};