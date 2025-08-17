import React from "react";
import { FaDownload, FaFilePdf, FaThumbsUp } from "react-icons/fa";

export default function RollingPLPage() {
  const motorExpenses = [
    { label: "Fuel", amount: "£ 0.00" },
    { label: "Oil", amount: "£ 0.00" },
    { label: "Car tax", amount: "£ 0.00" },
    { label: "Insurance", amount: "£ 0.00" },
    { label: "Servicing/repairs", amount: "£ 0.00" },
    { label: "Tyres", amount: "£ 0.00" },
    { label: "Depreciation Expense", amount: "£ 0.00" },
    { label: "Vehicle rental/lease", amount: "£ 0.00" },
    { label: "Vehicle loan interest", amount: "£ 0.00" },
    { label: "Other motor expenses", amount: "£ 0.00" },
    { label: "Subtotal for Motor Expenses", amount: "£ 0.00" },
  ];

  const additionalExpenses = [
    { label: "Radio Rent / Commission fee / Subscription fee", amount: "£ 0.00" },
    { label: "Deductions % (Cash 3 %, Card / Bank 2 %, Account/Contract 1 %, Sub Contract 3 %)", amount: "£ 0.00" },
    { label: "Mobile/telephone costs", amount: "£ 0.00" },
    { label: "Driver/licences/badge/medical", amount: "£ 0.00" },
    { label: "Repairs/renewals to equipment", amount: "£ 0.00" },
    { label: "Legal and accountancy costs", amount: "£ 0.00" },
    { label: "Car cleaning/valeting", amount: "£ 0.00" },
    { label: "Wages to employee", amount: "£ 0.00" },
    { label: "Use of home as office", amount: "£ 0.00" },
    { label: "Misc/sundry expenses", amount: "£ 0.00" },
    { label: "Parking/Toll charges", amount: "£ 0.00" },
    { label: "Subtotal for Additional expenses", amount: "£ 0.00" },
  ];

  const profitLoss = [
    { label: "Total Expenses", amount: "£ 0.00" },
    { label: "Net Profit / (Loss)", amount: "£ 0.00" },
    { label: "Add private use adjustment car (4 %)", amount: "£ 0.00" },
    { label: "Add private use adjustment telephone (3 %)", amount: "£ 0.00" },
    { label: "Adjusted Net Profit / (Loss)", amount: "£ 0.00" },
  ];

  const renderTable = (title, items) => (
    <div className="overflow-x-auto bg-gray-50 rounded-lg shadow-sm p-4">
      <h3 className="font-semibold mb-2">{title}</h3>
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th className="px-4 py-2 text-left rounded-tl-lg">Description</th>
            <th className="px-4 py-2 text-left rounded-tr-lg">Amount</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => {
            const isLast = idx === items.length - 1;
            return (
              <tr
                key={idx}
                className={`${
                  !isLast && idx % 2 !== 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-blue-100 transition-colors ${isLast ? "font-semibold border-t-2 border-gray-300 bg-gray-100" : ""}`}
              >
                <td className="px-4 py-2">{item.label}</td>
                <td className="px-4 py-2">{item.amount}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="space-y-6 px-6 py-6 bg-white rounded-xl">
      {/* Page Heading */}
      <div className="font-bold text-xl">ROLLING PROFIT & LOSS</div>

      {/* First Card */}
      <div className="bg-white rounded-lg shadow-md p-6 space-y-4 border-t-4 border-gray-600">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h2 className="text-lg font-semibold">
              ROLLING PROFIT & LOSS FOR 2025 / 2026
            </h2>
            <p className="text-gray-700 mt-1">
              ROLLING PROFIT & LOSS content goes here...
            </p>
          </div>

          <div className="flex gap-2">
            <button className="flex items-center gap-2 bg-green-600 text-white px-3 py-1.5 rounded-lg hover:bg-green-700 transition text-sm">
              <FaDownload className="w-4 h-4" /> Download PDF
            </button>
            <button className="flex items-center gap-2 bg-green-600 text-white px-3 py-1.5 rounded-lg hover:bg-green-700 transition text-sm">
              <FaFilePdf className="w-4 h-4" /> Export PDF
            </button>
          </div>
        </div>

        <div className="flex justify-between items-start mt-4 bg-gray-200 p-4 rounded-lg border-l-4 border-gray-600">
          <div className="flex-1">
            <p className="text-gray-500">
              From this page you can view your rolling profit and loss amounts.
            </p>
            <p className="text-gray-700 font-medium mt-1">
              Rolling P&L for 2025 / 2026
            </p>
          </div>

          <div className="px-6">
            <div className="flex items-center justify-between bg-green-600 text-white pl-5 pr-20 py-4 rounded-lg shadow-lg ">
              <div className="flex items-center gap-3">
                <FaThumbsUp className="w-6 h-6" />
                <div>
                  <p className="text-xs uppercase">Total Income</p>
                  <p className="text-xl font-bold">£ 0.00</p>
                  <span className="text-sm font-medium">Total Income</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Second Card: Expenses with table design */}
      <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-gray-600 space-y-4">
        <h2 className="text-lg font-semibold">Overall Expenses</h2>

        {renderTable("Motor Expenses", motorExpenses)}
        {renderTable("Additional Expenses", additionalExpenses)}
        {renderTable("Profit / (Loss)", profitLoss)}
      </div>
    </div>
  );
}
