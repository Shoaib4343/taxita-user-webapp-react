import React, { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { FaTimes } from "react-icons/fa";
import { createTransactionApi } from "../services/dashboard";

const ExpenseModal = ({ open, onClose, card, selectedDay, onSuccess }) => {
  const [visible, setVisible] = useState(false);
  const [amount, setAmount] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const amountRef = useRef(null);

  useEffect(() => {
    if (open) {
      setVisible(true);
      setErrors({});
    } else {
      const timer = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [open]);

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => amountRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!visible) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setErrors({});

    const numAmount = parseFloat(amount);
    if (!numAmount || numAmount <= 0) {
      setErrors({ amount: ["Please enter a valid positive amount"] });
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("transaction_type", "debit"); // Expense = debit
      formData.append("account_type_id", 2); // Expense account type
      formData.append("account_id", card.id);
      formData.append("amount", numAmount);
      formData.append("description", `Expense in ${card.title}`);
      formData.append("date", selectedDay.date); // make sure this is a valid date string

      if (file) {
        formData.append("attachment", file);
      }

      const res = await createTransactionApi(formData);

      if (res.data.success || res.data.status === true) {
        toast.success(
          res.data.message || `Posted £${numAmount.toFixed(2)} to ${card.title}`
        );

        setAmount("");
        setFile(null);
        setErrors({});

        onSuccess &&
          onSuccess({ amount: numAmount, date: selectedDay.date, card });
      } else {
        if (res.data.errors) setErrors(res.data.errors);
        else toast.error(res.data.message || "Failed to post expense");
      }
    } catch (err) {
      console.error("Transaction error:", err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
        open ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`bg-white rounded-2xl w-full max-w-md p-6 relative shadow-2xl transform transition-all duration-300 ${
          open ? "scale-100 translate-y-0" : "scale-95 translate-y-6"
        }`}
      >
        {/* Close */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition cursor-pointer"
          onClick={onClose}
          disabled={loading}
        >
          <FaTimes size={18} />
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
          <span
            className={`w-2 h-6 rounded-full ${card.color || "bg-red-600"}`}
          ></span>
          Post Expense in "{card.title}"
        </h2>

        {/* Selected Day Info (like IncomeModal) */}
        {selectedDay && (
          <div className="mb-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <span className="font-medium">Date:</span> {selectedDay.label}
            </p>
            <p className="text-sm text-blue-800">
              <span className="font-medium">Current Total:</span> £
              {Number(selectedDay.total || 0).toFixed(2)}
            </p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount (£)
            </label>
            <input
              ref={amountRef}
              type="number"
              step="0.01"
              min="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              disabled={loading}
              className={`w-full border rounded-xl px-4 py-3 shadow-sm focus:outline-none focus:ring-2 transition disabled:bg-gray-100 ${
                errors.amount
                  ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              }`}
              required
            />
            {errors.amount &&
              errors.amount.map((err, i) => (
                <p key={i} className="text-sm text-red-600 mt-1">
                  {err}
                </p>
              ))}
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Expense Document (Optional)
            </label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              disabled={loading}
              accept=".jpg,.jpeg,.png,.pdf"
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                         file:rounded-lg file:border-0 file:text-sm file:font-semibold
                         file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50 cursor-pointer"
            />
            {file && (
              <p className="mt-1 text-xs text-gray-500">
                Selected: {file.name} ({(file.size / 1024).toFixed(1)} KB)
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition disabled:opacity-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !amount || parseFloat(amount) <= 0}
              className={`px-5 py-2 rounded-lg text-white shadow-md transition disabled:opacity-50 ${
                loading || !amount || parseFloat(amount) <= 0
                  ? "cursor-not-allowed bg-gray-400"
                  : "cursor-pointer " +
                    (card.color || "bg-blue-600 hover:bg-blue-700")
              }`}
            >
              {loading ? "Posting..." : `Post £${amount || "0.00"}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExpenseModal;
