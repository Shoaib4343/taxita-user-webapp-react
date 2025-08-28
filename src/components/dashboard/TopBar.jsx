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
    <>
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
              <span className="font-semibold">2025-2026</span> — Selected tax
              year
            </p>
            <p className="text-sm text-gray-700 mt-1">
              <span className="font-semibold">Plan:</span> Platinum —
              <span className="text-gray-600">
                {" "}
                expires on Wed, 26 Aug 2026, 12:00 AM
              </span>
            </p>
          </div>
        </div>
      </div>

    </>

  );
};
