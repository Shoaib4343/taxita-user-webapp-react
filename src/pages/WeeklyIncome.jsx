// import React from "react";
// import { generateWeeksForYear } from "../utils/generateWeeks";

// const incomeCategories = ["Cash", "Card", "Contract", "Subcontract"];
// const monthNames = [
//   "January",
//   "February",
//   "March",
//   "April",
//   "May",
//   "June",
//   "July",
//   "August",
//   "September",
//   "October",
//   "November",
//   "December",
// ];

// const WeeklyIncome = () => {
//   const year = 2025;
//   const weeks = generateWeeksForYear(year);

//   const data = weeks.map((week, index) => ({
//     ...week,
//     label: `Week ${index + 1}`,
//     total: 0,
//     days: week.days.map((day) => ({
//       ...day,
//       Cash: 0,
//       Card: 0,
//       Contract: 0,
//       Subcontract: 0,
//     })),
//   }));

//   return (
//     <div className="min-h-screen p-6 bg-white rounded-xl ">
//       <div className="max-w-6xl mx-auto">
//         <h2 className="text-3xl font-bold text-gray-800 mb-6">
//           Weekly Income Listings
//         </h2>

//         <div className="space-y-6">
//           {data.map((week) => {
//             const weekTotal = week.days.reduce(
//               (sum, day) =>
//                 sum + incomeCategories.reduce((acc, cat) => acc + day[cat], 0),
//               0
//             );

//             return (
//               <div
//                 key={week.id}
//                 className="bg-white rounded-xl shadow-md border border-gray-300 "
//               >
//                 {/* Week Header */}
//                 <div className="overflow-x-auto">
//                   <table className="min-w-full">
//                     <thead>
//                       {/* Week Number at top of first column */}
//                       <tr className="bg-blue-600 text-white font-semibold">
//                         <th className="px-4 py-2 rounded-tl-xl border-b border-blue-700 text-start">
//                           {week.label} {/* Week 1, Week 2... */}
//                         </th>
//                         {incomeCategories.map((cat) => (
//                           <th
//                             key={cat}
//                             className="px-4 py-2 text-left border-b border-blue-700"
//                           >
//                             {cat}
//                           </th>
//                         ))}
//                         <th className="px-4 py-2 text-left border-b border-blue-700 rounded-tr-xl">
//                           Total
//                         </th>
//                       </tr>
//                     </thead>

//                     <tbody>
//                       {week.days.map((day, idx) => {
//                         const dayTotal = incomeCategories.reduce(
//                           (sum, cat) => sum + day[cat],
//                           0
//                         );
//                         const date = new Date(day.id);
//                         const monthName = monthNames[date.getMonth()];

//                         return (
//                           <tr
//                             key={day.id}
//                             className={`border-b border-gray-200 ${
//                               idx % 2 === 0 ? "bg-gray-50" : "bg-white"
//                             } hover:bg-gray-100 transition-colors`}
//                           >
//                             <td className="px-4 py-2 font-medium">
//                               {monthName} {date.getDate()}
//                             </td>
//                             {incomeCategories.map((cat) => (
//                               <td key={cat} className="px-4 py-2">
//                                 £{day[cat].toLocaleString()}
//                               </td>
//                             ))}
//                             <td className="px-4 py-2 font-semibold">
//                               £{dayTotal}
//                             </td>
//                           </tr>
//                         );
//                       })}

//                       {/* Summary Row */}
//                       <tr className="bg-blue-50 font-semibold border-t-2 border-blue-300">
//                         <td className="px-4 py-2">Summary</td>
//                         {incomeCategories.map((cat) => {
//                           const catTotal = week.days.reduce(
//                             (sum, day) => sum + day[cat],
//                             0
//                           );
//                           return (
//                             <td key={cat} className="px-4 py-2">
//                               £{catTotal}
//                             </td>
//                           );
//                         })}
//                         <td className="px-4 py-2">£{weekTotal}</td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WeeklyIncome;


















// src/pages/WeeklyIncome.jsx
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {  weeklyIncomeApi } from "../services/dashboard";

const WeeklyIncome = () => {
  const [weeklyData, setWeeklyData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeeklyIncome = async () => {
      setLoading(true);
      try {
        const res = await weeklyIncomeApi();
        if (res.data.success) {
          setWeeklyData(res.data.data);
        } else {
          toast.error("Failed to fetch weekly income");
        }
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong while fetching income");
      } finally {
        setLoading(false);
      }
    };

    fetchWeeklyIncome();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading weekly income...</p>
      </div>
    );
  }

  if (!weeklyData.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">No weekly Income data available.</p>
      </div>
    );
  }

  // Extract dynamic categories from first week's first day
  const categories = Object.keys(weeklyData[0].days[0])
    .filter((key) => key !== "date" && key !== "total");

  return (
    <div className="min-h-screen p-6 bg-white rounded-xl">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Weekly Income Listings
        </h2>

        <div className="space-y-6">
          {weeklyData.map((week) => (
            <div
              key={week.week_number}
              className="bg-white rounded-xl shadow-md border border-gray-300"
            >
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-blue-600 text-white font-semibold">
                      <th className="px-4 py-2 rounded-tl-xl border-b border-blue-700 text-start">
                        Week {week.week_number} ({week.start_date})
                      </th>
                      {categories.map((cat) => (
                        <th
                          key={cat}
                          className="px-4 py-2 text-left border-b border-blue-700 whitespace-nowrap"
                        >
                          {cat}
                        </th>
                      ))}
                      <th className="px-4 py-2 text-left border-b border-blue-700 rounded-tr-xl">
                        Total
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {week.days.map((day) => (
                      <tr
                        key={day.date}
                        className="border-b border-gray-200 hover:bg-gray-100 transition-colors"
                      >
                        <td className="px-4 py-2 font-medium whitespace-nowrap">
                          {day.date}
                        </td>
                        {categories.map((cat) => (
                          <td key={cat} className="px-4 py-2">
                            £{day[cat].toLocaleString()}
                          </td>
                        ))}
                        <td className="px-4 py-2 font-semibold">
                          £{day.total.toLocaleString()}
                        </td>
                      </tr>
                    ))}

                    {/* Weekly summary row */}
                    <tr className="bg-blue-50 font-semibold border-t-2 border-blue-300">
                      <td className="px-4 py-2">Weekly Summary</td>
                      {categories.map((cat) => (
                        <td key={cat} className="px-4 py-2">
                          £{week.weekly_summary?.[cat]?.toLocaleString?.() ?? 0}
                        </td>
                      ))}
                      <td className="px-4 py-2">
                        £{week.weekly_summary?.total?.toLocaleString() ?? 0}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeeklyIncome;
