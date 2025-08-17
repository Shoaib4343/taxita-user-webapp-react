import React from "react";
import { FiCalendar } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";

export const TopBar = () => {
  const {auth} = useAuth();
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

  return (
    <div className="border-b border-stone-200 px-4 py-3">
      <div className="flex items-start justify-between">
        <div className="flex flex-col">
          <span className="text-sm font-bold">🚀 {greeting}, {auth?.user?.first_name || "User"} !</span>
          <span className="text-xs text-stone-500">{getFormattedDate()}</span>
        </div>

        <button
          className="flex text-sm items-center gap-2 bg-stone-100 transition-colors hover:bg-violet-100 hover:text-violet-700 px-3 py-1.5 rounded"
          aria-label="Filter by previous 6 months"
        >
          <FiCalendar className="text-base" />
          <span>Prev 6 Months</span>
        </button>
      </div>
    </div>
  );
};
