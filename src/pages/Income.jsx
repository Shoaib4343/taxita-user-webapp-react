
// import React, { useState } from "react";
// import {
//   FaWallet,
//   FaCreditCard,
//   FaFileInvoiceDollar,
//   FaHome,
//   FaFileInvoice,
//   FaArrowRight,
//   FaCar,
// } from "react-icons/fa";
// import SidebarWeeks from "../components/SidebarWeeks";
// import { IoCalendarOutline } from "react-icons/io5";
// import IncomeModal from "../components/IncomeModal";
// import IncomeTransactionsModal from "../components/IncomeTransactionsModal"; // Add this import
// import { Link } from "react-router-dom";
// import toast from "react-hot-toast";
// import { PoundSterlingIcon } from "lucide-react";

// // Static list of income accounts/cards with their respective icons and colors
// const incomeData = [
//   { id: 1, title: "Cash Account", icon: FaWallet, color: "bg-emerald-500" },
//   { id: 2, title: "Card Account", icon: FaCreditCard, color: "bg-blue-500" },
//   {
//     id: 3,
//     title: "Contract Account",
//     icon: PoundSterlingIcon,
//     color: "bg-purple-500",
//   },
//   {
//     id: 4,
//     title: "Sub Contract Account",
//     icon: FaFileInvoice,
//     color: "bg-yellow-500",
//   },
//   { id: 5, title: "Vehicle rental income", icon: FaCar, color: "bg-red-500" },
// ];

// const Income = () => {
//   const [currentWeek, setCurrentWeek] = useState(null);
//   const [selectedDay, setSelectedDay] = useState(null);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [activeCard, setActiveCard] = useState(null);
//   const [refreshTrigger, setRefreshTrigger] = useState(0);
//   const [transactionsModalOpen, setTransactionsModalOpen] = useState(false); // Add this state

//   // Handler when a user clicks on an income card
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
//     // Increment refresh trigger to force sidebar to refetch data
//     setRefreshTrigger(prev => prev + 1);
    
//     // Close modal
//     setModalOpen(false);
    
//     // Show success message (the modal already shows this)
//   };

//   // Handler for opening transactions modal - ADD THIS FUNCTION
//   const handleViewAllIncome = () => {
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

//   return (
//     <div className="h-screen flex flex-col rounded-xl">
//       {/* Header */}
//       <div className="flex justify-between items-center bg-white border-b border-gray-200 p-4 rounded-t-xl">
//         <div>
//           <h2 className="text-xl font-semibold mb-1">Your Income</h2>
//           <p className="text-sm text-gray-500">
//             Your income listings go here...
//           </p>
//         </div>
//         <div className="flex items-center text-sm md:mt-0">
//           <Link to="/dashboard" className="hover:underline text-blue-600">
//             Dashboard
//           </Link>
//           <span className="mx-2">/</span>
//           <span>Income</span>
//         </div>
//       </div>

//       {/* Layout */}
//       <div className="flex flex-1 overflow-hidden bg-white rounded-b-xl">
//         {/* Sidebar for weeks/days */}
//         <SidebarWeeks
//           onSelect={({ week, day, days }) => {
//             setCurrentWeek({ ...week, days: days || [] });
//             setSelectedDay(day);
//           }}
//           refreshTrigger={refreshTrigger}
//         />

//         {/* Main content area */}
//         <main className="flex-1 p-6 overflow-y-auto">
//           <div className="flex items-center justify-between mb-4">
//             <h1 className="text-2xl font-bold">Your Daily Income</h1>
//             {selectedDay && (
//               <button 
//                 onClick={handleViewAllIncome} // ADD THIS CLICK HANDLER
//                 className="bg-blue-50 text-blue-600 font-medium text-sm px-4 py-2 rounded-lg shadow-sm hover:bg-blue-100 hover:shadow-md transition duration-200 flex items-center gap-2 hover:cursor-pointer"
//               >
//                 <span>View all income against {selectedDay.label}</span>
//                 <FaArrowRight className="w-3 h-4" />
//               </button>
//             )}
//           </div>

//           {/* Show selected day's total */}
//           {selectedDay && (
//             <p className="text-gray-600 mb-6 flex items-center gap-2">
//               <IoCalendarOutline className="w-5 h-5 text-blue-500" />
//               {selectedDay.label} (£{Number(selectedDay.total).toFixed(2)})
//             </p>
//           )}

//           {/* Income Cards */}
//           <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//             {incomeData.map((item) => (
//               <div
//                 key={item.id}
//                 onClick={() => handleCardClick(item)}
//                 className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-4 hover:shadow-md hover:cursor-pointer transition"
//               >
//                 <div
//                   className={`w-12 h-12 min-w-[48px] min-h-[48px] rounded-full flex items-center justify-center text-white ${item.color}`}
//                 >
//                   <item.icon className="text-xl" />
//                 </div>
//                 <div>
//                   <h3 className="text-sm font-medium text-gray-500">
//                     {item.title}
//                   </h3>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </main>
//       </div>

//       {/* Income Modal */}
//       {activeCard && (
//         <IncomeModal
//           open={modalOpen}
//           onClose={() => setModalOpen(false)}
//           card={activeCard}
//           selectedDay={selectedDay}
//           onSuccess={handleTransactionSuccess}
//         />
//       )}

//       {/* Transactions Modal - ADD THIS MODAL */}
//       <IncomeTransactionsModal
//         open={transactionsModalOpen}
//         onClose={() => setTransactionsModalOpen(false)}
//         selectedDay={selectedDay}
//         onTransactionDeleted={handleTransactionDeleted}
//       />
//     </div>
//   );
// };

// export default Income;


























// import React, { useState, useEffect } from "react";
// import {
//   FaWallet,
//   FaCreditCard,
//   FaFileInvoice,
//   FaArrowRight,
//   FaCar,
// } from "react-icons/fa";
// import { IoCalendarOutline } from "react-icons/io5";
// import { PoundSterlingIcon, TrendingUp } from "lucide-react";
// import toast from "react-hot-toast";

// import SidebarWeeks from "../components/SidebarWeeks";
// import IncomeModal from "../components/IncomeModal";
// import IncomeTransactionsModal from "../components/IncomeTransactionsModal";
// import PageHeader from "../components/PageHeader";
// import { useTradingYear } from "../context/TradingYearContext";

// // Static list of income accounts/cards with their respective icons and colors
// const incomeData = [
//   { id: 1, title: "Cash Account", icon: FaWallet, color: "bg-emerald-500" },
//   { id: 2, title: "Card Account", icon: FaCreditCard, color: "bg-blue-500" },
//   {
//     id: 3,
//     title: "Contract Account",
//     icon: PoundSterlingIcon,
//     color: "bg-purple-500",
//   },
//   {
//     id: 4,
//     title: "Sub Contract Account",
//     icon: FaFileInvoice,
//     color: "bg-yellow-500",
//   },
//   { id: 5, title: "Vehicle rental income", icon: FaCar, color: "bg-red-500" },
// ];

// const Income = () => {
//   const [currentWeek, setCurrentWeek] = useState(null);
//   const [selectedDay, setSelectedDay] = useState(null);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [activeCard, setActiveCard] = useState(null);
//   const [refreshTrigger, setRefreshTrigger] = useState(0);
//   const [transactionsModalOpen, setTransactionsModalOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);

//   // Get trading year context - EXACT same pattern as PercentageAdjustment
//   const { apiRefreshTrigger, activeTradingYear } = useTradingYear();

//   // Simple loading timer - just like the PercentageAdjustment component
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//     }, 1500);

//     return () => clearTimeout(timer);
//   }, []);

//   // Listen for trading year changes - EXACT same pattern as PercentageAdjustment
//   useEffect(() => {
//     if (apiRefreshTrigger > 0) {
//       console.log('Income: Refreshing data due to trading year change');
//       setRefreshTrigger(prev => prev + 1);
//     }
//   }, [apiRefreshTrigger]);

//   // Handler when a user clicks on an income card
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
//   const handleViewAllIncome = () => {
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

//   // Custom Page Loading Skeleton
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

//             <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
//               {[...Array(5)].map((_, i) => (
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

//   // Show custom loading skeleton
//   if (isLoading) {
//     return <PageLoadingSkeleton />;
//   }

//   return (
//     <div className="min-h-screen bg-white rounded-2xl">
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         {/* Page Header */}
//         <PageHeader
//           icon={<TrendingUp />}
//           title="Your Income"
//           currentPage="Income"
//           showTradingYear={true}
//           activeTradingYear={activeTradingYear}
//           description="Track and manage your daily income across different account types."
//         />

//         {/* Layout */}
//         <div className="flex flex-1 overflow-hidden bg-white rounded-2xl shadow-lg border border-gray-100 mt-8">
//           {/* Sidebar for weeks/days */}
//           <SidebarWeeks
//             onSelect={handleSidebarSelect}
//             refreshTrigger={refreshTrigger}
//           />

//           {/* Main content area */}
//           <main className="flex-1 p-6 overflow-y-auto">
//             {/* Action Header */}
//             <div className="flex items-center justify-between mb-4">
//               <h1 className="text-2xl font-bold">Your Daily Income</h1>
//               {selectedDay && (
//                 <button 
//                   onClick={handleViewAllIncome}
//                   className="bg-blue-50 text-blue-600 font-medium text-sm px-4 py-2 rounded-lg shadow-sm hover:bg-blue-100 hover:shadow-md transition duration-200 flex items-center gap-2 hover:cursor-pointer"
//                 >
//                   <span>View all income against {selectedDay.label}</span>
//                   <FaArrowRight className="w-3 h-4" />
//                 </button>
//               )}
//             </div>

//             {/* Show selected day's total */}
//             {selectedDay && (
//               <p className="text-gray-600 mb-6 flex items-center gap-2">
//                 <IoCalendarOutline className="w-5 h-5 text-blue-500" />
//                 {selectedDay.label} (£{Number(selectedDay.total).toFixed(2)})
//               </p>
//             )}

//             {/* Income Cards - Keep Original Design */}
//             <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//               {incomeData.map((item) => (
//                 <div
//                   key={item.id}
//                   onClick={() => handleCardClick(item)}
//                   className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-4 hover:shadow-md hover:cursor-pointer transition"
//                 >
//                   <div
//                     className={`w-12 h-12 min-w-[48px] min-h-[48px] rounded-full flex items-center justify-center text-white ${item.color}`}
//                   >
//                     <item.icon className="text-xl" />
//                   </div>
//                   <div>
//                     <h3 className="text-sm font-medium text-gray-500">
//                       {item.title}
//                     </h3>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </main>
//         </div>
//       </div>

//       {/* Income Modal */}
//       {activeCard && (
//         <IncomeModal
//           open={modalOpen}
//           onClose={() => setModalOpen(false)}
//           card={activeCard}
//           selectedDay={selectedDay}
//           onSuccess={handleTransactionSuccess}
//         />
//       )}

//       {/* Transactions Modal */}
//       <IncomeTransactionsModal
//         open={transactionsModalOpen}
//         onClose={() => setTransactionsModalOpen(false)}
//         selectedDay={selectedDay}
//         onTransactionDeleted={handleTransactionDeleted}
//       />
//     </div>
//   );
// };

// export default Income;


























// import React, { useState, useEffect } from "react";
// import {
//   FaWallet,
//   FaCreditCard,
//   FaFileInvoice,
//   FaArrowRight,
//   FaCar,
// } from "react-icons/fa";
// import { IoCalendarOutline } from "react-icons/io5";
// import { PoundSterlingIcon, TrendingUp } from "lucide-react";
// import toast from "react-hot-toast";

// import SidebarWeeks from "../components/SidebarWeeks";
// import IncomeModal from "../components/IncomeModal";
// import IncomeTransactionsModal from "../components/IncomeTransactionsModal";
// import PageHeader from "../components/PageHeader";
// import { useTradingYear } from "../context/TradingYearContext";

// // Static list of income accounts/cards with their respective icons and colors
// const incomeData = [
//   { id: 1, title: "Cash Account", icon: FaWallet, color: "bg-emerald-500" },
//   { id: 2, title: "Card Account", icon: FaCreditCard, color: "bg-blue-500" },
//   {
//     id: 3,
//     title: "Contract Account",
//     icon: PoundSterlingIcon,
//     color: "bg-purple-500",
//   },
//   {
//     id: 4,
//     title: "Sub Contract Account",
//     icon: FaFileInvoice,
//     color: "bg-yellow-500",
//   },
//   { id: 5, title: "Vehicle rental income", icon: FaCar, color: "bg-red-500" },
// ];

// const Income = () => {
//   const [currentWeek, setCurrentWeek] = useState(null);
//   const [selectedDay, setSelectedDay] = useState(null);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [activeCard, setActiveCard] = useState(null);
//   const [refreshTrigger, setRefreshTrigger] = useState(0);
//   const [transactionsModalOpen, setTransactionsModalOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);

//   // Get trading year context - EXACT same pattern as PercentageAdjustment
//   const { apiRefreshTrigger, activeTradingYear } = useTradingYear();

//   // Simple loading timer - just like the PercentageAdjustment component
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//     }, 1500);

//     return () => clearTimeout(timer);
//   }, []);

//   // Listen for trading year changes - EXACT same pattern as PercentageAdjustment
//   useEffect(() => {
//     if (apiRefreshTrigger > 0) {
//       console.log('Income: Refreshing data due to trading year change');
//       setRefreshTrigger(prev => prev + 1);
//     }
//   }, [apiRefreshTrigger]);

//   // Handler when a user clicks on an income card
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
//   const handleViewAllIncome = () => {
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

//   // Custom Page Loading Skeleton
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

//             <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
//               {[...Array(5)].map((_, i) => (
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

//   // Show custom loading skeleton
//   if (isLoading) {
//     return <PageLoadingSkeleton />;
//   }

//   return (
//     <div className="min-h-screen bg-white rounded-2xl">
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         {/* Page Header */}
//         <PageHeader
//           icon={<PoundSterlingIcon />}
//           title="Your Income"
//           currentPage="Income"
//           showTradingYear={false}
//           activeTradingYear={activeTradingYear}
//           subtitle="Track and manage your daily income across different account types."
//         />

//         {/* Layout */}
//         <div className="flex flex-1 overflow-hidden bg-white rounded-2xl shadow-lg border border-gray-100 mt-8">
//           {/* Sidebar for weeks/days */}
//           <SidebarWeeks
//             onSelect={handleSidebarSelect}
//             refreshTrigger={refreshTrigger}
//             activeTradingYear={activeTradingYear}
//             apiRefreshTrigger={apiRefreshTrigger}
//           />

//           {/* Main content area */}
//           <main className="flex-1 p-6 overflow-y-auto">
//             {/* Action Header */}
//             <div className="flex items-center justify-between mb-4">
//               <h1 className="text-2xl font-bold">Your Daily Income</h1>
//               {selectedDay && (
//                 <button 
//                   onClick={handleViewAllIncome}
//                   className="bg-blue-50 text-blue-600 font-medium text-sm px-4 py-2 rounded-lg shadow-sm hover:bg-blue-100 hover:shadow-md transition duration-200 flex items-center gap-2 hover:cursor-pointer"
//                 >
//                   <span>View all income against {selectedDay.label}</span>
//                   <FaArrowRight className="w-3 h-4" />
//                 </button>
//               )}
//             </div>

//             {/* Show selected day's total */}
//             {selectedDay && (
//               <p className="text-gray-600 mb-6 flex items-center gap-2">
//                 <IoCalendarOutline className="w-5 h-5 text-blue-500" />
//                 {selectedDay.label} (£{Number(selectedDay.total).toFixed(2)})
//               </p>
//             )}

//             {/* Income Cards - Keep Original Design */}
//             <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//               {incomeData.map((item) => (
//                 <div
//                   key={item.id}
//                   onClick={() => handleCardClick(item)}
//                   className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-4 hover:shadow-md hover:cursor-pointer transition"
//                 >
//                   <div
//                     className={`w-12 h-12 min-w-[48px] min-h-[48px] rounded-full flex items-center justify-center text-white ${item.color}`}
//                   >
//                     <item.icon className="text-xl" />
//                   </div>
//                   <div>
//                     <h3 className="text-sm font-medium text-gray-500">
//                       {item.title}
//                     </h3>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </main>
//         </div>
//       </div>

//       {/* Income Modal */}
//       {activeCard && (
//         <IncomeModal
//           open={modalOpen}
//           onClose={() => setModalOpen(false)}
//           card={activeCard}
//           selectedDay={selectedDay}
//           onSuccess={handleTransactionSuccess}
//         />
//       )}

//       {/* Transactions Modal - NOW WITH REFRESH PROPS */}
//       <IncomeTransactionsModal
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

// export default Income;








// ------------------------------------------------------this is wrking code fine now i am doing the card api bellow 





































































// import React, { useState, useEffect } from "react";
// import {
//   FaWallet,
//   FaCreditCard,
//   FaFileInvoice,
//   FaArrowRight,
//   FaCar,
// } from "react-icons/fa";
// import { IoCalendarOutline } from "react-icons/io5";
// import { PoundSterlingIcon, TrendingUp } from "lucide-react";
// import toast from "react-hot-toast";

// import SidebarWeeks from "../components/SidebarWeeks";
// import IncomeModal from "../components/IncomeModal";
// import IncomeTransactionsModal from "../components/IncomeTransactionsModal";
// import PageHeader from "../components/PageHeader";
// import { useTradingYear } from "../context/TradingYearContext";
// import { getAccountsApi } from "../services/dashboard"; // Add this import

// // Icon mapping for income accounts based on short_name
// const iconMapping = {
//   cash_account: { icon: FaWallet, color: "bg-emerald-500" },
//   card_account: { icon: FaCreditCard, color: "bg-blue-500" },
//   contract_account: { icon: PoundSterlingIcon, color: "bg-purple-500" },
//   sub_contract_account: { icon: FaFileInvoice, color: "bg-yellow-500" },
//   rental_income_account: { icon: FaCar, color: "bg-red-500" },
// };

// const Income = () => {
//   const [currentWeek, setCurrentWeek] = useState(null);
//   const [selectedDay, setSelectedDay] = useState(null);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [activeCard, setActiveCard] = useState(null);
//   const [refreshTrigger, setRefreshTrigger] = useState(0);
//   const [transactionsModalOpen, setTransactionsModalOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [incomeAccounts, setIncomeAccounts] = useState([]); // New state for dynamic data

//   // Get trading year context - EXACT same pattern as PercentageAdjustment
//   const { apiRefreshTrigger, activeTradingYear } = useTradingYear();

//   // Fetch accounts data from API
//   const fetchAccounts = async () => {
//     try {
//       const response = await getAccountsApi();
//       // Filter only income accounts (type_id === 1)
//       const incomeData = response.data.filter(account => account.type_id === 1);
      
//       // Map API data to component format
//       const mappedIncomeData = incomeData.map(account => {
//         const iconConfig = iconMapping[account.short_name] || {
//           icon: FaWallet,
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
      
//       setIncomeAccounts(mappedIncomeData);
//     } catch (error) {
//       console.error('Error fetching accounts:', error);
//       toast.error('Failed to load income accounts');
//     }
//   };

//   // Simple loading timer - just like the PercentageAdjustment component
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

//   // Listen for trading year changes - EXACT same pattern as PercentageAdjustment
//   useEffect(() => {
//     if (apiRefreshTrigger > 0) {
//       console.log('Income: Refreshing data due to trading year change');
//       setRefreshTrigger(prev => prev + 1);
//     }
//   }, [apiRefreshTrigger]);

//   // Handler when a user clicks on an income card
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
//   const handleViewAllIncome = () => {
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

//   // Custom Page Loading Skeleton
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

//             <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
//               {[...Array(5)].map((_, i) => (
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

//   // Show custom loading skeleton
//   if (isLoading) {
//     return <PageLoadingSkeleton />;
//   }

//   return (
//     <div className="min-h-screen bg-white rounded-2xl">
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         {/* Page Header */}
//         <PageHeader
//           icon={<PoundSterlingIcon />}
//           title="Your Income"
//           currentPage="Income"
//           showTradingYear={false}
//           activeTradingYear={activeTradingYear}
//           subtitle="Track and manage your daily income across different account types."
//         />

//         {/* Layout */}
//         <div className="flex flex-1 overflow-hidden bg-white rounded-2xl shadow-lg border border-gray-100 mt-8">
//           {/* Sidebar for weeks/days */}
//           <SidebarWeeks
//             onSelect={handleSidebarSelect}
//             refreshTrigger={refreshTrigger}
//             activeTradingYear={activeTradingYear}
//             apiRefreshTrigger={apiRefreshTrigger}
//           />

//           {/* Main content area */}
//           <main className="flex-1 p-6 overflow-y-auto">
//             {/* Action Header */}
//             <div className="flex items-center justify-between mb-4">
//               <h1 className="text-2xl font-bold">Your Daily Income</h1>
//               {selectedDay && (
//                 <button 
//                   onClick={handleViewAllIncome}
//                   className="bg-blue-50 text-blue-600 font-medium text-sm px-4 py-2 rounded-lg shadow-sm hover:bg-blue-100 hover:shadow-md transition duration-200 flex items-center gap-2 hover:cursor-pointer"
//                 >
//                   <span>View all income against {selectedDay.label}</span>
//                   <FaArrowRight className="w-3 h-4" />
//                 </button>
//               )}
//             </div>

//             {/* Show selected day's total */}
//             {selectedDay && (
//               <p className="text-gray-600 mb-6 flex items-center gap-2">
//                 <IoCalendarOutline className="w-5 h-5 text-blue-500" />
//                 {selectedDay.label} (£{Number(selectedDay.total).toFixed(2)})
//               </p>
//             )}

//             {/* Dynamic Income Cards */}
//             <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//               {incomeAccounts.map((item) => (
//                 <div
//                   key={item.id}
//                   onClick={() => handleCardClick(item)}
//                   className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-4 hover:shadow-md hover:cursor-pointer transition"
//                 >
//                   <div
//                     className={`w-12 h-12 min-w-[48px] min-h-[48px] rounded-full flex items-center justify-center text-white ${item.color}`}
//                   >
//                     <item.icon className="text-xl" />
//                   </div>
//                   <div>
//                     <h3 className="text-sm font-medium text-gray-500">
//                       {item.title}
//                     </h3>
//                     <p className="text-xs text-gray-400">{item.category_name}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Show message if no income accounts found */}
//             {incomeAccounts.length === 0 && !isLoading && (
//               <div className="text-center py-8">
//                 <p className="text-gray-500">No income accounts found</p>
//               </div>
//             )}
//           </main>
//         </div>
//       </div>

//       {/* Income Modal */}
//       {activeCard && (
//         <IncomeModal
//           open={modalOpen}
//           onClose={() => setModalOpen(false)}
//           card={activeCard}
//           selectedDay={selectedDay}
//           onSuccess={handleTransactionSuccess}
//         />
//       )}

//       {/* Transactions Modal - NOW WITH REFRESH PROPS */}
//       <IncomeTransactionsModal
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

// export default Income;















































import React, { useState, useEffect } from "react";
import {
  FaWallet,
  FaCreditCard,
  FaFileInvoice,
  FaArrowRight,
  FaCar,
} from "react-icons/fa";
import { IoCalendarOutline } from "react-icons/io5";
import { PoundSterlingIcon, TrendingUp } from "lucide-react";
import toast from "react-hot-toast";

import SidebarWeeks from "../components/SidebarWeeks";
import IncomeModal from "../components/IncomeModal";
import IncomeTransactionsModal from "../components/IncomeTransactionsModal";
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
  FaWallet,
  FaCreditCard,
  FaFileInvoice,
  FaCar,
  PoundSterlingIcon,
};

const Income = () => {
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
    incomeAccounts,
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
      console.log('Income: Refreshing data due to context changes');
      setRefreshTrigger(prev => prev + 1);
    }
  }, [apiRefreshTrigger, accountsApiRefreshTrigger]);

  // Handler when a user clicks on an income card
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
  const handleViewAllIncome = () => {
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

  // Render income cards with proper icon components
  const renderIncomeCards = () => {
    return incomeAccounts.map((item) => {
      const IconComponent = iconComponents[item.iconName] || FaWallet;
      
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
    });
  };

  // Show loading skeleton
  if (loading && !isAccountsLoaded()) {
    return <AccountsPageSkeleton showTwoSections={false} />;
  }

  // Show error state
  if (error && !isAccountsLoaded()) {
    return (
      <div className="min-h-screen bg-white rounded-2xl">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <PageHeader
            icon={<PoundSterlingIcon />}
            title="Your Income"
            currentPage="Income"
            showTradingYear={false}
            activeTradingYear={activeTradingYear}
            subtitle="Track and manage your daily income across different account types."
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
          icon={<PoundSterlingIcon />}
          title="Your Income"
          currentPage="Income"
          showTradingYear={false}
          activeTradingYear={activeTradingYear}
          subtitle="Track and manage your daily income across different account types."
        />

        {/* Layout */}
        <div className="flex flex-1 overflow-hidden bg-white rounded-2xl shadow-lg border border-gray-100 mt-8">
          {/* Sidebar for weeks/days */}
          <SidebarWeeks
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
                Your Daily Income
                {refreshing && (
                  <span className="ml-3 text-sm text-blue-600">
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
                  onClick={handleViewAllIncome}
                  className="bg-blue-50 text-blue-600 font-medium text-sm px-4 py-2 rounded-lg shadow-sm hover:bg-blue-100 hover:shadow-md transition duration-200 flex items-center gap-2 hover:cursor-pointer"
                >
                  <span>View all income against {selectedDay.label}</span>
                  <FaArrowRight className="w-3 h-4" />
                </button>
              )}
            </div>

            {/* Show selected day's total */}
            {selectedDay && (
              <p className="text-gray-600 mb-6 flex items-center gap-2">
                <IoCalendarOutline className="w-5 h-5 text-blue-500" />
                {selectedDay.label} (£{Number(selectedDay.total).toFixed(2)})
              </p>
            )}

            {/* Dynamic Income Cards */}
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {renderIncomeCards()}
            </div>

            {/* Show empty state if no income accounts found */}
            {incomeAccounts.length === 0 && isAccountsLoaded() && (
              <EmptyState
                title="No income accounts found"
                description="There are no income accounts configured in your system."
                className="mt-8"
              />
            )}
          </main>
        </div>
      </div>

      {/* Income Modal */}
      {activeCard && (
        <IncomeModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          card={activeCard}
          selectedDay={selectedDay}
          onSuccess={handleTransactionSuccess}
        />
      )}

      {/* Transactions Modal */}
      <IncomeTransactionsModal
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

export default Income;