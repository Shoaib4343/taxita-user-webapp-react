// import React, { useState } from "react";
// import { Download, FileText, TrendingUp, Calculator, ArrowDown, PieChart, Home, ChevronRight } from "lucide-react";
// import { 
//   FaGasPump, 
//   FaOilCan, 
//   FaCar, 
//   FaShieldAlt, 
//   FaTools, 
//   FaDotCircle, 
//   FaCarSide, 
//   FaMoneyCheckAlt, 
//   FaCogs,
//   FaPhoneAlt,
//   FaIdBadge,
//   FaWrench,
//   FaBalanceScale,
//   FaSoap,
//   FaUserTie,
//   FaHome,
//   FaBox,
//   FaParking
// } from "react-icons/fa";

// // PageHeader Component
// const PageHeader = ({
//   icon,
//   title,
//   subtitle,
//   description,
//   currentPage,
//   breadcrumbItems = [],
//   showTradingYear = true,
//   activeTradingYear = null,
//   infoCard = null,
// }) => {
//   return (
//     <div className="mb-8">
//       <div className="">
//         <div className="flex items-center justify-between mb-4">
//           {/* Left side - Icon, Title, and Subtitle/Trading Year */}
//           <div className="flex items-center gap-4">
//             <div className="p-3 bg-blue-50 rounded-xl">
//               {React.cloneElement(icon, { className: "w-8 h-8 text-blue-600" })}
//             </div>
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
//               {showTradingYear && (
//                 <p className="text-gray-600 text-lg">
//                   {subtitle || "Tax Year"}{" "}
//                   <span className="font-semibold text-blue-600">
//                     {activeTradingYear
//                       ? activeTradingYear.trading_year
//                       : "2025 / 2026"}
//                   </span>
//                 </p>
//               )}
//               {!showTradingYear && subtitle && (
//                 <p className="text-gray-600 text-lg">{subtitle}</p>
//               )}
//             </div>
//           </div>
          
//           {/* Right side - Breadcrumb Navigation */}
//           <nav className="flex items-center gap-2 text-sm text-gray-500">
//             <a
//               href="/dashboard"
//               className="flex items-center gap-1 hover:text-blue-600 transition-colors"
//             >
//               <Home className="w-4 h-4" />
//               Dashboard
//             </a>
            
//             {/* Additional breadcrumb items */}
//             {breadcrumbItems.map((item, index) => (
//               <React.Fragment key={index}>
//                 <ChevronRight className="w-4 h-4" />
//                 {item.link ? (
//                   <a
//                     href={item.link}
//                     className="hover:text-blue-600 transition-colors"
//                   >
//                     {item.label}
//                   </a>
//                 ) : (
//                   <span>{item.label}</span>
//                 )}
//               </React.Fragment>
//             ))}
            
//             {/* Current page */}
//             <ChevronRight className="w-4 h-4" />
//             <span className="text-gray-700 font-medium">{currentPage}</span>
//           </nav>
//         </div>

//         {/* Simple Description */}
//         {description && (
//           <div className="mb-4">
//             <p className="text-gray-600 leading-relaxed">{description}</p>
//           </div>
//         )}

//         {/* Optional Info Card - separate prop */}
//         {infoCard && (
//           <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
//             <p className="text-blue-800 leading-relaxed">{infoCard}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// const RollingPLPage = () => {
//   // State for editable amounts (for future functionality)
//   const [motorExpenses] = useState([
//     { label: "Fuel", amount: "0.00", icon: <FaGasPump className="w-4 h-4" /> },
//     { label: "Oil", amount: "0.00", icon: <FaOilCan className="w-4 h-4" /> },
//     { label: "Car tax", amount: "0.00", icon: <FaCar className="w-4 h-4" /> },
//     { label: "Insurance", amount: "0.00", icon: <FaShieldAlt className="w-4 h-4" /> },
//     { label: "Servicing/repairs", amount: "0.00", icon: <FaTools className="w-4 h-4" /> },
//     { label: "Tyres", amount: "0.00", icon: <FaDotCircle className="w-4 h-4" /> },
//     { label: "Depreciation Expense", amount: "0.00", icon: <FaCar className="w-4 h-4" /> },
//     { label: "Vehicle rental/lease", amount: "0.00", icon: <FaCarSide className="w-4 h-4" /> },
//     { label: "Vehicle loan interest", amount: "0.00", icon: <FaMoneyCheckAlt className="w-4 h-4" /> },
//     { label: "Other motor expenses", amount: "0.00", icon: <FaCogs className="w-4 h-4" /> },
//   ]);

//   const [additionalExpenses] = useState([
//     { label: "Radio Rent / Commission fee / Subscription fee", amount: "0.00", icon: <FaDotCircle className="w-4 h-4" /> },
//     { label: "Deductions % (Cash 3%, Card/Bank 2%, Account/Contract 1%, Sub Contract 3%)", amount: "0.00", icon: <Calculator className="w-4 h-4" /> },
//     { label: "Mobile/telephone costs", amount: "0.00", icon: <FaPhoneAlt className="w-4 h-4" /> },
//     { label: "Driver/licences/badge/medical", amount: "0.00", icon: <FaIdBadge className="w-4 h-4" /> },
//     { label: "Repairs/renewals to equipment", amount: "0.00", icon: <FaWrench className="w-4 h-4" /> },
//     { label: "Legal and accountancy costs", amount: "0.00", icon: <FaBalanceScale className="w-4 h-4" /> },
//     { label: "Car cleaning/valeting", amount: "0.00", icon: <FaSoap className="w-4 h-4" /> },
//     { label: "Wages to employee", amount: "0.00", icon: <FaUserTie className="w-4 h-4" /> },
//     { label: "Use of home as office", amount: "0.00", icon: <FaHome className="w-4 h-4" /> },
//     { label: "Misc/sundry expenses", amount: "0.00", icon: <FaBox className="w-4 h-4" /> },
//     { label: "Parking/Toll charges", amount: "0.00", icon: <FaParking className="w-4 h-4" /> },
//   ]);

//   const calculateSubtotal = (expenses) => {
//     return expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0).toFixed(2);
//   };

//   const motorSubtotal = calculateSubtotal(motorExpenses);
//   const additionalSubtotal = calculateSubtotal(additionalExpenses);
//   const totalExpenses = (parseFloat(motorSubtotal) + parseFloat(additionalSubtotal)).toFixed(2);

//   const profitLossData = [
//     { label: "Total Expenses", amount: totalExpenses },
//     { label: "Net Profit / (Loss)", amount: (0 - parseFloat(totalExpenses)).toFixed(2) },
//     { label: "Add private use adjustment car (4%)", amount: (parseFloat(motorSubtotal) * 0.04).toFixed(2) },
//     { label: "Add private use adjustment telephone (3%)", amount: "0.00" },
//   ];

//   const adjustedNetProfit = (
//     parseFloat(profitLossData[1].amount) + 
//     parseFloat(profitLossData[2].amount) + 
//     parseFloat(profitLossData[3].amount)
//   ).toFixed(2);

//   const renderExpenseTable = (title, expenses, showSubtotal = true, icon) => (
//     <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8">
//       <div className="bg-blue-50 px-6 py-4">
//         <div className="flex items-center gap-3">
//           <div className="p-2 bg-white/80 rounded-lg">
//             {icon}
//           </div>
//           <div>
//             <h2 className="text-xl font-semibold text-blue-900">{title}</h2>
//             <p className="text-blue-700 text-sm mt-1">Detailed breakdown of {title.toLowerCase()}</p>
//           </div>
//         </div>
//       </div>

//       <div className="p-6">
//         <div className="space-y-2">
//           {expenses.map((expense, idx) => (
//             <div
//               key={idx}
//               className={`grid grid-cols-12 gap-4 items-center p-4 rounded-lg transition-all duration-200 hover:bg-gray-50 ${
//                 idx % 2 === 0 ? "bg-gray-25" : "bg-white"
//               }`}
//             >
//               <div className="col-span-1 flex justify-center">
//                 <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
//                   {expense.icon}
//                 </div>
//               </div>
//               <div className="col-span-8 font-medium text-gray-700">
//                 {expense.label}
//               </div>
//               <div className="col-span-3 text-right">
//                 <span className="text-lg font-semibold text-gray-900">
//                   £{expense.amount}
//                 </span>
//               </div>
//             </div>
//           ))}
          
//           {showSubtotal && (
//             <div className="grid grid-cols-12 gap-4 items-center p-4 rounded-lg bg-blue-50 border-t-2 border-blue-200 mt-4">
//               <div className="col-span-1 flex justify-center">
//                 <div className="p-2 bg-blue-600 rounded-lg text-white">
//                   <Calculator className="w-4 h-4" />
//                 </div>
//               </div>
//               <div className="col-span-8 font-bold text-blue-900">
//                 Subtotal for {title}
//               </div>
//               <div className="col-span-3 text-right">
//                 <span className="text-xl font-bold text-blue-900">
//                   £{title === "Motor Expenses" ? motorSubtotal : additionalSubtotal}
//                 </span>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-white rounded-2xl">
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         {/* Page Header using the reusable component */}
//         <PageHeader
//           icon={<TrendingUp />}
//           title="Rolling Profit & Loss"
//           subtitle="Financial overview for"
//           currentPage="Rolling Profit & Loss"
         
//           infoCard="All amounts are calculated automatically based on your recorded transactions and include private use adjustments where applicable."
//         />

//         {/* Income Summary Card */}
//         <div className="mb-8 bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
//           <div className="bg-green-50 px-6 py-4">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <div className="p-2 bg-white/80 rounded-lg">
//                   <PieChart className="w-6 h-6 text-green-700" />
//                 </div>
//                 <div>
//                   <h2 className="text-xl font-semibold text-green-900">Income Summary</h2>
//                   <p className="text-green-700 text-sm mt-1">Total income for the current period</p>
//                 </div>
//               </div>
              
//               <div className="flex gap-3">
//                 <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-200 shadow-md hover:shadow-lg">
//                   <Download className="w-4 h-4" />
//                   Download PDF
//                 </button>
//                 <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-200 shadow-md hover:shadow-lg">
//                   <FileText className="w-4 h-4" />
//                   Export PDF
//                 </button>
//               </div>
//             </div>
//           </div>

//           <div className="p-6">
//             <div className="bg-green-600 text-white rounded-xl p-4 text-center">
//               <div className="flex items-center justify-center gap-2 mb-1">
//                 <TrendingUp className="w-5 h-5" />
//                 <p className="text-green-100 text-xs uppercase tracking-wide">Total Income</p>
//               </div>
//               <p className="text-2xl font-bold">£0.00</p>
//               <p className="text-green-200 text-xs mt-1">Rolling P&L for 2025 / 2026</p>
//             </div>
//           </div>
//         </div>

//         {/* Expense Tables */}
//         {renderExpenseTable("Motor Expenses", motorExpenses, true, <FaCar className="w-6 h-6 text-blue-700" />)}
//         {renderExpenseTable("Additional Expenses", additionalExpenses, true, <FaBox className="w-6 h-6 text-purple-700" />)}

//         {/* Profit/Loss Summary */}
//         <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8">
//           <div className="bg-purple-50 px-6 py-4">
//             <div className="flex items-center gap-3">
//               <div className="p-2 bg-white/80 rounded-lg">
//                 <Calculator className="w-6 h-6 text-purple-700" />
//               </div>
//               <div>
//                 <h2 className="text-xl font-semibold text-purple-900">Profit / (Loss) Summary</h2>
//                 <p className="text-purple-700 text-sm mt-1">Final calculations and adjustments</p>
//               </div>
//             </div>
//           </div>

//           <div className="p-6">
//             <div className="space-y-2">
//               {profitLossData.map((item, idx) => (
//                 <div
//                   key={idx}
//                   className={`grid grid-cols-12 gap-4 items-center p-4 rounded-lg transition-all duration-200 ${
//                     idx % 2 === 0 ? "bg-gray-25" : "bg-white"
//                   }`}
//                 >
//                   <div className="col-span-1 flex justify-center">
//                     <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
//                       <Calculator className="w-4 h-4" />
//                     </div>
//                   </div>
//                   <div className="col-span-8 font-medium text-gray-700">
//                     {item.label}
//                   </div>
//                   <div className="col-span-3 text-right">
//                     <span className={`text-lg font-semibold ${
//                       parseFloat(item.amount) < 0 ? "text-red-600" : "text-gray-900"
//                     }`}>
//                       £{item.amount}
//                     </span>
//                   </div>
//                 </div>
//               ))}
              
//               <div className="grid grid-cols-12 gap-4 items-center p-4 rounded-lg bg-purple-50 border-t-2 border-purple-200 mt-4">
//                 <div className="col-span-1 flex justify-center">
//                   <div className="p-2 bg-purple-600 rounded-lg text-white">
//                     <TrendingUp className="w-4 h-4" />
//                   </div>
//                 </div>
//                 <div className="col-span-8 font-bold text-purple-900">
//                   Adjusted Net Profit / (Loss)
//                 </div>
//                 <div className="col-span-3 text-right">
//                   <span className={`text-2xl font-bold ${
//                     parseFloat(adjustedNetProfit) < 0 ? "text-red-600" : "text-green-600"
//                   }`}>
//                     £{adjustedNetProfit}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RollingPLPage;

























































// import React, { useState, useEffect } from "react";
// import { Download, FileText, TrendingUp, Calculator, ArrowDown, PieChart, Home, ChevronRight } from "lucide-react";
// import { 
//   FaGasPump, 
//   FaOilCan, 
//   FaCar, 
//   FaShieldAlt, 
//   FaTools, 
//   FaDotCircle, 
//   FaCarSide, 
//   FaMoneyCheckAlt, 
//   FaCogs,
//   FaPhoneAlt,
//   FaIdBadge,
//   FaWrench,
//   FaBalanceScale,
//   FaSoap,
//   FaUserTie,
//   FaHome,
//   FaBox,
//   FaParking
// } from "react-icons/fa";
// import { getProfitAndLoss } from "../services/dashboard";
// import { useTradingYear } from "../context/TradingYearContext";
// import toast from "react-hot-toast";

// // PageHeader Component
// const PageHeader = ({
//   icon,
//   title,
//   subtitle,
//   description,
//   currentPage,
//   breadcrumbItems = [],
//   showTradingYear = true,
//   activeTradingYear = null,
//   infoCard = null,
// }) => {
//   return (
//     <div className="mb-8">
//       <div className="">
//         <div className="flex items-center justify-between mb-4">
//           {/* Left side - Icon, Title, and Subtitle/Trading Year */}
//           <div className="flex items-center gap-4">
//             <div className="p-3 bg-blue-50 rounded-xl">
//               {React.cloneElement(icon, { className: "w-8 h-8 text-blue-600" })}
//             </div>
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
//               {showTradingYear && (
//                 <p className="text-gray-600 text-lg">
//                   {subtitle || "Tax Year"}{" "}
//                   <span className="font-semibold text-blue-600">
//                     {activeTradingYear
//                       ? activeTradingYear.trading_year
//                       : "2025 / 2026"}
//                   </span>
//                 </p>
//               )}
//               {!showTradingYear && subtitle && (
//                 <p className="text-gray-600 text-lg">{subtitle}</p>
//               )}
//             </div>
//           </div>
          
//           {/* Right side - Breadcrumb Navigation */}
//           <nav className="flex items-center gap-2 text-sm text-gray-500">
//             <a
//               href="/dashboard"
//               className="flex items-center gap-1 hover:text-blue-600 transition-colors"
//             >
//               <Home className="w-4 h-4" />
//               Dashboard
//             </a>
            
//             {/* Additional breadcrumb items */}
//             {breadcrumbItems.map((item, index) => (
//               <React.Fragment key={index}>
//                 <ChevronRight className="w-4 h-4" />
//                 {item.link ? (
//                   <a
//                     href={item.link}
//                     className="hover:text-blue-600 transition-colors"
//                   >
//                     {item.label}
//                   </a>
//                 ) : (
//                   <span>{item.label}</span>
//                 )}
//               </React.Fragment>
//             ))}
            
//             {/* Current page */}
//             <ChevronRight className="w-4 h-4" />
//             <span className="text-gray-700 font-medium">{currentPage}</span>
//           </nav>
//         </div>

//         {/* Simple Description */}
//         {description && (
//           <div className="mb-4">
//             <p className="text-gray-600 leading-relaxed">{description}</p>
//           </div>
//         )}

//         {/* Optional Info Card - separate prop */}
//         {infoCard && (
//           <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
//             <p className="text-blue-800 leading-relaxed">{infoCard}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// const RollingPLPage = () => {
//   const { activeTradingYear, apiRefreshTrigger } = useTradingYear();
//   const [loading, setLoading] = useState(true);
//   const [plData, setPLData] = useState(null);

//   // Fetch profit and loss data
//   useEffect(() => {
//     const fetchProfitLossData = async () => {
//       try {
//         setLoading(true);
//         const response = await getProfitAndLoss();
//         console.log("P&L Data:", response.data);
//         setPLData(response.data);
//       } catch (error) {
//         console.error("Error fetching P&L data:", error);
//         toast.error("Failed to load profit & loss data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfitLossData();
//   }, [apiRefreshTrigger]); // Refresh when trading year changes

//   // Format currency
//   const formatCurrency = (amount) => {
//     return (amount / 100).toFixed(2); // Convert from pence to pounds
//   };

//   // Motor expenses data from API
//   const getMotorExpenses = () => {
//     if (!plData) return [];
    
//     return [
//       { label: "Fuel", amount: formatCurrency(plData.fuel || 0), icon: <FaGasPump className="w-4 h-4" /> },
//       { label: "Oil", amount: formatCurrency(plData.oil || 0), icon: <FaOilCan className="w-4 h-4" /> },
//       { label: "Car tax", amount: formatCurrency(plData.car_tax || 0), icon: <FaCar className="w-4 h-4" /> },
//       { label: "Insurance", amount: formatCurrency(plData.insurance || 0), icon: <FaShieldAlt className="w-4 h-4" /> },
//       { label: "Servicing/repairs", amount: formatCurrency(plData.servicing_repairs || 0), icon: <FaTools className="w-4 h-4" /> },
//       { label: "Tyres", amount: formatCurrency(plData.tyres || 0), icon: <FaDotCircle className="w-4 h-4" /> },
//       { label: "Capital Allowances", amount: formatCurrency(plData.capital_allowances || 0), icon: <FaCar className="w-4 h-4" /> },
//       { label: "Vehicle rental/lease", amount: formatCurrency(plData.vehicle_rental_lease || 0), icon: <FaCarSide className="w-4 h-4" /> },
//       { label: "Vehicle loan interest", amount: formatCurrency(plData.vehicle_loan_interest || 0), icon: <FaMoneyCheckAlt className="w-4 h-4" /> },
//       { label: "Other motor expenses", amount: formatCurrency(plData.other_motor_expenses || 0), icon: <FaCogs className="w-4 h-4" /> },
//     ];
//   };

//   // Additional expenses data from API
//   const getAdditionalExpenses = () => {
//     if (!plData) return [];
    
//     return [
//       { label: "Radio Rent / Commission fee / Subscription fee", amount: formatCurrency(plData.total_radio_rent || 0), icon: <FaDotCircle className="w-4 h-4" /> },
//       { label: "Deductions % (Cash 3%, Card/Bank 2%, Account/Contract 1%, Sub Contract 3%)", amount: formatCurrency(plData.radio || 0), icon: <Calculator className="w-4 h-4" /> },
//       { label: "Mobile/telephone costs", amount: formatCurrency(plData.mobile_telephone_costs || 0), icon: <FaPhoneAlt className="w-4 h-4" /> },
//       { label: "Driver/licences/badge/medical", amount: formatCurrency(plData.driver_licence_badge_medical || 0), icon: <FaIdBadge className="w-4 h-4" /> },
//       { label: "Repairs/renewals to equipment", amount: formatCurrency(plData.repair_renewals_equipment || 0), icon: <FaWrench className="w-4 h-4" /> },
//       { label: "Legal and accountancy costs", amount: formatCurrency(plData.legal_accountancy_costs || 0), icon: <FaBalanceScale className="w-4 h-4" /> },
//       { label: "Car cleaning/valeting", amount: formatCurrency(plData.car_cleaning_valeting || 0), icon: <FaSoap className="w-4 h-4" /> },
//       { label: "Wages to employee", amount: formatCurrency(plData.wages_to_employee || 0), icon: <FaUserTie className="w-4 h-4" /> },
//       { label: "Use of home as office", amount: formatCurrency(plData.use_of_home_as_office || 0), icon: <FaHome className="w-4 h-4" /> },
//       { label: "Misc/sundry expenses", amount: formatCurrency(plData.misc_sundry_expenses || 0), icon: <FaBox className="w-4 h-4" /> },
//       { label: "Parking/Toll charges", amount: formatCurrency(plData.parking_toll_charges || 0), icon: <FaParking className="w-4 h-4" /> },
//     ];
//   };

//   // Calculate subtotals
//   const calculateSubtotal = (expenses) => {
//     return expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0).toFixed(2);
//   };

//   const motorExpenses = getMotorExpenses();
//   const additionalExpenses = getAdditionalExpenses();
//   const motorSubtotal = plData ? formatCurrency(plData.sub_total_motor_expenses || 0) : "0.00";
//   const additionalSubtotal = plData ? formatCurrency(plData.sub_total_additional_expenses || 0) : "0.00";
//   const totalExpenses = plData ? formatCurrency(plData.total_expenses || 0) : "0.00";

//   // Profit/Loss calculations from API
//   const getProfitLossData = () => {
//     if (!plData) return [];
    
//     return [
//       { label: "Total Expenses", amount: formatCurrency(plData.total_expenses || 0) },
//       { label: "Net Profit / (Loss)", amount: formatCurrency(plData.net_profit_loss || 0) },
//       { label: "Add private use adjustment car", amount: formatCurrency(plData.add_private_use_adjustment_car || 0) },
//       { label: "Add private use adjustment telephone", amount: formatCurrency(plData.add_private_use_adjustment_telephone || 0) },
//       { label: "Vehicle disposal", amount: formatCurrency(plData.vehicle_disposal || 0) },
//     ];
//   };

//   const profitLossData = getProfitLossData();
//   const adjustedNetProfit = plData ? formatCurrency(plData.total_net_balance || 0) : "0.00";
//   const totalIncome = plData ? formatCurrency(plData.total_income || 0) : "0.00";

//   // Loading skeleton
//   const LoadingSkeleton = () => (
//     <div className="min-h-screen bg-white rounded-2xl">
//       <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
//         {/* Header skeleton */}
//         <div className="mb-8">
//           <div className="flex items-center gap-4 mb-4">
//             <div className="w-14 h-14 bg-blue-100 rounded-xl animate-pulse"></div>
//             <div className="space-y-2">
//               <div className="h-8 bg-gray-200 rounded w-64 animate-pulse"></div>
//               <div className="h-5 bg-gray-200 rounded w-48 animate-pulse"></div>
//             </div>
//           </div>
//         </div>
        
//         {/* Income card skeleton */}
//         <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
//           <div className="bg-green-50 p-6">
//             <div className="h-6 bg-green-200 rounded w-48 animate-pulse mb-2"></div>
//             <div className="h-4 bg-green-200 rounded w-64 animate-pulse"></div>
//           </div>
//           <div className="p-6">
//             <div className="bg-green-100 rounded-xl p-4 text-center">
//               <div className="h-8 bg-green-200 rounded w-32 mx-auto animate-pulse"></div>
//             </div>
//           </div>
//         </div>

//         {/* Tables skeleton */}
//         {[1, 2, 3].map((i) => (
//           <div key={i} className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
//             <div className="bg-blue-50 p-6">
//               <div className="h-6 bg-blue-200 rounded w-48 animate-pulse"></div>
//             </div>
//             <div className="p-6 space-y-4">
//               {[1, 2, 3, 4].map((j) => (
//                 <div key={j} className="flex items-center justify-between p-4">
//                   <div className="flex items-center gap-3">
//                     <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
//                     <div className="h-4 bg-gray-200 rounded w-48 animate-pulse"></div>
//                   </div>
//                   <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );

//   if (loading) {
//     return <LoadingSkeleton />;
//   }

//   const renderExpenseTable = (title, expenses, showSubtotal = true, icon, subtotalAmount) => (
//     <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8">
//       <div className="bg-blue-50 px-6 py-4">
//         <div className="flex items-center gap-3">
//           <div className="p-2 bg-white/80 rounded-lg">
//             {icon}
//           </div>
//           <div>
//             <h2 className="text-xl font-semibold text-blue-900">{title}</h2>
//             <p className="text-blue-700 text-sm mt-1">Detailed breakdown of {title.toLowerCase()}</p>
//           </div>
//         </div>
//       </div>

//       <div className="p-6">
//         <div className="space-y-2">
//           {expenses.map((expense, idx) => (
//             <div
//               key={idx}
//               className={`grid grid-cols-12 gap-4 items-center p-4 rounded-lg transition-all duration-200 hover:bg-gray-50 ${
//                 idx % 2 === 0 ? "bg-gray-25" : "bg-white"
//               }`}
//             >
//               <div className="col-span-1 flex justify-center">
//                 <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
//                   {expense.icon}
//                 </div>
//               </div>
//               <div className="col-span-8 font-medium text-gray-700">
//                 {expense.label}
//               </div>
//               <div className="col-span-3 text-right">
//                 <span className="text-lg font-semibold text-gray-900">
//                   £{expense.amount}
//                 </span>
//               </div>
//             </div>
//           ))}
          
//           {showSubtotal && (
//             <div className="grid grid-cols-12 gap-4 items-center p-4 rounded-lg bg-blue-50 border-t-2 border-blue-200 mt-4">
//               <div className="col-span-1 flex justify-center">
//                 <div className="p-2 bg-blue-600 rounded-lg text-white">
//                   <Calculator className="w-4 h-4" />
//                 </div>
//               </div>
//               <div className="col-span-8 font-bold text-blue-900">
//                 Subtotal for {title}
//               </div>
//               <div className="col-span-3 text-right">
//                 <span className="text-xl font-bold text-blue-900">
//                   £{subtotalAmount}
//                 </span>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-white rounded-2xl">
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         {/* Page Header using the reusable component */}
//         <PageHeader
//           icon={<TrendingUp />}
//           title="Rolling Profit & Loss"
//           subtitle="Financial overview for"
//           currentPage="Rolling Profit & Loss"
//           showTradingYear={true}
//           activeTradingYear={activeTradingYear}
//           infoCard="All amounts are calculated automatically based on your recorded transactions and include private use adjustments where applicable."
//         />

//         {/* Income Summary Card */}
//         <div className="mb-8 bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
//           <div className="bg-green-50 px-6 py-4">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <div className="p-2 bg-white/80 rounded-lg">
//                   <PieChart className="w-6 h-6 text-green-700" />
//                 </div>
//                 <div>
//                   <h2 className="text-xl font-semibold text-green-900">Income Summary</h2>
//                   <p className="text-green-700 text-sm mt-1">Total income for the current period</p>
//                 </div>
//               </div>
              
//               <div className="flex gap-3">
//                 <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-200 shadow-md hover:shadow-lg">
//                   <Download className="w-4 h-4" />
//                   Download PDF
//                 </button>
//                 <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-200 shadow-md hover:shadow-lg">
//                   <FileText className="w-4 h-4" />
//                   Export PDF
//                 </button>
//               </div>
//             </div>
//           </div>

//           <div className="p-6">
//             <div className="bg-green-600 text-white rounded-xl p-4 text-center">
//               <div className="flex items-center justify-center gap-2 mb-1">
//                 <TrendingUp className="w-5 h-5" />
//                 <p className="text-green-100 text-xs uppercase tracking-wide">Total Income</p>
//               </div>
//               <p className="text-2xl font-bold">£{totalIncome}</p>
//               <p className="text-green-200 text-xs mt-1">
//                 Rolling P&L for {activeTradingYear ? activeTradingYear.trading_year : "2025 / 2026"}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Expense Tables */}
//         {renderExpenseTable("Motor Expenses", motorExpenses, true, <FaCar className="w-6 h-6 text-blue-700" />, motorSubtotal)}
//         {renderExpenseTable("Additional Expenses", additionalExpenses, true, <FaBox className="w-6 h-6 text-purple-700" />, additionalSubtotal)}

//         {/* Profit/Loss Summary */}
//         <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8">
//           <div className="bg-purple-50 px-6 py-4">
//             <div className="flex items-center gap-3">
//               <div className="p-2 bg-white/80 rounded-lg">
//                 <Calculator className="w-6 h-6 text-purple-700" />
//               </div>
//               <div>
//                 <h2 className="text-xl font-semibold text-purple-900">Profit / (Loss) Summary</h2>
//                 <p className="text-purple-700 text-sm mt-1">Final calculations and adjustments</p>
//               </div>
//             </div>
//           </div>

//           <div className="p-6">
//             <div className="space-y-2">
//               {profitLossData.map((item, idx) => (
//                 <div
//                   key={idx}
//                   className={`grid grid-cols-12 gap-4 items-center p-4 rounded-lg transition-all duration-200 ${
//                     idx % 2 === 0 ? "bg-gray-25" : "bg-white"
//                   }`}
//                 >
//                   <div className="col-span-1 flex justify-center">
//                     <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
//                       <Calculator className="w-4 h-4" />
//                     </div>
//                   </div>
//                   <div className="col-span-8 font-medium text-gray-700">
//                     {item.label}
//                   </div>
//                   <div className="col-span-3 text-right">
//                     <span className={`text-lg font-semibold ${
//                       parseFloat(item.amount) < 0 ? "text-red-600" : "text-gray-900"
//                     }`}>
//                       £{item.amount}
//                     </span>
//                   </div>
//                 </div>
//               ))}
              
//               <div className="grid grid-cols-12 gap-4 items-center p-4 rounded-lg bg-purple-50 border-t-2 border-purple-200 mt-4">
//                 <div className="col-span-1 flex justify-center">
//                   <div className="p-2 bg-purple-600 rounded-lg text-white">
//                     <TrendingUp className="w-4 h-4" />
//                   </div>
//                 </div>
//                 <div className="col-span-8 font-bold text-purple-900">
//                   Adjusted Net Profit / (Loss)
//                 </div>
//                 <div className="col-span-3 text-right">
//                   <span className={`text-2xl font-bold ${
//                     parseFloat(adjustedNetProfit) < 0 ? "text-red-600" : "text-green-600"
//                   }`}>
//                     £{adjustedNetProfit}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RollingPLPage;











































// import React, { useState, useEffect } from "react";
// import { Download, FileText, TrendingUp, Calculator, PieChart, Home, ChevronRight } from "lucide-react";
// import { getProfitAndLoss } from "../services/dashboard";
// import { useTradingYear } from "../context/TradingYearContext";
// import PageHeader from "../components/PageHeader";
// import toast from "react-hot-toast";

// const RollingPLPage = () => {
//   const { activeTradingYear, apiRefreshTrigger } = useTradingYear();
//   const [loading, setLoading] = useState(true);
//   const [plData, setPLData] = useState(null);

//   // Fetch profit and loss data
//   useEffect(() => {
//     const fetchProfitLossData = async () => {
//       try {
//         setLoading(true);
//         const response = await getProfitAndLoss();
//         console.log("P&L Data:", response.data);
//         setPLData(response.data);
//       } catch (error) {
//         console.error("Error fetching P&L data:", error);
//         toast.error("Failed to load profit & loss data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfitLossData();
//   }, [apiRefreshTrigger]);

//   // Simple currency formatter - assumes backend sends in correct format
//   const formatCurrency = (amount) => {
//     // TODO: Confirm with backend if amounts are in pence or pounds
//     // Currently assuming pence, but this should be clarified
//     return (parseFloat(amount || 0) / 100).toFixed(2);
//   };

//   // Loading skeleton
//   const LoadingSkeleton = () => (
//     <div className="min-h-screen bg-white rounded-2xl">
//       <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
//         {/* Header skeleton */}
//         <div className="mb-8">
//           <div className="flex items-center gap-4 mb-4">
//             <div className="w-14 h-14 bg-blue-100 rounded-xl animate-pulse"></div>
//             <div className="space-y-2">
//               <div className="h-8 bg-gray-200 rounded w-64 animate-pulse"></div>
//               <div className="h-5 bg-gray-200 rounded w-48 animate-pulse"></div>
//             </div>
//           </div>
//         </div>
        
//         {/* Content skeletons */}
//         {[1, 2, 3, 4].map((i) => (
//           <div key={i} className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
//             <div className="bg-blue-50 p-6">
//               <div className="h-6 bg-blue-200 rounded w-48 animate-pulse"></div>
//             </div>
//             <div className="p-6 space-y-4">
//               {[1, 2, 3].map((j) => (
//                 <div key={j} className="flex items-center justify-between p-4">
//                   <div className="h-4 bg-gray-200 rounded w-48 animate-pulse"></div>
//                   <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );

//   if (loading) {
//     return <LoadingSkeleton />;
//   }

//   if (!plData) {
//     return (
//       <div className="min-h-screen bg-white rounded-2xl">
//         <div className="max-w-7xl mx-auto px-4 py-8">
//           <div className="text-center py-12">
//             <p className="text-gray-500">No profit & loss data available</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-white rounded-2xl">
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         {/* Page Header */}
//         <PageHeader
//           icon={<TrendingUp />}
//           title="Rolling Profit & Loss"
//           subtitle="Financial overview for"
//           currentPage="Rolling Profit & Loss"
//           showTradingYear={true}
//           activeTradingYear={activeTradingYear}
//           infoCard="All amounts are calculated automatically based on your recorded transactions and include private use adjustments where applicable."
//         />

//         {/* Income Summary Card */}
//         <div className="mb-8 bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
//           <div className="bg-green-50 px-6 py-4">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <div className="p-2 bg-white/80 rounded-lg">
//                   <PieChart className="w-6 h-6 text-green-700" />
//                 </div>
//                 <div>
//                   <h2 className="text-xl font-semibold text-green-900">Income Summary</h2>
//                   <p className="text-green-700 text-sm mt-1">Total income for the current period</p>
//                 </div>
//               </div>
              
//               <div className="flex gap-3">
//                 <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-200 shadow-md hover:shadow-lg">
//                   <Download className="w-4 h-4" />
//                   Download PDF
//                 </button>
//                 <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-200 shadow-md hover:shadow-lg">
//                   <FileText className="w-4 h-4" />
//                   Export PDF
//                 </button>
//               </div>
//             </div>
//           </div>

//           <div className="p-6">
//             <div className="bg-green-600 text-white rounded-xl p-4 text-center">
//               <div className="flex items-center justify-center gap-2 mb-1">
//                 <TrendingUp className="w-5 h-5" />
//                 <p className="text-green-100 text-xs uppercase tracking-wide">Total Income</p>
//               </div>
//               <p className="text-2xl font-bold">£{formatCurrency(plData.total_income)}</p>
//               <p className="text-green-200 text-xs mt-1">
//                 Rolling P&L for {activeTradingYear ? activeTradingYear.trading_year : "2025 / 2026"}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Motor Expenses */}
//         <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8">
//           <div className="bg-blue-50 px-6 py-4">
//             <div className="flex items-center gap-3">
//               <div className="p-2 bg-white/80 rounded-lg">
//                 <Calculator className="w-6 h-6 text-blue-700" />
//               </div>
//               <div>
//                 <h2 className="text-xl font-semibold text-blue-900">Motor Expenses</h2>
//                 <p className="text-blue-700 text-sm mt-1">Vehicle-related expenses and costs</p>
//               </div>
//             </div>
//           </div>

//           <div className="p-6">
//             <div className="space-y-2">
//               <div className="grid grid-cols-12 gap-4 items-center p-4 rounded-lg bg-white">
//                 <div className="col-span-8 font-medium text-gray-700">Fuel</div>
//                 <div className="col-span-4 text-right">
//                   <span className="text-lg font-semibold text-gray-900">£{formatCurrency(plData.fuel)}</span>
//                 </div>
//               </div>
              
//               <div className="grid grid-cols-12 gap-4 items-center p-4 rounded-lg bg-gray-25">
//                 <div className="col-span-8 font-medium text-gray-700">Oil</div>
//                 <div className="col-span-4 text-right">
//                   <span className="text-lg font-semibold text-gray-900">£{formatCurrency(plData.oil)}</span>
//                 </div>
//               </div>

//               <div className="grid grid-cols-12 gap-4 items-center p-4 rounded-lg bg-white">
//                 <div className="col-span-8 font-medium text-gray-700">Car Tax</div>
//                 <div className="col-span-4 text-right">
//                   <span className="text-lg font-semibold text-gray-900">£{formatCurrency(plData.car_tax)}</span>
//                 </div>
//               </div>

//               <div className="grid grid-cols-12 gap-4 items-center p-4 rounded-lg bg-gray-25">
//                 <div className="col-span-8 font-medium text-gray-700">Insurance</div>
//                 <div className="col-span-4 text-right">
//                   <span className="text-lg font-semibold text-gray-900">£{formatCurrency(plData.insurance)}</span>
//                 </div>
//               </div>

//               <div className="grid grid-cols-12 gap-4 items-center p-4 rounded-lg bg-white">
//                 <div className="col-span-8 font-medium text-gray-700">Servicing/Repairs</div>
//                 <div className="col-span-4 text-right">
//                   <span className="text-lg font-semibold text-gray-900">£{formatCurrency(plData.servicing_repairs)}</span>
//                 </div>
//               </div>

//               <div className="grid grid-cols-12 gap-4 items-center p-4 rounded-lg bg-gray-25">
//                 <div className="col-span-8 font-medium text-gray-700">Tyres</div>
//                 <div className="col-span-4 text-right">
//                   <span className="text-lg font-semibold text-gray-900">£{formatCurrency(plData.tyres)}</span>
//                 </div>
//               </div>

//               <div className="grid grid-cols-12 gap-4 items-center p-4 rounded-lg bg-white">
//                 <div className="col-span-8 font-medium text-gray-700">Vehicle Rental/Lease</div>
//                 <div className="col-span-4 text-right">
//                   <span className="text-lg font-semibold text-gray-900">£{formatCurrency(plData.vehicle_rental_lease)}</span>
//                 </div>
//               </div>

//               <div className="grid grid-cols-12 gap-4 items-center p-4 rounded-lg bg-gray-25">
//                 <div className="col-span-8 font-medium text-gray-700">Vehicle Loan Interest</div>
//                 <div className="col-span-4 text-right">
//                   <span className="text-lg font-semibold text-gray-900">£{formatCurrency(plData.vehicle_loan_interest)}</span>
//                 </div>
//               </div>

//               <div className="grid grid-cols-12 gap-4 items-center p-4 rounded-lg bg-white">
//                 <div className="col-span-8 font-medium text-gray-700">Other Motor Expenses</div>
//                 <div className="col-span-4 text-right">
//                   <span className="text-lg font-semibold text-gray-900">£{formatCurrency(plData.other_motor_expenses)}</span>
//                 </div>
//               </div>

//               <div className="grid grid-cols-12 gap-4 items-center p-4 rounded-lg bg-gray-25">
//                 <div className="col-span-8 font-medium text-gray-700">Capital Allowances</div>
//                 <div className="col-span-4 text-right">
//                   <span className="text-lg font-semibold text-gray-900">£{formatCurrency(plData.capital_allowances)}</span>
//                 </div>
//               </div>
              
//               {/* Motor Expenses Subtotal */}
//               <div className="grid grid-cols-12 gap-4 items-center p-4 rounded-lg bg-blue-50 border-t-2 border-blue-200 mt-4">
//                 <div className="col-span-8 font-bold text-blue-900">Motor Expenses Subtotal</div>
//                 <div className="col-span-4 text-right">
//                   <span className="text-xl font-bold text-blue-900">£{formatCurrency(plData.sub_total_motor_expenses)}</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Radio Rent & Deductions */}
//         <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8">
//           <div className="bg-orange-50 px-6 py-4">
//             <div className="flex items-center gap-3">
//               <div className="p-2 bg-white/80 rounded-lg">
//                 <Calculator className="w-6 h-6 text-orange-700" />
//               </div>
//               <div>
//                 <h2 className="text-xl font-semibold text-orange-900">Radio Rent & Deductions</h2>
//                 <p className="text-orange-700 text-sm mt-1">Commission fees and percentage deductions</p>
//               </div>
//             </div>
//           </div>

//           <div className="p-6">
//             <div className="space-y-2">
//               <div className="grid grid-cols-12 gap-4 items-center p-4 rounded-lg bg-white">
//                 <div className="col-span-8 font-medium text-gray-700">Radio Rent</div>
//                 <div className="col-span-4 text-right">
//                   <span className="text-lg font-semibold text-gray-900">£{formatCurrency(plData.radio_rent)}</span>
//                 </div>
//               </div>

//               <div className="grid grid-cols-12 gap-4 items-center p-4 rounded-lg bg-gray-25">
//                 <div className="col-span-8 font-medium text-gray-700">
//                   Deductions (Cash {plData.percentage_adj?.radio_rent_cash}%, Card/Bank {plData.percentage_adj?.radio_rent_card_bank}%, Account/Contract {plData.percentage_adj?.radio_rent_acc_contract}%, Sub Contract {plData.percentage_adj?.radio_rent_sub_contract}%)
//                 </div>
//                 <div className="col-span-4 text-right">
//                   <span className="text-lg font-semibold text-gray-900">£{formatCurrency(plData.total_radio_rent)}</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Additional Expenses */}
//         <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8">
//           <div className="bg-purple-50 px-6 py-4">
//             <div className="flex items-center gap-3">
//               <div className="p-2 bg-white/80 rounded-lg">
//                 <Calculator className="w-6 h-6 text-purple-700" />
//               </div>
//               <div>
//                 <h2 className="text-xl font-semibold text-purple-900">Additional Expenses</h2>
//                 <p className="text-purple-700 text-sm mt-1">Other business-related expenses</p>
//               </div>
//             </div>
//           </div>

//           <div className="p-6">
//             <div className="space-y-2">
//               <div className="grid grid-cols-12 gap-4 items-center p-4 rounded-lg bg-white">
//                 <div className="col-span-8 font-medium text-gray-700">Mobile/Telephone Costs</div>
//                 <div className="col-span-4 text-right">
//                   <span className="text-lg font-semibold text-gray-900">£{formatCurrency(plData.mobile_telephone_costs)}</span>
//                 </div>
//               </div>

//               <div className="grid grid-cols-12 gap-4 items-center p-4 rounded-lg bg-gray-25">
//                 <div className="col-span-8 font-medium text-gray-700">Driver/Licence/Badge/Medical</div>
//                 <div className="col-span-4 text-right">
//                   <span className="text-lg font-semibold text-gray-900">£{formatCurrency(plData.driver_licence_badge_medical)}</span>
//                 </div>
//               </div>

//               <div className="grid grid-cols-12 gap-4 items-center p-4 rounded-lg bg-white">
//                 <div className="col-span-8 font-medium text-gray-700">Repairs/Renewals to Equipment</div>
//                 <div className="col-span-4 text-right">
//                   <span className="text-lg font-semibold text-gray-900">£{formatCurrency(plData.repair_renewals_equipment)}</span>
//                 </div>
//               </div>

//               <div className="grid grid-cols-12 gap-4 items-center p-4 rounded-lg bg-gray-25">
//                 <div className="col-span-8 font-medium text-gray-700">Legal and Accountancy Costs</div>
//                 <div className="col-span-4 text-right">
//                   <span className="text-lg font-semibold text-gray-900">£{formatCurrency(plData.legal_accountancy_costs)}</span>
//                 </div>
//               </div>

//               <div className="grid grid-cols-12 gap-4 items-center p-4 rounded-lg bg-white">
//                 <div className="col-span-8 font-medium text-gray-700">Car Cleaning/Valeting</div>
//                 <div className="col-span-4 text-right">
//                   <span className="text-lg font-semibold text-gray-900">£{formatCurrency(plData.car_cleaning_valeting)}</span>
//                 </div>
//               </div>

//               <div className="grid grid-cols-12 gap-4 items-center p-4 rounded-lg bg-gray-25">
//                 <div className="col-span-8 font-medium text-gray-700">Wages to Employee</div>
//                 <div className="col-span-4 text-right">
//                   <span className="text-lg font-semibold text-gray-900">£{formatCurrency(plData.wages_to_employee)}</span>
//                 </div>
//               </div>

//               <div className="grid grid-cols-12 gap-4 items-center p-4 rounded-lg bg-white">
//                 <div className="col-span-8 font-medium text-gray-700">Use of Home as Office</div>
//                 <div className="col-span-4 text-right">
//                   <span className="text-lg font-semibold text-gray-900">£{formatCurrency(plData.use_of_home_as_office)}</span>
//                 </div>
//               </div>

//               <div className="grid grid-cols-12 gap-4 items-center p-4 rounded-lg bg-gray-25">
//                 <div className="col-span-8 font-medium text-gray-700">Misc/Sundry Expenses</div>
//                 <div className="col-span-4 text-right">
//                   <span className="text-lg font-semibold text-gray-900">£{formatCurrency(plData.misc_sundry_expenses)}</span>
//                 </div>
//               </div>

//               <div className="grid grid-cols-12 gap-4 items-center p-4 rounded-lg bg-white">
//                 <div className="col-span-8 font-medium text-gray-700">Parking/Toll Charges</div>
//                 <div className="col-span-4 text-right">
//                   <span className="text-lg font-semibold text-gray-900">£{formatCurrency(plData.parking_toll_charges)}</span>
//                 </div>
//               </div>

//               {/* Additional Expenses Subtotal */}
//               <div className="grid grid-cols-12 gap-4 items-center p-4 rounded-lg bg-purple-50 border-t-2 border-purple-200 mt-4">
//                 <div className="col-span-8 font-bold text-purple-900">Additional Expenses Subtotal</div>
//                 <div className="col-span-4 text-right">
//                   <span className="text-xl font-bold text-purple-900">£{formatCurrency(plData.sub_total_additional_expenses)}</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Profit/Loss Summary */}
//         <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8">
//           <div className="bg-slate-50 px-6 py-4">
//             <div className="flex items-center gap-3">
//               <div className="p-2 bg-white/80 rounded-lg">
//                 <TrendingUp className="w-6 h-6 text-slate-700" />
//               </div>
//               <div>
//                 <h2 className="text-xl font-semibold text-slate-900">Profit / (Loss) Summary</h2>
//                 <p className="text-slate-700 text-sm mt-1">Final calculations and adjustments</p>
//               </div>
//             </div>
//           </div>

//           <div className="p-6">
//             <div className="space-y-2">
//               <div className="grid grid-cols-12 gap-4 items-center p-4 rounded-lg bg-gray-100">
//                 <div className="col-span-8 font-bold text-gray-800">Total Expenses</div>
//                 <div className="col-span-4 text-right">
//                   <span className="text-xl font-bold text-gray-900">£{formatCurrency(plData.total_expenses)}</span>
//                 </div>
//               </div>

//               <div className="grid grid-cols-12 gap-4 items-center p-4 rounded-lg bg-white">
//                 <div className="col-span-8 font-medium text-gray-700">Net Profit / (Loss)</div>
//                 <div className="col-span-4 text-right">
//                   <span className={`text-lg font-semibold ${parseFloat(formatCurrency(plData.net_profit_loss)) < 0 ? 'text-red-600' : 'text-gray-900'}`}>
//                     £{formatCurrency(plData.net_profit_loss)}
//                   </span>
//                 </div>
//               </div>

//               <div className="grid grid-cols-12 gap-4 items-center p-4 rounded-lg bg-gray-25">
//                 <div className="col-span-8 font-medium text-gray-700">
//                   Add Private Use Adjustment Car ({plData.percentage_adj?.private_use_adj_car}%)
//                 </div>
//                 <div className="col-span-4 text-right">
//                   <span className="text-lg font-semibold text-gray-900">£{formatCurrency(plData.add_private_use_adjustment_car)}</span>
//                 </div>
//               </div>

//               <div className="grid grid-cols-12 gap-4 items-center p-4 rounded-lg bg-white">
//                 <div className="col-span-8 font-medium text-gray-700">
//                   Add Private Use Adjustment Telephone ({plData.percentage_adj?.private_use_adj_phone}%)
//                 </div>
//                 <div className="col-span-4 text-right">
//                   <span className="text-lg font-semibold text-gray-900">£{formatCurrency(plData.add_private_use_adjustment_telephone)}</span>
//                 </div>
//               </div>

//               <div className="grid grid-cols-12 gap-4 items-center p-4 rounded-lg bg-gray-25">
//                 <div className="col-span-8 font-medium text-gray-700">Vehicle Disposal</div>
//                 <div className="col-span-4 text-right">
//                   <span className="text-lg font-semibold text-gray-900">£{formatCurrency(plData.vehicle_disposal)}</span>
//                 </div>
//               </div>

//               {/* Final Net Balance */}
//               <div className="grid grid-cols-12 gap-4 items-center p-4 rounded-lg bg-slate-50 border-t-2 border-slate-200 mt-4">
//                 <div className="col-span-8 font-bold text-slate-900">Final Net Balance</div>
//                 <div className="col-span-4 text-right">
//                   <span className={`text-2xl font-bold ${parseFloat(formatCurrency(plData.total_net_balance)) < 0 ? 'text-red-600' : 'text-green-600'}`}>
//                     £{formatCurrency(plData.total_net_balance)}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RollingPLPage;






























import React, { useState, useEffect } from "react";
import { Download, FileText, TrendingUp, Calculator, PieChart, Home, ChevronRight } from "lucide-react";
import { getProfitAndLoss } from "../services/dashboard";
import { useTradingYear } from "../context/TradingYearContext";
import PageHeader from "../components/PageHeader";
import toast from "react-hot-toast";
import { FaChartPie } from "react-icons/fa";

// Reusable Table Component
const PLTable = ({ title, icon, bgColor, textColor, data, subtotalKey, subtotalLabel }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8">
      <div className={`${bgColor} px-6 py-4`}>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/80 rounded-lg">
            {icon}
          </div>
          <div>
            <h2 className={`text-xl font-semibold ${textColor}`}>{title}</h2>
            <p className={`${textColor} text-sm mt-1 opacity-80`}>
              {title === "Motor Expenses" && "Vehicle-related expenses and costs"}
              {title === "Radio Rent & Deductions" && "Commission fees and percentage deductions"}
              {title === "Additional Expenses" && "Other business-related expenses"}
            </p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-2">
          {data.map((item, index) => (
            <div 
              key={index} 
              className={`grid grid-cols-12 gap-4 items-center p-4 rounded-lg ${
                index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
              }`}
            >
              <div className="col-span-8 font-medium text-gray-700">{item.label}</div>
              <div className="col-span-4 text-right">
                <span className="text-lg font-semibold text-gray-900">£{item.value}</span>
              </div>
            </div>
          ))}
          
          {/* Subtotal */}
          {subtotalKey && (
            <div className={`grid grid-cols-12 gap-4 items-center p-4 rounded-lg ${bgColor} border-t-1 border-slate-200 mt-4`}>
              <div className={`col-span-8 font-bold ${textColor}`}>{subtotalLabel}</div>
              <div className="col-span-4 text-right">
                <span className={`text-xl font-bold ${textColor}`}>£{subtotalKey}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const RollingPLPage = () => {
  const { activeTradingYear, apiRefreshTrigger } = useTradingYear();
  const [loading, setLoading] = useState(true);
  const [plData, setPLData] = useState(null);

  // Fetch profit and loss data
  useEffect(() => {
    const fetchProfitLossData = async () => {
      try {
        setLoading(true);
        const response = await getProfitAndLoss();
        console.log("P&L Data:", response.data);
        setPLData(response.data);
      } catch (error) {
        console.error("Error fetching P&L data:", error);
        toast.error("Failed to load profit & loss data");
      } finally {
        setLoading(false);
      }
    };

    fetchProfitLossData();
  }, [apiRefreshTrigger]);

  // Simple currency formatter - show amounts as received from API
  const formatCurrency = (amount) => {
    return parseFloat(amount || 0).toFixed(2);
  };

  // Loading skeleton
  const LoadingSkeleton = () => (
    <div className="min-h-screen bg-white rounded-2xl">
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Header skeleton */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-blue-100 rounded-xl animate-pulse"></div>
            <div className="space-y-2">
              <div className="h-8 bg-gray-200 rounded w-64 animate-pulse"></div>
              <div className="h-5 bg-gray-200 rounded w-48 animate-pulse"></div>
            </div>
          </div>
        </div>
        
        {/* Content skeletons */}
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="bg-blue-50 p-6">
              <div className="h-6 bg-blue-200 rounded w-48 animate-pulse"></div>
            </div>
            <div className="p-6 space-y-4">
              {[1, 2, 3].map((j) => (
                <div key={j} className="flex items-center justify-between p-4">
                  <div className="h-4 bg-gray-200 rounded w-48 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (!plData) {
    return (
      <div className="min-h-screen bg-white rounded-2xl">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center py-12">
            <p className="text-gray-500">No profit & loss data available</p>
          </div>
        </div>
      </div>
    );
  }

  // Motor expenses data
  const motorExpensesData = [
    { label: "Fuel", value: formatCurrency(plData.fuel) },
    { label: "Oil", value: formatCurrency(plData.oil) },
    { label: "Car Tax", value: formatCurrency(plData.car_tax) },
    { label: "Insurance", value: formatCurrency(plData.insurance) },
    { label: "Servicing/Repairs", value: formatCurrency(plData.servicing_repairs) },
    { label: "Tyres", value: formatCurrency(plData.tyres) },
    { label: "Vehicle Rental/Lease", value: formatCurrency(plData.vehicle_rental_lease) },
    { label: "Vehicle Loan Interest", value: formatCurrency(plData.vehicle_loan_interest) },
    { label: "Other Motor Expenses", value: formatCurrency(plData.other_motor_expenses) },
    { label: "Capital Allowances", value: formatCurrency(plData.capital_allowances) }
  ];

  // Radio rent data
  const radioRentData = [
    { label: "Radio Rent", value: formatCurrency(plData.radio_rent) },
    { 
      label: `Deductions (Cash ${plData.percentage_adj?.radio_rent_cash}%, Card/Bank ${plData.percentage_adj?.radio_rent_card_bank}%, Account/Contract ${plData.percentage_adj?.radio_rent_acc_contract}%, Sub Contract ${plData.percentage_adj?.radio_rent_sub_contract}%)`, 
      value: formatCurrency(plData.total_radio_rent) 
    }
  ];

  // Additional expenses data
  const additionalExpensesData = [
    { label: "Mobile/Telephone Costs", value: formatCurrency(plData.mobile_telephone_costs) },
    { label: "Driver/Licence/Badge/Medical", value: formatCurrency(plData.driver_licence_badge_medical) },
    { label: "Repairs/Renewals to Equipment", value: formatCurrency(plData.repair_renewals_equipment) },
    { label: "Legal and Accountancy Costs", value: formatCurrency(plData.legal_accountancy_costs) },
    { label: "Car Cleaning/Valeting", value: formatCurrency(plData.car_cleaning_valeting) },
    { label: "Wages to Employee", value: formatCurrency(plData.wages_to_employee) },
    { label: "Use of Home as Office", value: formatCurrency(plData.use_of_home_as_office) },
    { label: "Misc/Sundry Expenses", value: formatCurrency(plData.misc_sundry_expenses) },
    { label: "Parking/Toll Charges", value: formatCurrency(plData.parking_toll_charges) }
  ];

  return (
    <div className="min-h-screen bg-white rounded-2xl">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Header */}
        <PageHeader
          icon={<FaChartPie />}
          title="Rolling Profit & Loss"
          subtitle="Financial overview for"
          currentPage="Rolling Profit & Loss"
          showTradingYear={true}
          activeTradingYear={activeTradingYear}
          infoCard="All amounts are calculated automatically based on your recorded transactions and include private use adjustments where applicable."
        />

        {/* Income Summary Card - Improved Design */}
        <div className="mb-8 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl shadow-lg border border-green-200 overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-100 rounded-xl">
                  <PieChart className="w-6 h-6 text-green-700" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-green-900">Total Income</h2>
                  <p className="text-green-700 text-sm">Rolling P&L for {activeTradingYear ? activeTradingYear.trading_year : "2025 / 2026"}</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button className="flex items-center gap-2 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm">
                  <Download className="w-4 h-4" />
                  PDF
                </button>
                <button className="flex items-center gap-2 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm">
                  <FileText className="w-4 h-4" />
                  Export
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <div className="text-3xl font-bold text-gray-900 mb-1">
                £{formatCurrency(plData.total_income)}
              </div>
              <div className="text-sm text-gray-600">
                Current trading year total
              </div>
            </div>
          </div>
        </div>

        {/* Motor Expenses */}
        <PLTable 
          title="Motor Expenses"
          icon={<Calculator className="w-6 h-6 text-blue-700" />}
          bgColor="bg-blue-50"
          textColor="text-blue-900"
          data={motorExpensesData}
          subtotalKey={formatCurrency(plData.sub_total_motor_expenses)}
          subtotalLabel="Motor Expenses Subtotal"
        />

        {/* Radio Rent & Deductions */}
        <PLTable 
          title="Radio Rent & Deductions"
          icon={<Calculator className="w-6 h-6 text-blue-700" />}
          bgColor="bg-blue-50"
          textColor="text-blue-900"
          data={radioRentData}
        />

        {/* Additional Expenses */}
        <PLTable 
          title="Additional Expenses"
          icon={<Calculator className="w-6 h-6 text-blue-700" />}
          bgColor="bg-blue-50"
          textColor="text-blue-900"
          data={additionalExpensesData}
          subtotalKey={formatCurrency(plData.sub_total_additional_expenses)}
          subtotalLabel="Additional Expenses Subtotal"
        />

        {/* Profit/Loss Summary */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8">
          <div className="bg-slate-50 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/80 rounded-lg">
                <TrendingUp className="w-6 h-6 text-slate-700" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Profit / (Loss) Summary</h2>
                <p className="text-slate-700 text-sm mt-1">Final calculations and adjustments</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="space-y-2">
              <div className="grid grid-cols-12 gap-4 items-center p-4 rounded-lg bg-white">
                <div className="col-span-8 font-bold text-gray-800">Total Expenses</div>
                <div className="col-span-4 text-right">
                  <span className="text-xl font-bold text-gray-900">£{formatCurrency(plData.total_expenses)}</span>
                </div>
              </div>

              <div className="grid grid-cols-12 gap-4 items-center p-4 rounded-lg bg-gray-50">
                <div className="col-span-8 font-medium text-gray-700">Net Profit / (Loss)</div>
                <div className="col-span-4 text-right">
                  <span className={`text-lg font-semibold ${parseFloat(formatCurrency(plData.net_profit_loss)) < 0 ? 'text-red-600' : 'text-gray-900'}`}>
                    £{formatCurrency(plData.net_profit_loss)}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-12 gap-4 items-center p-4 rounded-lg bg-white">
                <div className="col-span-8 font-medium text-gray-700">
                  Add Private Use Adjustment Car ({plData.percentage_adj?.private_use_adj_car}%)
                </div>
                <div className="col-span-4 text-right">
                  <span className="text-lg font-semibold text-gray-900">£{formatCurrency(plData.add_private_use_adjustment_car)}</span>
                </div>
              </div>

              <div className="grid grid-cols-12 gap-4 items-center p-4 rounded-lg bg-gray-50">
                <div className="col-span-8 font-medium text-gray-700">
                  Add Private Use Adjustment Telephone ({plData.percentage_adj?.private_use_adj_phone}%)
                </div>
                <div className="col-span-4 text-right">
                  <span className="text-lg font-semibold text-gray-900">£{formatCurrency(plData.add_private_use_adjustment_telephone)}</span>
                </div>
              </div>

              <div className="grid grid-cols-12 gap-4 items-center p-4 rounded-lg bg-white">
                <div className="col-span-8 font-medium text-gray-700">Vehicle Disposal</div>
                <div className="col-span-4 text-right">
                  <span className="text-lg font-semibold text-gray-900">£{formatCurrency(plData.vehicle_disposal)}</span>
                </div>
              </div>

              {/* Final Net Balance */}
              <div className="grid grid-cols-12 gap-4 items-center p-4 rounded-lg bg-slate-50 border-t-2 border-slate-200 mt-4">
                <div className="col-span-8 font-bold text-slate-900">Final Net Balance</div>
                <div className="col-span-4 text-right">
                  <span className={`text-2xl font-bold ${parseFloat(formatCurrency(plData.total_net_balance)) < 0 ? 'text-red-600' : 'text-green-600'}`}>
                    £{formatCurrency(plData.total_net_balance)}
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