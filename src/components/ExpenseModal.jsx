// // src/components/ExpenseModal.jsx
// import React, { useState, useEffect } from "react";
// import toast from "react-hot-toast";
// import { FaTimes } from "react-icons/fa";

// const ExpenseModal = ({ open, onClose, card }) => {
//   const [visible, setVisible] = useState(false);
//   const [amount, setAmount] = useState("0.00");
//   const [file, setFile] = useState(null);

//   const currentDate = new Date().toLocaleDateString("en-GB", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//   });

//   // Show/Hide animation
//   useEffect(() => {
//     if (open) {
//       setVisible(true);
//     } else {
//       const timer = setTimeout(() => setVisible(false), 300);
//       return () => clearTimeout(timer);
//     }
//   }, [open]);

//   if (!visible) return null;

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const numAmount = parseFloat(amount);
//     if (!numAmount || numAmount <= 0) {
//       toast.error("Please enter a valid positive amount");
//       return;
//     }

//     toast.success(`Posted £${numAmount} to ${card?.title}`);
//     setAmount("0.00");
//     setFile(null);
//     onClose();
//   };

//   return (
//     <div
//       className={`fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
//         open ? "opacity-100" : "opacity-0"
//       }`}
//     >
//       <div
//         className={`bg-white rounded-2xl w-full max-w-md p-6 relative shadow-xl transform transition-transform duration-300 ${
//           open ? "scale-100" : "scale-95"
//         }`}
//       >
//         {/* Close Button */}
//         <button
//           className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
//           onClick={onClose}
//         >
//           <FaTimes size={18} />
//         </button>

//         <h2 className="text-lg font-semibold text-gray-900 mb-1">
//           Post Expenses in "{card?.title}"
//         </h2>
//         <p className="text-sm text-gray-500 mb-4">
//           Expense Amount for {currentDate}
//         </p>

//         <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//           {/* Amount Input */}
//           <input
//             type="number"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//             step="0.01"
//             min="0"
//             className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           />

//           {/* File Upload */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Upload Expense Document? (Optional)
//             </label>
//             <input
//               type="file"
//               onChange={(e) => setFile(e.target.files[0])}
//               className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
//                          file:rounded-lg file:border-0
//                          file:text-sm file:font-semibold
//                          file:bg-blue-50 file:text-blue-700
//                          hover:file:bg-blue-100"
//             />
//             {file && (
//               <p className="mt-1 text-xs text-gray-500">
//                 Selected: {file.name}
//               </p>
//             )}
//           </div>

//           {/* Buttons */}
//           <div className="flex justify-end gap-2">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
//             >
//               Close
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
//             >
//               Submit
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ExpenseModal;

// src/components/ExpenseModal.jsx
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FaTimes } from "react-icons/fa";
import { createTransactionApi } from "../services/dashboard";

const ExpenseModal = ({ open, onClose, card, selectedDay }) => {
  const [visible, setVisible] = useState(false);
  const [amount, setAmount] = useState("");
  const [file, setFile] = useState(null);
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
      const formData = new FormData();
      formData.append("transaction_type", "debit"); // 🔑 Expense = debit
      // formData.append("trading_year_id", 4);
      formData.append("account_type_id", 2); // 🔑 expenses ID 2
      formData.append("account_id", card.id);
      formData.append("amount", numAmount);
      formData.append("description", `Expense in ${card.title}`);
      formData.append("date", selectedDay?.id);

      if (file) {
        formData.append("attachment", file);
      }

      // ✅ Debugging: log all key/value pairs
      for (let pair of formData.entries()) {
        console.log(`${pair[0]}:`, pair[1]);
      }

      const res = await createTransactionApi(formData);

      console.log("API Response:", res); // ✅ log whole response
      if (res.data.success || res.data.status === true) {
        toast.success(
          res.data.message || `Posted £${numAmount} to ${card.title}`
        );
        setAmount("");
        setFile(null);
        onClose();
      } else {
        if (res.data.errors) {
          Object.values(res.data.errors)
            .flat()
            .forEach((errMsg) => toast.error(errMsg));
        } else {
          toast.error(res.data.message || "Failed to post expense");
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

        <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
          <span
            className={`w-2 h-6 rounded-full ${card.color || "bg-blue-600"}`}
          ></span>
          Post Expense in "{card.title}"
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            disabled={loading}
            className="border border-gray-300 rounded-xl px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition disabled:bg-gray-100"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Expense Document? (Optional)
            </label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              disabled={loading}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 cursor-pointer
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
              className={`px-5 py-2 rounded-lg ${
                card.color || "bg-blue-600"
              } text-white shadow-md hover:opacity-90 transition disabled:opacity-50 ${
                loading ? "cursor-not-allowed" : "cursor-pointer"
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

export default ExpenseModal;
