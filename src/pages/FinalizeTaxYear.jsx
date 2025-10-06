// import React, { useEffect, useState } from 'react';
// import toast from 'react-hot-toast';
// import Swal from 'sweetalert2';
// import { 
//   FiCalendar, 
//   FiCheck,
//   FiClock,
//   FiLock,
//   FiAlertTriangle,
//   FiRefreshCw,
//   FiDownload,
//   FiFileText
// } from 'react-icons/fi';
// import { tradingYearsWithDetailsApi, finalizeTradingYearApi } from '../services/dashboard';
// import { useTradingYear } from '../context/TradingYearContext';

// const FinalizeTaxYear = () => {
//   const [detailedTradingYears, setDetailedTradingYears] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [finalizing, setFinalizing] = useState(null);
  
//   const { 
//     tradingYears: contextTradingYears, 
//     refreshTradingYears,
//     updateActiveTradingYear 
//   } = useTradingYear();

//   // Fetch detailed trading years data with IDs
//   const fetchDetailedTradingYears = async () => {
//     try {
//       setLoading(true);
//       const response = await tradingYearsWithDetailsApi();
      
//       if (response.data.success) {
//         // Merge data from both APIs to get complete information
//         const detailedData = response.data.data;
//         const contextData = contextTradingYears;
        
//         // Combine the data - use context data for status and plan info, detailed data for IDs
//         const mergedData = detailedData.map(detailedYear => {
//           const contextYear = contextData.find(cy => cy.trading_year === detailedYear.tradingYear);
          
//           return {
//             ...detailedYear,
//             status: contextYear?.status || getStatusFromFlags(detailedYear),
//             planPurchased: contextYear?.planPurchased || 'Unknown'
//           };
//         });
        
//         setDetailedTradingYears(mergedData);
//       }
//     } catch (error) {
//       console.error('Error fetching detailed trading years:', error);
//       toast.error('Failed to load trading years data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Helper function to derive status from API flags when context data is not available
//   const getStatusFromFlags = (yearData) => {
//     if (yearData.close === 1) return 'Closed';
//     if (yearData.finalise_year === 1) return 'Finalised';
//     if (yearData.active_trading_year === 1) return 'Current Trading Year';
//     return 'Not Finalised';
//   };

//   // Get status configuration for display
//   const getStatusConfig = (status) => {
//     switch (status) {
//       case 'Current Trading Year':
//         return {
//           color: 'bg-green-500 text-white',
//           icon: FiCheck,
//           label: 'Current Trading Year',
//           canFinalize: true
//         };
//       case 'Not Finalised':
//         return {
//           color: 'bg-yellow-500 text-white',
//           icon: FiClock,
//           label: 'Not Finalised',
//           canFinalize: true
//         };
//       case 'Finalised':
//         return {
//           color: 'bg-blue-500 text-white',
//           icon: FiLock,
//           label: 'Finalised',
//           canFinalize: false
//         };
//       case 'Closed':
//         return {
//           color: 'bg-gray-500 text-white',
//           icon: FiLock,
//           label: 'Closed',
//           canFinalize: false
//         };
//       default:
//         return {
//           color: 'bg-gray-500 text-white',
//           icon: FiClock,
//           label: 'Unknown',
//           canFinalize: false
//         };
//     }
//   };

//   // Get next trading year for finalization
//   const getNextTradingYear = (currentYear) => {
//     // Sort years by trading year descending to find the next logical year
//     const sortedYears = [...detailedTradingYears].sort((a, b) => {
//       const aYear = parseInt(a.tradingYear.split('-')[0]);
//       const bYear = parseInt(b.tradingYear.split('-')[0]);
//       return bYear - aYear;
//     });
    
//     const currentYearStart = parseInt(currentYear.split('-')[0]);
    
//     // Find the next year that exists in our data
//     const nextYear = sortedYears.find(year => {
//       const yearStart = parseInt(year.tradingYear.split('-')[0]);
//       return yearStart > currentYearStart && year.finalise_year !== 1;
//     });
    
//     return nextYear?.tradingYear;
//   };

//   // Handle finalize trading year
//   const handleFinalizeTradingYear = async (yearData) => {
//     const nextYear = getNextTradingYear(yearData.tradingYear);
    
//     const result = await Swal.fire({
//       title: 'Finalize Trading Year',
//       html: `
//         <div class="text-left">
//           <p class="mb-3">Are you sure you want to finalize the trading year <strong>${yearData.tradingYear}</strong>?</p>
//           ${nextYear ? `<p class="mb-3 text-sm text-blue-700">The next trading year <strong>${nextYear}</strong> will be automatically activated.</p>` : ''}
//           <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-3">
//             <div class="flex items-start">
//               <div class="flex-shrink-0">
//                 <svg class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
//                   <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
//                 </svg>
//               </div>
//               <div class="ml-3">
//                 <h3 class="text-sm font-medium text-yellow-800">Warning</h3>
//                 <p class="text-sm text-yellow-700 mt-1">Once finalized, this trading year cannot be modified or reopened. A financial statement PDF will be generated.</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       `,
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#DC2626',
//       cancelButtonColor: '#6B7280',
//       confirmButtonText: 'Yes, Finalize',
//       cancelButtonText: 'Cancel',
//       focusConfirm: false
//     });

//     if (result.isConfirmed) {
//       try {
//         setFinalizing(yearData.id);
        
//         const finalizationData = {
//           current_trading_year_id: yearData.id
//         };
        
//         // Add next trading year if available
//         if (nextYear) {
//           finalizationData.next_trading_year = nextYear;
//         }
        
//         const response = await finalizeTradingYearApi(finalizationData);
        
//         if (response.data.success) {
//           // Show success message with PDF download option
//           const successMessage = `Successfully finalized trading year ${yearData.tradingYear}`;
//           const nextYearMessage = response.data.next_active_year 
//             ? ` and activated ${response.data.next_active_year.tradingYear}`
//             : '';
          
//           toast.success(successMessage + nextYearMessage);
          
//           // Show PDF download notification if available
//           if (response.data.file) {
//             Swal.fire({
//               title: 'Financial Statement Generated',
//               html: `
//                 <div class="text-left">
//                   <p class="mb-3">A financial statement PDF has been generated for trading year <strong>${yearData.tradingYear}</strong>.</p>
//                   <p class="mb-3 text-sm text-gray-600">Would you like to download it now?</p>
//                 </div>
//               `,
//               icon: 'success',
//               showCancelButton: true,
//               confirmButtonColor: '#3B82F6',
//               cancelButtonColor: '#6B7280',
//               confirmButtonText: 'Download PDF',
//               cancelButtonText: 'Later',
//               focusConfirm: true
//             }).then((result) => {
//               if (result.isConfirmed) {
//                 // Open PDF in new tab
//                 window.open(response.data.file, '_blank');
//               }
//             });
//           }
          
//           // Refresh both detailed data and context
//           await Promise.all([
//             fetchDetailedTradingYears(),
//             refreshTradingYears()
//           ]);
          
//           // Update active trading year if needed
//           await updateActiveTradingYear();
//         } else {
//           toast.error(response.data.message || 'Failed to finalize trading year');
//         }
//       } catch (error) {
//         console.error('Error finalizing trading year:', error);
//         toast.error(error.response?.data?.message || 'Failed to finalize trading year');
//       } finally {
//         setFinalizing(null);
//       }
//     }
//   };

//   // Filter years that can be finalized
//   const finalizableYears = detailedTradingYears.filter(year => {
//     const statusConfig = getStatusConfig(year.status);
//     return statusConfig.canFinalize && year.finalise_year !== 1;
//   });

//   const alreadyFinalizedYears = detailedTradingYears.filter(year => year.finalise_year === 1);

//   useEffect(() => {
//     if (contextTradingYears.length > 0) {
//       fetchDetailedTradingYears();
//     }
//   }, [contextTradingYears]);

//   if (loading) {
//     return (
//       <div className="max-w-4xl mx-auto p-6">
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//           <div className="animate-pulse">
//             <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
//             <div className="space-y-3">
//               {[1, 2, 3].map((i) => (
//                 <div key={i} className="h-16 bg-gray-100 rounded"></div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-6 space-y-6">
//       {/* Header */}
//       <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//         <div className="flex items-center justify-between mb-4">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
//               <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
//                 <FiLock className="text-blue-600" size={20} />
//               </div>
//               Finalize Trading Years
//             </h1>
//             <p className="text-gray-600 mt-1">
//               Finalize completed trading years to lock them permanently
//             </p>
//           </div>
//           <button
//             onClick={fetchDetailedTradingYears}
//             disabled={loading}
//             className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
//             title="Refresh"
//           >
//             <FiRefreshCw 
//               size={18} 
//               className={`text-gray-600 ${loading ? 'animate-spin' : ''}`} 
//             />
//           </button>
//         </div>

//         {/* Summary Stats */}
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//           <div className="bg-yellow-50 rounded-lg p-4">
//             <div className="flex items-center">
//               <FiClock className="text-yellow-600" size={20} />
//               <div className="ml-3">
//                 <p className="text-sm font-medium text-yellow-800">Can Finalize</p>
//                 <p className="text-lg font-semibold text-yellow-900">{finalizableYears.length}</p>
//               </div>
//             </div>
//           </div>
//           <div className="bg-blue-50 rounded-lg p-4">
//             <div className="flex items-center">
//               <FiLock className="text-blue-600" size={20} />
//               <div className="ml-3">
//                 <p className="text-sm font-medium text-blue-800">Already Finalized</p>
//                 <p className="text-lg font-semibold text-blue-900">{alreadyFinalizedYears.length}</p>
//               </div>
//             </div>
//           </div>
//           <div className="bg-gray-50 rounded-lg p-4">
//             <div className="flex items-center">
//               <FiCalendar className="text-gray-600" size={20} />
//               <div className="ml-3">
//                 <p className="text-sm font-medium text-gray-800">Total Years</p>
//                 <p className="text-lg font-semibold text-gray-900">{detailedTradingYears.length}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Finalizable Years */}
//       {finalizableYears.length > 0 && (
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200">
//           <div className="p-6 border-b border-gray-200">
//             <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//               <FiAlertTriangle className="text-yellow-600" size={18} />
//               Years Available for Finalization
//             </h2>
//             <p className="text-sm text-gray-600 mt-1">
//               These years can be finalized. Once finalized, they cannot be modified.
//             </p>
//           </div>
//           <div className="divide-y divide-gray-200">
//             {finalizableYears.map((year) => {
//               const statusConfig = getStatusConfig(year.status);
//               const StatusIcon = statusConfig.icon;
//               const isProcessing = finalizing === year.id;
              
//               return (
//                 <div key={year.id} className="p-6">
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-4">
//                       <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
//                         isProcessing ? 'bg-blue-100' : 'bg-yellow-100'
//                       }`}>
//                         {isProcessing ? (
//                           <FiRefreshCw size={20} className="text-blue-600 animate-spin" />
//                         ) : (
//                           <StatusIcon size={20} className="text-yellow-600" />
//                         )}
//                       </div>
//                       <div>
//                         <h3 className="text-lg font-semibold text-gray-900">
//                           {year.tradingYear}
//                         </h3>
//                         <div className="flex items-center gap-2 mt-1">
//                           <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${statusConfig.color}`}>
//                             {statusConfig.label}
//                           </span>
//                           {year.planPurchased === 'Yes' && (
//                             <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
//                               Plan Purchased
//                             </span>
//                           )}
//                         </div>
//                         <p className="text-sm text-gray-500 mt-1">
//                           {year.tradingyear_startdate} to {year.tradingyear_enddate}
//                         </p>
//                         {/* Show next year info */}
//                         {(() => {
//                           const nextYear = getNextTradingYear(year.tradingYear);
//                           return nextYear ? (
//                             <p className="text-xs text-blue-600 mt-1">
//                               → Will activate {nextYear} automatically
//                             </p>
//                           ) : (
//                             <p className="text-xs text-amber-600 mt-1">
//                               ⚠ No next year available for auto-activation
//                             </p>
//                           );
//                         })()}
//                       </div>
//                     </div>
//                     <button
//                       onClick={() => handleFinalizeTradingYear(year)}
//                       disabled={isProcessing}
//                       className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500/20 ${
//                         isProcessing
//                           ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
//                           : 'bg-red-600 hover:bg-red-700 text-white hover:shadow-md'
//                       }`}
//                     >
//                       {isProcessing ? 'Finalizing...' : 'Finalize Year'}
//                     </button>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       )}

//       {/* Already Finalized Years */}
//       {alreadyFinalizedYears.length > 0 && (
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200">
//           <div className="p-6 border-b border-gray-200">
//             <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//               <FiCheck className="text-green-600" size={18} />
//               Finalized Years
//             </h2>
//             <p className="text-sm text-gray-600 mt-1">
//               These years have been finalized and are permanently locked.
//             </p>
//           </div>
//           <div className="divide-y divide-gray-200">
//             {alreadyFinalizedYears.map((year) => (
//               <div key={year.id} className="p-6">
//                 <div className="flex items-center gap-4">
//                   <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
//                     <FiLock size={20} className="text-blue-600" />
//                   </div>
//                   <div className="flex-1">
//                     <h3 className="text-lg font-semibold text-gray-900">
//                       {year.tradingYear}
//                     </h3>
//                     <div className="flex items-center gap-2 mt-1">
//                       <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-500 text-white">
//                         Finalized
//                       </span>
//                       {year.planPurchased === 'Yes' && (
//                         <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
//                           Plan Purchased
//                         </span>
//                       )}
//                     </div>
//                     <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
//                       <span>{year.tradingyear_startdate} to {year.tradingyear_enddate}</span>
//                       {year.finalise_date && (
//                         <span>• Finalized on {new Date(year.finalise_date).toLocaleDateString()}</span>
//                       )}
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <span className="text-xs text-gray-500">Permanently Locked</span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* No Data State */}
//       {detailedTradingYears.length === 0 && (
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
//           <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <FiCalendar size={24} className="text-gray-400" />
//           </div>
//           <h3 className="text-lg font-medium text-gray-900 mb-2">No Trading Years Found</h3>
//           <p className="text-gray-500">
//             No trading years are available for finalization at this time.
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FinalizeTaxYear;



































// import React, { useEffect, useState } from 'react';
// import toast from 'react-hot-toast';
// import Swal from 'sweetalert2';
// import { 
//   FiHome, 
//   FiDollarSign, 
//   FiCheck,  
//   FiAlertTriangle,
//   FiFileText,
//   FiCalendar,
//   FiTrendingUp,
//   FiRefreshCw
// } from 'react-icons/fi';
// import { tradingYearsWithDetailsApi, finalizeTradingYearApi } from '../services/dashboard';
// import { useTradingYear } from '../context/TradingYearContext';
// import { Car } from 'lucide-react';

// const FinalizeTaxYear = () => {
//   const [detailedTradingYears, setDetailedTradingYears] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [finalizing, setFinalizing] = useState(false);
//   const [isConfirmed, setIsConfirmed] = useState(false);
  
//   const { 
//     activeTradingYear,
//     refreshTradingYears,
//     updateActiveTradingYear 
//   } = useTradingYear();

//   // Get the active trading year that can be finalized
//   const activeYear = detailedTradingYears.find(year => year.active_trading_year === 1);

//   // Sample data for display - replace with actual API calls
//   const [currentTradingYear, setCurrentTradingYear] = useState({
//     year: '',
//     adjustedNetProfitLoss: '£ 57.47',
//     planPurchased: false,
//     planPrice: '£ 2.00 /annually',
//     percentageAdjustment: true,
//     selfAssessmentProvided: true
//   });

//   const vehicleData = [
//     {
//       id: 1,
//       vehicleName: 'Car',
//       make: 'Toyota',
//       model: '1995',
//       regNo: '503010006',
//       co2Emission: '04-2025',
//       purchaseDate: '6-04-2025',
//       purchasePrice: '£ 700.00',
//       salesDate: 'Active',
//       salesCost: '£ 0.00'
//     }
//   ];

//   // Fetch detailed trading years data with IDs
//   const fetchDetailedTradingYears = async () => {
//     try {
//       setLoading(true);
//       const response = await tradingYearsWithDetailsApi();
      
//       if (response.data.success) {
//         setDetailedTradingYears(response.data.data);
        
//         // Find active year and update current trading year display
//         const activeYear = response.data.data.find(year => year.active_trading_year === 1);
//         if (activeYear) {
//           setCurrentTradingYear(prev => ({
//             ...prev,
//             year: `${activeYear.tradingyear_startdate} / ${activeYear.tradingyear_enddate}`,
//             planPurchased: true // You can get this from your context or API
//           }));
//         }
//       }
//     } catch (error) {
//       console.error('Error fetching detailed trading years:', error);
//       toast.error('Failed to load trading years data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Get next trading year automatically
//   const getNextTradingYear = (currentYear) => {
//     if (!currentYear) return null;
    
//     // Sort years by trading year to find logical next year
//     const sortedYears = [...detailedTradingYears].sort((a, b) => {
//       const aYear = parseInt(a.tradingYear.split('-')[0]);
//       const bYear = parseInt(b.tradingYear.split('-')[0]);
//       return aYear - bYear;
//     });
    
//     const currentYearStart = parseInt(currentYear.tradingYear.split('-')[0]);
    
//     // Find the next year that exists in our data and is not finalized
//     const nextYear = sortedYears.find(year => {
//       const yearStart = parseInt(year.tradingYear.split('-')[0]);
//       return yearStart > currentYearStart && year.finalise_year !== 1;
//     });
    
//     return nextYear?.tradingYear;
//   };

//   // Handle finalize trading year
//   const handleFinalize = async () => {
//     if (!isConfirmed) {
//       toast.error('Please confirm that the above data display is correct.');
//       return;
//     }

//     if (!activeYear) {
//       toast.error('No active trading year found to finalize.');
//       return;
//     }

//     const nextYear = getNextTradingYear(activeYear);
    
//     const result = await Swal.fire({
//       title: 'Finalize Trading Year',
//       html: `
//         <div class="text-left">
//           <p class="mb-3">Are you sure you want to finalize the trading year <strong>${activeYear.tradingYear}</strong>?</p>
//           ${nextYear ? `<p class="mb-3 text-sm text-blue-700">The next trading year <strong>${nextYear}</strong> will be automatically activated.</p>` : `<p class="mb-3 text-sm text-amber-600">⚠ No next year available for auto-activation</p>`}
//           <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-3">
//             <div class="flex items-start">
//               <div class="flex-shrink-0">
//                 <svg class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
//                   <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
//                 </svg>
//               </div>
//               <div class="ml-3">
//                 <h3 class="text-sm font-medium text-yellow-800">Warning</h3>
//                 <p class="text-sm text-yellow-700 mt-1">Once finalized, this trading year cannot be modified or reopened. A financial statement PDF will be generated.</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       `,
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#DC2626',
//       cancelButtonColor: '#6B7280',
//       confirmButtonText: 'Yes, Finalize',
//       cancelButtonText: 'Cancel',
//       focusConfirm: false
//     });

//     if (result.isConfirmed) {
//       try {
//         setFinalizing(true);
        
//         const finalizationData = {
//           current_trading_year_id: activeYear.id
//         };
        
//         // Add next trading year if available
//         if (nextYear) {
//           finalizationData.next_trading_year = nextYear;
//         }
        
//         const response = await finalizeTradingYearApi(finalizationData);
        
//         if (response.data.success) {
//           // Show success message with PDF download option
//           const successMessage = `Successfully finalized trading year ${activeYear.tradingYear}`;
//           const nextYearMessage = response.data.next_active_year 
//             ? ` and activated ${response.data.next_active_year.tradingYear}`
//             : '';
          
//           toast.success(successMessage + nextYearMessage);
          
//           // Show PDF download notification if available
//           if (response.data.file) {
//             Swal.fire({
//               title: 'Financial Statement Generated',
//               html: `
//                 <div class="text-left">
//                   <p class="mb-3">A financial statement PDF has been generated for trading year <strong>${activeYear.tradingYear}</strong>.</p>
//                   <p class="mb-3 text-sm text-gray-600">Would you like to download it now?</p>
//                 </div>
//               `,
//               icon: 'success',
//               showCancelButton: true,
//               confirmButtonColor: '#3B82F6',
//               cancelButtonColor: '#6B7280',
//               confirmButtonText: 'Download PDF',
//               cancelButtonText: 'Later',
//               focusConfirm: true
//             }).then((result) => {
//               if (result.isConfirmed) {
//                 // Open PDF in new tab
//                 window.open(response.data.file, '_blank');
//               }
//             });
//           }
          
//           // Refresh both detailed data and context
//           await Promise.all([
//             fetchDetailedTradingYears(),
//             refreshTradingYears()
//           ]);
          
//           // Update active trading year if needed
//           await updateActiveTradingYear();
          
//           // Reset confirmation
//           setIsConfirmed(false);
//         } else {
//           toast.error(response.data.message || 'Failed to finalize trading year');
//         }
//       } catch (error) {
//         console.error('Error finalizing trading year:', error);
//         toast.error(error.response?.data?.message || 'Failed to finalize trading year');
//       } finally {
//         setFinalizing(false);
//       }
//     }
//   };

//   useEffect(() => {
//     fetchDetailedTradingYears();
//   }, []);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         <div className="bg-white border-b border-gray-200 px-6 py-4">
//           <div className="max-w-7xl mx-auto">
//             <div className="animate-pulse">
//               <div className="h-4 bg-gray-200 rounded w-32"></div>
//             </div>
//           </div>
//         </div>
//         <div className="max-w-7xl mx-auto p-6 space-y-6">
//           {[1, 2, 3, 4].map((i) => (
//             <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//               <div className="animate-pulse">
//                 <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
//                 <div className="space-y-3">
//                   <div className="h-4 bg-gray-100 rounded"></div>
//                   <div className="h-4 bg-gray-100 rounded w-3/4"></div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   // If no active year found that can be finalized
//   if (!activeYear || activeYear.finalise_year === 1) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         {/* Breadcrumb */}
//         <div className="bg-white border-b border-gray-200 px-6 py-4">
//           <div className="max-w-7xl mx-auto">
//             <nav className="flex items-center space-x-2 text-sm text-gray-500">
//               <FiHome className="w-4 h-4" />
//               <span>Home</span>
//               <span>/</span>
//               <span>Dashboard</span>
//             </nav>
//           </div>
//         </div>

//         <div className="max-w-7xl mx-auto p-6">
//           <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
//             <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <FiCalendar size={24} className="text-gray-400" />
//             </div>
//             <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Trading Year</h3>
//             <p className="text-gray-500 mb-4">
//               {activeYear?.finalise_year === 1 
//                 ? 'Your current trading year is already finalized.' 
//                 : 'No active trading year found that can be finalized.'}
//             </p>
//             <button
//               onClick={fetchDetailedTradingYears}
//               className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//             >
//               <FiRefreshCw size={16} className="mr-2" />
//               Refresh
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Breadcrumb */}
//       <div className="bg-white border-b border-gray-200 px-6 py-4">
//         <div className="max-w-7xl mx-auto">
//           <nav className="flex items-center space-x-2 text-sm text-gray-500">
//             <FiHome className="w-4 h-4" />
//             <span>Home</span>
//             <span>/</span>
//             <span>Dashboard</span>
//           </nav>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto p-6 space-y-6">
//         {/* Header */}
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900 mb-2">Finalize tax year</h1>
//               <h2 className="text-xl text-blue-600 font-semibold">
//                 Finalise your tax year for {currentTradingYear.year}
//               </h2>
//               <p className="text-gray-600 mt-2">
//                 Review and finalize your active trading year data.
//               </p>
//             </div>
//             <button
//               onClick={fetchDetailedTradingYears}
//               disabled={loading}
//               className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
//               title="Refresh"
//             >
//               <FiRefreshCw 
//                 size={18} 
//                 className={`text-gray-600 ${loading ? 'animate-spin' : ''}`} 
//               />
//             </button>
//           </div>
//         </div>

//         {/* Overview Section */}
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200">
//           <div className="border-b border-gray-200 px-6 py-4">
//             <h3 className="text-lg font-semibold text-gray-900">Overview of your tax year:</h3>
//           </div>
          
//           <div className="p-6 space-y-6">
//             {/* Plan Section */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="bg-blue-50 rounded-lg p-4">
//                 <div className="flex items-center justify-between mb-3">
//                   <h4 className="font-semibold text-gray-900">Buy / Renew Plan</h4>
//                   <span className="text-blue-600 font-bold">{currentTradingYear.planPrice}</span>
//                 </div>
//                 {currentTradingYear.planPurchased && (
//                   <div className="flex items-center text-green-600">
//                     <FiCheck className="w-4 h-4 mr-2" />
//                     <span className="text-sm font-medium">Taxita plan purchased</span>
//                   </div>
//                 )}
//               </div>

//               <div className="bg-green-50 rounded-lg p-4">
//                 <h4 className="font-semibold text-gray-900 mb-2">Percentage Adjustment</h4>
//                 {currentTradingYear.percentageAdjustment ? (
//                   <div className="flex items-center text-green-600">
//                     <FiCheck className="w-4 h-4 mr-2" />
//                     <span className="text-sm">Your percentage adjustment is active.</span>
//                   </div>
//                 ) : (
//                   <span className="text-gray-500 text-sm">Not active</span>
//                 )}
//               </div>
//             </div>

//             {/* Net Profit/Loss */}
//             <div className="bg-yellow-50 rounded-lg p-4">
//               <div className="flex items-center justify-between">
//                 <h4 className="font-semibold text-gray-900 flex items-center">
//                   <FiTrendingUp className="w-5 h-5 mr-2 text-yellow-600" />
//                   Adjusted Net Profit / Loss
//                 </h4>
//                 <span className="text-2xl font-bold text-yellow-700">
//                   {currentTradingYear.adjustedNetProfitLoss}
//                 </span>
//               </div>
//               <p className="text-sm text-gray-600 mt-2">All your income of the trading year</p>
//             </div>
//           </div>
//         </div>

//         {/* Vehicles Section */}
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200">
//           <div className="border-b border-gray-200 px-6 py-4">
//             <h3 className="text-lg font-semibold text-gray-900 flex items-center">
//               <Car className="w-5 h-5 mr-2" />
//               Vehicles
//             </h3>
//           </div>
          
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.no</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle Name</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Make</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Model</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reg No.</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CO2 emission</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purchase date</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purchase Price</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sales Date</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sales Cost</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {vehicleData.map((vehicle, index) => (
//                   <tr key={vehicle.id}>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{index + 1}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{vehicle.vehicleName}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{vehicle.make}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{vehicle.model}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{vehicle.regNo}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{vehicle.co2Emission}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{vehicle.purchaseDate}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{vehicle.purchasePrice}</td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
//                         {vehicle.salesDate}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{vehicle.salesCost}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//           <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
//             <p className="text-sm text-gray-700">Showing 1 of 1 entries</p>
//           </div>
//         </div>

//         {/* Self Assessment Return */}
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200">
//           <div className="p-6">
//             <div className="flex items-center justify-between">
//               <h3 className="text-lg font-semibold text-gray-900 flex items-center">
//                 <FiFileText className="w-5 h-5 mr-2" />
//                 Self Assessment Return
//               </h3>
//               {currentTradingYear.selfAssessmentProvided && (
//                 <div className="flex items-center text-green-600">
//                   <FiCheck className="w-4 h-4 mr-2" />
//                   <span className="text-sm font-medium">You have provide your self assessment return information.</span>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Warning Section */}
//         <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
//           <div className="flex items-start">
//             <FiAlertTriangle className="w-6 h-6 text-yellow-600 mt-1 mr-3 flex-shrink-0" />
//             <div>
//               <h3 className="text-lg font-semibold text-yellow-800 mb-2">Warning!</h3>
//               <p className="text-yellow-700">
//                 Data of your year <strong>{currentTradingYear.year}</strong> will be locked and you will not be able to make any amendments in your record. Only Taxita team will be able to change it upon request. Are you sure you want to submit?
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Next Trading Year Info */}
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200">
//           <div className="border-b border-gray-200 px-6 py-4">
//             <h3 className="text-lg font-semibold text-gray-900 flex items-center">
//               <FiCalendar className="w-5 h-5 mr-2" />
//               Next Trading Year
//             </h3>
//           </div>
          
//           <div className="p-6">
//             {(() => {
//               const nextYear = getNextTradingYear(activeYear);
//               return nextYear ? (
//                 <div className="bg-blue-50 rounded-lg p-4">
//                   <div className="flex items-center text-blue-700">
//                     <FiCheck className="w-5 h-5 mr-2" />
//                     <span className="font-medium">Next year {nextYear} will be automatically activated</span>
//                   </div>
//                   <p className="text-sm text-blue-600 mt-2">
//                     After finalization, {nextYear} will become your active trading year.
//                   </p>
//                 </div>
//               ) : (
//                 <div className="bg-amber-50 rounded-lg p-4">
//                   <div className="flex items-center text-amber-700">
//                     <FiAlertTriangle className="w-5 h-5 mr-2" />
//                     <span className="font-medium">No next year available for auto-activation</span>
//                   </div>
//                   <p className="text-sm text-amber-600 mt-2">
//                     You will need to register a new trading year after finalization.
//                   </p>
//                 </div>
//               );
//             })()}
//           </div>
//         </div>

//         {/* Confirmation and Submit */}
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center">
//               <input
//                 type="checkbox"
//                 id="confirm"
//                 checked={isConfirmed}
//                 onChange={(e) => setIsConfirmed(e.target.checked)}
//                 className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//               />
//               <label htmlFor="confirm" className="ml-2 text-sm text-gray-700">
//                 I confirm that the above data display is correct.
//               </label>
//             </div>
            
//             <button
//               onClick={handleFinalize}
//               disabled={!isConfirmed || finalizing}
//               className={`px-6 py-3 rounded-lg font-medium transition-colors ${
//                 isConfirmed && !finalizing
//                   ? 'bg-red-600 hover:bg-red-700 text-white'
//                   : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//               }`}
//             >
//               {finalizing ? (
//                 <div className="flex items-center">
//                   <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                   Finalizing...
//                 </div>
//               ) : (
//                 'Finalize Tax Year'
//               )}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FinalizeTaxYear;












































// import React, { useEffect, useState } from 'react';
// import toast from 'react-hot-toast';
// import Swal from 'sweetalert2';
// import { 
//   FiDollarSign, 
//   FiCheck,  
//   FiAlertTriangle,
//   FiFileText,
//   FiCalendar,
//   FiTrendingUp,
//   FiRefreshCw,
//   FiSettings,
//   FiShield,
//   FiCreditCard
// } from 'react-icons/fi';
// import { Car, Calculator, Save, CheckCircle } from 'lucide-react';
// import { tradingYearsWithDetailsApi, finalizeTradingYearApi } from '../services/dashboard';
// import { useTradingYear } from '../context/TradingYearContext';
// import PageHeader from '../components/PageHeader';
// import LoadingSkeleton from '../components/LoadingSkeleton';

// const FinalizeTaxYear = () => {
//   const [detailedTradingYears, setDetailedTradingYears] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [finalizing, setFinalizing] = useState(false);
//   const [isConfirmed, setIsConfirmed] = useState(false);
  
//   const { 
//     activeTradingYear,
//     refreshTradingYears,
//     updateActiveTradingYear,
//     apiRefreshTrigger 
//   } = useTradingYear();

//   // Get the active trading year that can be finalized
//   const activeYear = detailedTradingYears.find(year => year.active_trading_year === 1);

//   // Current trading year data from API
//   const [currentTradingYear, setCurrentTradingYear] = useState({
//     year: '',
//     adjustedNetProfitLoss: '£ 0.00',
//     planPurchased: false,
//     planPrice: '£ 2.00 /annually',
//     percentageAdjustment: false,
//     selfAssessmentProvided: false
//   });

//   // Fetch detailed trading years data with IDs
//   const fetchDetailedTradingYears = async () => {
//     try {
//       setLoading(true);
//       const response = await tradingYearsWithDetailsApi();
      
//       if (response.data.success) {
//         setDetailedTradingYears(response.data.data);
        
//         // Find active year and update current trading year display
//         const activeYear = response.data.data.find(year => year.active_trading_year === 1);
//         if (activeYear) {
//           setCurrentTradingYear(prev => ({
//             ...prev,
//             year: `${activeYear.tradingyear_startdate} / ${activeYear.tradingyear_enddate}`,
//             adjustedNetProfitLoss: activeYear.adjusted_net_profit_loss || '£ 0.00',
//             planPurchased: activeYear.plan_purchased || false,
//             percentageAdjustment: activeYear.percentage_adjustment_active || false,
//             selfAssessmentProvided: activeYear.self_assessment_provided || false
//           }));
//         }
//       }
//     } catch (error) {
//       console.error('Error fetching detailed trading years:', error);
//       toast.error('Failed to load trading years data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Get next trading year automatically
//   const getNextTradingYear = (currentYear) => {
//     if (!currentYear) return null;
    
//     // Sort years by trading year to find logical next year
//     const sortedYears = [...detailedTradingYears].sort((a, b) => {
//       const aYear = parseInt(a.tradingYear.split('-')[0]);
//       const bYear = parseInt(b.tradingYear.split('-')[0]);
//       return aYear - bYear;
//     });
    
//     const currentYearStart = parseInt(currentYear.tradingYear.split('-')[0]);
    
//     // Find the next year that exists in our data and is not finalized
//     const nextYear = sortedYears.find(year => {
//       const yearStart = parseInt(year.tradingYear.split('-')[0]);
//       return yearStart > currentYearStart && year.finalise_year !== 1;
//     });
    
//     return nextYear?.tradingYear;
//   };

//   // Handle finalize trading year
//   const handleFinalize = async () => {
//     if (!isConfirmed) {
//       toast.error('Please confirm that the above data display is correct.');
//       return;
//     }

//     if (!activeYear) {
//       toast.error('No active trading year found to finalize.');
//       return;
//     }

//     const nextYear = getNextTradingYear(activeYear);
    
//     const result = await Swal.fire({
//       title: 'Finalize Trading Year',
//       html: `
//         <div class="text-left">
//           <p class="mb-3">Are you sure you want to finalize the trading year <strong>${activeYear.tradingYear}</strong>?</p>
//           ${nextYear ? `<p class="mb-3 text-sm text-blue-700">The next trading year <strong>${nextYear}</strong> will be automatically activated.</p>` : `<p class="mb-3 text-sm text-amber-600">⚠ No next year available for auto-activation</p>`}
//           <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-3">
//             <div class="flex items-start">
//               <div class="flex-shrink-0">
//                 <svg class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
//                   <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
//                 </svg>
//               </div>
//               <div class="ml-3">
//                 <h3 class="text-sm font-medium text-yellow-800">Warning</h3>
//                 <p class="text-sm text-yellow-700 mt-1">Once finalized, this trading year cannot be modified or reopened. A financial statement PDF will be generated.</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       `,
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#DC2626',
//       cancelButtonColor: '#6B7280',
//       confirmButtonText: 'Yes, Finalize',
//       cancelButtonText: 'Cancel',
//       focusConfirm: false
//     });

//     if (result.isConfirmed) {
//       try {
//         setFinalizing(true);
        
//         const finalizationData = {
//           current_trading_year_id: activeYear.id
//         };
        
//         // Add next trading year if available
//         if (nextYear) {
//           finalizationData.next_trading_year = nextYear;
//         }
        
//         const response = await finalizeTradingYearApi(finalizationData);
        
//         if (response.data.success) {
//           // Show success message with PDF download option
//           const successMessage = `Successfully finalized trading year ${activeYear.tradingYear}`;
//           const nextYearMessage = response.data.next_active_year 
//             ? ` and activated ${response.data.next_active_year.tradingYear}`
//             : '';
          
//           toast.success(successMessage + nextYearMessage);
          
//           // Show PDF download notification if available
//           if (response.data.file) {
//             Swal.fire({
//               title: 'Financial Statement Generated',
//               html: `
//                 <div class="text-left">
//                   <p class="mb-3">A financial statement PDF has been generated for trading year <strong>${activeYear.tradingYear}</strong>.</p>
//                   <p class="mb-3 text-sm text-gray-600">Would you like to download it now?</p>
//                 </div>
//               `,
//               icon: 'success',
//               showCancelButton: true,
//               confirmButtonColor: '#3B82F6',
//               cancelButtonColor: '#6B7280',
//               confirmButtonText: 'Download PDF',
//               cancelButtonText: 'Later',
//               focusConfirm: true
//             }).then((result) => {
//               if (result.isConfirmed) {
//                 // Open PDF in new tab
//                 window.open(response.data.file, '_blank');
//               }
//             });
//           }
          
//           // Refresh both detailed data and context
//           await Promise.all([
//             fetchDetailedTradingYears(),
//             refreshTradingYears()
//           ]);
          
//           // Update active trading year if needed
//           await updateActiveTradingYear();
          
//           // Reset confirmation
//           setIsConfirmed(false);
//         } else {
//           toast.error(response.data.message || 'Failed to finalize trading year');
//         }
//       } catch (error) {
//         console.error('Error finalizing trading year:', error);
//         toast.error(error.response?.data?.message || 'Failed to finalize trading year');
//       } finally {
//         setFinalizing(false);
//       }
//     }
//   };

//   // Initial load
//   useEffect(() => {
//     fetchDetailedTradingYears();
//   }, []);

//   // Listen for trading year changes and refresh data
//   useEffect(() => {
//     if (apiRefreshTrigger > 0) {
//       console.log('FinalizeTaxYear: Refreshing data due to trading year change');
//       fetchDetailedTradingYears();
//     }
//   }, [apiRefreshTrigger]);

//   // Custom Card Component matching the PercentageAdjustment style
//   const FormSection = ({ title, icon, children, description }) => (
//     <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-visible">
//       <div className="bg-blue-50 px-6 py-4 rounded-t-2xl">
//         <div className="flex items-center gap-3">
//           <div className="p-2 bg-white/80 rounded-lg">
//             {React.cloneElement(icon, { className: "w-6 h-6 text-blue-700" })}
//           </div>
//           <div>
//             <h2 className="text-xl font-semibold text-blue-900">{title}</h2>
//             {description && (
//               <p className="text-blue-700 text-sm mt-1">{description}</p>
//             )}
//           </div>
//         </div>
//       </div>
//       <div className="p-6">{children}</div>
//     </div>
//   );

//   // Status Card Component
//   const StatusCard = ({ title, value, subtitle, status, icon, color = "blue" }) => {
//     const colorClasses = {
//       blue: "bg-blue-50 text-blue-700 border-blue-200",
//       green: "bg-green-50 text-green-700 border-green-200", 
//       yellow: "bg-yellow-50 text-yellow-700 border-yellow-200",
//       red: "bg-red-50 text-red-700 border-red-200"
//     };

//     return (
//       <div className={`rounded-xl border-2 p-4 ${colorClasses[color]}`}>
//         <div className="flex items-center justify-between mb-3">
//           <div className="flex items-center gap-2">
//             {icon}
//             <h4 className="font-semibold text-gray-900">{title}</h4>
//           </div>
//           <span className="font-bold text-lg">{value}</span>
//         </div>
//         {subtitle && (
//           <p className="text-sm mb-2">{subtitle}</p>
//         )}
//         {status && (
//           <div className="flex items-center text-sm font-medium">
//             <FiCheck className="w-4 h-4 mr-2" />
//             {status}
//           </div>
//         )}
//       </div>
//     );
//   };

//   if (loading) {
//     return <LoadingSkeleton type="finalize-tax-year" />;
//   }

//   // If no active year found that can be finalized
//   if (!activeYear || activeYear.finalise_year === 1) {
//     return (
//       <div className="min-h-screen bg-white rounded-2xl">
//         <div className="max-w-6xl mx-auto px-4 py-8">
//           <PageHeader
//             icon={<FiCalendar />}
//             title="Finalize Tax Year"
//             currentPage="Finalize Tax Year"
//             showTradingYear={true}
//             activeTradingYear={activeTradingYear}
//             description="No active trading year available for finalization."
//           />

//           <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
//             <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <FiCalendar size={24} className="text-gray-400" />
//             </div>
//             <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Trading Year</h3>
//             <p className="text-gray-500 mb-4">
//               {activeYear?.finalise_year === 1 
//                 ? 'Your current trading year is already finalized.' 
//                 : 'No active trading year found that can be finalized.'}
//             </p>
//             <button
//               onClick={fetchDetailedTradingYears}
//               className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 hover:scale-105 shadow-lg hover:shadow-xl transition-all duration-200 transform"
//             >
//               <FiRefreshCw size={16} />
//               Refresh
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-white rounded-2xl">
//       <div className="max-w-6xl mx-auto px-4 py-8">
//         <PageHeader
//           icon={<FiCalendar />}
//           title="Finalize Tax Year"
//           currentPage="Finalize Tax Year"
//           showTradingYear={true}
//           activeTradingYear={activeTradingYear}
//           description={`Review and finalize your active trading year data for ${currentTradingYear.year}`}
//         />

//         <div className="space-y-8">
//           {/* Overview Section */}
//           <FormSection
//             title="Tax Year Overview"
//             icon={<FiTrendingUp />}
//             description="Overview of your current tax year data"
//           >
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {/* Plan Section */}
//               <StatusCard
//                 title="Buy / Renew Plan"
//                 value={currentTradingYear.planPrice}
//                 status={currentTradingYear.planPurchased ? "Taxita plan purchased" : null}
//                 icon={<FiCreditCard className="w-5 h-5" />}
//                 color={currentTradingYear.planPurchased ? "green" : "yellow"}
//               />

//               {/* Percentage Adjustment */}
//               <StatusCard
//                 title="Percentage Adjustment"
//                 value={currentTradingYear.percentageAdjustment ? "Active" : "Inactive"}
//                 status={currentTradingYear.percentageAdjustment ? "Your percentage adjustment is active." : null}
//                 icon={<FiSettings className="w-5 h-5" />}
//                 color={currentTradingYear.percentageAdjustment ? "green" : "yellow"}
//               />

//               {/* Net Profit/Loss - Full Width */}
//               <div className="md:col-span-2">
//                 <StatusCard
//                   title="Adjusted Net Profit / Loss"
//                   value={currentTradingYear.adjustedNetProfitLoss}
//                   subtitle="All your income of the trading year"
//                   icon={<FiTrendingUp className="w-5 h-5" />}
//                   color="blue"
//                 />
//               </div>
//             </div>
//           </FormSection>

//           {/* Vehicles Section */}
//           {activeYear.vehicles && activeYear.vehicles.length > 0 && (
//             <FormSection
//               title="Vehicles"
//               icon={<Car />}
//               description="Your registered vehicles for this trading year"
//             >
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.no</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle Name</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Make</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Model</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reg No.</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purchase Date</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purchase Price</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {activeYear.vehicles.map((vehicle, index) => (
//                       <tr key={vehicle.id}>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{index + 1}</td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{vehicle.vehicle_name}</td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{vehicle.make}</td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{vehicle.model}</td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{vehicle.reg_no}</td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{vehicle.purchase_date}</td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">£{vehicle.purchase_price}</td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
//                             {vehicle.sales_date ? 'Sold' : 'Active'}
//                           </span>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </FormSection>
//           )}

//           {/* Self Assessment Return */}
//           <FormSection
//             title="Self Assessment Return"
//             icon={<FiFileText />}
//             description="Self assessment return information"
//           >
//             <StatusCard
//               title="Self Assessment Return"
//               value={currentTradingYear.selfAssessmentProvided ? "Completed" : "Pending"}
//               status={currentTradingYear.selfAssessmentProvided ? "You have provided your self assessment return information." : null}
//               icon={<FiFileText className="w-5 h-5" />}
//               color={currentTradingYear.selfAssessmentProvided ? "green" : "yellow"}
//             />
//           </FormSection>

//           {/* Next Trading Year Info */}
//           <FormSection
//             title="Next Trading Year"
//             icon={<FiCalendar />}
//             description="Information about the next trading year activation"
//           >
//             {(() => {
//               const nextYear = getNextTradingYear(activeYear);
//               return nextYear ? (
//                 <StatusCard
//                   title={`Next Year: ${nextYear}`}
//                   value="Ready"
//                   status="Will be automatically activated after finalization"
//                   icon={<CheckCircle className="w-5 h-5" />}
//                   color="green"
//                 />
//               ) : (
//                 <StatusCard
//                   title="Next Trading Year"
//                   value="Not Available"
//                   subtitle="You will need to register a new trading year after finalization"
//                   icon={<FiAlertTriangle className="w-5 h-5" />}
//                   color="yellow"
//                 />
//               );
//             })()}
//           </FormSection>

//           {/* Warning Section */}
//           <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6">
//             <div className="flex items-start gap-4">
//               <div className="p-2 bg-yellow-100 rounded-lg">
//                 <FiAlertTriangle className="w-6 h-6 text-yellow-600" />
//               </div>
//               <div>
//                 <h3 className="text-lg font-semibold text-yellow-800 mb-2">Important Warning!</h3>
//                 <p className="text-yellow-700">
//                   Data of your year <strong>{currentTradingYear.year}</strong> will be locked and you will not be able to make any amendments in your record. Only Taxita team will be able to change it upon request. Are you sure you want to submit?
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Confirmation and Submit */}
//           <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
//             <div className="flex flex-col sm:flex-row gap-6 items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <input
//                   type="checkbox"
//                   id="confirm"
//                   checked={isConfirmed}
//                   onChange={(e) => setIsConfirmed(e.target.checked)}
//                   className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                 />
//                 <label htmlFor="confirm" className="text-gray-700 font-medium">
//                   I confirm that the above data display is correct.
//                 </label>
//               </div>
              
//               <button
//                 onClick={handleFinalize}
//                 disabled={!isConfirmed || finalizing}
//                 className={`flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-200 transform ${
//                   isConfirmed && !finalizing
//                     ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 hover:scale-105 shadow-lg hover:shadow-xl'
//                     : 'bg-gray-400 cursor-not-allowed scale-95'
//                 }`}
//               >
//                 {finalizing ? (
//                   <>
//                     <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                     Finalizing...
//                   </>
//                 ) : (
//                   <>
//                     <Save className="w-5 h-5" />
//                     Finalize Tax Year
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FinalizeTaxYear;


























































































// import React, { useEffect, useState } from 'react';
// import toast from 'react-hot-toast';
// import Swal from 'sweetalert2';
// import { useNavigate } from 'react-router-dom';
// import { 
//   FiDollarSign, 
//   FiCheck,  
//   FiAlertTriangle,
//   FiFileText,
//   FiCalendar,
//   FiTrendingUp,
//   FiRefreshCw,
//   FiSettings,
//   FiShield,
//   FiCreditCard
// } from 'react-icons/fi';
// import { 
//   FaShoppingCart, 
//   FaPercentage, 
//   FaCar, 
//   FaFileAlt 
// } from 'react-icons/fa';
// import { Car, Calculator, Save, CheckCircle } from 'lucide-react';
// import { tradingYearsWithDetailsApi, finalizeTradingYearApi } from '../services/dashboard';
// import { useTradingYear } from '../context/TradingYearContext';
// import PageHeader from '../components/PageHeader';
// import LoadingSkeleton from '../components/LoadingSkeleton';

// const FinalizeTaxYear = () => {
//   const [detailedTradingYears, setDetailedTradingYears] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [finalizing, setFinalizing] = useState(false);
//   const [isConfirmed, setIsConfirmed] = useState(false);
//   const navigate = useNavigate();
  
//   const { 
//     activeTradingYear,
//     refreshTradingYears,
//     updateActiveTradingYear,
//     apiRefreshTrigger 
//   } = useTradingYear();

//   // Get the active trading year that can be finalized
//   const activeYear = detailedTradingYears.find(year => year.active_trading_year === 1);

//   // Current trading year data from API
//   const [currentTradingYear, setCurrentTradingYear] = useState({
//     year: '',
//     adjustedNetProfitLoss: '£ 0.00',
//     planPurchased: false,
//     planPrice: '£ 2.00 /annually',
//     percentageAdjustment: false,
//     selfAssessmentProvided: false,
//     hasVehicles: false,
//     vehicleCount: 0
//   });

//   // Fetch detailed trading years data with IDs
//   const fetchDetailedTradingYears = async () => {
//     try {
//       setLoading(true);
//       const response = await tradingYearsWithDetailsApi();
      
//       if (response.data.success) {
//         setDetailedTradingYears(response.data.data);
        
//         // Find active year and update current trading year display
//         const activeYear = response.data.data.find(year => year.active_trading_year === 1);
//         if (activeYear) {
//           setCurrentTradingYear(prev => ({
//             ...prev,
//             year: `${activeYear.tradingyear_startdate} / ${activeYear.tradingyear_enddate}`,
//             adjustedNetProfitLoss: activeYear.adjusted_net_profit_loss || '£ 0.00',
//             planPurchased: activeYear.plan_purchased || false,
//             percentageAdjustment: activeYear.percentage_adjustment_active || false,
//             selfAssessmentProvided: activeYear.self_assessment_provided || false,
//             hasVehicles: activeYear.vehicles && activeYear.vehicles.length > 0,
//             vehicleCount: activeYear.vehicles ? activeYear.vehicles.length : 0
//           }));
//         }
//       }
//     } catch (error) {
//       console.error('Error fetching detailed trading years:', error);
//       toast.error('Failed to load trading years data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Get next trading year automatically
//   const getNextTradingYear = (currentYear) => {
//     if (!currentYear) return null;
    
//     // Sort years by trading year to find logical next year
//     const sortedYears = [...detailedTradingYears].sort((a, b) => {
//       const aYear = parseInt(a.tradingYear.split('-')[0]);
//       const bYear = parseInt(b.tradingYear.split('-')[0]);
//       return aYear - bYear;
//     });
    
//     const currentYearStart = parseInt(currentYear.tradingYear.split('-')[0]);
    
//     // Find the next year that exists in our data and is not finalized
//     const nextYear = sortedYears.find(year => {
//       const yearStart = parseInt(year.tradingYear.split('-')[0]);
//       return yearStart > currentYearStart && year.finalise_year !== 1;
//     });
    
//     return nextYear?.tradingYear;
//   };

//   // Get available trading years for selection
//   const getAvailableTradingYears = () => {
//     const currentYear = new Date().getFullYear();
//     const years = [];
    
//     // Generate last 7 years and next year
//     for (let i = 1; i >= -6; i--) {
//       const startYear = currentYear - i;
//       const endYear = startYear + 1;
//       years.push(`${startYear}-${endYear}`);
//     }
    
//     return years;
//   };

//   // Handle finalize trading year
//   const handleFinalize = async () => {
//     if (!isConfirmed) {
//       toast.error('Please confirm that the above data display is correct.');
//       return;
//     }

//     if (!activeYear) {
//       toast.error('No active trading year found to finalize.');
//       return;
//     }

//     const nextYear = getNextTradingYear(activeYear);
    
//     const result = await Swal.fire({
//       title: 'Finalize Trading Year',
//       html: `
//         <div class="text-left">
//           <p class="mb-3">Are you sure you want to finalize the trading year <strong>${activeYear.tradingYear}</strong>?</p>
//           ${nextYear ? `<p class="mb-3 text-sm text-blue-700">The next trading year <strong>${nextYear}</strong> will be automatically activated.</p>` : `<p class="mb-3 text-sm text-amber-600">⚠ No next year available for auto-activation</p>`}
//           <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-3">
//             <div class="flex items-start">
//               <div class="flex-shrink-0">
//                 <svg class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
//                   <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
//                 </svg>
//               </div>
//               <div class="ml-3">
//                 <h3 class="text-sm font-medium text-yellow-800">Warning</h3>
//                 <p class="text-sm text-yellow-700 mt-1">Once finalized, this trading year cannot be modified or reopened. A financial statement PDF will be generated.</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       `,
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#DC2626',
//       cancelButtonColor: '#6B7280',
//       confirmButtonText: 'Yes, Finalize',
//       cancelButtonText: 'Cancel',
//       focusConfirm: false
//     });

//     if (result.isConfirmed) {
//       try {
//         setFinalizing(true);
        
//         const finalizationData = {
//           current_trading_year_id: activeYear.id
//         };
        
//         // Add next trading year if available
//         if (nextYear) {
//           finalizationData.next_trading_year = nextYear;
//         }
        
//         const response = await finalizeTradingYearApi(finalizationData);
        
//         if (response.data.success) {
//           // Show success message with PDF download option
//           const successMessage = `Successfully finalized trading year ${activeYear.tradingYear}`;
//           const nextYearMessage = response.data.next_active_year 
//             ? ` and activated ${response.data.next_active_year.tradingYear}`
//             : '';
          
//           toast.success(successMessage + nextYearMessage);
          
//           // Show PDF download notification if available
//           if (response.data.file) {
//             Swal.fire({
//               title: 'Financial Statement Generated',
//               html: `
//                 <div class="text-left">
//                   <p class="mb-3">A financial statement PDF has been generated for trading year <strong>${activeYear.tradingYear}</strong>.</p>
//                   <p class="mb-3 text-sm text-gray-600">Would you like to download it now?</p>
//                 </div>
//               `,
//               icon: 'success',
//               showCancelButton: true,
//               confirmButtonColor: '#3B82F6',
//               cancelButtonColor: '#6B7280',
//               confirmButtonText: 'Download PDF',
//               cancelButtonText: 'Later',
//               focusConfirm: true
//             }).then((result) => {
//               if (result.isConfirmed) {
//                 // Open PDF in new tab
//                 window.open(response.data.file, '_blank');
//               }
//             });
//           }
          
//           // Refresh both detailed data and context
//           await Promise.all([
//             fetchDetailedTradingYears(),
//             refreshTradingYears()
//           ]);
          
//           // Update active trading year if needed
//           await updateActiveTradingYear();
          
//           // Reset confirmation
//           setIsConfirmed(false);
//         } else {
//           toast.error(response.data.message || 'Failed to finalize trading year');
//         }
//       } catch (error) {
//         console.error('Error finalizing trading year:', error);
//         toast.error(error.response?.data?.message || 'Failed to finalize trading year');
//       } finally {
//         setFinalizing(false);
//       }
//     }
//   };

//   // Initial load
//   useEffect(() => {
//     fetchDetailedTradingYears();
//   }, []);

//   // Listen for trading year changes and refresh data
//   useEffect(() => {
//     if (apiRefreshTrigger > 0) {
//       console.log('FinalizeTaxYear: Refreshing data due to trading year change');
//       fetchDetailedTradingYears();
//     }
//   }, [apiRefreshTrigger]);

//   // Simple Card Component matching StatCards style
//   const OverviewCard = ({ title, value, description, color, icon: Icon, onClick, clickable = false }) => (
//     <div
//       onClick={clickable ? onClick : undefined}
//       className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-4 transition-all duration-200 ${
//         clickable ? 'hover:shadow-md hover:cursor-pointer hover:scale-[1.02]' : ''
//       }`}
//     >
//       {/* Icon */}
//       <div className={`w-12 h-12 min-w-[48px] min-h-[48px] rounded-full flex items-center justify-center text-white ${color}`}>
//         <Icon className="text-xl" />
//       </div>

//       {/* Content */}
//       <div className="flex-1">
//         <h3 className="text-sm font-medium text-gray-500">{title}</h3>
//         <p className="text-xl font-bold text-gray-900">{value}</p>
//         <p className="text-xs text-gray-400">{description}</p>
//       </div>
//     </div>
//   );

//   // Professional skeleton loading component
//   const SkeletonCard = () => (
//     <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-4 animate-pulse">
//       {/* Icon Skeleton */}
//       <div className="w-12 h-12 min-w-[48px] min-h-[48px] rounded-full bg-gray-200"></div>
      
//       {/* Content Skeleton */}
//       <div className="flex-1">
//         <div className="h-3 bg-gray-200 rounded w-24 mb-2"></div>
//         <div className="h-6 bg-gray-200 rounded w-16 mb-1"></div>
//         <div className="h-2 bg-gray-200 rounded w-32"></div>
//       </div>
//     </div>
//   );

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-white rounded-2xl">
//         <div className="max-w-6xl mx-auto px-4 py-8">
//           <PageHeader
//             icon={<FiCalendar />}
//             title="Finalize Tax Year"
//             currentPage="Finalize Tax Year"
//             showTradingYear={true}
//             activeTradingYear={activeTradingYear}
//           />
          
//           <div className="space-y-8">
//             {/* Overview Section Skeleton */}
//             <div>
//               <h2 className="text-2xl font-bold text-gray-900 mb-6">Overview of your tax year:</h2>
//               <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//                 {Array.from({ length: 5 }, (_, index) => (
//                   <SkeletonCard key={index} />
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // If no active year found that can be finalized
//   if (!activeYear || activeYear.finalise_year === 1) {
//     return (
//       <div className="min-h-screen bg-white rounded-2xl">
//         <div className="max-w-6xl mx-auto px-4 py-8">
//           <PageHeader
//             icon={<FiCalendar />}
//             title="Finalize Tax Year"
//             currentPage="Finalize Tax Year"
//             showTradingYear={true}
//             activeTradingYear={activeTradingYear}
//             description="No active trading year available for finalization."
//           />

//           <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
//             <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <FiCalendar size={24} className="text-gray-400" />
//             </div>
//             <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Trading Year</h3>
//             <p className="text-gray-500 mb-4">
//               {activeYear?.finalise_year === 1 
//                 ? 'Your current trading year is already finalized.' 
//                 : 'No active trading year found that can be finalized.'}
//             </p>
//             <button
//               onClick={fetchDetailedTradingYears}
//               className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 hover:scale-105 shadow-lg hover:shadow-xl transition-all duration-200 transform"
//             >
//               <FiRefreshCw size={16} />
//               Refresh
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const availableYears = getAvailableTradingYears();

//   return (
//     <div className="min-h-screen bg-white rounded-2xl">
//       <div className="max-w-6xl mx-auto px-4 py-8">
//         <PageHeader
//           icon={<FiCalendar />}
//           title="Finalize Tax Year"
//           currentPage="Finalize Tax Year"
//           showTradingYear={true}
//           activeTradingYear={activeTradingYear}
//           description={`Finalise your tax year for ${currentTradingYear.year}`}
//         />

//         <div className="space-y-8">
//           {/* Overview Section */}
//           <div>
//             <h2 className="text-2xl font-bold text-gray-900 mb-6">Overview of your tax year:</h2>
//             <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//               {/* Buy / Renew Plan */}
//               <OverviewCard
//                 title="Buy / Renew Plan"
//                 value={currentTradingYear.planPrice}
//                 description={currentTradingYear.planPurchased ? "Taxita plan purchased" : "Buy or renew your Taxita plan"}
//                 color="bg-teal-600"
//                 icon={FaShoppingCart}
//                 onClick={() => navigate('/dashboard/buy-renew-plan')}
//                 clickable={true}
//               />

//               {/* Percentage Adjustment */}
//               <OverviewCard
//                 title="Percentage Adjustment"
//                 value={currentTradingYear.percentageAdjustment ? "Active" : "Inactive"}
//                 description={currentTradingYear.percentageAdjustment ? "Your percentage adjustment is active." : "Income percentage adjustment"}
//                 color="bg-teal-600"
//                 icon={FaPercentage}
//                 onClick={() => navigate('/dashboard/percentage-adjustment')}
//                 clickable={true}
//               />

//               {/* Adjusted Net Profit / Loss */}
//               <OverviewCard
//                 title="Adjusted Net Profit / Loss"
//                 value={currentTradingYear.adjustedNetProfitLoss}
//                 description="All your income of the trading year"
//                 color="bg-cyan-600"
//                 icon={FiTrendingUp}
//                 onClick={() => navigate('/dashboard/rolling-pl')}
//                 clickable={true}
//               />

//               {/* Vehicles */}
//               <OverviewCard
//                 title="Vehicles"
//                 value={currentTradingYear.vehicleCount.toString()}
//                 description={currentTradingYear.hasVehicles 
//                   ? "All your vehicles" 
//                   : "You did not added vehicles to your list, Click here to proceed with vehicles."}
//                 color="bg-pink-600"
//                 icon={FaCar}
//                 onClick={() => navigate('/dashboard/vehicles')}
//                 clickable={true}
//               />

//               {/* Self Assessment Return */}
//               <OverviewCard
//                 title="Self Assessment Return"
//                 value={currentTradingYear.selfAssessmentProvided ? "Completed" : "Pending"}
//                 description={currentTradingYear.selfAssessmentProvided 
//                   ? "You have provide your self assessment return information." 
//                   : "Estimate of tax to date"}
//                 color="bg-sky-600"
//                 icon={FaFileAlt}
//                 onClick={() => navigate('/dashboard/self-assessment')}
//                 clickable={true}
//               />
//             </div>
//           </div>

//           {/* Warning Section */}
//           <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6">
//             <div className="flex items-start gap-4">
//               <div className="p-2 bg-yellow-100 rounded-lg">
//                 <FiAlertTriangle className="w-6 h-6 text-yellow-600" />
//               </div>
//               <div>
//                 <h3 className="text-lg font-semibold text-yellow-800 mb-2">Warning!</h3>
//                 <p className="text-yellow-700">
//                   Data of your year <strong>{currentTradingYear.year}</strong> will be locked and you will not be able to make any amendments in your record. Only Taxita team will be able to change it upon request. Are you sure you want to submit?
//                 </p>
//               </div>
//             </div>
//           </div>

//          {/* Next Trading Year */}
// {getNextTradingYear(activeYear) && (
//   <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//     <h3 className="text-xl font-semibold text-gray-900 mb-4">Next Trading Year</h3>
//     <p className="text-gray-600">
//       The next trading year <strong>{getNextTradingYear(activeYear)}</strong> will be automatically activated.
//     </p>
//   </div>
// )}


//           {/* Confirmation and Submit */}
//           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//             <div className="flex flex-col sm:flex-row gap-6 items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <input
//                   type="checkbox"
//                   id="confirm"
//                   checked={isConfirmed}
//                   onChange={(e) => setIsConfirmed(e.target.checked)}
//                   className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                 />
//                 <label htmlFor="confirm" className="text-gray-700 font-medium">
//                   I confirm that the above data display is correct.
//                 </label>
//               </div>
              
//               <button
//                 onClick={handleFinalize}
//                 disabled={!isConfirmed || finalizing}
//                 className={`flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-200 transform ${
//                   isConfirmed && !finalizing
//                     ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 hover:scale-105 shadow-lg hover:shadow-xl'
//                     : 'bg-gray-400 cursor-not-allowed scale-95'
//                 }`}
//               >
//                 {finalizing ? (
//                   <>
//                     <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                     Finalizing...
//                   </>
//                 ) : (
//                   <>
//                     <Save className="w-5 h-5" />
//                     Finalize Tax Year
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FinalizeTaxYear;







































import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { 
  FiDollarSign, 
  FiCheck,  
  FiAlertTriangle,
  FiFileText,
  FiCalendar,
  FiTrendingUp,
  FiRefreshCw,
  FiSettings,
  FiShield,
  FiCreditCard
} from 'react-icons/fi';
import { 
  FaShoppingCart, 
  FaPercentage, 
  FaCar, 
  FaFileAlt 
} from 'react-icons/fa';
import { Car, Calculator, Save, CheckCircle } from 'lucide-react';
import { tradingYearsWithDetailsApi, finalizeTradingYearApi, dashboardApi } from '../services/dashboard';
import { useTradingYear } from '../context/TradingYearContext';
import PageHeader from '../components/PageHeader';
import LoadingSkeleton from '../components/LoadingSkeleton';

const FinalizeTaxYear = () => {
  const [detailedTradingYears, setDetailedTradingYears] = useState([]);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [finalizing, setFinalizing] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const navigate = useNavigate();
  
  const { 
    activeTradingYear,
    refreshTradingYears,
    updateActiveTradingYear,
    apiRefreshTrigger 
  } = useTradingYear();

  // Get the active trading year that can be finalized
  const activeYear = detailedTradingYears.find(year => year.active_trading_year === 1);

  // Current trading year data from API
  const [currentTradingYear, setCurrentTradingYear] = useState({
    year: '',
    adjustedNetProfitLoss: '£ 0.00',
    planPurchased: false,
    planPrice: '£ 2.00 /annually',
    percentageAdjustment: false,
    selfAssessmentProvided: false,
    hasVehicles: false,
    vehicleCount: 0
  });

  // Fetch dashboard data for dynamic values
  const fetchDashboardData = async () => {
    try {
      const response = await dashboardApi();
      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  // Fetch detailed trading years data with IDs
  const fetchDetailedTradingYears = async () => {
    try {
      setLoading(true);
      
      // Fetch both detailed trading years and dashboard data
      const [tradingYearsResponse, dashboardResponse] = await Promise.all([
        tradingYearsWithDetailsApi(),
        dashboardApi()
      ]);
      
      if (tradingYearsResponse.data.success) {
        setDetailedTradingYears(tradingYearsResponse.data.data);
        
        // Find active year and update current trading year display
        const activeYear = tradingYearsResponse.data.data.find(year => year.active_trading_year === 1);
        
        if (activeYear && dashboardResponse.data) {
          const dashData = dashboardResponse.data;
          
          setCurrentTradingYear(prev => ({
            ...prev,
            year: `${activeYear.tradingyear_startdate} / ${activeYear.tradingyear_enddate}`,
            adjustedNetProfitLoss: activeYear.adjusted_net_profit_loss || '£ 0.00',
            planPurchased: dashData.trading_year?.is_plan_purchased === 1,
            percentageAdjustment: activeYear.percentage_adjustment_active || false,
            selfAssessmentProvided: activeYear.self_assessment_provided || false,
            hasVehicles: (dashData.user_vehicles || 0) > 0,
            vehicleCount: dashData.user_vehicles || 0
          }));
          
          setDashboardData(dashData);
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load trading years data');
    } finally {
      setLoading(false);
    }
  };

  // Get next trading year automatically
  const getNextTradingYear = (currentYear) => {
    if (!currentYear) return null;
    
    // Sort years by trading year to find logical next year
    const sortedYears = [...detailedTradingYears].sort((a, b) => {
      const aYear = parseInt(a.tradingYear.split('-')[0]);
      const bYear = parseInt(b.tradingYear.split('-')[0]);
      return aYear - bYear;
    });
    
    const currentYearStart = parseInt(currentYear.tradingYear.split('-')[0]);
    
    // Find the next year that exists in our data and is not finalized
    const nextYear = sortedYears.find(year => {
      const yearStart = parseInt(year.tradingYear.split('-')[0]);
      return yearStart > currentYearStart && year.finalise_year !== 1;
    });
    
    return nextYear?.tradingYear;
  };

  // Handle finalize trading year
  const handleFinalize = async () => {
    if (!isConfirmed) {
      toast.error('Please confirm that the above data display is correct.');
      return;
    }

    if (!activeYear) {
      toast.error('No active trading year found to finalize.');
      return;
    }

    const nextYear = getNextTradingYear(activeYear);
    
    const result = await Swal.fire({
      title: 'Finalize Trading Year',
      html: `
        <div class="text-left">
          <p class="mb-3">Are you sure you want to finalize the trading year <strong>${activeYear.tradingYear}</strong>?</p>
          ${nextYear ? `<p class="mb-3 text-sm text-blue-700">The next trading year <strong>${nextYear}</strong> will be automatically activated.</p>` : `<p class="mb-3 text-sm text-amber-600">⚠ No next year available for auto-activation</p>`}
          <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-3">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <h3 class="text-sm font-medium text-yellow-800">Warning</h3>
                <p class="text-sm text-yellow-700 mt-1">Once finalized, this trading year cannot be modified or reopened.</p>
              </div>
            </div>
          </div>
        </div>
      `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DC2626',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Yes, Finalize',
      cancelButtonText: 'Cancel',
      focusConfirm: false
    });

    if (result.isConfirmed) {
      try {
        setFinalizing(true);
        
        const finalizationData = {
          current_trading_year_id: activeYear.id
        };
        
        // Add next trading year if available
        if (nextYear) {
          finalizationData.next_trading_year = nextYear;
        }
        
        const response = await finalizeTradingYearApi(finalizationData);
        
        if (response.data.success) {
          // Show success message
          const successMessage = `Successfully finalized trading year ${activeYear.tradingYear}`;
          const nextYearMessage = response.data.next_active_year 
            ? ` and activated ${response.data.next_active_year.tradingYear}`
            : '';
          
          toast.success(successMessage + nextYearMessage);
          
          // Refresh both detailed data and context
          await Promise.all([
            fetchDetailedTradingYears(),
            refreshTradingYears()
          ]);
          
          // Update active trading year if needed
          await updateActiveTradingYear();
          
          // Reset confirmation
          setIsConfirmed(false);
        } else {
          toast.error(response.data.message || 'Failed to finalize trading year');
        }
      } catch (error) {
        console.error('Error finalizing trading year:', error);
        toast.error(error.response?.data?.message || 'Failed to finalize trading year');
      } finally {
        setFinalizing(false);
      }
    }
  };

  // Initial load
  useEffect(() => {
    fetchDetailedTradingYears();
  }, []);

  // Listen for trading year changes and refresh data
  useEffect(() => {
    if (apiRefreshTrigger > 0) {
      console.log('FinalizeTaxYear: Refreshing data due to trading year change');
      fetchDetailedTradingYears();
    }
  }, [apiRefreshTrigger]);

  // Simple Card Component matching StatCards style
  const OverviewCard = ({ title, value, description, color, icon: Icon, onClick, clickable = false }) => (
    <div
      onClick={clickable ? onClick : undefined}
      className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-4 transition-all duration-200 ${
        clickable ? 'hover:shadow-md hover:cursor-pointer hover:scale-[1.02]' : ''
      }`}
    >
      {/* Icon */}
      <div className={`w-12 h-12 min-w-[48px] min-h-[48px] rounded-full flex items-center justify-center text-white ${color}`}>
        <Icon className="text-xl" />
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <p className="text-xl font-bold text-gray-900">{value}</p>
        <p className="text-xs text-gray-400">{description}</p>
      </div>
    </div>
  );

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

  if (loading) {
    return (
      <div className="min-h-screen bg-white rounded-2xl">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <PageHeader
            icon={<FiCalendar />}
            title="Finalize Tax Year"
            currentPage="Finalize Tax Year"
            showTradingYear={true}
            activeTradingYear={activeTradingYear}
          />
          
          <div className="space-y-8">
            {/* Overview Section Skeleton */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Overview of your tax year:</h2>
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 5 }, (_, index) => (
                  <SkeletonCard key={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If no active year found that can be finalized
  if (!activeYear || activeYear.finalise_year === 1) {
    return (
      <div className="min-h-screen bg-white rounded-2xl">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <PageHeader
            icon={<FiCalendar />}
            title="Finalize Tax Year"
            currentPage="Finalize Tax Year"
            showTradingYear={true}
            activeTradingYear={activeTradingYear}
            description="No active trading year available for finalization."
          />

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiCalendar size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Trading Year</h3>
            <p className="text-gray-500 mb-4">
              {activeYear?.finalise_year === 1 
                ? 'Your current trading year is already finalized.' 
                : 'No active trading year found that can be finalized.'}
            </p>
            <button
              onClick={fetchDetailedTradingYears}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 hover:scale-105 shadow-lg hover:shadow-xl transition-all duration-200 transform"
            >
              <FiRefreshCw size={16} />
              Refresh
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white rounded-2xl">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <PageHeader
          icon={<FiCalendar />}
          title="Finalize Tax Year"
          currentPage="Finalize Tax Year"
          showTradingYear={true}
          activeTradingYear={activeTradingYear}
          description={`Finalise your tax year for ${currentTradingYear.year}`}
        />

        <div className="space-y-8">
          {/* Overview Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Overview of your tax year:</h2>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {/* Buy / Renew Plan */}
              <OverviewCard
                title="Buy / Renew Plan"
                value={currentTradingYear.planPrice}
                description={currentTradingYear.planPurchased ? "Taxita plan purchased" : "Buy or renew your Taxita plan"}
                color="bg-teal-600"
                icon={FaShoppingCart}
                onClick={() => navigate('/dashboard/buy-renew-plan')}
                clickable={true}
              />

              {/* Percentage Adjustment */}
              <OverviewCard
                title="Percentage Adjustment"
                value={currentTradingYear.percentageAdjustment ? "Active" : "Inactive"}
                description={currentTradingYear.percentageAdjustment ? "Your percentage adjustment is active." : "Income percentage adjustment"}
                color="bg-teal-600"
                icon={FaPercentage}
                onClick={() => navigate('/dashboard/percentage-adjustment')}
                clickable={true}
              />

              {/* Adjusted Net Profit / Loss */}
              <OverviewCard
                title="Adjusted Net Profit / Loss"
                value={currentTradingYear.adjustedNetProfitLoss}
                description="All your income of the trading year"
                color="bg-cyan-600"
                icon={FiTrendingUp}
                onClick={() => navigate('/dashboard/rolling-pl')}
                clickable={true}
              />

              {/* Vehicles */}
              <OverviewCard
                title="Vehicles"
                value={currentTradingYear.vehicleCount.toString()}
                description={currentTradingYear.hasVehicles 
                  ? "All your vehicles" 
                  : "You did not added vehicles to your list, Click here to proceed with vehicles."}
                color="bg-pink-600"
                icon={FaCar}
                onClick={() => navigate('/dashboard/vehicles')}
                clickable={true}
              />

              {/* Self Assessment Return */}
              <OverviewCard
                title="Self Assessment Return"
                value={currentTradingYear.selfAssessmentProvided ? "Completed" : "Pending"}
                description={currentTradingYear.selfAssessmentProvided 
                  ? "You have provide your self assessment return information." 
                  : "Estimate of tax to date"}
                color="bg-sky-600"
                icon={FaFileAlt}
                onClick={() => navigate('/dashboard/self-assessment')}
                clickable={true}
              />
            </div>
          </div>

          {/* Warning Section */}
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <FiAlertTriangle className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-yellow-800 mb-2">Warning!</h3>
                <p className="text-yellow-700">
                  Data of your year <strong>{currentTradingYear.year}</strong> will be locked and you will not be able to make any amendments in your record. Only Taxita team will be able to change it upon request. Are you sure you want to submit?
                </p>
              </div>
            </div>
          </div>

          {/* Next Trading Year */}
          {getNextTradingYear(activeYear) && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Next Trading Year</h3>
              <p className="text-gray-600">
                The next trading year <strong>{getNextTradingYear(activeYear)}</strong> will be automatically activated.
              </p>
            </div>
          )}

          {/* Confirmation and Submit */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex flex-col sm:flex-row gap-6 items-center justify-between">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="confirm"
                  checked={isConfirmed}
                  onChange={(e) => setIsConfirmed(e.target.checked)}
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="confirm" className="text-gray-700 font-medium">
                  I confirm that the above data display is correct.
                </label>
              </div>
              
              <button
                onClick={handleFinalize}
                disabled={!isConfirmed || finalizing}
                className={`flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-200 transform ${
                  isConfirmed && !finalizing
                    ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 hover:scale-105 shadow-lg hover:shadow-xl'
                    : 'bg-gray-400 cursor-not-allowed scale-95'
                }`}
              >
                {finalizing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Finalizing...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Finalize Tax Year
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalizeTaxYear;