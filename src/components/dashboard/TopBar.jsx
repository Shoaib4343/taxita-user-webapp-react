import React from "react";
import { FiCalendar } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { useTradingYear } from "../../context/TradingYearContext";

export const TopBar = () => {
  const { auth } = useAuth();
  const { activeTradingYear, loading } = useTradingYear();

  console.log('activeTradingYear from context:', activeTradingYear);

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  const getFormattedDate = () => {
    const date = new Date();
    const day = date.toLocaleDateString("en-US", { weekday: "long" });
    const month = date.toLocaleDateString("en-US", { month: "short" });
    const dayNum = date.getDate();
    const year = date.getFullYear();

    const getDaySuffix = (d) => {
      if (d > 3 && d < 21) return "th";
      switch (d % 10) {
        case 1: return "st";
        case 2: return "nd";
        case 3: return "rd";
        default: return "th";
      }
    };

    return `${day}, ${month} ${dayNum}${getDaySuffix(dayNum)} ${year}`;
  };

  // Format the expiry date from tradingyear_enddate
  const getFormattedExpiryDate = (endDate) => {
    if (!endDate) return "Wed, 26 Aug 2026, 12:00 AM";
    
    try {
      const date = new Date(endDate);
      
      // Check if the date is valid
      if (isNaN(date.getTime())) {
        console.error('Invalid date:', endDate);
        return "Wed, 26 Aug 2026, 12:00 AM";
      }
      
      // Format to match your desired format: "Wed, 26 Aug 2026, 12:00 AM"
      const weekday = date.toLocaleDateString("en-US", { weekday: "short" });
      const day = date.getDate();
      const month = date.toLocaleDateString("en-US", { month: "short" });
      const year = date.getFullYear();
      
      return `${weekday}, ${day} ${month} ${year}, 12:00 AM`;
    } catch (error) {
      console.error('Error formatting expiry date:', error);
      return "Wed, 26 Aug 2026, 12:00 AM";
    }
  };

  return (
    <>
      <div className="border-b border-stone-200 px-4 py-3">
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <span className="text-sm font-bold">🚀 {greeting}, {auth?.user?.first_name || "User"} !</span>
            <span className="text-xs text-stone-500">Today {getFormattedDate()}</span>
          </div>

          {/* <button
            className="flex text-sm items-center gap-2 bg-stone-100 transition-colors hover:bg-violet-100 hover:text-violet-700 px-3 py-1.5 rounded"
            aria-label="Filter by previous 6 months"
          >
            <FiCalendar className="text-base" />
            <span>Prev 6 Months</span>
          </button> */}
        </div>
      </div>

      {/* Dashboard Intro Section */}
      <div className="">
        <div className=" p-6">
          {/* Heading + Paragraph */}
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 ">
            Taxita Dashboard
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Welcome you to <span className="font-medium">Taxita</span>, where
            you will find different kinds of support modules on the left
            sidebar. You can reset your profile and dynamically manage your data
            with ease.
          </p>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
            <p className="text-sm text-gray-700">
              {loading ? (
                <span className="animate-pulse">
                  <span className="h-4 bg-gray-300 rounded w-32 inline-block"></span>
                </span>
              ) : (
                <span className="font-semibold">
                  {activeTradingYear?.trading_year || '2025-2026'}
                </span>
              )}
              {" "}— Selected tax year
            </p>
            <p className="text-sm text-gray-700 mt-1">
              <span className="font-semibold">Plan:</span> Platinum —
              <span className="text-gray-600">
                {" "}expires on{" "}
                {loading ? (
                  <span className="animate-pulse">
                    <span className="h-4 bg-gray-300 rounded w-40 inline-block"></span>
                  </span>
                ) : (
                  getFormattedExpiryDate(activeTradingYear?.tradingyear_enddate)
                )}
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};