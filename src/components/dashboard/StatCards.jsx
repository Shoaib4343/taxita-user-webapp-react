// src/pages/StatCards.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dashboardApi } from "../../services/dashboard";
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

const StatCards = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const navigate = useNavigate();

  

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await dashboardApi();
        const data = res.data;

        // ✅ Transform API response into simpler cards
        const cards = [

          {
            icon: FaDollarSign,
            title: "Income",
            value: `£${data.total_income}`,  // api data
            description: "All your income",
            color: "bg-green-600",
            path: "/dashboard/income",
          },
          {
            icon: FaCalendarAlt,
            title: "Weekly Income",
            value: `£${data.current_week_income}`,
            description: "Weekly income listings",
            color: "bg-blue-600",
            path: "/dashboard/weekly-income",
          },
          {
            icon: FaArrowDown,
            title: "Expenses",
            value: `£${data.total_expenses}`,
            description: "All your expenses",
            color: "bg-yellow-600",

            path: "/dashboard/expenses",
          },
          {
            icon: FaCalendarAlt,
            title: "Weekly Expenses",
            value:`£${data.current_week_expense}`,
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
            value: data.user_vehicles,   // api data
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
            value:data.user_documents,   // api data
            description: "Your uploaded documents",
            color: "bg-orange-600",
            path: "/dashboard/uploaded-documents",
          },
          {
            icon: FaIdCard,
            title: "ID Verification",
            value: data.user_id_documents,
            description: "Money laundering documents",
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
            value: "2025/2026",
            description: "Finalise this year’s tax filing",
            color: "bg-gray-600",
            path: "/dashboard/tax-year",
          },
        ];

        setDashboardData(cards);
      } catch (error) {
        console.error("Error fetching dashboard:", error);
      }
    };

    fetchDashboard();
  }, []);

  if (!dashboardData) {
    return <p className="text-center text-gray-500">Loading dashboard...</p>;
  }

  return (
    <main className="flex-1 p-6 overflow-y-auto">
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {dashboardData.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              onClick={() => item.path && navigate(item.path)}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-4 hover:shadow-md hover:cursor-pointer transition"
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
