import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FaTimes } from "react-icons/fa";
import { createTransactionApi } from "../services/dashboard";

const IncomeModal = ({ open, onClose, card, selectedDay }) => {
  const [visible, setVisible] = useState(false);
  const [amount, setAmount] = useState("");
  const [file, setFile] = useState(null); // NEW state for file
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setVisible(true);
    } else {
      const timer = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [open]);

  if (!visible) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    const numAmount = parseFloat(amount);
    if (!numAmount || numAmount <= 0) {
      toast.error("Please enter a valid positive amount");
      return;
    }

    setLoading(true);

    try {
      // 🔑 Build FormData
      const formData = new FormData();
      formData.append("transaction_type", "credit");
      formData.append("trading_year_id", 4);
      formData.append("account_type_id", 1);
      formData.append("account_id", card.id);
      formData.append("amount", numAmount);
      // formData.append("user_id", 40);
      formData.append("description", `Income in ${card.title}`);
      formData.append("date", selectedDay.id);

      if (file) {
        formData.append("attachment", file); // file field for backend
      }

      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }
      console.log("numAmount:", numAmount, typeof numAmount);

      const res = await createTransactionApi(formData);

      // ✅ Check if backend returned success
      if (res.data.success || res.data.status === true) {
        toast.success(
          res.data.message || `Posted £${numAmount} to ${card.title}`
        );
        setAmount("");
        setFile(null);
        onClose();
      } else {
        // ❌ Validation or general error
        if (res.data.errors) {
          // show each validation error
          Object.values(res.data.errors)
            .flat()
            .forEach((errMsg) => toast.error(errMsg));
        } else {
          toast.error(res.data.message || "Failed to post income");
        }
      }
    } catch (err) {
      console.error(err);
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
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition"
          onClick={onClose}
          disabled={loading}
        >
          <FaTimes size={18} />
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
          <span
            className={`w-2 h-6 rounded-full ${card.color || "bg-blue-600"}`}
          ></span>
          Post Income in "{card.title}"
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Amount */}
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            disabled={loading}
            className="border border-gray-300 rounded-xl px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition disabled:bg-gray-100"
          />

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Expense Document? (Optional)
            </label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              disabled={loading}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                         file:rounded-lg file:border-0
                         file:text-sm file:font-semibold
                         file:bg-blue-50 file:text-blue-700
                         hover:file:bg-blue-100 disabled:opacity-50"
            />
            {file && (
              <p className="mt-1 text-xs text-gray-500">
                Selected: {file.name}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition disabled:opacity-50"
            >
              Close
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-5 py-2 rounded-lg text-white shadow-md transition disabled:opacity-50 ${
                card.color || "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Posting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IncomeModal;
