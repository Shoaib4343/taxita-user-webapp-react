
// import React, { useState } from "react";
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
//   FaParking,
//   FaArrowRight,
// } from "react-icons/fa";
// import { generateWeeksForYear } from "../utils/generateWeeks";
// import { IoCalendarOutline } from "react-icons/io5";
// import ExpenseModal from "../components/ExpenseModal";
// import ExpenseTransactionsModal from "../components/ExpenseTransactionsModal"; // Add this import
// import { Link } from "react-router-dom";
// import SidebarWeeksExpense from "../components/SidebarWeeksExpense";
// import toast from "react-hot-toast";

// const weeksData = generateWeeksForYear(2025);

// const motorExpenses = [
//   { id: 6, title: "Fuel Expenses", icon: FaGasPump, color: "bg-red-500" },
//   { id: 7, title: "Oil Expenses", icon: FaOilCan, color: "bg-yellow-500" },
//   { id: 8, title: "Car Tax", icon: FaCar, color: "bg-blue-500" },
//   {
//     id: 9,
//     title: "Insurance Expenses",
//     icon: FaShieldAlt,
//     color: "bg-green-500",
//   },
//   {
//     id: 10,
//     title: "Servicing / Repairs",
//     icon: FaTools,
//     color: "bg-purple-500",
//   },
//   { id: 11, title: "Tyres Expenses", icon: FaDotCircle, color: "bg-pink-500" },
//   {
//     id: 12,
//     title: "Vehicle Rental Lease",
//     icon: FaCarSide,
//     color: "bg-indigo-500",
//   },
//   {
//     id: 13,
//     title: "Vehicle Loan Interest",
//     icon: FaMoneyCheckAlt,
//     color: "bg-orange-500",
//   },
//   { id: 14, title: "Other Motor Expenses", icon: FaCogs, color: "bg-gray-500" },
// ];

// const additionalExpenses = [
//   {
//     id: 15,
//     title: "Radio Rent / Commission fee / Subscription fee",
//     icon: FaDotCircle,
//     color: "bg-blue-500",
//   },
//   {
//     id: 16,
//     title: "Mobile / Telephone costs",
//     icon: FaPhoneAlt,
//     color: "bg-green-500",
//   },
//   {
//     id: 17,
//     title: "Driver / Licences / Badge / Medical",
//     icon: FaIdBadge,
//     color: "bg-red-500",
//   },
//   {
//     id: 18,
//     title: "Repairs / Renewals to equipment",
//     icon: FaWrench,
//     color: "bg-yellow-500",
//   },
//   {
//     id: 19,
//     title: "Legal and accountancy costs",
//     icon: FaBalanceScale,
//     color: "bg-purple-500",
//   },
//   {
//     id: 20,
//     title: "Car cleaning / Valeting",
//     icon: FaSoap,
//     color: "bg-pink-500",
//   },
//   {
//     id: 21,
//     title: "Wages to employee",
//     icon: FaUserTie,
//     color: "bg-indigo-500",
//   },
//   {
//     id: 22,
//     title: "Use of home as office",
//     icon: FaHome,
//     color: "bg-orange-500",
//   },
//   {
//     id: 23,
//     title: "Misc / Sundry expenses",
//     icon: FaBox,
//     color: "bg-gray-500",
//   },
//   {
//     id: 24,
//     title: "Parking / Toll charges",
//     icon: FaParking,
//     color: "bg-teal-500",
//   },
// ];

// const Expenses = () => {
//   const [currentWeek, setCurrentWeek] = useState(null);
//   const [selectedDay, setSelectedDay] = useState(null);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [activeCard, setActiveCard] = useState(null);
//   const [refreshTrigger, setRefreshTrigger] = useState(0);
//   const [transactionsModalOpen, setTransactionsModalOpen] = useState(false); // Add this state

//   const handleCardClick = (card) => {
//     if (!selectedDay) {
//       toast.error("Please select a day first");
//       return;
//     }
//     setActiveCard(card);
//     setModalOpen(true);
//   };

//   const handleTransactionSuccess = () => {
//     // Increment refresh trigger to force sidebar to refetch data
//     setRefreshTrigger(prev => prev + 1);
    
//     // Close modal
//     setModalOpen(false);
//   };

//   // Handler for opening transactions modal - ADD THIS FUNCTION
//   const handleViewAllExpenses = () => {
//     if (!selectedDay) {
//       toast.error("Please select a day first");
//       return;
//     }
//     setTransactionsModalOpen(true);
//   };

//   // Handler for when a transaction is deleted - ADD THIS FUNCTION
//   const handleTransactionDeleted = () => {
//     setRefreshTrigger(prev => prev + 1);
//   };

//   const renderCardSection = (title, data) => (
//     <>
//       <h2 className="text-lg font-semibold mb-4 mt-6">{title}</h2>
//       <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//         {data.map((item) => (
//           <div
//             key={item.id}
//             onClick={() => handleCardClick(item)}
//             className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-4 hover:shadow-md hover:cursor-pointer transition"
//           >
//             <div
//               className={`w-12 h-12 rounded-full flex flex-shrink-0 items-center justify-center text-white ${item.color}`}
//             >
//               <item.icon className="text-xl" />
//             </div>
//             <div>
//               <h3 className="text-sm font-medium text-gray-500 line-clamp-3">
//                 {item.title}
//               </h3>
//             </div>
//           </div>
//         ))}
//       </div>
//     </>
//   );

//   return (
//     <div className="h-screen flex flex-col rounded-xl">
//       {/* Header */}
//       <div className="flex justify-between items-center bg-white border-b border-gray-200 p-4 rounded-t-xl">
//         <div>
//           <h2 className="text-xl font-semibold mb-1">Your Expenses</h2>
//           <p className="text-sm text-gray-500">Your Expense listings go here...</p>
//         </div>
//         <div className="flex items-center text-sm md:mt-0">
//           <Link to="/dashboard" className="hover:underline text-blue-600">
//             Dashboard
//           </Link>
//           <span className="mx-2">/</span>
//           <span>Expense</span>
//         </div>
//       </div>

//       <div className="flex flex-1 overflow-hidden bg-white rounded-b-xl">
//         {/* Sidebar */}
//         <SidebarWeeksExpense
//           onSelect={({ week, day, days }) => {
//             setCurrentWeek({ ...week, days: days || [] });
//             setSelectedDay(day);
//           }}
//           refreshTrigger={refreshTrigger}
//         />

//         {/* Main content */}
//         <main className="flex-1 p-6 overflow-y-auto">
//           <div className="flex items-center justify-between mb-4">
//             <h1 className="text-2xl font-bold">Your Daily Expenses</h1>
//             {selectedDay && (
//               <button 
//                 onClick={handleViewAllExpenses} // ADD THIS CLICK HANDLER
//                 className="bg-blue-50 text-blue-600 font-medium text-sm px-4 py-2 rounded-lg shadow-sm hover:bg-blue-100 hover:shadow-md transition duration-200 flex items-center gap-2 hover:cursor-pointer"
//               >
//                 <span>View all expenses against {selectedDay.label}</span>
//                 <FaArrowRight className="w-3 h-4" />
//               </button>
//             )}
//           </div>

//           {selectedDay && (
//             <p className="text-gray-600 mb-6 flex items-center gap-2">
//               <IoCalendarOutline className="w-5 h-5 text-blue-500" />
//               {selectedDay.label} (£{Number(selectedDay.total || 0).toFixed(2)})
//             </p>
//           )}

//           {/* Card Sections */}
//           {renderCardSection("Motor Expenses", motorExpenses)}
//           {renderCardSection("Additional Expenses", additionalExpenses)}
//         </main>
//       </div>

//       {/* Expense Modal */}
//       {activeCard && (
//         <ExpenseModal
//           open={modalOpen}
//           onClose={() => setModalOpen(false)}
//           card={activeCard}
//           selectedDay={selectedDay}
//           onSuccess={handleTransactionSuccess}
//         />
//       )}

//       {/* Expense Transactions Modal - ADD THIS MODAL */}
//       <ExpenseTransactionsModal
//         open={transactionsModalOpen}
//         onClose={() => setTransactionsModalOpen(false)}
//         selectedDay={selectedDay}
//         onTransactionDeleted={handleTransactionDeleted}
//       />
//     </div>
//   );
// };

// export default Expenses;



































// import React, { useState, useEffect } from "react";
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
//   FaParking,
//   FaArrowRight,
//   FaArrowDown,
// } from "react-icons/fa";
// import { IoCalendarOutline } from "react-icons/io5";
// import { TrendingDown } from "lucide-react";
// import toast from "react-hot-toast";

// import SidebarWeeksExpense from "../components/SidebarWeeksExpense";
// import ExpenseModal from "../components/ExpenseModal";
// import ExpenseTransactionsModal from "../components/ExpenseTransactionsModal";
// import PageHeader from "../components/PageHeader";
// import { useTradingYear } from "../context/TradingYearContext";

// // Motor expenses data
// const motorExpenses = [
//   { id: 6, title: "Fuel Expenses", icon: FaGasPump, color: "bg-red-500" },
//   { id: 7, title: "Oil Expenses", icon: FaOilCan, color: "bg-yellow-500" },
//   { id: 8, title: "Car Tax", icon: FaCar, color: "bg-blue-500" },
//   {
//     id: 9,
//     title: "Insurance Expenses",
//     icon: FaShieldAlt,
//     color: "bg-green-500",
//   },
//   {
//     id: 10,
//     title: "Servicing / Repairs",
//     icon: FaTools,
//     color: "bg-purple-500",
//   },
//   { id: 11, title: "Tyres Expenses", icon: FaDotCircle, color: "bg-pink-500" },
//   {
//     id: 12,
//     title: "Vehicle Rental Lease",
//     icon: FaCarSide,
//     color: "bg-indigo-500",
//   },
//   {
//     id: 13,
//     title: "Vehicle Loan Interest",
//     icon: FaMoneyCheckAlt,
//     color: "bg-orange-500",
//   },
//   { id: 14, title: "Other Motor Expenses", icon: FaCogs, color: "bg-gray-500" },
// ];

// // Additional expenses data
// const additionalExpenses = [
//   {
//     id: 15,
//     title: "Radio Rent / Commission fee / Subscription fee",
//     icon: FaDotCircle,
//     color: "bg-blue-500",
//   },
//   {
//     id: 16,
//     title: "Mobile / Telephone costs",
//     icon: FaPhoneAlt,
//     color: "bg-green-500",
//   },
//   {
//     id: 17,
//     title: "Driver / Licences / Badge / Medical",
//     icon: FaIdBadge,
//     color: "bg-red-500",
//   },
//   {
//     id: 18,
//     title: "Repairs / Renewals to equipment",
//     icon: FaWrench,
//     color: "bg-yellow-500",
//   },
//   {
//     id: 19,
//     title: "Legal and accountancy costs",
//     icon: FaBalanceScale,
//     color: "bg-purple-500",
//   },
//   {
//     id: 20,
//     title: "Car cleaning / Valeting",
//     icon: FaSoap,
//     color: "bg-pink-500",
//   },
//   {
//     id: 21,
//     title: "Wages to employee",
//     icon: FaUserTie,
//     color: "bg-indigo-500",
//   },
//   {
//     id: 22,
//     title: "Use of home as office",
//     icon: FaHome,
//     color: "bg-orange-500",
//   },
//   {
//     id: 23,
//     title: "Misc / Sundry expenses",
//     icon: FaBox,
//     color: "bg-gray-500",
//   },
//   {
//     id: 24,
//     title: "Parking / Toll charges",
//     icon: FaParking,
//     color: "bg-teal-500",
//   },
// ];

// const Expenses = () => {
//   const [currentWeek, setCurrentWeek] = useState(null);
//   const [selectedDay, setSelectedDay] = useState(null);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [activeCard, setActiveCard] = useState(null);
//   const [refreshTrigger, setRefreshTrigger] = useState(0);
//   const [transactionsModalOpen, setTransactionsModalOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);

//   // Get trading year context - EXACT same pattern as Income
//   const { apiRefreshTrigger, activeTradingYear } = useTradingYear();

//   // Simple loading timer - just like the Income component
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//     }, 1500);

//     return () => clearTimeout(timer);
//   }, []);

//   // Listen for trading year changes - EXACT same pattern as Income
//   useEffect(() => {
//     if (apiRefreshTrigger > 0) {
//       console.log('Expenses: Refreshing data due to trading year change');
//       setRefreshTrigger(prev => prev + 1);
//     }
//   }, [apiRefreshTrigger]);

//   // Handler when a user clicks on an expense card
//   const handleCardClick = (card) => {
//     if (!selectedDay) {
//       toast.error("Please select a day first");
//       return;
//     }
//     setActiveCard(card);
//     setModalOpen(true);
//   };

//   // Handler for successful transaction - triggers data refresh
//   const handleTransactionSuccess = () => {
//     setRefreshTrigger(prev => prev + 1);
//     setModalOpen(false);
//   };

//   // Handler for opening transactions modal
//   const handleViewAllExpenses = () => {
//     if (!selectedDay) {
//       toast.error("Please select a day first");
//       return;
//     }
//     setTransactionsModalOpen(true);
//   };

//   // Handler for when a transaction is deleted
//   const handleTransactionDeleted = () => {
//     setRefreshTrigger(prev => prev + 1);
//   };

//   // Handler for sidebar selection
//   const handleSidebarSelect = ({ week, day, days }) => {
//     setCurrentWeek({ ...week, days: days || [] });
//     setSelectedDay(day);
//   };

//   // Custom Page Loading Skeleton - Same as Income page
//   const PageLoadingSkeleton = () => (
//     <div className="min-h-screen bg-white rounded-2xl">
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         {/* Page Header Skeleton */}
//         <div className="mb-8">
//           <div className="flex items-center gap-3 mb-4">
//             <div className="w-10 h-10 bg-gray-200 rounded-xl animate-pulse"></div>
//             <div>
//               <div className="w-32 h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
//               <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
//             </div>
//           </div>
//           <div className="w-96 h-4 bg-gray-200 rounded animate-pulse"></div>
//         </div>

//         {/* Layout Skeleton */}
//         <div className="flex bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
//           {/* Sidebar Skeleton */}
//           <div className="w-80 border-r border-gray-200 p-4">
//             <div className="w-40 h-5 bg-gray-200 rounded animate-pulse mb-4"></div>
//             <div className="w-full h-12 bg-gray-200 rounded-lg animate-pulse mb-4"></div>
//             <div className="space-y-3">
//               {[...Array(7)].map((_, i) => (
//                 <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
//                   <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
//                   <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Main Content Skeleton */}
//           <div className="flex-1 p-6">
//             <div className="flex justify-between items-center mb-6">
//               <div>
//                 <div className="w-56 h-7 bg-gray-200 rounded animate-pulse mb-2"></div>
//                 <div className="w-72 h-4 bg-gray-200 rounded animate-pulse"></div>
//               </div>
//               <div className="w-40 h-10 bg-gray-200 rounded-xl animate-pulse"></div>
//             </div>

//             <div className="bg-gray-50 rounded-2xl p-6 mb-6">
//               <div className="flex justify-between items-center">
//                 <div className="flex items-center gap-3">
//                   <div className="w-12 h-12 bg-gray-200 rounded-xl animate-pulse"></div>
//                   <div>
//                     <div className="w-32 h-5 bg-gray-200 rounded animate-pulse mb-2"></div>
//                     <div className="w-40 h-4 bg-gray-200 rounded animate-pulse"></div>
//                   </div>
//                 </div>
//                 <div className="text-right">
//                   <div className="w-20 h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
//                   <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
//                 </div>
//               </div>
//             </div>

//             {/* Motor Expenses Section */}
//             <div className="w-40 h-6 bg-gray-200 rounded animate-pulse mb-4"></div>
//             <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 mb-8">
//               {[...Array(9)].map((_, i) => (
//                 <div key={i} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
//                   <div className="flex items-center gap-4">
//                     <div className="w-14 h-14 bg-gray-200 rounded-xl animate-pulse"></div>
//                     <div className="flex-1">
//                       <div className="w-32 h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
//                       <div className="w-40 h-3 bg-gray-200 rounded animate-pulse"></div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Additional Expenses Section */}
//             <div className="w-48 h-6 bg-gray-200 rounded animate-pulse mb-4"></div>
//             <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
//               {[...Array(10)].map((_, i) => (
//                 <div key={i} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
//                   <div className="flex items-center gap-4">
//                     <div className="w-14 h-14 bg-gray-200 rounded-xl animate-pulse"></div>
//                     <div className="flex-1">
//                       <div className="w-32 h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
//                       <div className="w-40 h-3 bg-gray-200 rounded animate-pulse"></div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   const renderCardSection = (title, data) => (
//     <>
//       <h2 className="text-lg font-semibold mb-4 mt-6">{title}</h2>
//       <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//         {data.map((item) => (
//           <div
//             key={item.id}
//             onClick={() => handleCardClick(item)}
//             className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-4 hover:shadow-md hover:cursor-pointer transition"
//           >
//             <div
//               className={`w-12 h-12 min-w-[48px] min-h-[48px] rounded-full flex items-center justify-center text-white ${item.color}`}
//             >
//               <item.icon className="text-xl" />
//             </div>
//             <div>
//               <h3 className="text-sm font-medium text-gray-500">
//                 {item.title}
//               </h3>
//             </div>
//           </div>
//         ))}
//       </div>
//     </>
//   );

//   // Show custom loading skeleton
//   if (isLoading) {
//     return <PageLoadingSkeleton />;
//   }

//   return (
//     <div className="min-h-screen bg-white rounded-2xl">
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         {/* Page Header - Same as Income */}
//         <PageHeader
//           icon={<FaArrowDown />}
//           title="Your Expenses"
//           currentPage="Expenses"
//           showTradingYear={false}
//           activeTradingYear={activeTradingYear}
//           subtitle="Track and manage your daily expenses across different expense categories."
//         />

//         {/* Layout - Same structure as Income */}
//         <div className="flex flex-1 overflow-hidden bg-white rounded-2xl shadow-lg border border-gray-100 mt-8">
//           {/* Sidebar for weeks/days */}
//           <SidebarWeeksExpense
//             onSelect={handleSidebarSelect}
//             refreshTrigger={refreshTrigger}
//             activeTradingYear={activeTradingYear}
//             apiRefreshTrigger={apiRefreshTrigger}
//           />

//           {/* Main content area */}
//           <main className="flex-1 p-6 overflow-y-auto">
//             {/* Action Header - Same as Income */}
//             <div className="flex items-center justify-between mb-4">
//               <h1 className="text-2xl font-bold">Your Daily Expenses</h1>
//               {selectedDay && (
//                 <button 
//                   onClick={handleViewAllExpenses}
//                   className="bg-red-50 text-red-600 font-medium text-sm px-4 py-2 rounded-lg shadow-sm hover:bg-red-100 hover:shadow-md transition duration-200 flex items-center gap-2 hover:cursor-pointer"
//                 >
//                   <span>View all expenses against {selectedDay.label}</span>
//                   <FaArrowRight className="w-3 h-4" />
//                 </button>
//               )}
//             </div>

//             {/* Show selected day's total - Same as Income */}
//             {selectedDay && (
//               <p className="text-gray-600 mb-6 flex items-center gap-2">
//                 <IoCalendarOutline className="w-5 h-5 text-red-500" />
//                 {selectedDay.label} (£{Number(selectedDay.total || 0).toFixed(2)})
//               </p>
//             )}

//             {/* Expense Cards - Keep Original Design */}
//             {renderCardSection("Motor Expenses", motorExpenses)}
//             {renderCardSection("Additional Expenses", additionalExpenses)}
//           </main>
//         </div>
//       </div>

//       {/* Expense Modal */}
//       {activeCard && (
//         <ExpenseModal
//           open={modalOpen}
//           onClose={() => setModalOpen(false)}
//           card={activeCard}
//           selectedDay={selectedDay}
//           onSuccess={handleTransactionSuccess}
//         />
//       )}

//       {/* Transactions Modal - NOW WITH REFRESH PROPS */}
//       <ExpenseTransactionsModal
//         open={transactionsModalOpen}
//         onClose={() => setTransactionsModalOpen(false)}
//         selectedDay={selectedDay}
//         onTransactionDeleted={handleTransactionDeleted}
//         refreshTrigger={refreshTrigger}
//         apiRefreshTrigger={apiRefreshTrigger}
//       />
//     </div>
//   );
// };

// export default Expenses;

// ================================== thsi si the fine version of the expense page but i wan tot sue the cards api call dynaic cards below




















































































// import React, { useState, useEffect } from "react";
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
//   FaParking,
//   FaArrowRight,
//   FaArrowDown,
// } from "react-icons/fa";
// import { IoCalendarOutline } from "react-icons/io5";
// import { TrendingDown } from "lucide-react";
// import toast from "react-hot-toast";

// import SidebarWeeksExpense from "../components/SidebarWeeksExpense";
// import ExpenseModal from "../components/ExpenseModal";
// import ExpenseTransactionsModal from "../components/ExpenseTransactionsModal";
// import PageHeader from "../components/PageHeader";
// import { useTradingYear } from "../context/TradingYearContext";
// import { getAccountsApi } from "../services/dashboard"; // Add this import

// // Icon mapping for expense accounts based on short_name
// const iconMapping = {
//   // Motor Expenses
//   fuel: { icon: FaGasPump, color: "bg-red-500" },
//   oil: { icon: FaOilCan, color: "bg-yellow-500" },
//   car_tax: { icon: FaCar, color: "bg-blue-500" },
//   insurance: { icon: FaShieldAlt, color: "bg-green-500" },
//   servicing_repairs: { icon: FaTools, color: "bg-purple-500" },
//   tyres: { icon: FaDotCircle, color: "bg-pink-500" },
//   vehicle_rental_lease: { icon: FaCarSide, color: "bg-indigo-500" },
//   vehicle_loan_interest: { icon: FaMoneyCheckAlt, color: "bg-orange-500" },
//   other_motor_expenses: { icon: FaCogs, color: "bg-gray-500" },
  
//   // Additional Expenses
//   radio_rent: { icon: FaDotCircle, color: "bg-blue-500" },
//   mobile_telephone_costs: { icon: FaPhoneAlt, color: "bg-green-500" },
//   driver_licence_badge_medical: { icon: FaIdBadge, color: "bg-red-500" },
//   repair_renewals_equipment: { icon: FaWrench, color: "bg-yellow-500" },
//   legal_accountancy_costs: { icon: FaBalanceScale, color: "bg-purple-500" },
//   car_cleaning_valeting: { icon: FaSoap, color: "bg-pink-500" },
//   wages_to_employee: { icon: FaUserTie, color: "bg-indigo-500" },
//   use_of_home_as_office: { icon: FaHome, color: "bg-orange-500" },
//   misc_sundry_expenses: { icon: FaBox, color: "bg-gray-500" },
//   parking_toll_charges: { icon: FaParking, color: "bg-teal-500" },
// };

// const Expenses = () => {
//   const [currentWeek, setCurrentWeek] = useState(null);
//   const [selectedDay, setSelectedDay] = useState(null);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [activeCard, setActiveCard] = useState(null);
//   const [refreshTrigger, setRefreshTrigger] = useState(0);
//   const [transactionsModalOpen, setTransactionsModalOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [motorExpenses, setMotorExpenses] = useState([]); // New state for motor expenses
//   const [additionalExpenses, setAdditionalExpenses] = useState([]); // New state for additional expenses

//   // Get trading year context - EXACT same pattern as Income
//   const { apiRefreshTrigger, activeTradingYear } = useTradingYear();

//   // Fetch accounts data from API
//   const fetchAccounts = async () => {
//     try {
//       const response = await getAccountsApi();
//       // Filter only expense accounts (type_id === 2)
//       const expenseData = response.data.filter(account => account.type_id === 2);
      
//       // Map API data to component format and categorize
//       const mappedExpenseData = expenseData.map(account => {
//         const iconConfig = iconMapping[account.short_name] || {
//           icon: FaCogs,
//           color: "bg-gray-500"
//         };
        
//         return {
//           id: account.id,
//           title: account.name,
//           short_name: account.short_name,
//           category_name: account.category_name,
//           description: account.description,
//           icon: iconConfig.icon,
//           color: iconConfig.color
//         };
//       });
      
//       // Separate motor expenses and additional expenses
//       const motor = mappedExpenseData.filter(expense => 
//         expense.category_name === "Motor Expenses"
//       );
//       const additional = mappedExpenseData.filter(expense => 
//         expense.category_name !== "Motor Expenses"
//       );
      
//       setMotorExpenses(motor);
//       setAdditionalExpenses(additional);
      
//     } catch (error) {
//       console.error('Error fetching accounts:', error);
//       toast.error('Failed to load expense accounts');
//     }
//   };

//   // Simple loading timer - just like the Income component
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//     }, 1500);

//     return () => clearTimeout(timer);
//   }, []);

//   // Fetch accounts on component mount and when refresh triggers change
//   useEffect(() => {
//     fetchAccounts();
//   }, [refreshTrigger, apiRefreshTrigger]);

//   // Listen for trading year changes - EXACT same pattern as Income
//   useEffect(() => {
//     if (apiRefreshTrigger > 0) {
//       console.log('Expenses: Refreshing data due to trading year change');
//       setRefreshTrigger(prev => prev + 1);
//     }
//   }, [apiRefreshTrigger]);

//   // Handler when a user clicks on an expense card
//   const handleCardClick = (card) => {
//     if (!selectedDay) {
//       toast.error("Please select a day first");
//       return;
//     }
//     setActiveCard(card);
//     setModalOpen(true);
//   };

//   // Handler for successful transaction - triggers data refresh
//   const handleTransactionSuccess = () => {
//     setRefreshTrigger(prev => prev + 1);
//     setModalOpen(false);
//   };

//   // Handler for opening transactions modal
//   const handleViewAllExpenses = () => {
//     if (!selectedDay) {
//       toast.error("Please select a day first");
//       return;
//     }
//     setTransactionsModalOpen(true);
//   };

//   // Handler for when a transaction is deleted
//   const handleTransactionDeleted = () => {
//     setRefreshTrigger(prev => prev + 1);
//   };

//   // Handler for sidebar selection
//   const handleSidebarSelect = ({ week, day, days }) => {
//     setCurrentWeek({ ...week, days: days || [] });
//     setSelectedDay(day);
//   };

//   // Custom Page Loading Skeleton - Same as Income page
//   const PageLoadingSkeleton = () => (
//     <div className="min-h-screen bg-white rounded-2xl">
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         {/* Page Header Skeleton */}
//         <div className="mb-8">
//           <div className="flex items-center gap-3 mb-4">
//             <div className="w-10 h-10 bg-gray-200 rounded-xl animate-pulse"></div>
//             <div>
//               <div className="w-32 h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
//               <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
//             </div>
//           </div>
//           <div className="w-96 h-4 bg-gray-200 rounded animate-pulse"></div>
//         </div>

//         {/* Layout Skeleton */}
//         <div className="flex bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
//           {/* Sidebar Skeleton */}
//           <div className="w-80 border-r border-gray-200 p-4">
//             <div className="w-40 h-5 bg-gray-200 rounded animate-pulse mb-4"></div>
//             <div className="w-full h-12 bg-gray-200 rounded-lg animate-pulse mb-4"></div>
//             <div className="space-y-3">
//               {[...Array(7)].map((_, i) => (
//                 <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
//                   <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
//                   <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Main Content Skeleton */}
//           <div className="flex-1 p-6">
//             <div className="flex justify-between items-center mb-6">
//               <div>
//                 <div className="w-56 h-7 bg-gray-200 rounded animate-pulse mb-2"></div>
//                 <div className="w-72 h-4 bg-gray-200 rounded animate-pulse"></div>
//               </div>
//               <div className="w-40 h-10 bg-gray-200 rounded-xl animate-pulse"></div>
//             </div>

//             <div className="bg-gray-50 rounded-2xl p-6 mb-6">
//               <div className="flex justify-between items-center">
//                 <div className="flex items-center gap-3">
//                   <div className="w-12 h-12 bg-gray-200 rounded-xl animate-pulse"></div>
//                   <div>
//                     <div className="w-32 h-5 bg-gray-200 rounded animate-pulse mb-2"></div>
//                     <div className="w-40 h-4 bg-gray-200 rounded animate-pulse"></div>
//                   </div>
//                 </div>
//                 <div className="text-right">
//                   <div className="w-20 h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
//                   <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
//                 </div>
//               </div>
//             </div>

//             {/* Motor Expenses Section */}
//             <div className="w-40 h-6 bg-gray-200 rounded animate-pulse mb-4"></div>
//             <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 mb-8">
//               {[...Array(9)].map((_, i) => (
//                 <div key={i} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
//                   <div className="flex items-center gap-4">
//                     <div className="w-14 h-14 bg-gray-200 rounded-xl animate-pulse"></div>
//                     <div className="flex-1">
//                       <div className="w-32 h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
//                       <div className="w-40 h-3 bg-gray-200 rounded animate-pulse"></div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Additional Expenses Section */}
//             <div className="w-48 h-6 bg-gray-200 rounded animate-pulse mb-4"></div>
//             <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
//               {[...Array(10)].map((_, i) => (
//                 <div key={i} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
//                   <div className="flex items-center gap-4">
//                     <div className="w-14 h-14 bg-gray-200 rounded-xl animate-pulse"></div>
//                     <div className="flex-1">
//                       <div className="w-32 h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
//                       <div className="w-40 h-3 bg-gray-200 rounded animate-pulse"></div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   const renderCardSection = (title, data) => (
//     <>
//       <h2 className="text-lg font-semibold mb-4 mt-6">{title}</h2>
//       <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//         {data.map((item) => (
//           <div
//             key={item.id}
//             onClick={() => handleCardClick(item)}
//             className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-4 hover:shadow-md hover:cursor-pointer transition"
//           >
//             <div
//               className={`w-12 h-12 min-w-[48px] min-h-[48px] rounded-full flex items-center justify-center text-white ${item.color}`}
//             >
//               <item.icon className="text-xl" />
//             </div>
//             <div>
//               <h3 className="text-sm font-medium text-gray-500">
//                 {item.title}
//               </h3>
//               <p className="text-xs text-gray-400">{item.category_name}</p>
//             </div>
//           </div>
//         ))}
//       </div>
      
//       {/* Show message if no data found for this section */}
//       {data.length === 0 && !isLoading && (
//         <div className="text-center py-4">
//           <p className="text-gray-500 text-sm">No {title.toLowerCase()} found</p>
//         </div>
//       )}
//     </>
//   );

//   // Show custom loading skeleton
//   if (isLoading) {
//     return <PageLoadingSkeleton />;
//   }

//   return (
//     <div className="min-h-screen bg-white rounded-2xl">
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         {/* Page Header - Same as Income */}
//         <PageHeader
//           icon={<FaArrowDown />}
//           title="Your Expenses"
//           currentPage="Expenses"
//           showTradingYear={false}
//           activeTradingYear={activeTradingYear}
//           subtitle="Track and manage your daily expenses across different expense categories."
//         />

//         {/* Layout - Same structure as Income */}
//         <div className="flex flex-1 overflow-hidden bg-white rounded-2xl shadow-lg border border-gray-100 mt-8">
//           {/* Sidebar for weeks/days */}
//           <SidebarWeeksExpense
//             onSelect={handleSidebarSelect}
//             refreshTrigger={refreshTrigger}
//             activeTradingYear={activeTradingYear}
//             apiRefreshTrigger={apiRefreshTrigger}
//           />

//           {/* Main content area */}
//           <main className="flex-1 p-6 overflow-y-auto">
//             {/* Action Header - Same as Income */}
//             <div className="flex items-center justify-between mb-4">
//               <h1 className="text-2xl font-bold">Your Daily Expenses</h1>
//               {selectedDay && (
//                 <button 
//                   onClick={handleViewAllExpenses}
//                   className="bg-red-50 text-red-600 font-medium text-sm px-4 py-2 rounded-lg shadow-sm hover:bg-red-100 hover:shadow-md transition duration-200 flex items-center gap-2 hover:cursor-pointer"
//                 >
//                   <span>View all expenses against {selectedDay.label}</span>
//                   <FaArrowRight className="w-3 h-4" />
//                 </button>
//               )}
//             </div>

//             {/* Show selected day's total - Same as Income */}
//             {selectedDay && (
//               <p className="text-gray-600 mb-6 flex items-center gap-2">
//                 <IoCalendarOutline className="w-5 h-5 text-red-500" />
//                 {selectedDay.label} (£{Number(selectedDay.total || 0).toFixed(2)})
//               </p>
//             )}

//             {/* Dynamic Expense Cards */}
//             {renderCardSection("Motor Expenses", motorExpenses)}
//             {renderCardSection("Additional Expenses", additionalExpenses)}
//           </main>
//         </div>
//       </div>

//       {/* Expense Modal */}
//       {activeCard && (
//         <ExpenseModal
//           open={modalOpen}
//           onClose={() => setModalOpen(false)}
//           card={activeCard}
//           selectedDay={selectedDay}
//           onSuccess={handleTransactionSuccess}
//         />
//       )}

//       {/* Transactions Modal - NOW WITH REFRESH PROPS */}
//       <ExpenseTransactionsModal
//         open={transactionsModalOpen}
//         onClose={() => setTransactionsModalOpen(false)}
//         selectedDay={selectedDay}
//         onTransactionDeleted={handleTransactionDeleted}
//         refreshTrigger={refreshTrigger}
//         apiRefreshTrigger={apiRefreshTrigger}
//       />
//     </div>
//   );
// };

// export default Expenses;








































import React, { useState, useEffect } from "react";
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
  FaParking,
  FaArrowRight,
  FaArrowDown,
} from "react-icons/fa";
import { IoCalendarOutline } from "react-icons/io5";
import { TrendingDown } from "lucide-react";
import toast from "react-hot-toast";

import SidebarWeeksExpense from "../components/SidebarWeeksExpense";
import ExpenseModal from "../components/ExpenseModal";
import ExpenseTransactionsModal from "../components/ExpenseTransactionsModal";
import PageHeader from "../components/PageHeader";
import { useTradingYear } from "../context/TradingYearContext";
import { useAccounts } from "../context/AccountsContext";
import { 
  AccountsPageSkeleton, 
  LoadingState, 
  ErrorState, 
  EmptyState 
} from "../components/skeletons/Skeleton";

// Icon components mapping
const iconComponents = {
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
  FaParking,
};

const Expenses = () => {
  const [currentWeek, setCurrentWeek] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [transactionsModalOpen, setTransactionsModalOpen] = useState(false);

  // Get trading year context
  const { apiRefreshTrigger, activeTradingYear } = useTradingYear();

  // Get accounts context
  const {
    motorExpenses,
    additionalExpenses,
    loading,
    refreshing,
    error,
    apiRefreshTrigger: accountsApiRefreshTrigger,
    refreshAccounts,
    isAccountsLoaded
  } = useAccounts();

  // Listen for trading year changes and accounts API refresh
  useEffect(() => {
    if (apiRefreshTrigger > 0 || accountsApiRefreshTrigger > 0) {
      console.log('Expenses: Refreshing data due to context changes');
      setRefreshTrigger(prev => prev + 1);
    }
  }, [apiRefreshTrigger, accountsApiRefreshTrigger]);

  // Handler when a user clicks on an expense card
  const handleCardClick = (card) => {
    if (!selectedDay) {
      toast.error("Please select a day first");
      return;
    }
    setActiveCard(card);
    setModalOpen(true);
  };

  // Handler for successful transaction - triggers data refresh
  const handleTransactionSuccess = () => {
    setRefreshTrigger(prev => prev + 1);
    setModalOpen(false);
  };

  // Handler for opening transactions modal
  const handleViewAllExpenses = () => {
    if (!selectedDay) {
      toast.error("Please select a day first");
      return;
    }
    setTransactionsModalOpen(true);
  };

  // Handler for when a transaction is deleted
  const handleTransactionDeleted = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  // Handler for sidebar selection
  const handleSidebarSelect = ({ week, day, days }) => {
    setCurrentWeek({ ...week, days: days || [] });
    setSelectedDay(day);
  };

  // Handler for retry when error occurs
  const handleRetry = () => {
    refreshAccounts();
  };

  // Render card section with proper icon components
  const renderCardSection = (title, data) => (
    <>
      <h2 className="text-lg font-semibold mb-4 mt-6">{title}</h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((item) => {
          const IconComponent = iconComponents[item.iconName] || FaCogs;
          
          return (
            <div
              key={item.id}
              onClick={() => handleCardClick(item)}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-4 hover:shadow-md hover:cursor-pointer transition"
            >
              <div
                className={`w-12 h-12 min-w-[48px] min-h-[48px] rounded-full flex items-center justify-center text-white ${item.color}`}
              >
                <IconComponent className="text-xl" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  {item.title}
                </h3>
                {/* <p className="text-xs text-gray-400">{item.category_name}</p> */}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Show message if no data found for this section */}
      {data.length === 0 && isAccountsLoaded() && (
        <EmptyState
          title={`No ${title.toLowerCase()} found`}
          description={`There are no ${title.toLowerCase()} configured in your system.`}
          className="py-8"
        />
      )}
    </>
  );

  // Show loading skeleton
  if (loading && !isAccountsLoaded()) {
    return <AccountsPageSkeleton showTwoSections={true} />;
  }

  // Show error state
  if (error && !isAccountsLoaded()) {
    return (
      <div className="min-h-screen bg-white rounded-2xl">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <PageHeader
            icon={<FaArrowDown />}
            title="Your Expenses"
            currentPage="Expenses"
            showTradingYear={false}
            activeTradingYear={activeTradingYear}
            subtitle="Track and manage your daily expenses across different expense categories."
          />
          <ErrorState 
            message={error}
            onRetry={handleRetry}
            className="mt-8"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white rounded-2xl">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Header */}
        <PageHeader
          icon={<FaArrowDown />}
          title="Your Expenses"
          currentPage="Expenses"
          showTradingYear={false}
          activeTradingYear={activeTradingYear}
          subtitle="Track and manage your daily expenses across different expense categories."
        />

        {/* Layout */}
        <div className="flex flex-1 overflow-hidden bg-white rounded-2xl shadow-lg border border-gray-100 mt-8">
          {/* Sidebar for weeks/days */}
          <SidebarWeeksExpense
            onSelect={handleSidebarSelect}
            refreshTrigger={refreshTrigger}
            activeTradingYear={activeTradingYear}
            apiRefreshTrigger={apiRefreshTrigger}
          />

          {/* Main content area */}
          <main className="flex-1 p-6 overflow-y-auto">
            {/* Action Header */}
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold">
                Your Daily Expenses
                {refreshing && (
                  <span className="ml-3 text-sm text-red-600">
                    <LoadingState 
                      message="Refreshing..." 
                      showSpinner={true}
                      className="inline-flex py-0"
                    />
                  </span>
                )}
              </h1>
              {selectedDay && (
                <button 
                  onClick={handleViewAllExpenses}
                  className="bg-red-50 text-red-600 font-medium text-sm px-4 py-2 rounded-lg shadow-sm hover:bg-red-100 hover:shadow-md transition duration-200 flex items-center gap-2 hover:cursor-pointer"
                >
                  <span>View all expenses against {selectedDay.label}</span>
                  <FaArrowRight className="w-3 h-4" />
                </button>
              )}
            </div>

            {/* Show selected day's total */}
            {selectedDay && (
              <p className="text-gray-600 mb-6 flex items-center gap-2">
                <IoCalendarOutline className="w-5 h-5 text-red-500" />
                {selectedDay.label} (£{Number(selectedDay.total || 0).toFixed(2)})
              </p>
            )}

            {/* Dynamic Expense Cards */}
            {renderCardSection("Motor Expenses", motorExpenses)}
            {renderCardSection("Additional Expenses", additionalExpenses)}
          </main>
        </div>
      </div>

      {/* Expense Modal */}
      {activeCard && (
        <ExpenseModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          card={activeCard}
          selectedDay={selectedDay}
          onSuccess={handleTransactionSuccess}
        />
      )}

      {/* Transactions Modal */}
      <ExpenseTransactionsModal
        open={transactionsModalOpen}
        onClose={() => setTransactionsModalOpen(false)}
        selectedDay={selectedDay}
        onTransactionDeleted={handleTransactionDeleted}
        refreshTrigger={refreshTrigger}
        apiRefreshTrigger={apiRefreshTrigger}
      />
    </div>
  );
};

export default Expenses;