import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { 
  FiCalendar, 
  FiChevronDown, 
  FiRefreshCw,
  FiExternalLink,
  FiCheck,
  FiClock,
  FiLock
} from 'react-icons/fi';
import { registerTradingYearApi, activateTradingYearApi } from '../services/dashboard';
import { useTradingYear } from '../context/TradingYearContext';

const PreviousTradingYears = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [registering, setRegistering] = useState(null);
  const [activating, setActivating] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const {
    tradingYears,
    loading,
    refreshing,
    refreshTradingYears,
    updateActiveTradingYear,
    activeTradingYear
  } = useTradingYear();

  const registerTradingYear = async (yearData) => {
    try {
      setRegistering(yearData.trading_year);
      
      const registrationData = {
        tradingYear: yearData.trading_year,
        close: 0
      };

      const response = await registerTradingYearApi(registrationData);
      
      if (response.data.success) {
        toast.success(`Successfully registered trading year ${yearData.trading_year}`);
        await updateActiveTradingYear();
        navigate('/dashboard');
      } else {
        toast.error(response.data.message || 'Failed to register trading year');
      }
    } catch (error) {
      console.error('Error registering trading year:', error);
      toast.error('Failed to register trading year. Please try again.');
    } finally {
      setRegistering(null);
    }
  };

  const activateTradingYear = async (yearData) => {
    try {
      setActivating(yearData.trading_year);
      
      // Dispatch event to trigger skeleton loading immediately
      window.dispatchEvent(new CustomEvent('tradingYearChanging'));
      
      const response = await activateTradingYearApi({
        tradingYear: yearData.trading_year
      });
      
      if (response.data.success) {
        const newActiveYearData = {
          ...yearData,
          active_trading_year: 1
        };
        
        // Update context first, then show success message
        await updateActiveTradingYear(newActiveYearData);
        
        // Show success toast after update is complete
        setTimeout(() => {
          toast.success(`Successfully activated trading year ${yearData.trading_year}`);
        }, 100);
        
      } else {
        toast.error(response.data.message || 'Failed to activate trading year');
      }
    } catch (error) {
      console.error('Error activating trading year:', error);
      
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error.response?.status === 500) {
        toast.error('Server error occurred. Please try again later.');
      } else {
        toast.error('Failed to activate trading year. Please try again.');
      }
    } finally {
      setActivating(null);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getStatusConfig = (status) => {
    switch (status) {
      case 'Current Trading Year':
        return {
          color: 'bg-green-500 text-white',
          icon: FiCheck,
          label: 'Current Trading Year'
        };
      case 'Active':
        return {
          color: 'bg-green-500 text-white',
          icon: FiCheck,
          label: 'Active'
        };
      case 'Finalised':
        return {
          color: 'bg-blue-500 text-white',
          icon: FiLock,
          label: 'Finalised'
        };
      case 'Not Registered':
        return {
          color: 'bg-red-500 text-white',
          icon: FiClock,
          label: 'Not Registered'
        };
      case 'Closed':
      case 'Year Closed':
        return {
          color: 'bg-blue-500 text-white',
          icon: FiLock,
          label: status
        };
      case 'Not Finalised':
        return {
          color: 'bg-yellow-500 text-white',
          icon: FiClock,
          label: 'Not Finalised'
        };
      default:
        return {
          color: 'bg-gray-500 text-white',
          icon: FiClock,
          label: 'Unknown'
        };
    }
  };

  const handleYearClick = async (year) => {
    // Don't allow clicks on disabled years or years being processed
    if (year.status === 'Closed' || year.status === 'Finalised' || registering === year.trading_year || activating === year.trading_year) {
      if (year.status === 'Finalised') {
        toast.info(`${year.trading_year} is finalised and cannot be modified`);
      }
      return;
    }

    // Don't show popup for active years
    if (year.status === 'Active' || year.status === 'Current Trading Year') {
      toast.info(`${year.trading_year} is already your active trading year`);
      return;
    }

    // Only show confirmation popup for "Not Registered" years
    if (year.status === 'Not Registered') {
      const result = await Swal.fire({
        title: 'Register Trading Year',
        html: `Do you want to register the trading year <strong>${year.trading_year}</strong>?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3B82F6',
        cancelButtonColor: '#6B7280',
        confirmButtonText: 'Yes, Register',
        cancelButtonText: 'Cancel',
        focusConfirm: false
      });

      if (result.isConfirmed) {
        await registerTradingYear(year);
      }
    } else {
      // For all other statuses (Not Finalised, etc.), activate directly without popup
      await activateTradingYear(year);
    }
    
    setIsOpen(false);
  };

  // Get current active trading year for display
  const currentYear = tradingYears.find(year => year.status === 'Active' || year.status === 'Current Trading Year');
  const displayYear = currentYear?.trading_year || new Date().getFullYear();

  const activeCount = tradingYears.filter(year => year.status === 'Active').length;
  const finalisedCount = tradingYears.filter(year => year.status === 'Finalised').length;
  const closedCount = tradingYears.filter(year => year.status === 'Closed' || year.status === 'Year Closed').length;
  const notRegisteredCount = tradingYears.filter(year => year.status === 'Not Registered').length;
  const totalCount = tradingYears.length;

  // Loading Skeleton
  if (loading) {
    return (
      <div className="relative">
        <div className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg animate-pulse">
          <div className="w-4 h-4 bg-gray-200 rounded"></div>
          <div className="w-16 h-4 bg-gray-200 rounded"></div>
          <div className="w-3 h-3 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Dropdown Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-2 bg-white border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 hover:bg-gray-50 min-w-0 ${
          isOpen ? 'border-blue-300 bg-blue-50 shadow-sm' : 'border-gray-200'
        }`}
      >
        <FiCalendar 
          size={16} 
          className={`flex-shrink-0 transition-colors ${
            isOpen ? 'text-blue-600' : 'text-gray-500'
          }`} 
        />
        
        <span className="text-sm font-medium text-gray-700 truncate">
          {displayYear}
        </span>

        <FiChevronDown 
          size={14} 
          className={`flex-shrink-0 text-gray-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />

        {/* Status Indicator */}
        {totalCount > 0 && (
          <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
            activeCount > 0 ? 'bg-emerald-500' : 'bg-orange-500'
          }`} />
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Mobile Backdrop */}
          <div 
            className="fixed inset-0 z-10 bg-black/10 backdrop-blur-sm lg:hidden" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown Content */}
          <div className="absolute right-0 mt-2 w-84 bg-white border border-gray-200 rounded-xl shadow-lg z-20 overflow-hidden animate-in slide-in-from-top-2 duration-200">
            {/* Header */}
            <div className="px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">
                    Trading Years
                  </h3>
                  <p className="text-xs text-gray-600">
                    {totalCount} year{totalCount !== 1 ? 's' : ''} available
                  </p>
                </div>
                <button
                  onClick={refreshTradingYears}
                  disabled={refreshing}
                  className="p-1.5 rounded-lg hover:bg-white/70 transition-colors disabled:opacity-50"
                  title="Refresh"
                >
                  <FiRefreshCw 
                    size={14} 
                    className={`text-gray-600 ${refreshing ? 'animate-spin' : ''}`} 
                  />
                </button>
              </div>
            </div>

            {/* Years List */}
            <div className="max-h-64 overflow-y-auto">
              {tradingYears.length === 0 ? (
                <div className="p-6 text-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FiCalendar size={20} className="text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-500 font-medium">No trading years found</p>
                  <p className="text-xs text-gray-400 mt-1">Contact support to set up your trading years</p>
                </div>
              ) : (
                tradingYears.map((year, index) => {
                  const statusConfig = getStatusConfig(year.status);
                  const StatusIcon = statusConfig.icon;
                  const isDisabled = year.status === 'Closed' || year.status === 'Finalised';
                  const isRegistering = registering === year.trading_year;
                  const isActivating = activating === year.trading_year;
                  const isProcessing = isRegistering || isActivating;
                  const isActive = year.status === 'Active' || year.status === 'Current Trading Year';
                  
                  return (
                    <button
                      key={index}
                      onClick={() => handleYearClick(year)}
                      disabled={isDisabled || isProcessing}
                      className={`w-full p-4 text-left transition-all duration-150 focus:outline-none border-b border-gray-50 last:border-b-0 group ${
                        isDisabled 
                          ? 'cursor-not-allowed opacity-75' 
                          : isProcessing
                          ? 'cursor-wait bg-blue-50/50'
                          : isActive
                          ? 'bg-emerald-50/50'
                          : 'hover:bg-gray-50 focus:bg-blue-50/50 cursor-pointer'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {/* Year Icon */}
                        <div className="flex-shrink-0">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                            isDisabled 
                              ? 'bg-gray-100' 
                              : isProcessing
                              ? 'bg-blue-100'
                              : isActive
                              ? 'bg-emerald-100'
                              : 'bg-blue-50 group-hover:bg-blue-100'
                          }`}>
                            {isProcessing ? (
                              <FiRefreshCw size={18} className="text-blue-600 animate-spin" />
                            ) : (
                              <StatusIcon size={18} className={`${
                                isDisabled 
                                  ? 'text-gray-500' 
                                  : isActive
                                  ? 'text-emerald-600'
                                  : 'text-blue-600'
                              }`} />
                            )}
                          </div>
                        </div>
                        
                        {/* Year Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className={`text-sm font-semibold transition-colors ${
                              isDisabled 
                                ? 'text-gray-600' 
                                : isActive
                                ? 'text-emerald-900'
                                : 'text-gray-900'
                            }`}>
                              {year.trading_year}
                              {isActive && (
                                <span className="ml-2 text-xs font-normal text-emerald-600">
                                  (Current)
                                </span>
                              )}
                            </h4>
                            {!isActive && !isDisabled && !isProcessing && (
                              <FiExternalLink size={12} className="text-gray-400 group-hover:text-blue-600 transition-colors opacity-0 group-hover:opacity-100" />
                            )}
                          </div>
                          
                          <div className="flex items-center gap-2 flex-wrap mb-2">
                            <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${statusConfig.color} ${
                              isDisabled ? 'opacity-95' : ''
                            }`}>
                              {statusConfig.label}
                            </span>
                            
                            {year.planPurchased === 'Yes' && (
                              <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800 ${
                                isDisabled ? 'opacity-95' : ''
                              }`}>
                                Plan Purchased
                              </span>
                            )}

                            {year.planPurchased === 'No' && (
                              <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700 ${
                                isDisabled ? 'opacity-95' : ''
                              }`}>
                               Plan Not Purchased
                              </span>
                            )}
                          </div>
                          
                          {/* Status Message */}
                          <p className="text-xs text-gray-500">
                            {isRegistering
                              ? 'Registering trading year...'
                              : isActivating
                              ? 'Activating trading year...'
                              : isActive
                              ? 'This is your active trading year'
                              : year.status === 'Not Registered'
                              ? 'Click to register this year'
                              : year.status === 'Closed'
                              ? 'Trading year is closed'
                              : year.status === 'Finalised'
                              ? 'Year is finalised'
                              : 'Click to activate this year'
                            }
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer */}
            {tradingYears.length > 0 && (
              <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>
                    {activeCount} active • {finalisedCount} finalised • {closedCount} closed • {notRegisteredCount} not registered
                  </span>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default PreviousTradingYears;