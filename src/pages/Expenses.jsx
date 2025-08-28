import React, { useState } from "react";
import {
  FaGasPump,
  FaOilCan,
  FaCar,
  FaShieldAlt,
  FaTools,
  FaDotCircle,
  FaCarSide,
  FaMoneyCheckAlt,
  FaCogs,
  FaPhoneAlt,
  FaIdBadge,
  FaWrench,
  FaBalanceScale,
  FaSoap,
  FaUserTie,
  FaHome,
  FaBox,
  FaParking,
  FaArrowRight,
} from "react-icons/fa";
import { generateWeeksForYear } from "../utils/generateWeeks";
import SidebarWeeks from "../components/SidebarWeeks";
import { IoCalendarOutline } from "react-icons/io5";
import ExpenseModal from "../components/ExpenseModal";
import { Link } from "react-router-dom";
import SidebarWeeksExpense from "../components/SidebarWeeksExpense";
import toast from "react-hot-toast";

const weeksData = generateWeeksForYear(2025);

const motorExpenses = [
  { id: 6, title: "Fuel Expenses", icon: FaGasPump, color: "bg-red-500" },
  { id: 7, title: "Oil Expenses", icon: FaOilCan, color: "bg-yellow-500" },
  { id: 8, title: "Car Tax", icon: FaCar, color: "bg-blue-500" },
  {
    id: 9,
    title: "Insurance Expenses",
    icon: FaShieldAlt,
    color: "bg-green-500",
  },
  {
    id: 10,
    title: "Servicing / Repairs",
    icon: FaTools,
    color: "bg-purple-500",
  },
  { id: 11, title: "Tyres Expenses", icon: FaDotCircle, color: "bg-pink-500" },
  {
    id: 12,
    title: "Vehicle Rental Lease",
    icon: FaCarSide,
    color: "bg-indigo-500",
  },
  {
    id: 13,
    title: "Vehicle Loan Interest",
    icon: FaMoneyCheckAlt,
    color: "bg-orange-500",
  },
  { id: 14, title: "Other Motor Expenses", icon: FaCogs, color: "bg-gray-500" },
];

const additionalExpenses = [
  {
    id: 15,
    title: "Radio Rent / Commission fee / Subscription fee",
    icon: FaDotCircle,
    color: "bg-blue-500",
  },
  {
    id: 16,
    title: "Mobile / Telephone costs",
    icon: FaPhoneAlt,
    color: "bg-green-500",
  },
  {
    id: 17,
    title: "Driver / Licences / Badge / Medical",
    icon: FaIdBadge,
    color: "bg-red-500",
  },
  {
    id: 18,
    title: "Repairs / Renewals to equipment",
    icon: FaWrench,
    color: "bg-yellow-500",
  },
  {
    id: 19,
    title: "Legal and accountancy costs",
    icon: FaBalanceScale,
    color: "bg-purple-500",
  },
  {
    id: 20,
    title: "Car cleaning / Valeting",
    icon: FaSoap,
    color: "bg-pink-500",
  },
  {
    id: 21,
    title: "Wages to employee",
    icon: FaUserTie,
    color: "bg-indigo-500",
  },
  {
    id: 22,
    title: "Use of home as office",
    icon: FaHome,
    color: "bg-orange-500",
  },
  {
    id: 23,
    title: "Misc / Sundry expenses",
    icon: FaBox,
    color: "bg-gray-500",
  },
  {
    id: 24,
    title: "Parking / Toll charges",
    icon: FaParking,
    color: "bg-teal-500",
  },
];

const Expenses = () => {
  const [currentWeek, setCurrentWeek] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleCardClick = (card) => {
    if (!selectedDay) {
      // Optional: you can use toast here for warning
       toast.error("Please select a day first");
      return;
    }
    setActiveCard(card);
    setModalOpen(true);
  };

  const handleTransactionSuccess = () => {
    setRefreshTrigger(prev => prev + 1);
    setModalOpen(false);
  };

  const renderCardSection = (title, data) => (
    <>
      <h2 className="text-lg font-semibold mb-4 mt-6">{title}</h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((item) => (
          <div
            key={item.id}
            onClick={() => handleCardClick(item)}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-4 hover:shadow-md hover:cursor-pointer transition"
          >
            <div
              className={`w-12 h-12 rounded-full flex flex-shrink-0 items-center justify-center text-white ${item.color}`}
            >
              <item.icon className="text-xl" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 line-clamp-3">
                {item.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </>
  );

  return (
    <div className="h-screen flex flex-col rounded-xl">
      {/* Header */}
      <div className="flex justify-between items-center bg-white border-b border-gray-200 p-4 rounded-t-xl">
        <div>
          <h2 className="text-xl font-semibold mb-1">Your Expenses</h2>
          <p className="text-sm text-gray-500">Your Expense listings go here...</p>
        </div>
        <div className="flex items-center text-sm md:mt-0">
          <Link to="/dashboard" className="hover:underline text-blue-600">
            Dashboard
          </Link>
          <span className="mx-2">/</span>
          <span>Expense</span>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden bg-white rounded-b-xl">
        {/* Sidebar */}
        <SidebarWeeksExpense
          onSelect={({ week, day, days }) => {
            setCurrentWeek({ ...week, days: days || [] });
            setSelectedDay(day);
          }}
          refreshTrigger={refreshTrigger}
        />

        {/* Main content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Your Daily Expenses</h1>
            {selectedDay && (
              <button className="bg-blue-50 text-blue-600 font-medium text-sm px-4 py-2 rounded-lg shadow-sm hover:bg-blue-100 hover:shadow-md transition duration-200 flex items-center gap-2 hover:cursor-pointer">
                <span>View all expenses against {selectedDay.label}</span>
                <FaArrowRight className="w-3 h-4" />
              </button>
            )}
          </div>

          {selectedDay && (
            <p className="text-gray-600 mb-6 flex items-center gap-2">
              <IoCalendarOutline className="w-5 h-5 text-blue-500" />
              {selectedDay.label} (£{Number(selectedDay.total || 0).toFixed(2)})
            </p>
          )}

          {/* Card Sections */}
          {renderCardSection("Motor Expenses", motorExpenses)}
          {renderCardSection("Additional Expenses", additionalExpenses)}
        </main>
      </div>

      {activeCard && (
        <ExpenseModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          card={activeCard}
          selectedDay={selectedDay}
          onSuccess={handleTransactionSuccess}
        />
      )}
    </div>
  );
};


export default Expenses;
