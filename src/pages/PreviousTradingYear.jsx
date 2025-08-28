import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { 
  FiCalendar, 
  FiChevronDown, 
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiRefreshCw,
  FiExternalLink
} from 'react-icons/fi';
import { previousTradingYearApi } from '../services/dashboard';

const TradingYearsNotification = () => {
  const [tradingYears, setTradingYears] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await previousTradingYearApi();
      
      if (res.data.success && res.data.data) {
        setTradingYears(res.data.data);
      }
    } catch (error) {
      console.error('Error fetching trading years:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  // Close dropdown when clicking outside
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
      case 'Active':
        return {
          color: 'bg-green-500 text-white',
          icon: FiCheckCircle,
          iconColor: 'text-green-600',
          label: 'Active'
        };
      case 'Not Registered':
        return {
          color: 'bg-red-500 text-white',
          icon: FiXCircle,
          iconColor: 'text-red-600',
          label: 'Not Registered'
        };
      default:
        return {
          color: 'bg-gray-500 text-white',
          icon: FiClock,
          iconColor: 'text-gray-600',
          label: 'Unknown'
        };
    }
  };

  const handleYearClick = (year) => {
    if (year.status === 'Active') {
      // Show confirmation toast for changing year
      toast((t) => (
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <FiCalendar className="text-blue-600" size={16} />
            <span className="font-medium text-gray-900">Change Trading Year</span>
          </div>
          <p className="text-sm text-gray-600">
            Are you sure you want to change to <strong>{year.trading_year}</strong>?
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => {
                toast.dismiss(t.id);
                navigate(`/dashboard/change-year/${year.trading_year}`);
                toast.success(`Switched to ${year.trading_year}`);
              }}
              className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
            >
              Yes, Change
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1.5 bg-gray-200 text-gray-700 text-sm rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      ), {
        duration: 0, // Keep open until user decides
        style: {
          maxWidth: '400px',
        },
      });
    } else {
      // Navigate to view year page in current tab using React Router
      navigate(`/dashboard/view-year/${year.trading_year}`);
      toast.success(`Viewing ${year.trading_year} data`);
    }
    setIsOpen(false);
  };

  const activeCount = tradingYears.filter(year => year.status === 'Active').length;
  const totalCount = tradingYears.length;

  if (loading) {
    return (
      <div className="relative" ref={dropdownRef}>
        {/* Loading State - Matching the actual design */}
        <button
          disabled
          className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg transition-all duration-200 animate-pulse cursor-not-allowed"
        >
          <div className="w-4 h-4 bg-gray-300 rounded animate-pulse"></div>
          
          <div className="w-20 h-4 bg-gray-300 rounded animate-pulse"></div>

          <div className="w-3.5 h-3.5 bg-gray-300 rounded animate-pulse"></div>
          
          <div className="w-5 h-5 bg-gray-300 rounded-full animate-pulse"></div>
        </button>
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Dropdown Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-2 bg-white border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:bg-gray-50 ${
          isOpen ? 'border-blue-300 bg-blue-50' : 'border-gray-200'
        }`}
      >
        <FiCalendar size={16} className={`transition-colors ${
          isOpen ? 'text-blue-600' : 'text-gray-600'
        }`} />
        
        <span className="text-sm font-medium text-gray-700 text-nowrap">
          Trading Years
        </span>

        <FiChevronDown 
          size={14} 
          className={`text-gray-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />

        {/* Notification Badge */}
        {totalCount > 0 && (
          <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-green-500 rounded-full">
            {totalCount}
          </span>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Mobile Backdrop */}
          <div 
            className="fixed inset-0 z-10 bg-black bg-opacity-10 backdrop-blur-sm md:hidden" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown Content */}
          <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-20 overflow-hidden">
            {/* Header */}
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-900">
                  You have {totalCount} Trading Year{totalCount !== 1 ? 's' : ''}
                </h3>
                <button
                  onClick={handleRefresh}
                  disabled={refreshing}
                  className="p-1.5 rounded-lg hover:bg-white transition-colors disabled:opacity-50"
                  title="Refresh"
                >
                  <FiRefreshCw size={14} className={`text-gray-600 ${refreshing ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>

            {/* Years List */}
            <div className="max-h-64 overflow-y-auto">
              {tradingYears.length === 0 ? (
                <div className="p-4 text-center">
                  <FiCalendar size={24} className="text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">No trading years found</p>
                </div>
              ) : (
                tradingYears.map((year, index) => {
                  const statusConfig = getStatusConfig(year.status);
                  const StatusIcon = statusConfig.icon;
                  
                  return (
                    <button
                      key={index}
                      onClick={() => handleYearClick(year)}
                      className="w-full p-4 text-left hover:bg-gray-50 transition-colors duration-150 focus:outline-none focus:bg-blue-50 border-b border-gray-100 last:border-b-0 group"
                    >
                      <div className="flex items-start gap-3">
                        {/* Calendar Icon */}
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                            <FiCalendar size={16} className="text-blue-600" />
                          </div>
                        </div>
                        
                        {/* Year Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-sm font-semibold text-gray-900 group-hover:text-blue-900 transition-colors">
                              {year.trading_year}
                            </h4>
                            {year.status !== 'Active' && (
                              <FiExternalLink size={12} className="text-gray-400 group-hover:text-blue-600 transition-colors" />
                            )}
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${statusConfig.color}`}>
                              {statusConfig.label}
                            </span>
                            
                            {year.planPurchased === 'Yes' && (
                              <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                                Plan Purchased
                              </span>
                            )}
                          </div>
                          
                          {/* Action Hint */}
                          <p className="text-xs text-gray-500 mt-1">
                            {year.status === 'Active' 
                              ? 'Click to change current year' 
                              : 'Click to view year data'
                            }
                          </p>
                        </div>
                        
                        {/* Status Icon */}
                        <div className="flex-shrink-0 mt-1">
                          <StatusIcon size={16} className={`${statusConfig.iconColor} group-hover:scale-110 transition-transform`} />
                        </div>
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer Stats */}
            {tradingYears.length > 0 && (
              <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <span>
                    {activeCount} active • {tradingYears.length - activeCount} closed
                  </span>
                  <span className="flex items-center gap-1">
                    <FiClock size={10} />
                    Last updated: now
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

export default TradingYearsNotification;