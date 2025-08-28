// // src/components/SidebarWeeksExpense.jsx
// import React, { useEffect, useState, useCallback } from "react";
// import { IoCalendarOutline } from "react-icons/io5";
// import { FaChevronDown } from "react-icons/fa";
// import { expenseDaysApi, expenseWeeksApi } from "../services/dashboard";

// const SidebarWeeksExpense = ({ onSelect, refreshTrigger }) => {
//   const [weeks, setWeeks] = useState([]);
//   const [selectedWeek, setSelectedWeek] = useState(null);
//   const [days, setDays] = useState([]);
//   const [selectedDay, setSelectedDay] = useState(null);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const fetchWeeks = useCallback(async () => {
//     try {
//       setLoading(true);
//       const res = await expenseWeeksApi();
//       const weeksArray = Array.isArray(res.data) ? res.data : res.data.weeks || [];
//       setWeeks(weeksArray);
//       return weeksArray;
//     } catch (err) {
//       console.error("Error fetching weeks:", err);
//       return [];
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const fetchDays = useCallback(async (weekNumber) => {
//     try {
//       const res = await expenseDaysApi(weekNumber);
//       const daysArray = Array.isArray(res.data) ? res.data : res.data.days || [];
//       setDays(daysArray);
//       return daysArray;
//     } catch (err) {
//       console.error("Error fetching days:", err);
//       return [];
//     }
//   }, []);

//   const findFirstAvailableDay = useCallback(async (weeksArray) => {
//     for (let week of weeksArray) {
//       const daysArray = await fetchDays(week.week_number);
//       const firstDay = daysArray.find((d) => !d.disabled) || daysArray[0];
//       if (firstDay) {
//         setSelectedWeek(week);
//         setSelectedDay(firstDay);
//         onSelect && onSelect({ week, day: firstDay, days: daysArray });
//         return;
//       }
//     }
//     if (weeksArray.length > 0) {
//       const firstWeek = weeksArray[0];
//       const daysArray = await fetchDays(firstWeek.week_number);
//       setSelectedWeek(firstWeek);
//       setSelectedDay(daysArray[0]);
//       onSelect && onSelect({ week: firstWeek, day: daysArray[0], days: daysArray });
//     }
//   }, [fetchDays, onSelect]);

//   useEffect(() => {
//     const initializeData = async () => {
//       const weeksArray = await fetchWeeks();
//       await findFirstAvailableDay(weeksArray);
//     };
//     initializeData();
//   }, []);

//   useEffect(() => {
//     if (refreshTrigger > 0) {
//       fetchWeeks().then((weeksArray) => findFirstAvailableDay(weeksArray));
//     }
//   }, [refreshTrigger]);

//   const handleWeekSelect = async (week) => {
//     setSelectedWeek(week);
//     setDropdownOpen(false);

//     const daysArray = await fetchDays(week.week_number);
//     const firstDay = daysArray.find((d) => !d.disabled) || daysArray[0];
//     setSelectedDay(firstDay);
//     onSelect && onSelect({ week, day: firstDay, days: daysArray });
//   };

//   const handleDaySelect = (day) => {
//     if (day.disabled) return;
//     setSelectedDay(day);
//     onSelect && onSelect({ week: selectedWeek, day, days });
//   };

//   return (
//     <aside className="w-80 bg-white border-r border-gray-200 flex flex-col">
//       {/* Header */}
//       <div className="p-4 border-b border-gray-200 sticky top-0 bg-white z-20">
//         <h3 className="text-sm font-semibold mb-3 flex items-center gap-2 text-gray-800">
//           <IoCalendarOutline className="text-blue-500" /> Select Your Week
//         </h3>

//         {/* Week dropdown */}
//         <div className="relative">
//           <button
//             onClick={() => setDropdownOpen(!dropdownOpen)}
//             className="w-full border border-gray-300 rounded-lg px-3 py-3 text-left text-gray-700 hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300 flex justify-between items-center text-sm"
//             disabled={loading}
//           >
//             <span className="truncate font-medium">
//               {loading ? "Loading..." : selectedWeek ? selectedWeek.label : "Loading..."}
//             </span>
//             <FaChevronDown
//               className={`ml-2 transition-transform ${dropdownOpen ? "rotate-180" : ""} ${loading ? "opacity-50" : ""}`}
//             />
//           </button>

//           {dropdownOpen && !loading && (
//             <ul className="absolute mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-96 overflow-y-auto z-30 text-sm">
//               {weeks.map((week) => (
//                 <li key={week.week_number}>
//                   <button
//                     onClick={() => handleWeekSelect(week)}
//                     className={`w-full flex justify-between items-center px-3 py-3 hover:bg-blue-100 transition ${
//                       selectedWeek?.week_number === week.week_number
//                         ? "bg-blue-50 text-blue-700 font-medium"
//                         : "text-gray-700"
//                     }`}
//                   >
//                     <span className="truncate">{week.label}</span>
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       </div>

//       {/* Days list */}
//       {!dropdownOpen && days.length > 0 && (
//         <div className="flex-1 overflow-y-auto p-4 space-y-2 max-h-[calc(100vh-100px)]">
//           <ul className="divide-y divide-gray-100 rounded-lg border border-gray-200">
//             {days.map((day) => (
//               <li
//                 key={day.date}
//                 onClick={() => handleDaySelect(day)}
//                 className={`flex justify-between px-4 py-3 cursor-pointer transition-colors ${
//                   selectedDay?.date === day.date
//                     ? "bg-blue-100 text-blue-700 font-medium"
//                     : "text-gray-700 hover:bg-gray-50"
//                 } ${day.disabled ? "opacity-50 cursor-not-allowed" : ""}`}
//               >
//                 <span>{day.label}</span>
//                 <span>£{Number(day.total || 0).toFixed(2)}</span>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {loading && days.length === 0 && (
//         <div className="flex-1 flex items-center justify-center">
//           <div className="text-gray-500 text-sm">Loading days...</div>
//         </div>
//       )}
//     </aside>
//   );
// };

// export default SidebarWeeksExpense;



































// src/components/SidebarWeeksExpense.jsx
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { IoCalendarOutline, IoTodayOutline } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa";
import { expenseDaysApi, expenseWeeksApi } from "../services/dashboard";

const SidebarWeeksExpense = ({ onSelect, refreshTrigger }) => {
  const [weeks, setWeeks] = useState([]);
  const [days, setDays] = useState([]);
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingDays, setLoadingDays] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Get today's date in YYYY-MM-DD format (local timezone)
  const getTodayDate = useCallback(() => {
    const today = new Date();
    return today.getFullYear() + '-' + 
           String(today.getMonth() + 1).padStart(2, '0') + '-' + 
           String(today.getDate()).padStart(2, '0');
  }, []);

  const todayDate = useMemo(() => getTodayDate(), [getTodayDate]);

  // Check if a date is today
  const isToday = useCallback((date) => date === todayDate, [todayDate]);

  // Find which week contains today's date
  const findWeekContainingToday = useCallback((weeksArray) => {
    const today = todayDate;
    
    return weeksArray.find(week => {
      const startDate = new Date(week.start_date);
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 6); // Add 6 days to get end of week
      
      const startStr = startDate.toISOString().split('T')[0];
      const endStr = endDate.toISOString().split('T')[0];
      
      return today >= startStr && today <= endStr;
    });
  }, [todayDate]);

  // Fetch weeks data
  const fetchWeeks = useCallback(async () => {
    try {
      const res = await expenseWeeksApi();
      const weeksArray = Array.isArray(res.data) ? res.data : res.data.weeks || [];
      setWeeks(weeksArray);
      return weeksArray;
    } catch (err) {
      console.error("Error fetching weeks:", err);
      return [];
    }
  }, []);

  // Fetch days data for a specific week
  const fetchDays = useCallback(async (weekNumber) => {
    try {
      setLoadingDays(true);
      const res = await expenseDaysApi(weekNumber);
      const daysArray = Array.isArray(res.data) ? res.data : res.data.days || [];
      setDays(daysArray);
      return daysArray;
    } catch (err) {
      console.error("Error fetching days:", err);
      return [];
    } finally {
      setLoadingDays(false);
    }
  }, []);

  // Initialize component - select today's week and day
  const initializeComponent = useCallback(async () => {
    setLoading(true);
    
    try {
      // First, fetch all weeks
      const weeksArray = await fetchWeeks();
      
      if (weeksArray.length === 0) {
        setLoading(false);
        return;
      }

      // Find the week containing today
      const todayWeek = findWeekContainingToday(weeksArray);
      
      if (todayWeek) {
        // We found today's week, now fetch its days
        setSelectedWeek(todayWeek);
        const daysArray = await fetchDays(todayWeek.week_number);
        
        // Find today's day in the days array
        const todayDay = daysArray.find(day => day.date === todayDate);
        
        if (todayDay) {
          // Perfect! We found today's day
          setSelectedDay(todayDay);
          onSelect && onSelect({ week: todayWeek, day: todayDay, days: daysArray });
        } else {
          // Today's day not in the response, find first available day
          const firstAvailableDay = daysArray.find(d => !d.disabled) || daysArray[0];
          setSelectedDay(firstAvailableDay);
          onSelect && onSelect({ week: todayWeek, day: firstAvailableDay, days: daysArray });
        }
      } else {
        // Today's week not found, fallback to first available week
        const firstWeek = weeksArray[0];
        setSelectedWeek(firstWeek);
        const daysArray = await fetchDays(firstWeek.week_number);
        const firstAvailableDay = daysArray.find(d => !d.disabled) || daysArray[0];
        setSelectedDay(firstAvailableDay);
        onSelect && onSelect({ week: firstWeek, day: firstAvailableDay, days: daysArray });
      }
    } catch (error) {
      console.error("Error initializing component:", error);
    } finally {
      setLoading(false);
    }
  }, [fetchWeeks, findWeekContainingToday, todayDate, fetchDays, onSelect]);

  // Refresh data after transaction (prevent multiple simultaneous refreshes)
  const refreshData = useCallback(async () => {
    if (!selectedWeek || !selectedDay || isRefreshing) {
      return;
    }
    
    setIsRefreshing(true);
    
    try {
      // Store current selections to prevent state changes during refresh
      const currentWeekNumber = selectedWeek.week_number;
      const currentDayDate = selectedDay.date;
      
      // Fetch updated data for current week only
      const [weeksRes, daysRes] = await Promise.all([
        expenseWeeksApi().catch(err => {
          console.error("Error fetching weeks:", err);
          return { data: weeks }; // Fallback to current weeks
        }),
        expenseDaysApi(currentWeekNumber).catch(err => {
          console.error("Error fetching days:", err);
          return { data: days }; // Fallback to current days
        })
      ]);
      
      // Process weeks data
      const weeksArray = Array.isArray(weeksRes.data) ? weeksRes.data : weeksRes.data.weeks || weeks;
      setWeeks(weeksArray);
      
      // Process days data
      const daysArray = Array.isArray(daysRes.data) ? daysRes.data : daysRes.data.days || days;
      setDays(daysArray);
      
      // Update selected week and day with fresh data
      const updatedWeek = weeksArray.find(w => w.week_number === currentWeekNumber);
      const updatedDay = daysArray.find(d => d.date === currentDayDate);
      
      if (updatedWeek) {
        setSelectedWeek(updatedWeek);
      }
      
      if (updatedDay) {
        setSelectedDay(updatedDay);
        // Only call onSelect if we have valid updated data
        onSelect && onSelect({ 
          week: updatedWeek || selectedWeek, 
          day: updatedDay, 
          days: daysArray 
        });
      }
      
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setIsRefreshing(false);
    }
  }, [selectedWeek?.week_number, selectedDay?.date, isRefreshing, weeks, days]); // Stable dependencies

  // Initial load
  useEffect(() => {
    initializeComponent();
  }, []); // Only run once on mount

  // Handle refresh trigger with debounce to prevent multiple rapid refreshes
  useEffect(() => {
    if (refreshTrigger > 0) {
      // Add small delay to prevent rapid successive refreshes
      const timeoutId = setTimeout(() => {
        refreshData();
      }, 100);
      
      return () => clearTimeout(timeoutId);
    }
  }, [refreshTrigger]); // Only depend on refreshTrigger, not refreshData

  // Handle week selection (prevent selection during refresh)
  const handleWeekSelect = async (week) => {
    if (isRefreshing) return;
    
    setSelectedWeek(week);
    setDropdownOpen(false);

    // Show loading only for days, not the entire component
    setLoadingDays(true);
    
    try {
      const res = await expenseDaysApi(week.week_number);
      const daysArray = Array.isArray(res.data) ? res.data : res.data.days || [];
      setDays(daysArray);
      
      // Try to select today if it's in this week, otherwise first available day
      const todayDay = daysArray.find(d => d.date === todayDate);
      const dayToSelect = todayDay || daysArray.find(d => !d.disabled) || daysArray[0];
      
      setSelectedDay(dayToSelect);
      onSelect && onSelect({ week, day: dayToSelect, days: daysArray });
    } catch (error) {
      console.error("Error fetching days:", error);
    } finally {
      setLoadingDays(false);
    }
  };

  // Handle day selection (immediate, no API calls, prevent selection during refresh)
  const handleDaySelect = (day) => {
    if (day.disabled || isRefreshing) return;
    
    // Immediate selection, no loading needed
    setSelectedDay(day);
    onSelect && onSelect({ week: selectedWeek, day, days });
  };

  if (loading) {
    return (
      <aside className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-gray-500 text-sm">Loading weeks...</div>
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-80 bg-white border-r border-gray-200 flex flex-col">
      {/* Week Selector Header */}
      <div className="p-4 border-b border-gray-200 sticky top-0 bg-white z-20">
        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2 text-gray-800">
          <IoCalendarOutline className="text-blue-500" /> Select Your Week
        </h3>

        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className={`w-full border border-gray-300 rounded-lg px-3 py-3 text-left text-gray-700 hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300 flex justify-between items-center text-sm disabled:opacity-50 disabled:cursor-not-allowed ${
              isRefreshing ? 'opacity-75 cursor-wait' : ''
            }`}
            disabled={loadingDays || isRefreshing}
            aria-label="Select week"
            aria-expanded={dropdownOpen}
          >
            <span className="truncate font-medium">
              {selectedWeek ? selectedWeek.label : "No week selected"}
            </span>
            <FaChevronDown
              className={`ml-2 transition-transform duration-200 ${
                dropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {dropdownOpen && weeks.length > 0 && (
            <ul 
              className="absolute mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-96 overflow-y-auto z-30 text-sm"
              role="listbox"
              aria-label="Week options"
            >
              {weeks.map((week) => (
                <li key={week.week_number} role="option">
                  <button
                    onClick={() => handleWeekSelect(week)}
                    className={`w-full flex justify-between items-center px-3 py-3 hover:bg-blue-100 transition-colors duration-150 text-left ${
                      selectedWeek?.week_number === week.week_number
                        ? "bg-blue-50 text-blue-700 font-medium"
                        : "text-gray-700"
                    }`}
                    aria-selected={selectedWeek?.week_number === week.week_number}
                  >
                    <span className="truncate">{week.label}</span>
                    {/* <span className="text-xs text-red-500 ml-2">
                      £{Number(week.total || 0).toFixed(2)}
                    </span> */}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Days List */}
      {days.length > 0 && !dropdownOpen && (
        <div className="flex-1 overflow-y-auto p-4 space-y-2 max-h-[calc(100vh-120px)]">
          {loadingDays ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-gray-500 text-sm">Loading days...</div>
            </div>
          ) : (
            <ul className="divide-y divide-gray-100 rounded-lg border border-gray-200">
              {days.map((day) => (
                <li
                  key={day.date}
                  onClick={() => handleDaySelect(day)}
                  className={`flex justify-between items-center px-4 py-3 transition-colors duration-150 ${
                    selectedDay?.date === day.date
                      ? "bg-blue-100 text-blue-700 font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                  } ${
                    day.disabled || isRefreshing
                      ? "opacity-50 cursor-not-allowed" 
                      : "cursor-pointer"
                  } ${isRefreshing ? 'pointer-events-none' : ''}`}
                  role="button"
                  tabIndex={day.disabled ? -1 : 0}
                  aria-disabled={day.disabled}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{day.label}</span>
                    {isToday(day.date) && (
                      <div className="flex items-center gap-1">
                        <IoTodayOutline className="text-green-500 text-base" />
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                          Today
                        </span>
                      </div>
                    )}
                  </div>
                  <span className="text-sm font-medium">
                    £{Number(day.total || 0).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Loading Days - Only show when initially loading days, not during refresh */}
      {loadingDays && days.length === 0 && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-gray-500 text-sm">Loading days...</div>
        </div>
      )}

      {/* No Days Message */}
      {days.length === 0 && !loadingDays && selectedWeek && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-gray-500 text-sm">No days available for this week</div>
        </div>
      )}
    </aside>
  );
};

export default SidebarWeeksExpense;