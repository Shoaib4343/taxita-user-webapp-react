import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dashboardApi } from "../../services/dashboard";
import { useTradingYear } from "../../context/TradingYearContext";
import toast from 'react-hot-toast';
import {
  FaDollarSign,
  FaCalendarAlt,
  FaArrowDown,
  FaPercentage,
  FaCar,
  FaChartPie,
  FaFileAlt,
  FaFolderOpen,
  FaUpload,
  FaIdCard,
  FaShoppingCart,
  FaRegCalendarCheck,
} from "react-icons/fa";
import { PoundSterlingIcon } from "lucide-react";

const StatCards = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshingFromTradingYear, setRefreshingFromTradingYear] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Get API refresh trigger from trading year context
  const { apiRefreshTrigger, activeTradingYear, activeYearInfo } = useTradingYear();

  const fetchDashboard = async (fromTradingYearChange = false) => {
    try {
      if (fromTradingYearChange) {
        setRefreshingFromTradingYear(true);
      } else {
        setLoading(true);
      }
      setError(null);
      
      const res = await dashboardApi();
      const data = res.data;

      // Get current trading year for display
      const currentYear = activeYearInfo?.tradingYear || '2025-2026';

      // Transform API response into simpler cards
      const cards = [
        {
          icon: PoundSterlingIcon,
          title: "Income",
          value: `£${data.total_income || '0.00'}`,
          description: "All your income",
          color: "bg-green-600",
          path: "/dashboard/income",
        },
        {
          icon: FaCalendarAlt,
          title: "Weekly Income",
          value: `£${data.current_week_income || '0.00'}`,
          description: "Weekly income listings",
          color: "bg-blue-600",
          path: "/dashboard/weekly-income",
        },
        {
          icon: FaArrowDown,
          title: "Expenses",
          value: `£${data.total_expenses || '0.00'}`,
          description: "All your expenses",
          color: "bg-yellow-600",
          path: "/dashboard/expenses",
        },
        {
          icon: FaCalendarAlt,
          title: "Weekly Expenses",
          value: `£${data.current_week_expense || '0.00'}`,
          description: "Weekly expense listings",
          color: "bg-orange-600",
          path: "/dashboard/weekly-expenses",
        },
        {
          icon: FaPercentage,
          title: "Adjustment",
          value: "0%",
          description: "Income percentage adjustment",
          color: "bg-teal-600",
          path: "/dashboard/percentage-adjustment",
        },
        {
          icon: FaCar,
          title: "Vehicles",
          value: data.user_vehicles || '0',
          description: "All your vehicles",
          color: "bg-pink-600",
          path: "/dashboard/vehicles",
        },
        {
          icon: FaChartPie,
          title: "Profit & Loss",
          value: "£0.00",
          description: "Rolling tax estimate to date",
          color: "bg-cyan-600",
          path: "/dashboard/rolling-pl",
        },
        {
          icon: FaFileAlt,
          title: "Self Assessment Returns",
          value: "Pending",
          description: "Estimate of tax to date",
          color: "bg-sky-600",
          path: "/dashboard/self-assessment",
        },
        {
          icon: FaFolderOpen,
          title: "Statements",
          value: "£0.00",
          description: "All your financial statements",
          color: "bg-indigo-600",
          path: "/dashboard/financial-statements",
        },
        {
          icon: FaUpload,
          title: "Documents",
          value: data.user_documents || '0',
          description: "Your uploaded documents",
          color: "bg-orange-600",
          path: "/dashboard/uploaded-documents",
        },
        {
          icon: FaIdCard,
          title: "ID Documents",
          value: data.user_id_documents || '0',
          description: "Money laundering compliance",
          color: "bg-blue-600",
          path: "/dashboard/id-documents",
        },
        {
          icon: FaShoppingCart,
          title: "Buy / Renew Plan",
          value: "From £0/yr",
          description: "Buy or renew your Taxita plan",
          color: "bg-teal-600",
          path: "/dashboard/buy-renew-plan",
        },
        {
          icon: FaRegCalendarCheck,
          title: "Tax Year",
          value: currentYear,
          description: "Finalise this year's tax filing",
          color: "bg-gray-600",
          path: "/dashboard/tax-year",
        },
      ];

      setDashboardData(cards);
      
      // Show success toast only when refreshing from trading year change
      if (fromTradingYearChange) {
        // toast.success('Dashboard data updated for new trading year');
        console.log('Dashboard data updated for new trading year');
      }
      
    } catch (error) {
      console.error("Error fetching dashboard:", error);
      setError("Failed to load dashboard data");
      
      if (fromTradingYearChange) {
        toast.error('Failed to update dashboard data');
      }
    } finally {
      setLoading(false);
      setRefreshingFromTradingYear(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchDashboard();
  }, []);

  // Listen for trading year changing event to show skeleton immediately
  useEffect(() => {
    const handleTradingYearChanging = () => {
      setRefreshingFromTradingYear(true);
    };

    window.addEventListener('tradingYearChanging', handleTradingYearChanging);
    
    return () => {
      window.removeEventListener('tradingYearChanging', handleTradingYearChanging);
    };
  }, []);

  // Listen for trading year changes and refresh dashboard data
  useEffect(() => {
    if (apiRefreshTrigger > 0) {
      console.log('StatCards: Refreshing dashboard data due to trading year change');
      // Small delay to ensure context has updated
      setTimeout(() => {
        fetchDashboard(true);
      }, 200);
    }
  }, [apiRefreshTrigger]);

  // Professional skeleton loading component
  const SkeletonCard = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-4 animate-pulse">
      {/* Icon Skeleton */}
      <div className="w-12 h-12 min-w-[48px] min-h-[48px] rounded-full bg-gray-200"></div>
      
      {/* Content Skeleton */}
      <div className="flex-1">
        <div className="h-3 bg-gray-200 rounded w-24 mb-2"></div>
        <div className="h-6 bg-gray-200 rounded w-16 mb-1"></div>
        <div className="h-2 bg-gray-200 rounded w-32"></div>
      </div>
    </div>
  );

  // Show skeleton during initial loading or when refreshing from trading year change
  if (loading || refreshingFromTradingYear) {
    return (
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 13 }, (_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </main>
    );
  }

  if (error && !dashboardData) {
    return (
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="text-center py-12">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={() => fetchDashboard()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="flex-1 p-6 overflow-y-auto">
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {dashboardData?.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              onClick={() => item.path && navigate(item.path)}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-4 hover:shadow-md hover:cursor-pointer transition-all duration-200 hover:scale-[1.02]"
            >
              {/* Icon */}
              <div
                className={`w-12 h-12 min-w-[48px] min-h-[48px] rounded-full flex items-center justify-center text-white ${item.color}`}
              >
                <Icon className="text-xl" />
              </div>

              {/* Content */}
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  {item.title}
                </h3>
                <p className="text-xl font-bold text-gray-900">{item.value}</p>
                <p className="text-xs text-gray-400">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default StatCards;