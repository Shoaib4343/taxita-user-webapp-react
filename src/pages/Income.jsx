import React, { useState } from "react";
import {
  FaWallet,
  FaCreditCard,
  FaFileInvoiceDollar,
  FaHome,
  FaFileInvoice,
  FaArrowRight,
} from "react-icons/fa";
import SidebarWeeks from "../components/SidebarWeeks";
import { IoCalendarOutline } from "react-icons/io5";
import IncomeModal from "../components/IncomeModal";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

// Static list of income accounts/cards with their respective icons and colors
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

const Income = () => {
  const [currentWeek, setCurrentWeek] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Handler when a user clicks on an income card
  const handleCardClick = (card) => {
    if (!selectedDay) {
      toast.error("Please select a day first");
      return;
    }
    setActiveCard(card);
    setModalOpen(true);
  };

  // Handler for successful transaction - triggers data refresh
  const handleTransactionSuccess = () => {
    // Increment refresh trigger to force sidebar to refetch data
    setRefreshTrigger(prev => prev + 1);
    
    // Close modal
    setModalOpen(false);
    
    // Show success message (the modal already shows this)
  };

  return (
    <div className="h-screen flex flex-col rounded-xl">
      {/* Header */}
      <div className="flex justify-between items-center bg-white border-b border-gray-200 p-4 rounded-t-xl">
        <div>
          <h2 className="text-xl font-semibold mb-1">Your Income</h2>
          <p className="text-sm text-gray-500">
            Your income listings go here...
          </p>
        </div>
        <div className="flex items-center text-sm md:mt-0">
          <Link to="/dashboard" className="hover:underline text-blue-600">
            Dashboard
          </Link>
          <span className="mx-2">/</span>
          <span>Income</span>
        </div>
      </div>

      {/* Layout */}
      <div className="flex flex-1 overflow-hidden bg-white rounded-b-xl">
        {/* Sidebar for weeks/days */}
        <SidebarWeeks
          onSelect={({ week, day, days }) => {
            setCurrentWeek({ ...week, days: days || [] });
            setSelectedDay(day);
          }}
          refreshTrigger={refreshTrigger}
        />

        {/* Main content area */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Your Daily Income</h1>
            {selectedDay && (
              <button className="bg-blue-50 text-blue-600 font-medium text-sm px-4 py-2 rounded-lg shadow-sm hover:bg-blue-100 hover:shadow-md transition duration-200 flex items-center gap-2 hover:cursor-pointer">
                <span>View all income against {selectedDay.label}</span>
                <FaArrowRight className="w-3 h-4" />
              </button>
            )}
          </div>

          {/* Show selected day's total */}
          {selectedDay && (
            <p className="text-gray-600 mb-6 flex items-center gap-2">
              <IoCalendarOutline className="w-5 h-5 text-blue-500" />
              {selectedDay.label} (£{Number(selectedDay.total).toFixed(2)})
            </p>
          )}



          {/* Income Cards */}
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
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Modal */}
      {activeCard && (
        <IncomeModal
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

export default Income;