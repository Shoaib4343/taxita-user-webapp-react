import React from "react";
import { generateWeeksForYear } from "../utils/generateWeeks";

const expenseCategories = [
  "Fuel",
  "Oil",
  "Cartax",
  "Insurance",
  "Repairs",
  "Tyres",
  "Vr lease",
  "Loan interest",
  "Other moto",
  "Radio",
  "Phone",
  "Mls",
  "Renewal",
  "Accountancy",
  "Car valeting",
  "Wage",
  "Home office",
  "Sundry",
  "Parking",
];

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const WeeklyExpenses = () => {
  const year = 2025;
  const weeks = generateWeeksForYear(year);

  const data = weeks.map((week, index) => ({
    ...week,
    label: `Week ${index + 1}`,
    total: 0,
    days: week.days.map((day) => ({
      ...day,
      ...Object.fromEntries(expenseCategories.map(cat => [cat, 0])),
    })),
  }));

  return (
    <div className="min-h-screen p-6 bg-white rounded-xl">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Weekly Expenses Listings
        </h2>

        <div className="space-y-6">
          {data.map((week) => {
            const weekTotal = week.days.reduce(
              (sum, day) =>
                sum +
                expenseCategories.reduce((acc, cat) => acc + day[cat], 0),
              0
            );

            return (
              <div
                key={week.id}
                className="bg-white rounded-xl shadow-md border border-gray-300"
              >
                {/* Week Header */}
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-blue-600 text-white font-semibold">
                        <th className="px-4 py-2 rounded-tl-xl border-b border-blue-700 text-start whitespace-nowrap">
                          {week.label}
                        </th>
                        {expenseCategories.map((cat) => (
                          <th
                            key={cat}
                            className="px-4 py-2 text-left border-b border-blue-700 whitespace-nowrap"
                          >
                            {cat}
                          </th>
                        ))}
                        <th className="px-4 py-2 text-left border-b border-blue-700 rounded-tr-xl whitespace-nowrap">
                          Total
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {week.days.map((day, idx) => {
                        const dayTotal = expenseCategories.reduce(
                          (sum, cat) => sum + day[cat],
                          0
                        );
                        const date = new Date(day.id);
                        const monthName = monthNames[date.getMonth()];
                        const formattedDate = `${monthName} ${date.getDate()}, ${date.getFullYear()}`;

                        return (
                          <tr
                            key={day.id}
                            className={`border-b border-gray-200 ${
                              idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                            } hover:bg-gray-100 transition-colors`}
                          >
                            <td className="px-4 py-2 font-medium">
                              {formattedDate}
                            </td>
                            {expenseCategories.map((cat) => (
                              <td key={cat} className="px-4 py-2">
                                £{day[cat].toFixed(2)}
                              </td>
                            ))}
                            <td className="px-4 py-2 font-semibold">
                              £{dayTotal.toFixed(2)}
                            </td>
                          </tr>
                        );
                      })}

                      {/* Summary Row */}
                      <tr className="bg-blue-50 font-semibold border-t-2 border-blue-300">
                        <td className="px-4 py-2">Summary</td>
                        {expenseCategories.map((cat) => {
                          const catTotal = week.days.reduce(
                            (sum, day) => sum + day[cat],
                            0
                          );
                          return (
                            <td key={cat} className="px-4 py-2">
                              £{catTotal.toFixed(2)}
                            </td>
                          );
                        })}
                        <td className="px-4 py-2">£{weekTotal.toFixed(2)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WeeklyExpenses;
