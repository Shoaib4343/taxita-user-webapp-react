import React, { useState } from "react";
import {
  FaWallet,
  FaCreditCard,
  FaFileInvoiceDollar,
  FaHome,
  FaFileInvoice,
  FaArrowRight,
} from "react-icons/fa";
import { generateWeeksForYear } from "../utils/generateWeeks";
import SidebarWeeks from "../components/SidebarWeeks";
import { IoCalendarOutline } from "react-icons/io5";
import IncomeModal from "../components/IncomeModal";

const weeksData = generateWeeksForYear(2025);

const incomeData = [
  { id: 1, title: "Cash Account", icon: FaWallet, color: "bg-emerald-500" },
  { id: 2, title: "Card Account", icon: FaCreditCard, color: "bg-blue-500" },
  {
    id: 3,
    title: "Contract Account",
    icon: FaFileInvoiceDollar,
    color: "bg-purple-500",
  },
  {
    id: 4,
    title: "Sub Contract Account",
    icon: FaFileInvoice,
    color: "bg-yellow-500",
  },
  { id: 5, title: "Rental Income", icon: FaHome, color: "bg-red-500" },
];

export default function Income() {
  const [currentWeek, setCurrentWeek] = useState(weeksData[0]);
  const [selectedDay, setSelectedDay] = useState(currentWeek.days[0]);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeCard, setActiveCard] = useState(null);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handleWeekSelect = (week) => {
    setCurrentWeek(week);
    setSelectedDay(week.days[0]);
  };

  const handleDaySelect = (day) => setSelectedDay(day);

  const handleCardClick = (card) => {
    setActiveCard(card);
    setModalOpen(true);
  };

  return (
    <div className=" h-screen flex flex-col rounded-xl">
      <div className="bg-white border-b border-gray-200 p-4 rounded-t-xl">
        <h2 className="text-xl font-semibold  mb-1">Your Income</h2>
        <p className="text-sm text-gray-500">Your income listings go here...</p>
      </div>

      <div className="flex flex-1 overflow-hidden bg-white rounded-b-xl">
        <SidebarWeeks
          weeksData={weeksData}
          onSelect={({ week, day }) => {
            setCurrentWeek(week);
            setSelectedDay(day);
            console.log("Transaction date:", day.id); // still keep log if useful
          }}
          onDaySelect={handleDaySelect}
        />

        <main className="flex-1 p-6 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Your Daily Income</h1>
            <button className=" bg-blue-50  text-blue-600 font-medium text-sm px-4 py-2 rounded-lg shadow-sm  hover:bg-blue-100 hover:shadow-md transition duration-200 flex items-center gap-2 hover:cursor-pointer">
              <span>View all income against {formatDate(selectedDay.id)}</span>
              <FaArrowRight className="w-3 h-4 " />
            </button>
          </div>

          <p className="text-gray-600 mb-6 flex items-center gap-2">
            <IoCalendarOutline className="w-5 h-5 text-blue-500" />
            {formatDate(selectedDay.id)}
          </p>

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {incomeData.map((item) => (
              <div
                key={item.id}
                onClick={() => handleCardClick(item)}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-4 hover:shadow-md hover:cursor-pointer transition"
              >
                <div
                  className={`w-12 h-12 min-w-[48px] min-h-[48px] rounded-full flex items-center justify-center text-white ${item.color}`}
                >
                  <item.icon className="text-xl" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    {item.title}
                  </h3>
                  {/* <p className="text-xl font-bold text-gray-900">£{item.amount.toLocaleString()}</p> */}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Income popUp model */}
      {activeCard && (
        <IncomeModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          card={activeCard}
          selectedDay={selectedDay}
        />
      )}
    </div>
  );
}
