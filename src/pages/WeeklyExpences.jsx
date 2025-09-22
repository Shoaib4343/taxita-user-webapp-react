// src/pages/WeeklyExpenses.jsx
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Calendar, TrendingUp } from "lucide-react";
import { weeklyExpensesApi } from "../services/dashboard";
import { useTradingYear } from "../context/TradingYearContext";
import PageHeader from "../components/PageHeader";

const WeeklyExpenses = () => {
  const [weeklyData, setWeeklyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasFetched, setHasFetched] = useState(false);
  
  // Get trading year context
  const { activeTradingYear, apiRefreshTrigger } = useTradingYear();

  // Merge motor_expenses and additional_expenses by week_number + date
  const mergeExpenses = (motor = [], additional = []) => {
    return motor.map((motorWeek) => {
      const addWeek = additional.find(
        (a) => a.week_number === motorWeek.week_number
      );

      // Merge days (sum values category by category)
      const days = motorWeek.days.map((day) => {
        const addDay = addWeek?.days.find((d) => d.date === day.date) || {};
        const mergedDay = { date: day.date };
        const categories = new Set([
          ...Object.keys(day),
          ...Object.keys(addDay),
        ]);

        let dayTotal = 0;
        categories.forEach((cat) => {
          if (cat === "date") return;
          const val1 = day[cat] || 0;
          const val2 = addDay[cat] || 0;
          mergedDay[cat] = val1 + val2;
          if (cat !== "total") dayTotal += mergedDay[cat];
        });
        mergedDay.total = dayTotal;
        return mergedDay;
      });

      // Merge weekly summary (sum values category by category)
      const weekly_summary = {};
      const categories = new Set([
        ...Object.keys(motorWeek.weekly_summary || {}),
        ...Object.keys(addWeek?.weekly_summary || {}),
      ]);

      let weeklyTotal = 0;
      categories.forEach((cat) => {
        if (cat === "total") return;
        const val1 = motorWeek.weekly_summary?.[cat] || 0;
        const val2 = addWeek?.weekly_summary?.[cat] || 0;
        weekly_summary[cat] = val1 + val2;
        weeklyTotal += weekly_summary[cat];
      });
      weekly_summary.total = weeklyTotal;

      return {
        week_number: motorWeek.week_number,
        start_date: motorWeek.start_date,
        end_date: motorWeek.end_date,
        days,
        weekly_summary,
      };
    });
  };

  const fetchWeeklyExpenses = async () => {
    setLoading(true);
    try {
      const res = await weeklyExpensesApi();
      if (res.data.success) {
        const merged = mergeExpenses(
          res.data.motor_expenses,
          res.data.additional_expenses
        );
        setWeeklyData(merged);
        // Only show toast on first successful load or if we have data
        if (!hasFetched && merged.length > 0) {
          toast.success("Weekly expenses data loaded successfully!");
        }
        setHasFetched(true);
      } else {
        toast.error("Failed to fetch weekly expenses");
      }
    } catch (err) {
      console.error("Error fetching weekly expenses:", err);
      toast.error("Something went wrong while fetching expenses");
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchWeeklyExpenses();
  }, []);

  // Listen for trading year changes and refresh data
  useEffect(() => {
    if (apiRefreshTrigger > 0) {
      console.log("WeeklyExpenses: Refreshing data due to trading year change");
      fetchWeeklyExpenses();
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
            title="Weekly Expenses Listings"
            subtitle="View your weekly expenses breakdown"
            currentPage="Weekly Expenses"
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
                            <div className="h-3 bg-gray-300 rounded w-16"></div>
                          </th>
                        ))}
                        <th className="px-6 py-4 text-left font-semibold text-gray-900 rounded-tr-2xl">
                          <div className="h-3 bg-gray-300 rounded w-16"></div>
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
            title="Weekly Expenses Listings"
            subtitle="View your weekly expenses breakdown"
            currentPage="Weekly Expenses"
            showTradingYear={false}
          />
          
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-12">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 p-4 bg-blue-100 rounded-full">
                <TrendingUp className="w-12 h-12 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                No Weekly Expenses Data Available
              </h3>
              <p className="text-gray-600 text-sm max-w-md mx-auto leading-relaxed">
                There's no weekly expenses data to display for the current period. Data will appear here once you start recording your expenses.
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
          title="Weekly Expenses Listings"
          subtitle="View your weekly expenses breakdown"
          currentPage="Weekly Expenses"
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
                             <div className="text-xs text-gray-600 font-normal whitespace-nowrap">
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
                          <div className="text-xs font-semibold">
                            {formatCategoryName(cat)}
                          </div>
                        </th>
                      ))}
                      <th className="px-6 py-4 text-left font-semibold text-gray-900 rounded-tr-2xl">
                        <div className="text-xs font-semibold">Daily Total</div>
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
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-red-100 text-red-800">
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
              Displaying expenses data for{" "}
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

export default WeeklyExpenses;