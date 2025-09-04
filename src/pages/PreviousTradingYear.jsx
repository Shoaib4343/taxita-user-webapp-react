// import React, { useEffect, useState, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';
// import Swal from 'sweetalert2';
// import { 
//   FiCalendar, 
//   FiChevronDown, 
//   FiRefreshCw,
//   FiExternalLink
// } from 'react-icons/fi';
// import { previousTradingYearApi, registerTradingYearApi } from '../services/dashboard';

// const TradingYearsNotification = () => {
//   const [tradingYears, setTradingYears] = useState([]);
//   const [isOpen, setIsOpen] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [registering, setRegistering] = useState(null); // Track which year is being registered
//   const dropdownRef = useRef(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const res = await previousTradingYearApi();
      
//       if (res.data.success && res.data.data) {
//         setTradingYears(res.data.data);
//       }
//     } catch (error) {
//       console.error('Error fetching trading years:', error);
//       toast.error('Failed to fetch trading years data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRefresh = async () => {
//     setRefreshing(true);
//     await fetchData();
//     setRefreshing(false);
//   };

//   const registerTradingYear = async (yearData) => {
//     try {
//       setRegistering(yearData.trading_year);
      
//       // Prepare the data for registration API
//       const registrationData = {
//         tradingYear: yearData.trading_year,
//         // close: 0  // Set close field to 0 (not closed)
//       };

//       const response = await registerTradingYearApi(registrationData);
      
//       if (response.data.success) {
//         toast.success(`Successfully registered trading year ${yearData.trading_year}`);
//         // Refresh the data to get updated status
//         await fetchData();
        
//         // Optionally navigate to dashboard or wherever appropriate
//         navigate('/dashboard');
//       } else {
//         toast.error(response.data.message || 'Failed to register trading year');
//       }
//     } catch (error) {
//       console.error('Error registering trading year:', error);
//       toast.error('Failed to register trading year. Please try again.');
//     } finally {
//       setRegistering(null);
//     }
//   };

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   const getStatusConfig = (status) => {
//     switch (status) {
//       case 'Current Trading Year':
//         return {
//           color: 'bg-green-500 text-white',
//           label: 'Current Trading Year'
//         };
//       case 'Active':
//         return {
//           color: 'bg-green-500 text-white',
//           label: 'Active'
//         };
//       case 'Not Registered':
//         return {
//           color: 'bg-red-500 text-white',
//           label: 'Not Registered'
//         };
//       case 'Closed':
//       case 'Year Closed':
//         return {
//           color: 'bg-blue-500 text-white',
//           label: status
//         };
//       case 'Not Finalised':
//         return {
//           color: 'bg-yellow-500 text-white',
//           label: 'Not Finalised'
//         };
//       default:
//         return {
//           color: 'bg-gray-500 text-white',
//           label: 'Unknown'
//         };
//     }
//   };

//   const handleYearClick = async (year) => {
//     // Don't do anything if the year is closed or currently being registered
//     if (year.status === 'Closed' || registering === year.trading_year) {
//       return; // Exit early, no action
//     }

//     if (year.status === 'Active') {
//       // For active/current year - redirect to current page (no confirmation needed)
//       navigate('/dashboard'); // or whatever your current page route is
//       toast.success(`Currently viewing ${year.trading_year}`);
//     } else if (year.status === 'Not Registered') {
//       // Show SweetAlert2 confirmation for registering the year
//       const result = await Swal.fire({
//         title: 'Register Trading Year',
//         html: `Do you want to register and activate the trading year <strong>${year.trading_year}</strong>?`,
//         icon: 'question',
//         showCancelButton: true,
//         confirmButtonColor: '#3B82F6',
//         cancelButtonColor: '#6B7280',
//         confirmButtonText: 'Yes, Register',
//         cancelButtonText: 'Cancel',
//         focusConfirm: false
//       });

//       if (result.isConfirmed) {
//         await registerTradingYear(year);
//       }
//     } else {
//       // For Finalised, Not Finalised, Year Closed - direct navigation to view details (no confirmation)
//       navigate(`/dashboard/view-year/${year.trading_year}`);
//       toast.success(`Viewing ${year.trading_year} details`);
//     }
//     setIsOpen(false);
//   };

//   const activeCount = tradingYears.filter(year => year.status === 'Active').length;
//   const totalCount = tradingYears.length;

//   if (loading) {
//     return (
//       <div className="relative" ref={dropdownRef}>
//         {/* Loading State - Matching the actual design */}
//         <button
//           disabled
//           className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg transition-all duration-200 animate-pulse cursor-not-allowed"
//         >
//           <div className="w-4 h-4 bg-gray-300 rounded animate-pulse"></div>
          
//           <div className="w-20 h-4 bg-gray-300 rounded animate-pulse"></div>

//           <div className="w-3.5 h-3.5 bg-gray-300 rounded animate-pulse"></div>
          
//           <div className="w-5 h-5 bg-gray-300 rounded-full animate-pulse absolute -top-3 -right-1"></div>
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="relative" ref={dropdownRef}>
//       {/* Dropdown Trigger */}
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className={`flex items-center gap-2 px-3 py-2 bg-white border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:bg-gray-50 ${
//           isOpen ? 'border-blue-300 bg-blue-50' : 'border-gray-200'
//         }`}
//       >
//         <FiCalendar size={16} className={`transition-colors ${
//           isOpen ? 'text-blue-600' : 'text-gray-600'
//         }`} />
        
//         <span className="text-sm font-medium text-gray-700 text-nowrap">
//           Trading Years
//         </span>

//         <FiChevronDown 
//           size={14} 
//           className={`text-gray-400 transition-transform duration-200 ${
//             isOpen ? 'rotate-180' : ''
//           }`} 
//         />

//         {/* Notification Badge */}
//         {totalCount > 0 && (
//           <span className="inline-flex absolute -top-2 -right-1 items-center justify-center w-5 h-5 text-xs font-bold text-white bg-green-500 rounded-full">
//             {totalCount}
//           </span> 
//         )}
//       </button>

//       {/* Dropdown Menu */}
//       {isOpen && (
//         <>
//           {/* Mobile Backdrop */}
//           <div 
//             className="fixed inset-0 z-10 bg-black bg-opacity-10 backdrop-blur-sm md:hidden" 
//             onClick={() => setIsOpen(false)}
//           />
          
//           {/* Dropdown Content */}
//           <div className="absolute right-0 mt-2 w-82 bg-white border border-gray-200 rounded-lg shadow-lg z-20 overflow-hidden">
//             {/* Header */}
//             <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
//               <div className="flex items-center justify-between">
//                 <h3 className="text-sm font-semibold text-gray-900">
//                   You have {totalCount} Trading Year{totalCount !== 1 ? 's' : ''}
//                 </h3>
//                 <button
//                   onClick={handleRefresh}
//                   disabled={refreshing}
//                   className="p-1.5 rounded-lg hover:bg-white transition-colors disabled:opacity-50"
//                   title="Refresh"
//                 >
//                   <FiRefreshCw size={14} className={`text-gray-600 ${refreshing ? 'animate-spin' : ''}`} />
//                 </button>
//               </div>
//             </div>

//             {/* Years List */}
//             <div className="max-h-64 overflow-y-auto">
//               {tradingYears.length === 0 ? (
//                 <div className="p-4 text-center">
//                   <FiCalendar size={24} className="text-gray-400 mx-auto mb-2" />
//                   <p className="text-sm text-gray-500">No trading years found</p>
//                 </div>
//               ) : (
//                 tradingYears.map((year, index) => {
//                   const statusConfig = getStatusConfig(year.status);
//                   const isDisabled = year.status === 'Closed';
//                   const isRegistering = registering === year.trading_year;
                  
//                   return (
//                     <button
//                       key={index}
//                       onClick={() => handleYearClick(year)}
//                       disabled={isDisabled || isRegistering}
//                       className={`w-full p-4 text-left transition-colors duration-150 focus:outline-none border-b border-gray-100 last:border-b-0 group ${
//                         isDisabled 
//                           ? 'cursor-not-allowed opacity-85 bg-gray-50' 
//                           : isRegistering
//                           ? 'cursor-wait opacity-75 bg-blue-50'
//                           : 'hover:bg-gray-50 focus:bg-blue-50 cursor-pointer'
//                       }`}
//                     >
//                       <div className="flex items-start gap-3">
//                         {/* Calendar Icon */}
//                         <div className="flex-shrink-0 mt-1">
//                           <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
//                             isDisabled 
//                               ? 'bg-gray-200' 
//                               : isRegistering
//                               ? 'bg-blue-200'
//                               : 'bg-blue-100 group-hover:bg-blue-200'
//                           }`}>
//                             {isRegistering ? (
//                               <FiRefreshCw size={16} className="text-blue-600 animate-spin" />
//                             ) : (
//                               <FiCalendar size={16} className={`${
//                                 isDisabled ? 'text-blue-400' : 'text-blue-600'
//                               }`} />
//                             )}
//                           </div>
//                         </div>
                        
//                         {/* Year Info */}
//                         <div className="flex-1 min-w-0">
//                           <div className="flex items-center justify-between mb-2">
//                             <h4 className={`text-sm font-semibold transition-colors ${
//                               isDisabled 
//                                 ? 'text-gray-800' 
//                                 : isRegistering
//                                 ? 'text-blue-900'
//                                 : 'text-gray-900 group-hover:text-blue-900'
//                             }`}>
//                               {year.trading_year} {isRegistering && '(Registering...)'}
//                             </h4>
//                             {year.status !== 'Active' && !isDisabled && !isRegistering && (
//                               <FiExternalLink size={12} className="text-gray-400 group-hover:text-blue-600 transition-colors" />
//                             )}
//                           </div>
                          
//                           <div className="flex items-center gap-2 flex-wrap">
//                             <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${statusConfig.color} ${
//                               isDisabled ? 'opacity-95' : ''
//                             }`}>
//                               {statusConfig.label}
//                             </span>
                            
//                             {year.planPurchased === 'Yes' && (
//                               <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800 ${
//                                 isDisabled ? 'opacity-95' : ''
//                               }`}>
//                                 Plan Purchased
//                               </span>
//                             )}

//                             {year.planPurchased === 'No' && (
//                               <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700 ${
//                                 isDisabled ? 'opacity-95' : ''
//                               }`}>
//                                Plan Not Purchased
//                               </span>
//                             )}
//                           </div>
                          
//                           {/* Action Hint */}
//                           <p className={`text-xs mt-1 ${
//                             'text-gray-500'
//                           }`}>
//                             {isRegistering
//                               ? 'Registering trading year...'
//                               : year.status === 'Active' 
//                               ? 'Trading year in progress!' 
//                               : year.status === 'Not Registered'
//                               ? 'Click to register this trading year'
//                               : year.status === 'Closed'
//                               ? 'This trading year is closed!'
//                               : 'Click to view year data'
//                             }
//                           </p>
//                         </div>
//                       </div>
//                     </button>
//                   );
//                 })
//               )}
//             </div>

//             {/* Footer Stats */}
//             {tradingYears.length > 0 && (
//               <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
//                 <div className="flex items-center justify-between text-xs text-gray-600">
//                   <span>
//                     {activeCount} active • {tradingYears.filter(year => year.status === 'Finalised' || year.status === 'Year Closed').length} closed • {tradingYears.filter(year => year.status === 'Not Registered').length} not registered
//                   </span>
                 
//                 </div>
//               </div>
//             )}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default TradingYearsNotification;
































































// import React, { useEffect, useState, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';
// import Swal from 'sweetalert2';
// import { 
//   FiCalendar, 
//   FiChevronDown, 
//   FiClock,
//   FiRefreshCw,
//   FiExternalLink
// } from 'react-icons/fi';
// import { previousTradingYearApi, registerTradingYearApi, activateTradingYearApi } from '../services/dashboard';

// const TradingYearsNotification = () => {
//   const [tradingYears, setTradingYears] = useState([]);
//   const [isOpen, setIsOpen] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [registering, setRegistering] = useState(null); // Track which year is being registered
//   const [activating, setActivating] = useState(null); // Track which year is being activated
//   const dropdownRef = useRef(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const res = await previousTradingYearApi();
      
//       if (res.data.success && res.data.data) {
//         setTradingYears(res.data.data);
//       }
//     } catch (error) {
//       console.error('Error fetching trading years:', error);
//       toast.error('Failed to fetch trading years data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRefresh = async () => {
//     setRefreshing(true);
//     await fetchData();
//     setRefreshing(false);
//   };

//   const registerTradingYear = async (yearData) => {
//     try {
//       setRegistering(yearData.trading_year);
      
//       // Prepare the data for registration API
//       const registrationData = {
//         tradingYear: yearData.trading_year,
//         close: 0  // Set close field to 0 (not closed)
//       };

//       const response = await registerTradingYearApi(registrationData);
      
//       if (response.data.success) {
//         toast.success(`Successfully registered trading year ${yearData.trading_year}`);
//         // Refresh the data to get updated status
//         await fetchData();
        
//         // Optionally navigate to dashboard or wherever appropriate
//         navigate('/dashboard');
//       } else {
//         toast.error(response.data.message || 'Failed to register trading year');
//       }
//     } catch (error) {
//       console.error('Error registering trading year:', error);
//       toast.error('Failed to register trading year. Please try again.');
//     } finally {
//       setRegistering(null);
//     }
//   };

//   const activateTradingYear = async (yearData) => {
//     try {
//       setActivating(yearData.trading_year);
      
//       // Send the data in the exact format backend expects
//       const response = await activateTradingYearApi({
//         tradingYear: yearData.trading_year
//       });
      
//       if (response.data.success) {
//         toast.success(`Successfully activated trading year ${yearData.trading_year}`);
//         // Refresh the data to get updated status
//         await fetchData();
        
//         // Optionally navigate to dashboard
//         navigate('/dashboard');
//       } else {
//         toast.error(response.data.message || 'Failed to activate trading year');
//       }
//     } catch (error) {
//       console.error('Error activating trading year:', error);
      
//       // More detailed error handling
//       if (error.response?.data?.message) {
//         toast.error(error.response.data.message);
//       } else if (error.response?.status === 500) {
//         toast.error('Server error occurred. Please try again later.');
//       } else {
//         toast.error('Failed to activate trading year. Please try again.');
//       }
//     } finally {
//       setActivating(null);
//     }
//   };

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   const getStatusConfig = (status) => {
//     switch (status) {
//       case 'Current Trading Year':
//         return {
//           color: 'bg-green-500 text-white',
//           label: 'Current Trading Year'
//         };
//       case 'Active':
//         return {
//           color: 'bg-green-500 text-white',
//           label: 'Active'
//         };
//       case 'Not Registered':
//         return {
//           color: 'bg-red-500 text-white',
//           label: 'Not Registered'
//         };
//       case 'Closed':
//       case 'Year Closed':
//         return {
//           color: 'bg-blue-500 text-white',
//           label: status
//         };
//       case 'Not Finalised':
//         return {
//           color: 'bg-yellow-500 text-white',
//           label: 'Not Finalised'
//         };
//       default:
//         return {
//           color: 'bg-gray-500 text-white',
//           label: 'Unknown'
//         };
//     }
//   };

//   const handleYearClick = async (year) => {
//     // Don't do anything if the year is closed or currently being processed
//     if (year.status === 'Closed' || registering === year.trading_year || activating === year.trading_year) {
//       return; // Exit early, no action
//     }

//     if (year.status === 'Active') {
//       // Already active - show message and do nothing
//       toast.info(`${year.trading_year} is already your active trading year`);
//       return;
//     } else if (year.status === 'Not Registered') {
//       // Show SweetAlert2 confirmation for registering the year
//       const result = await Swal.fire({
//         title: 'Register Trading Year',
//         html: `Do you want to register the trading year <strong>${year.trading_year}</strong>?`,
//         icon: 'question',
//         showCancelButton: true,
//         confirmButtonColor: '#3B82F6',
//         cancelButtonColor: '#6B7280',
//         confirmButtonText: 'Yes, Register',
//         cancelButtonText: 'Cancel',
//         focusConfirm: false
//       });

//       if (result.isConfirmed) {
//         await registerTradingYear(year);
//       }
//     } else {
//       // For all other registered years (Not Finalised, Current Trading Year, etc.) - activate them
//       const result = await Swal.fire({
//         title: 'Activate Trading Year',
//         html: `Do you want to activate <strong>${year.trading_year}</strong> as your current trading year?`,
//         icon: 'question',
//         showCancelButton: true,
//         confirmButtonColor: '#3B82F6',
//         cancelButtonColor: '#6B7280',
//         confirmButtonText: 'Yes, Activate',
//         cancelButtonText: 'Cancel',
//         focusConfirm: false
//       });

//       if (result.isConfirmed) {
//         await activateTradingYear(year);
//       }
//     }
//     setIsOpen(false);
//   };

//   const activeCount = tradingYears.filter(year => year.status === 'Active').length;
//   const totalCount = tradingYears.length;

//   if (loading) {
//     return (
//       <div className="relative" ref={dropdownRef}>
//         {/* Loading State - Matching the actual design */}
//         <button
//           disabled
//           className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg transition-all duration-200 animate-pulse cursor-not-allowed"
//         >
//           <div className="w-4 h-4 bg-gray-300 rounded animate-pulse"></div>
          
//           <div className="w-20 h-4 bg-gray-300 rounded animate-pulse"></div>

//           <div className="w-3.5 h-3.5 bg-gray-300 rounded animate-pulse"></div>
          
//           <div className="w-5 h-5 bg-gray-300 rounded-full animate-pulse absolute -top-3 -right-1"></div>
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="relative" ref={dropdownRef}>
//       {/* Dropdown Trigger */}
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className={`flex items-center gap-2 px-3 py-2 bg-white border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:bg-gray-50 ${
//           isOpen ? 'border-blue-300 bg-blue-50' : 'border-gray-200'
//         }`}
//       >
//         <FiCalendar size={16} className={`transition-colors ${
//           isOpen ? 'text-blue-600' : 'text-gray-600'
//         }`} />
        
//         <span className="text-sm font-medium text-gray-700 text-nowrap">
//           Trading Years
//         </span>

//         <FiChevronDown 
//           size={14} 
//           className={`text-gray-400 transition-transform duration-200 ${
//             isOpen ? 'rotate-180' : ''
//           }`} 
//         />

//         {/* Notification Badge */}
//         {totalCount > 0 && (
//           <span className="inline-flex absolute -top-2 -right-1 items-center justify-center w-5 h-5 text-xs font-bold text-white bg-green-500 rounded-full">
//             {totalCount}
//           </span> 
//         )}
//       </button>

//       {/* Dropdown Menu */}
//       {isOpen && (
//         <>
//           {/* Mobile Backdrop */}
//           <div 
//             className="fixed inset-0 z-10 bg-black bg-opacity-10 backdrop-blur-sm md:hidden" 
//             onClick={() => setIsOpen(false)}
//           />
          
//           {/* Dropdown Content */}
//           <div className="absolute right-0 mt-2 w-82 bg-white border border-gray-200 rounded-lg shadow-lg z-20 overflow-hidden">
//             {/* Header */}
//             <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
//               <div className="flex items-center justify-between">
//                 <h3 className="text-sm font-semibold text-gray-900">
//                   You have {totalCount} Trading Year{totalCount !== 1 ? 's' : ''}
//                 </h3>
//                 <button
//                   onClick={handleRefresh}
//                   disabled={refreshing}
//                   className="p-1.5 rounded-lg hover:bg-white transition-colors disabled:opacity-50"
//                   title="Refresh"
//                 >
//                   <FiRefreshCw size={14} className={`text-gray-600 ${refreshing ? 'animate-spin' : ''}`} />
//                 </button>
//               </div>
//             </div>

//             {/* Years List */}
//             <div className="max-h-64 overflow-y-auto">
//               {tradingYears.length === 0 ? (
//                 <div className="p-4 text-center">
//                   <FiCalendar size={24} className="text-gray-400 mx-auto mb-2" />
//                   <p className="text-sm text-gray-500">No trading years found</p>
//                 </div>
//               ) : (
//                 tradingYears.map((year, index) => {
//                   const statusConfig = getStatusConfig(year.status);
//                   const isDisabled = year.status === 'Closed';
//                   const isRegistering = registering === year.trading_year;
//                   const isActivating = activating === year.trading_year;
//                   const isProcessing = isRegistering || isActivating;
                  
//                   return (
//                     <button
//                       key={index}
//                       onClick={() => handleYearClick(year)}
//                       disabled={isDisabled || isProcessing}
//                       className={`w-full p-4 text-left transition-colors duration-150 focus:outline-none border-b border-gray-100 last:border-b-0 group ${
//                         isDisabled 
//                           ? 'cursor-not-allowed opacity-85 bg-gray-50' 
//                           : isProcessing
//                           ? 'cursor-wait opacity-75 bg-blue-50'
//                           : 'hover:bg-gray-50 focus:bg-blue-50 cursor-pointer'
//                       }`}
//                     >
//                       <div className="flex items-start gap-3">
//                         {/* Calendar Icon */}
//                         <div className="flex-shrink-0 mt-1">
//                           <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
//                             isDisabled 
//                               ? 'bg-gray-200' 
//                               : isProcessing
//                               ? 'bg-blue-200'
//                               : 'bg-blue-100 group-hover:bg-blue-200'
//                           }`}>
//                             {isProcessing ? (
//                               <FiRefreshCw size={16} className="text-blue-600 animate-spin" />
//                             ) : (
//                               <FiCalendar size={16} className={`${
//                                 isDisabled ? 'text-blue-400' : 'text-blue-600'
//                               }`} />
//                             )}
//                           </div>
//                         </div>
                        
//                         {/* Year Info */}
//                         <div className="flex-1 min-w-0">
//                           <div className="flex items-center justify-between mb-2">
//                             <h4 className={`text-sm font-semibold transition-colors ${
//                               isDisabled 
//                                 ? 'text-gray-800' 
//                                 : isProcessing
//                                 ? 'text-blue-900'
//                                 : 'text-gray-900 group-hover:text-blue-900'
//                             }`}>
//                               {year.trading_year} {isRegistering && '(Registering...)'} {isActivating && '(Activating...)'}
//                             </h4>
//                             {year.status !== 'Active' && !isDisabled && !isProcessing && (
//                               <FiExternalLink size={12} className="text-gray-400 group-hover:text-blue-600 transition-colors" />
//                             )}
//                           </div>
                          
//                           <div className="flex items-center gap-2 flex-wrap">
//                             <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${statusConfig.color} ${
//                               isDisabled ? 'opacity-95' : ''
//                             }`}>
//                               {statusConfig.label}
//                             </span>
                            
//                             {year.planPurchased === 'Yes' && (
//                               <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800 ${
//                                 isDisabled ? 'opacity-95' : ''
//                               }`}>
//                                 Plan Purchased
//                               </span>
//                             )}

//                             {year.planPurchased === 'No' && (
//                               <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700 ${
//                                 isDisabled ? 'opacity-95' : ''
//                               }`}>
//                                Plan Not Purchased
//                               </span>
//                             )}
//                           </div>
                          
//                           {/* Action Hint */}
//                           <p className={`text-xs mt-1 ${
//                             'text-gray-500'
//                           }`}>
//                             {isRegistering
//                               ? 'Registering trading year...'
//                               : isActivating
//                               ? 'Activating trading year...'
//                               : year.status === 'Active' 
//                               ? 'Trading year in progress!' 
//                               : year.status === 'Not Registered'
//                               ? 'Click to register this trading year'
//                               : year.status === 'Closed'
//                               ? 'This trading year is closed!'
//                               : 'Click to activate this trading year'
//                             }
//                           </p>
//                         </div>
//                       </div>
//                     </button>
//                   );
//                 })
//               )}
//             </div>

//             {/* Footer Stats */}
//             {tradingYears.length > 0 && (
//               <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
//                 <div className="flex items-center justify-between text-xs text-gray-600">
//                   <span>
//                     {activeCount} active • {tradingYears.filter(year => year.status === 'Finalised' || year.status === 'Year Closed').length} closed • {tradingYears.filter(year => year.status === 'Not Registered').length} not registered
//                   </span>
                 
//                 </div>
//               </div>
//             )}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default TradingYearsNotification;
































import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { 
  FiCalendar, 
  FiChevronDown, 
  FiClock,
  FiRefreshCw,
  FiExternalLink
} from 'react-icons/fi';
import { previousTradingYearApi, registerTradingYearApi, activateTradingYearApi } from '../services/dashboard';

const PreviousTradingYears = () => {
  const [tradingYears, setTradingYears] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [registering, setRegistering] = useState(null); // Track which year is being registered
  const [activating, setActivating] = useState(null); // Track which year is being activated
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
      toast.error('Failed to fetch trading years data');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  const registerTradingYear = async (yearData) => {
    try {
      setRegistering(yearData.trading_year);
      
      // Prepare the data for registration API
      const registrationData = {
        tradingYear: yearData.trading_year,
        close: 0  // Set close field to 0 (not closed)
      };

      const response = await registerTradingYearApi(registrationData);
      
      if (response.data.success) {
        toast.success(`Successfully registered trading year ${yearData.trading_year}`);
        // Refresh the data to get updated status
        await fetchData();
        
        // Optionally navigate to dashboard or wherever appropriate
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
      
      // Send the data in the exact format backend expects
      const response = await activateTradingYearApi({
        tradingYear: yearData.trading_year
      });
      
      if (response.data.success) {
        toast.success(`Successfully activated trading year ${yearData.trading_year}`);
        // Refresh the data to get updated status
        await fetchData();
        
        // Trigger dashboard data refresh by dispatching custom event
        window.dispatchEvent(new CustomEvent('tradingYearActivated', {
          detail: { 
            activatedYear: yearData.trading_year,
            newActiveData: response.data.data 
          }
        }));
        
        // Force page reload after a short delay to ensure all components update
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        
      } else {
        toast.error(response.data.message || 'Failed to activate trading year');
      }
    } catch (error) {
      console.error('Error activating trading year:', error);
      
      // More detailed error handling
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
      case 'Current Trading Year':
        return {
          color: 'bg-green-500 text-white',
          label: 'Current Trading Year'
        };
      case 'Active':
        return {
          color: 'bg-green-500 text-white',
          label: 'Active'
        };
      case 'Not Registered':
        return {
          color: 'bg-red-500 text-white',
          label: 'Not Registered'
        };
      case 'Closed':
      case 'Year Closed':
        return {
          color: 'bg-blue-500 text-white',
          label: status
        };
      case 'Not Finalised':
        return {
          color: 'bg-yellow-500 text-white',
          label: 'Not Finalised'
        };
      default:
        return {
          color: 'bg-gray-500 text-white',
          label: 'Unknown'
        };
    }
  };

  const handleYearClick = async (year) => {
    // Don't do anything if the year is closed or currently being processed
    if (year.status === 'Closed' || registering === year.trading_year || activating === year.trading_year) {
      return; // Exit early, no action
    }

    if (year.status === 'Active') {
      // Already active - show message and do nothing
      toast.info(`${year.trading_year} is already your active trading year`);
      return;
    } else if (year.status === 'Not Registered') {
      // Show SweetAlert2 confirmation for registering the year
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
      // For all other registered years (Not Finalised, Current Trading Year, etc.) - activate them
      const result = await Swal.fire({
        title: 'Activate Trading Year',
        html: `Do you want to activate <strong>${year.trading_year}</strong> as your current trading year?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3B82F6',
        cancelButtonColor: '#6B7280',
        confirmButtonText: 'Yes, Activate',
        cancelButtonText: 'Cancel',
        focusConfirm: false
      });

      if (result.isConfirmed) {
        await activateTradingYear(year);
      }
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
          
          <div className="w-5 h-5 bg-gray-300 rounded-full animate-pulse absolute -top-3 -right-1"></div>
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
          <span className="inline-flex absolute -top-2 -right-1 items-center justify-center w-5 h-5 text-xs font-bold text-white bg-green-500 rounded-full">
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
          <div className="absolute right-0 mt-2 w-90 bg-white border border-gray-200 rounded-lg shadow-lg z-20 overflow-hidden">
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
                  const isDisabled = year.status === 'Closed';
                  const isRegistering = registering === year.trading_year;
                  const isActivating = activating === year.trading_year;
                  const isProcessing = isRegistering || isActivating;
                  
                  return (
                    <button
                      key={index}
                      onClick={() => handleYearClick(year)}
                      disabled={isDisabled || isProcessing}
                      className={`w-full p-4 text-left transition-colors duration-150 focus:outline-none border-b border-gray-100 last:border-b-0 group ${
                        isDisabled 
                          ? 'cursor-not-allowed opacity-85 bg-gray-50' 
                          : isProcessing
                          ? 'cursor-wait opacity-75 bg-blue-50'
                          : 'hover:bg-gray-50 focus:bg-blue-50 cursor-pointer'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {/* Calendar Icon */}
                        <div className="flex-shrink-0 mt-1">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                            isDisabled 
                              ? 'bg-gray-200' 
                              : isProcessing
                              ? 'bg-blue-200'
                              : 'bg-blue-100 group-hover:bg-blue-200'
                          }`}>
                            {isProcessing ? (
                              <FiRefreshCw size={16} className="text-blue-600 animate-spin" />
                            ) : (
                              <FiCalendar size={16} className={`${
                                isDisabled ? 'text-blue-400' : 'text-blue-600'
                              }`} />
                            )}
                          </div>
                        </div>
                        
                        {/* Year Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className={`text-sm font-semibold transition-colors ${
                              isDisabled 
                                ? 'text-gray-800' 
                                : isProcessing
                                ? 'text-blue-900'
                                : 'text-gray-900 group-hover:text-blue-900'
                            }`}>
                              {year.trading_year} {isRegistering && '(Registering...)'} {isActivating && '(Activating...)'}
                            </h4>
                            {year.status !== 'Active' && !isDisabled && !isProcessing && (
                              <FiExternalLink size={12} className="text-gray-400 group-hover:text-blue-600 transition-colors" />
                            )}
                          </div>
                          
                          <div className="flex items-center gap-2 flex-wrap">
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
                          
                          {/* Action Hint */}
                          <p className={`text-xs mt-1 ${
                            'text-gray-500'
                          }`}>
                            {isRegistering
                              ? 'Registering trading year...'
                              : isActivating
                              ? 'Activating trading year...'
                              : year.status === 'Active' 
                              ? 'Trading year in progress!' 
                              : year.status === 'Not Registered'
                              ? 'Click to register this trading year'
                              : year.status === 'Closed'
                              ? 'This trading year is closed!'
                              : 'Click to activate this trading year'
                            }
                          </p>
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
                    {activeCount} active • {tradingYears.filter(year => year.status === 'Finalised' || year.status === 'Year Closed').length} closed • {tradingYears.filter(year => year.status === 'Not Registered').length} not registered
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