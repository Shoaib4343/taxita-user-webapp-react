import React, { useState } from "react";
import { Download, FileText, TrendingUp, Calculator, ArrowDown, PieChart, Home, ChevronRight } from "lucide-react";
import { 
  FaGasPump, 
  FaOilCan, 
  FaCar, 
  FaShieldAlt, 
  FaTools, 
  FaDotCircle, 
  FaCarSide, 
  FaMoneyCheckAlt, 
  FaCogs,
  FaPhoneAlt,
  FaIdBadge,
  FaWrench,
  FaBalanceScale,
  FaSoap,
  FaUserTie,
  FaHome,
  FaBox,
  FaParking
} from "react-icons/fa";

// PageHeader Component
const PageHeader = ({
  icon,
  title,
  subtitle,
  description,
  currentPage,
  breadcrumbItems = [],
  showTradingYear = true,
  activeTradingYear = null,
  infoCard = null,
}) => {
  return (
    <div className="mb-8">
      <div className="">
        <div className="flex items-center justify-between mb-4">
          {/* Left side - Icon, Title, and Subtitle/Trading Year */}
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 rounded-xl">
              {React.cloneElement(icon, { className: "w-8 h-8 text-blue-600" })}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
              {showTradingYear && (
                <p className="text-gray-600 text-lg">
                  {subtitle || "Tax Year"}{" "}
                  <span className="font-semibold text-blue-600">
                    {activeTradingYear
                      ? activeTradingYear.trading_year
                      : "2025 / 2026"}
                  </span>
                </p>
              )}
              {!showTradingYear && subtitle && (
                <p className="text-gray-600 text-lg">{subtitle}</p>
              )}
            </div>
          </div>
          
          {/* Right side - Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <a
              href="/dashboard"
              className="flex items-center gap-1 hover:text-blue-600 transition-colors"
            >
              <Home className="w-4 h-4" />
              Dashboard
            </a>
            
            {/* Additional breadcrumb items */}
            {breadcrumbItems.map((item, index) => (
              <React.Fragment key={index}>
                <ChevronRight className="w-4 h-4" />
                {item.link ? (
                  <a
                    href={item.link}
                    className="hover:text-blue-600 transition-colors"
                  >
                    {item.label}
                  </a>
                ) : (
                  <span>{item.label}</span>
                )}
              </React.Fragment>
            ))}
            
            {/* Current page */}
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-700 font-medium">{currentPage}</span>
          </nav>
        </div>

        {/* Simple Description */}
        {description && (
          <div className="mb-4">
            <p className="text-gray-600 leading-relaxed">{description}</p>
          </div>
        )}

        {/* Optional Info Card - separate prop */}
        {infoCard && (
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
            <p className="text-blue-800 leading-relaxed">{infoCard}</p>
          </div>
        )}
      </div>
    </div>
  );
};

const RollingPLPage = () => {
  // State for editable amounts (for future functionality)
  const [motorExpenses] = useState([
    { label: "Fuel", amount: "0.00", icon: <FaGasPump className="w-4 h-4" /> },
    { label: "Oil", amount: "0.00", icon: <FaOilCan className="w-4 h-4" /> },
    { label: "Car tax", amount: "0.00", icon: <FaCar className="w-4 h-4" /> },
    { label: "Insurance", amount: "0.00", icon: <FaShieldAlt className="w-4 h-4" /> },
    { label: "Servicing/repairs", amount: "0.00", icon: <FaTools className="w-4 h-4" /> },
    { label: "Tyres", amount: "0.00", icon: <FaDotCircle className="w-4 h-4" /> },
    { label: "Depreciation Expense", amount: "0.00", icon: <FaCar className="w-4 h-4" /> },
    { label: "Vehicle rental/lease", amount: "0.00", icon: <FaCarSide className="w-4 h-4" /> },
    { label: "Vehicle loan interest", amount: "0.00", icon: <FaMoneyCheckAlt className="w-4 h-4" /> },
    { label: "Other motor expenses", amount: "0.00", icon: <FaCogs className="w-4 h-4" /> },
  ]);

  const [additionalExpenses] = useState([
    { label: "Radio Rent / Commission fee / Subscription fee", amount: "0.00", icon: <FaDotCircle className="w-4 h-4" /> },
    { label: "Deductions % (Cash 3%, Card/Bank 2%, Account/Contract 1%, Sub Contract 3%)", amount: "0.00", icon: <Calculator className="w-4 h-4" /> },
    { label: "Mobile/telephone costs", amount: "0.00", icon: <FaPhoneAlt className="w-4 h-4" /> },
    { label: "Driver/licences/badge/medical", amount: "0.00", icon: <FaIdBadge className="w-4 h-4" /> },
    { label: "Repairs/renewals to equipment", amount: "0.00", icon: <FaWrench className="w-4 h-4" /> },
    { label: "Legal and accountancy costs", amount: "0.00", icon: <FaBalanceScale className="w-4 h-4" /> },
    { label: "Car cleaning/valeting", amount: "0.00", icon: <FaSoap className="w-4 h-4" /> },
    { label: "Wages to employee", amount: "0.00", icon: <FaUserTie className="w-4 h-4" /> },
    { label: "Use of home as office", amount: "0.00", icon: <FaHome className="w-4 h-4" /> },
    { label: "Misc/sundry expenses", amount: "0.00", icon: <FaBox className="w-4 h-4" /> },
    { label: "Parking/Toll charges", amount: "0.00", icon: <FaParking className="w-4 h-4" /> },
  ]);

  const calculateSubtotal = (expenses) => {
    return expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0).toFixed(2);
  };

  const motorSubtotal = calculateSubtotal(motorExpenses);
  const additionalSubtotal = calculateSubtotal(additionalExpenses);
  const totalExpenses = (parseFloat(motorSubtotal) + parseFloat(additionalSubtotal)).toFixed(2);

  const profitLossData = [
    { label: "Total Expenses", amount: totalExpenses },
    { label: "Net Profit / (Loss)", amount: (0 - parseFloat(totalExpenses)).toFixed(2) },
    { label: "Add private use adjustment car (4%)", amount: (parseFloat(motorSubtotal) * 0.04).toFixed(2) },
    { label: "Add private use adjustment telephone (3%)", amount: "0.00" },
  ];

  const adjustedNetProfit = (
    parseFloat(profitLossData[1].amount) + 
    parseFloat(profitLossData[2].amount) + 
    parseFloat(profitLossData[3].amount)
  ).toFixed(2);

  const renderExpenseTable = (title, expenses, showSubtotal = true, icon) => (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8">
      <div className="bg-blue-50 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/80 rounded-lg">
            {icon}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-blue-900">{title}</h2>
            <p className="text-blue-700 text-sm mt-1">Detailed breakdown of {title.toLowerCase()}</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-2">
          {expenses.map((expense, idx) => (
            <div
              key={idx}
              className={`grid grid-cols-12 gap-4 items-center p-4 rounded-lg transition-all duration-200 hover:bg-gray-50 ${
                idx % 2 === 0 ? "bg-gray-25" : "bg-white"
              }`}
            >
              <div className="col-span-1 flex justify-center">
                <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                  {expense.icon}
                </div>
              </div>
              <div className="col-span-8 font-medium text-gray-700">
                {expense.label}
              </div>
              <div className="col-span-3 text-right">
                <span className="text-lg font-semibold text-gray-900">
                  £{expense.amount}
                </span>
              </div>
            </div>
          ))}
          
          {showSubtotal && (
            <div className="grid grid-cols-12 gap-4 items-center p-4 rounded-lg bg-blue-50 border-t-2 border-blue-200 mt-4">
              <div className="col-span-1 flex justify-center">
                <div className="p-2 bg-blue-600 rounded-lg text-white">
                  <Calculator className="w-4 h-4" />
                </div>
              </div>
              <div className="col-span-8 font-bold text-blue-900">
                Subtotal for {title}
              </div>
              <div className="col-span-3 text-right">
                <span className="text-xl font-bold text-blue-900">
                  £{title === "Motor Expenses" ? motorSubtotal : additionalSubtotal}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white rounded-2xl">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Header using the reusable component */}
        <PageHeader
          icon={<TrendingUp />}
          title="Rolling Profit & Loss"
          subtitle="Financial overview for"
          currentPage="Rolling Profit & Loss"
         
          infoCard="All amounts are calculated automatically based on your recorded transactions and include private use adjustments where applicable."
        />

        {/* Income Summary Card */}
        <div className="mb-8 bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="bg-green-50 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/80 rounded-lg">
                  <PieChart className="w-6 h-6 text-green-700" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-green-900">Income Summary</h2>
                  <p className="text-green-700 text-sm mt-1">Total income for the current period</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-200 shadow-md hover:shadow-lg">
                  <Download className="w-4 h-4" />
                  Download PDF
                </button>
                <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-200 shadow-md hover:shadow-lg">
                  <FileText className="w-4 h-4" />
                  Export PDF
                </button>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="bg-green-600 text-white rounded-xl p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <TrendingUp className="w-5 h-5" />
                <p className="text-green-100 text-xs uppercase tracking-wide">Total Income</p>
              </div>
              <p className="text-2xl font-bold">£0.00</p>
              <p className="text-green-200 text-xs mt-1">Rolling P&L for 2025 / 2026</p>
            </div>
          </div>
        </div>

        {/* Expense Tables */}
        {renderExpenseTable("Motor Expenses", motorExpenses, true, <FaCar className="w-6 h-6 text-blue-700" />)}
        {renderExpenseTable("Additional Expenses", additionalExpenses, true, <FaBox className="w-6 h-6 text-purple-700" />)}

        {/* Profit/Loss Summary */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8">
          <div className="bg-purple-50 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/80 rounded-lg">
                <Calculator className="w-6 h-6 text-purple-700" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-purple-900">Profit / (Loss) Summary</h2>
                <p className="text-purple-700 text-sm mt-1">Final calculations and adjustments</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="space-y-2">
              {profitLossData.map((item, idx) => (
                <div
                  key={idx}
                  className={`grid grid-cols-12 gap-4 items-center p-4 rounded-lg transition-all duration-200 ${
                    idx % 2 === 0 ? "bg-gray-25" : "bg-white"
                  }`}
                >
                  <div className="col-span-1 flex justify-center">
                    <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                      <Calculator className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="col-span-8 font-medium text-gray-700">
                    {item.label}
                  </div>
                  <div className="col-span-3 text-right">
                    <span className={`text-lg font-semibold ${
                      parseFloat(item.amount) < 0 ? "text-red-600" : "text-gray-900"
                    }`}>
                      £{item.amount}
                    </span>
                  </div>
                </div>
              ))}
              
              <div className="grid grid-cols-12 gap-4 items-center p-4 rounded-lg bg-purple-50 border-t-2 border-purple-200 mt-4">
                <div className="col-span-1 flex justify-center">
                  <div className="p-2 bg-purple-600 rounded-lg text-white">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                </div>
                <div className="col-span-8 font-bold text-purple-900">
                  Adjusted Net Profit / (Loss)
                </div>
                <div className="col-span-3 text-right">
                  <span className={`text-2xl font-bold ${
                    parseFloat(adjustedNetProfit) < 0 ? "text-red-600" : "text-green-600"
                  }`}>
                    £{adjustedNetProfit}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RollingPLPage;


