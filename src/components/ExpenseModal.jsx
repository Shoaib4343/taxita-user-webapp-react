// src/components/ExpenseModal.jsx
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FaTimes } from "react-icons/fa";

const ExpenseModal = ({ open, onClose, card }) => {
  const [visible, setVisible] = useState(false);
  const [amount, setAmount] = useState("0.00");
  const [file, setFile] = useState(null);

  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  // Show/Hide animation
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

    const numAmount = parseFloat(amount);
    if (!numAmount || numAmount <= 0) {
      toast.error("Please enter a valid positive amount");
      return;
    }

    toast.success(`Posted £${numAmount} to ${card?.title}`);
    setAmount("0.00");
    setFile(null);
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
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
          onClick={onClose}
        >
          <FaTimes size={18} />
        </button>

        <h2 className="text-lg font-semibold text-gray-900 mb-1">
          Post Expenses in "{card?.title}"
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Expense Amount for {currentDate}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Amount Input */}
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            step="0.01"
            min="0"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Expense Document? (Optional)
            </label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                         file:rounded-lg file:border-0
                         file:text-sm file:font-semibold
                         file:bg-blue-50 file:text-blue-700
                         hover:file:bg-blue-100"
            />
            {file && (
              <p className="mt-1 text-xs text-gray-500">
                Selected: {file.name}
              </p>
            )}
          </div>

          {/* Buttons */}
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

export default ExpenseModal;
