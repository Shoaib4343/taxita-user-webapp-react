// src/components/IncomeModal.jsx
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FaTimes } from "react-icons/fa";



const IncomeModal = ({ open, onClose, card }) => {
  const [visible, setVisible] = useState(false);
  const [amount, setAmount] = useState("");

  // Handle appear/disappear animations
  useEffect(() => {
    if (open) {
      setVisible(true);
    } else {
      const timer = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [open]);

  if (!visible) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    const numAmount = parseFloat(amount);
    if (!numAmount || numAmount <= 0) {
      toast.error("Please enter a valid positive amount");
      return;
    }

    // Success toast
    toast.success(`Posted £${numAmount} to ${card.title}`);
    setAmount("");
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
        open ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`bg-white rounded-2xl w-full max-w-md p-6 relative shadow-xl transform transition-transform duration-300 ${
          open ? "scale-100" : "scale-95"
        }`}
      >
        {/* Close Icon */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
          onClick={onClose}
        >
          <FaTimes size={18} />
        </button>

        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Post Income in "{card.title}"
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
            >
              Close
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IncomeModal;
