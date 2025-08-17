

import React, { useState } from "react";
import { IoCalendarOutline } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa";

// helper to format date as "Mon, 07 Apr 2025"
const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-GB", { weekday: "short", day: "2-digit", month: "short", year: "numeric" });
};

const SidebarWeeks = ({ weeksData, onWeekSelect }) => {
  const [selectedWeekId, setSelectedWeekId] = useState(weeksData[0].id);
  const [selectedDayId, setSelectedDayId] = useState(weeksData[0].days[0].id);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const selectedWeek = weeksData.find((w) => w.id === selectedWeekId);
  const selectedDay = selectedWeek.days.find((d) => d.id === selectedDayId);

  const handleWeekSelect = (week) => {
    setSelectedWeekId(week.id);
    setSelectedDayId(week.days[0].id);
    setDropdownOpen(false);
    onWeekSelect && onWeekSelect(week);
  };

  const handleDaySelect = (day) => {
    setSelectedDayId(day.id);
    onWeekSelect && onWeekSelect(selectedWeek);
  };

  return (
    <aside className="w-80 bg-white border-r border-gray-200 flex flex-col">
      {/* Dropdown Section */}
      <div className="p-4 border-b border-gray-200 sticky top-0 bg-white z-20">
        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2 text-gray-800">
          <IoCalendarOutline className="text-blue-500" /> Select Your Week
        </h3>

        <div className="relative">
          {/* Dropdown Button */}
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-full border border-gray-300 rounded-lg px-3 py-3 text-left text-gray-700 hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300 flex justify-between items-center text-sm"
          >
            <span className="truncate font-medium">
              Week {weeksData.findIndex((w) => w.id === selectedWeekId) + 1} w/c: {formatDate(selectedDay.id)} &nbsp; £0
            </span>
            <FaChevronDown
              className={`ml-2 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
            />
          </button>

          {/* Dropdown List */}
          {dropdownOpen && (
            <ul className="absolute mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-96 overflow-y-auto z-30 text-sm">
              {weeksData.map((week, index) => (
                <li key={week.id}>
                  <button
                    onClick={() => handleWeekSelect(week)}
                    className={`w-full flex justify-between items-center px-3 py-3 hover:bg-blue-100 transition ${
                      selectedWeekId === week.id
                        ? "bg-blue-50 text-blue-700 font-medium"
                        : "text-gray-700"
                    }`}
                  >
                    <span className="truncate">
                      Week {index + 1 } w/c: {formatDate(week.days[0].id)} &nbsp; £0
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Days Section */}
      {!dropdownOpen && selectedWeek && (
        <div className="flex-1 overflow-y-auto p-4 space-y-2 max-h-[calc(100vh-100px)]">
          <ul className="divide-y divide-gray-100 rounded-lg border border-gray-200">
            {selectedWeek.days.map((day) => (
              <li
                key={day.id}
                onClick={() => handleDaySelect(day)}
                className={`flex justify-between px-4 py-3 cursor-pointer transition-colors ${
                  selectedDayId === day.id
                    ? "bg-blue-100 text-blue-700 font-medium"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span>{formatDate(day.id)}</span>
                <span>£0.00</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
};

export default SidebarWeeks;
