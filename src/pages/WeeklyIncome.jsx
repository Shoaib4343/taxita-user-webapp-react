// src/pages/WeeklyIncome.jsx
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Calendar, TrendingUp } from "lucide-react";
import { weeklyIncomeApi } from "../services/dashboard";
import { useTradingYear } from "../context/TradingYearContext";
import PageHeader from "../components/PageHeader";

const WeeklyIncome = () => {
  const [weeklyData, setWeeklyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasFetched, setHasFetched] = useState(false);
  
  // Get trading year context
  const { activeTradingYear, apiRefreshTrigger } = useTradingYear();

  const fetchWeeklyIncome = async () => {
    setLoading(true);
    try {
      const res = await weeklyIncomeApi();
      if (res.data.success) {
        setWeeklyData(res.data.data);
        // Only show toast on first successful load or if we have data
        if (!hasFetched && res.data.data.length > 0) {
          toast.success("Weekly income data loaded successfully!");
        }
        setHasFetched(true);
      } else {
        toast.error("Failed to fetch weekly income");
      }
    } catch (err) {
      console.error("Error fetching weekly income:", err);
      toast.error("Something went wrong while fetching income");
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchWeeklyIncome();
  }, []);

  // Listen for trading year changes and refresh data
  useEffect(() => {
    if (apiRefreshTrigger > 0) {
      console.log("WeeklyIncome: Refreshing data due to trading year change");
      fetchWeeklyIncome();
    }
  }, [apiRefreshTrigger]);

  // Format category names for better display
  const formatCategoryName = (category) => {
    return category
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Format date for better readability
  const formatWeekDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  // Format daily date
  const formatDayDate = (dateString) => {
    const date = new Date(dateString);
    const dayName = date.toLocaleDateString('en-GB', { weekday: 'short' });
    const formattedDate = date.toLocaleDateString('en-GB', { 
      day: '2-digit', 
      month: 'short' 
    });
    return `${dayName}, ${formattedDate}`;
  };

  if (loading) {
    // Create skeleton for multiple weeks
    const skeletonWeeks = Array.from({ length: 3 }, (_, index) => index);
    const skeletonDays = Array.from({ length: 7 }, (_, index) => index);
    const skeletonCategories = Array.from({ length: 4 }, (_, index) => index);

    return (
      <div className="min-h-screen bg-white rounded-2xl">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <PageHeader
            icon={<Calendar />}
            title="Weekly Income Listings"
            subtitle="View your weekly income breakdown"
            currentPage="Weekly Income"
            showTradingYear={false}
          />
          
          <div className="space-y-8">
            {skeletonWeeks.map((week) => (
              <div
                key={week}
                className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden animate-pulse"
              >
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-blue-50 border-b border-blue-100">
                        <th className="px-6 py-4 rounded-tl-2xl text-left">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                              <Calendar className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <div className="h-4 bg-gray-300 rounded w-16 mb-1"></div>
                              <div className="h-3 bg-gray-200 rounded w-24"></div>
                            </div>
                          </div>
                        </th>
                        {skeletonCategories.map((cat) => (
                          <th
                            key={cat}
                            className="px-4 py-4 text-left font-semibold text-gray-900 whitespace-nowrap"
                          >
                            <div className="h-4 bg-gray-300 rounded w-20"></div>
                          </th>
                        ))}
                        <th className="px-6 py-4 text-left font-semibold text-gray-900 rounded-tr-2xl">
                          <div className="h-4 bg-gray-300 rounded w-20"></div>
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100">
                      {skeletonDays.map((day, index) => (
                        <tr
                          key={day}
                          className={`transition-colors duration-150 ${
                            index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                          }`}
                        >
                          <td className="px-6 py-4">
                            <div className="h-4 bg-gray-300 rounded w-24"></div>
                          </td>
                          {skeletonCategories.map((cat) => (
                            <td key={cat} className="px-4 py-4">
                              <div className="h-4 bg-gray-300 rounded w-16"></div>
                            </td>
                          ))}
                          <td className="px-6 py-4">
                            <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-200">
                              <div className="h-4 bg-gray-300 rounded w-12"></div>
                            </div>
                          </td>
                        </tr>
                      ))}

                      {/* Weekly summary skeleton row */}
                      <tr className="bg-blue-50 border-t-2 border-blue-100">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-4 bg-gray-400 rounded w-32"></div>
                          </div>
                        </td>
                        {skeletonCategories.map((cat) => (
                          <td key={cat} className="px-4 py-4">
                            <div className="h-4 bg-gray-400 rounded w-16"></div>
                          </td>
                        ))}
                        <td className="px-6 py-4">
                          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-300">
                            <div className="h-4 bg-gray-400 rounded w-16"></div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            ))}

            {/* Summary Footer Skeleton */}
            <div className="mt-8 bg-gray-50 border border-gray-200 rounded-2xl p-6">
              <div className="text-center">
                <div className="h-4 bg-gray-300 rounded w-64 mx-auto"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!weeklyData.length) {
    return (
      <div className="min-h-screen bg-white rounded-2xl">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <PageHeader
            icon={<Calendar />}
            title="Weekly Income Listings"
            subtitle="View your weekly income breakdown"
            currentPage="Weekly Income"
            showTradingYear={false}
          />
          
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-12">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 p-4 bg-blue-100 rounded-full">
                <TrendingUp className="w-12 h-12 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                No Weekly Income Data Available
              </h3>
              <p className="text-gray-600 text-sm max-w-md mx-auto leading-relaxed">
                There's no weekly income data to display for the current period. Data will appear here once you start recording your earnings.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Extract dynamic categories from first week's first day
  const categories = weeklyData.length > 0 && weeklyData[0].days.length > 0
    ? Object.keys(weeklyData[0].days[0]).filter((key) => key !== "date" && key !== "total")
    : [];

  return (
    <div className="min-h-screen bg-white rounded-2xl">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <PageHeader
          icon={<Calendar />}
          title="Weekly Income Listings"
          subtitle="View your weekly income breakdown"
          currentPage="Weekly Income"
          showTradingYear={false}
        />

        <div className="space-y-8">
          {weeklyData.map((week) => (
            <div
              key={week.week_number}
              className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden"
            >
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-blue-50 border-b border-blue-100">
                      <th className="px-6 py-4 rounded-tl-2xl text-left">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <Calendar className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-gray-900 whitespace-nowrap">
                              Week {week.week_number}
                            </div>
                            <div className="text-xs text-gray-600 font-normal">
                               {formatWeekDate(week.start_date)}
                            </div>
                          </div>
                        </div>
                      </th>
                      {categories.map((cat) => (
                        <th
                          key={cat}
                          className="px-4 py-4 text-left font-semibold text-gray-900 whitespace-nowrap"
                        >
                          <div className="text-sm font-semibold">
                            {formatCategoryName(cat)}
                          </div>
                        </th>
                      ))}
                      <th className="px-6 py-4 text-left font-semibold text-gray-900 rounded-tr-2xl">
                        <div className="text-sm font-semibold">Daily Total</div>
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100">
                    {week.days.map((day, index) => (
                      <tr
                        key={day.date}
                        className={`transition-colors duration-150 ${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                        } hover:bg-blue-50/50`}
                      >
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900 whitespace-nowrap">
                            {formatDayDate(day.date)}
                          </div>
                        </td>
                        {categories.map((cat) => (
                          <td key={cat} className="px-4 py-4">
                            <span className="text-gray-700 font-medium">
                              £{day[cat]?.toLocaleString() || "0"}
                            </span>
                          </td>
                        ))}
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
                            £{day.total?.toLocaleString() || "0"}
                          </span>
                        </td>
                      </tr>
                    ))}

                    {/* Weekly summary row */}
                    <tr className="bg-blue-50 border-t-2 border-blue-100">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-gray-900">
                            Weekly Summary
                          </span>
                        </div>
                      </td>
                      {categories.map((cat) => (
                        <td key={cat} className="px-4 py-4">
                          <span className="font-bold text-gray-900">
                            £{week.weekly_summary?.[cat]?.toLocaleString?.() || "0"}
                          </span>
                        </td>
                      ))}
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-blue-600 text-white">
                          £{week.weekly_summary?.total?.toLocaleString() || "0"}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Footer */}
        <div className="mt-8 bg-gray-50 border border-gray-200 rounded-2xl p-6">
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Displaying income data for{" "}
              <span className="font-semibold text-gray-900">
                {weeklyData.length} week{weeklyData.length !== 1 ? 's' : ''}
              </span>
              {activeTradingYear && (
                <>
                  {" "}in trading year{" "}
                  <span className="font-semibold text-blue-600">
                    {activeTradingYear.trading_year}
                  </span>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyIncome;











































// // src/pages/WeeklyIncome.jsx
// import React, { useEffect, useCallback, useMemo } from "react";
// import { Calendar, TrendingUp, RefreshCw } from "lucide-react";
// import { useTradingYear } from "../context/TradingYearContext";
// import { useWeeklyIncome } from "../context/WeeklyIncomeContext";
// import PageHeader from "../components/PageHeader";

// const WeeklyIncome = () => {
//   // Get data from context (persisted across navigation)
//   const { 
//     weeklyData,
//     isLoading,
//     error,
//     fetched,
//     fetchWeeklyIncome,
//     clearError,
//     hasData,
//     isReady
//   } = useWeeklyIncome();
  
//   // Get trading year context
//   const { activeTradingYear } = useTradingYear();

//   console.log('WeeklyIncome component rendered:', {
//     dataLength: weeklyData.length,
//     isLoading,
//     fetched,
//     hasData,
//     isReady,
//     hasError: !!error
//   });

//   // Manual refresh function
//   const handleManualRefresh = useCallback(() => {
//     console.log('Manual refresh triggered');
//     clearError(); // Clear any existing errors
//     fetchWeeklyIncome(true, true); // Force refresh with toast
//   }, [fetchWeeklyIncome, clearError]);

//   // On component mount, try to load data with toast if it's the first time
//   useEffect(() => {
//     console.log('WeeklyIncome component mounted');
    
//     // Only show toast if we're manually triggering the fetch (not auto-fetch from context)
//     if (!fetched && !isLoading) {
//       console.log('WeeklyIncome: Manually triggering initial fetch');
//       fetchWeeklyIncome(false, true); // Show toast for manual fetch
//     }
//   }, []); // Empty dependency - only run on mount

//   // Memoize formatting functions
//   const formatCategoryName = useCallback((category) => {
//     return category
//       .split('_')
//       .map(word => word.charAt(0).toUpperCase() + word.slice(1))
//       .join(' ');
//   }, []);

//   const formatWeekDate = useCallback((dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-GB', { 
//       day: '2-digit', 
//       month: 'short', 
//       year: 'numeric' 
//     });
//   }, []);

//   const formatDayDate = useCallback((dateString) => {
//     const date = new Date(dateString);
//     const dayName = date.toLocaleDateString('en-GB', { weekday: 'short' });
//     const formattedDate = date.toLocaleDateString('en-GB', { 
//       day: '2-digit', 
//       month: 'short' 
//     });
//     return `${dayName}, ${formattedDate}`;
//   }, []);

//   // Memoize categories extraction
//   const categories = useMemo(() => {
//     if (weeklyData.length > 0 && weeklyData[0].days?.length > 0) {
//       return Object.keys(weeklyData[0].days[0]).filter((key) => key !== "date" && key !== "total");
//     }
//     return [];
//   }, [weeklyData]);

//   // Memoize skeleton structure
//   const skeletonStructure = useMemo(() => ({
//     weeks: Array.from({ length: 3 }, (_, index) => index),
//     days: Array.from({ length: 7 }, (_, index) => index),
//     categories: Array.from({ length: 4 }, (_, index) => index)
//   }), []);

//   // Memoize summary text
//   const summaryText = useMemo(() => {
//     if (weeklyData.length === 0) return '';
    
//     const weekText = weeklyData.length !== 1 ? 's' : '';
//     const tradingYearText = activeTradingYear 
//       ? ` in trading year ${activeTradingYear.trading_year}`
//       : '';
    
//     return `Displaying income data for ${weeklyData.length} week${weekText}${tradingYearText}`;
//   }, [weeklyData.length, activeTradingYear?.trading_year]);

//   // Loading state
//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-white rounded-2xl">
//         <div className="max-w-7xl mx-auto px-4 py-8">
//           <PageHeader
//             icon={<Calendar />}
//             title="Weekly Income Listings"
//             subtitle="View your weekly income breakdown"
//             currentPage="Weekly Income"
//             showTradingYear={false}
//           />
          
//           <div className="space-y-8">
//             {skeletonStructure.weeks.map((week) => (
//               <div
//                 key={week}
//                 className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden animate-pulse"
//               >
//                 <div className="overflow-x-auto">
//                   <table className="min-w-full">
//                     <thead>
//                       <tr className="bg-blue-50 border-b border-blue-100">
//                         <th className="px-6 py-4 rounded-tl-2xl text-left">
//                           <div className="flex items-center gap-3">
//                             <div className="p-2 bg-blue-100 rounded-lg">
//                               <Calendar className="w-5 h-5 text-blue-600" />
//                             </div>
//                             <div>
//                               <div className="h-4 bg-gray-300 rounded w-16 mb-1"></div>
//                               <div className="h-3 bg-gray-200 rounded w-24"></div>
//                             </div>
//                           </div>
//                         </th>
//                         {skeletonStructure.categories.map((cat) => (
//                           <th
//                             key={cat}
//                             className="px-4 py-4 text-left font-semibold text-gray-900 whitespace-nowrap"
//                           >
//                             <div className="h-4 bg-gray-300 rounded w-20"></div>
//                           </th>
//                         ))}
//                         <th className="px-6 py-4 text-left font-semibold text-gray-900 rounded-tr-2xl">
//                           <div className="h-4 bg-gray-300 rounded w-20"></div>
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-100">
//                       {skeletonStructure.days.map((day, index) => (
//                         <tr
//                           key={day}
//                           className={`transition-colors duration-150 ${
//                             index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
//                           }`}
//                         >
//                           <td className="px-6 py-4">
//                             <div className="h-4 bg-gray-300 rounded w-24"></div>
//                           </td>
//                           {skeletonStructure.categories.map((cat) => (
//                             <td key={cat} className="px-4 py-4">
//                               <div className="h-4 bg-gray-300 rounded w-16"></div>
//                             </td>
//                           ))}
//                           <td className="px-6 py-4">
//                             <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-200">
//                               <div className="h-4 bg-gray-300 rounded w-12"></div>
//                             </div>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Error state
//   if (error) {
//     return (
//       <div className="min-h-screen bg-white rounded-2xl">
//         <div className="max-w-6xl mx-auto px-4 py-8">
//           <PageHeader
//             icon={<Calendar />}
//             title="Weekly Income Listings"
//             subtitle="View your weekly income breakdown"
//             currentPage="Weekly Income"
//             showTradingYear={false}
//           />
          
//           <div className="bg-red-50 border border-red-100 rounded-2xl p-12">
//             <div className="text-center">
//               <div className="w-20 h-20 mx-auto mb-6 p-4 bg-red-100 rounded-full">
//                 <TrendingUp className="w-12 h-12 text-red-400" />
//               </div>
//               <h3 className="text-xl font-semibold text-red-800 mb-3">
//                 Error Loading Weekly Income Data
//               </h3>
//               <p className="text-red-600 text-sm max-w-md mx-auto leading-relaxed mb-6">
//                 {error}
//               </p>
//               <button
//                 onClick={handleManualRefresh}
//                 className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
//               >
//                 <RefreshCw className="w-4 h-4" />
//                 Try Again
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Empty state
//   if (!hasData && isReady) {
//     return (
//       <div className="min-h-screen bg-white rounded-2xl">
//         <div className="max-w-6xl mx-auto px-4 py-8">
//           <PageHeader
//             icon={<Calendar />}
//             title="Weekly Income Listings"
//             subtitle="View your weekly income breakdown"
//             currentPage="Weekly Income"
//             showTradingYear={false}
//           />
          
//           <div className="bg-blue-50 border border-blue-100 rounded-2xl p-12">
//             <div className="text-center">
//               <div className="w-20 h-20 mx-auto mb-6 p-4 bg-blue-100 rounded-full">
//                 <TrendingUp className="w-12 h-12 text-blue-400" />
//               </div>
//               <h3 className="text-xl font-semibold text-gray-800 mb-3">
//                 No Weekly Income Data Available
//               </h3>
//               <p className="text-gray-600 text-sm max-w-md mx-auto leading-relaxed mb-6">
//                 There's no weekly income data to display for the current period. Data will appear here once you start recording your earnings.
//               </p>
//               <button
//                 onClick={handleManualRefresh}
//                 className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//               >
//                 <RefreshCw className="w-4 h-4" />
//                 Refresh Data
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Main content with data
//   return (
//     <div className="min-h-screen bg-white rounded-2xl">
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         <PageHeader
//           icon={<Calendar />}
//           title="Weekly Income Listings"
//           subtitle="View your weekly income breakdown"
//           currentPage="Weekly Income"
//           showTradingYear={false}
//           rightContent={
//             <div className="flex items-center gap-3">
//               {fetched && !isLoading && (
//                 <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
//                   Cached for fast loading
//                 </span>
//               )}
//               <button
//                 onClick={handleManualRefresh}
//                 disabled={isLoading}
//                 className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
//               >
//                 <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
//                 Refresh
//               </button>
//             </div>
//           }
//         />

//         <div className="space-y-8">
//           {weeklyData.map((week) => (
//             <WeeklyTable
//               key={week.week_number}
//               week={week}
//               categories={categories}
//               formatCategoryName={formatCategoryName}
//               formatWeekDate={formatWeekDate}
//               formatDayDate={formatDayDate}
//             />
//           ))}
//         </div>

//         {/* Summary Footer */}
//         <div className="mt-8 bg-gray-50 border border-gray-200 rounded-2xl p-6">
//           <div className="text-center">
//             <p className="text-sm text-gray-600">
//               {summaryText}
//               {fetched && !isLoading && (
//                 <span className="ml-2 text-green-600">
//                   • Data cached for instant loading
//                 </span>
//               )}
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Memoized WeeklyTable component
// const WeeklyTable = React.memo(({ 
//   week, 
//   categories, 
//   formatCategoryName, 
//   formatWeekDate, 
//   formatDayDate 
// }) => (
//   <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
//     <div className="overflow-x-auto">
//       <table className="min-w-full">
//         <thead>
//           <tr className="bg-blue-50 border-b border-blue-100">
//             <th className="px-6 py-4 rounded-tl-2xl text-left">
//               <div className="flex items-center gap-3">
//                 <div className="p-2 bg-blue-100 rounded-lg">
//                   <Calendar className="w-5 h-5 text-blue-600" />
//                 </div>
//                 <div>
//                   <div className="text-sm font-semibold text-gray-900 whitespace-nowrap">
//                     Week {week.week_number}
//                   </div>
//                   <div className="text-xs text-gray-600 font-normal">
//                      {formatWeekDate(week.start_date)}
//                   </div>
//                 </div>
//               </div>
//             </th>
//             {categories.map((cat) => (
//               <th
//                 key={cat}
//                 className="px-4 py-4 text-left font-semibold text-gray-900 whitespace-nowrap"
//               >
//                 <div className="text-sm font-semibold">
//                   {formatCategoryName(cat)}
//                 </div>
//               </th>
//             ))}
//             <th className="px-6 py-4 text-left font-semibold text-gray-900 rounded-tr-2xl">
//               <div className="text-sm font-semibold">Daily Total</div>
//             </th>
//           </tr>
//         </thead>

//         <tbody className="divide-y divide-gray-100">
//           {week.days.map((day, index) => (
//             <tr
//               key={day.date}
//               className={`transition-colors duration-150 ${
//                 index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
//               } hover:bg-blue-50/50`}
//             >
//               <td className="px-6 py-4">
//                 <div className="font-medium text-gray-900 whitespace-nowrap">
//                   {formatDayDate(day.date)}
//                 </div>
//               </td>
//               {categories.map((cat) => (
//                 <td key={cat} className="px-4 py-4">
//                   <span className="text-gray-700 font-medium">
//                     £{day[cat]?.toLocaleString() || "0"}
//                   </span>
//                 </td>
//               ))}
//               <td className="px-6 py-4">
//                 <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
//                   £{day.total?.toLocaleString() || "0"}
//                 </span>
//               </td>
//             </tr>
//           ))}

//           {/* Weekly summary row */}
//           <tr className="bg-blue-50 border-t-2 border-blue-100">
//             <td className="px-6 py-4">
//               <div className="flex items-center gap-3">
//                 <span className="font-bold text-gray-900">
//                   Weekly Summary
//                 </span>
//               </div>
//             </td>
//             {categories.map((cat) => (
//               <td key={cat} className="px-4 py-4">
//                 <span className="font-bold text-gray-900">
//                   £{week.weekly_summary?.[cat]?.toLocaleString?.() || "0"}
//                 </span>
//               </td>
//             ))}
//             <td className="px-6 py-4">
//               <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-blue-600 text-white">
//                 £{week.weekly_summary?.total?.toLocaleString() || "0"}
//               </span>
//             </td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   </div>
// ));

// WeeklyTable.displayName = 'WeeklyTable';

// export default WeeklyIncome;