// import React from "react";
// import { generateWeeksForYear } from "../utils/generateWeeks";

// const expenseCategories = [
//   "Fuel",
//   "Oil",
//   "Cartax",
//   "Insurance",
//   "Repairs",
//   "Tyres",
//   "Vr lease",
//   "Loan interest",
//   "Other moto",
//   "Radio",
//   "Phone",
//   "Mls",
//   "Renewal",
//   "Accountancy",
//   "Car valeting",
//   "Wage",
//   "Home office",
//   "Sundry",
//   "Parking",
// ];

// const monthNames = [
//   "January", "February", "March", "April", "May", "June",
//   "July", "August", "September", "October", "November", "December",
// ];

// const WeeklyExpenses = () => {
//   const year = 2025;
//   const weeks = generateWeeksForYear(year);

//   const data = weeks.map((week, index) => ({
//     ...week,
//     label: `Week ${index + 1}`,
//     total: 0,
//     days: week.days.map((day) => ({
//       ...day,
//       ...Object.fromEntries(expenseCategories.map(cat => [cat, 0])),
//     })),
//   }));

//   return (
//     <div className="min-h-screen p-6 bg-white rounded-xl">
//       <div className="max-w-7xl mx-auto">
//         <h2 className="text-3xl font-bold text-gray-800 mb-6">
//           Weekly Expenses Listings
//         </h2>

//         <div className="space-y-6">
//           {data.map((week) => {
//             const weekTotal = week.days.reduce(
//               (sum, day) =>
//                 sum +
//                 expenseCategories.reduce((acc, cat) => acc + day[cat], 0),
//               0
//             );

//             return (
//               <div
//                 key={week.id}
//                 className="bg-white rounded-xl shadow-md border border-gray-300"
//               >
//                 {/* Week Header */}
//                 <div className="overflow-x-auto">
//                   <table className="min-w-full">
//                     <thead>
//                       <tr className="bg-blue-600 text-white font-semibold">
//                         <th className="px-4 py-2 rounded-tl-xl border-b border-blue-700 text-start whitespace-nowrap">
//                           {week.label}
//                         </th>
//                         {expenseCategories.map((cat) => (
//                           <th
//                             key={cat}
//                             className="px-4 py-2 text-left border-b border-blue-700 whitespace-nowrap"
//                           >
//                             {cat}
//                           </th>
//                         ))}
//                         <th className="px-4 py-2 text-left border-b border-blue-700 rounded-tr-xl whitespace-nowrap">
//                           Total
//                         </th>
//                       </tr>
//                     </thead>

//                     <tbody>
//                       {week.days.map((day, idx) => {
//                         const dayTotal = expenseCategories.reduce(
//                           (sum, cat) => sum + day[cat],
//                           0
//                         );
//                         const date = new Date(day.id);
//                         const monthName = monthNames[date.getMonth()];
//                         const formattedDate = `${monthName} ${date.getDate()}, ${date.getFullYear()}`;

//                         return (
//                           <tr
//                             key={day.id}
//                             className={`border-b border-gray-200 ${
//                               idx % 2 === 0 ? "bg-gray-50" : "bg-white"
//                             } hover:bg-gray-100 transition-colors`}
//                           >
//                             <td className="px-4 py-2 font-medium">
//                               {formattedDate}
//                             </td>
//                             {expenseCategories.map((cat) => (
//                               <td key={cat} className="px-4 py-2">
//                                 £{day[cat].toFixed(2)}
//                               </td>
//                             ))}
//                             <td className="px-4 py-2 font-semibold">
//                               £{dayTotal.toFixed(2)}
//                             </td>
//                           </tr>
//                         );
//                       })}

//                       {/* Summary Row */}
//                       <tr className="bg-blue-50 font-semibold border-t-2 border-blue-300">
//                         <td className="px-4 py-2">Summary</td>
//                         {expenseCategories.map((cat) => {
//                           const catTotal = week.days.reduce(
//                             (sum, day) => sum + day[cat],
//                             0
//                           );
//                           return (
//                             <td key={cat} className="px-4 py-2">
//                               £{catTotal.toFixed(2)}
//                             </td>
//                           );
//                         })}
//                         <td className="px-4 py-2">£{weekTotal.toFixed(2)}</td>
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

// export default WeeklyExpenses;
















// src/pages/WeeklyExpenses.jsx
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { weeklyExpensesApi } from "../services/dashboard";

const WeeklyExpenses = () => {
  const [weeklyData, setWeeklyData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeeklyExpenses = async () => {
      setLoading(true);
      try {
        const res = await weeklyExpensesApi();
        if (res.data.success) {
          const merged = mergeExpenses(
            res.data.motor_expenses,
            res.data.additional_expenses
          );
          setWeeklyData(merged);
        } else {
          toast.error("Failed to fetch weekly expenses");
        }
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong while fetching expenses");
      } finally {
        setLoading(false);
      }
    };

    fetchWeeklyExpenses();
  }, []);

  // Merge motor_expenses and additional_expenses by week_number + date
  // const mergeExpenses = (motor = [], additional = []) => {
  //   return motor.map((motorWeek) => {
  //     const addWeek = additional.find(
  //       (a) => a.week_number === motorWeek.week_number
  //     );

  //     const days = motorWeek.days.map((day) => {
  //       const addDay = addWeek?.days.find((d) => d.date === day.date) || {};
  //       return { ...day, ...addDay };
  //     });

  //     const weekly_summary = {
  //       ...(motorWeek.weekly_summary || {}),
  //       ...(addWeek?.weekly_summary || {}),
  //     };

  //     return {
  //       week_number: motorWeek.week_number,
  //       start_date: motorWeek.start_date,
  //       end_date: motorWeek.end_date,
  //       days,
  //       weekly_summary,
  //     };
  //   });
  // };



  // Merge motor_expenses and additional_expenses by week_number + date
const mergeExpenses = (motor = [], additional = []) => {
  return motor.map((motorWeek) => {
    const addWeek = additional.find(
      (a) => a.week_number === motorWeek.week_number
    );

    // Merge days (sum values category by category)
    const days = motorWeek.days.map((day) => {
      const addDay = addWeek?.days.find((d) => d.date === day.date) || {};
      const mergedDay = { date: day.date };
      const categories = new Set([
        ...Object.keys(day),
        ...Object.keys(addDay),
      ]);

      let dayTotal = 0;
      categories.forEach((cat) => {
        if (cat === "date") return;
        const val1 = day[cat] || 0;
        const val2 = addDay[cat] || 0;
        mergedDay[cat] = val1 + val2;
        if (cat !== "total") dayTotal += mergedDay[cat];
      });
      mergedDay.total = dayTotal;
      return mergedDay;
    });

    // Merge weekly summary (sum values category by category)
    const weekly_summary = {};
    const categories = new Set([
      ...Object.keys(motorWeek.weekly_summary || {}),
      ...Object.keys(addWeek?.weekly_summary || {}),
    ]);

    let weeklyTotal = 0;
    categories.forEach((cat) => {
      if (cat === "total") return;
      const val1 = motorWeek.weekly_summary?.[cat] || 0;
      const val2 = addWeek?.weekly_summary?.[cat] || 0;
      weekly_summary[cat] = val1 + val2;
      weeklyTotal += weekly_summary[cat];
    });
    weekly_summary.total = weeklyTotal;

    return {
      week_number: motorWeek.week_number,
      start_date: motorWeek.start_date,
      end_date: motorWeek.end_date,
      days,
      weekly_summary,
    };
  });
};


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading weekly expenses...</p>
      </div>
    );
  }

  if (!weeklyData.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">No weekly expense data available.</p>
      </div>
    );
  }

  // Extract dynamic categories from merged data
  const categories = Object.keys(weeklyData[0].days[0])
    .filter((key) => key !== "date" && key !== "total");

  return (
    <div className="min-h-screen p-6 bg-white rounded-xl">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Weekly Expense Listings
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
                      <th className="px-4 py-2 rounded-tl-xl border-b border-blue-700 text-start whitespace-nowrap">
                        Week {week.week_number} ({week.start_date} →{" "}
                        {week.end_date})
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
                            £{day[cat]?.toLocaleString?.() ?? 0}
                          </td>
                        ))}
                        <td className="px-4 py-2 font-semibold">
                          £{day.total?.toLocaleString?.() ?? 0}
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
                        £{week.weekly_summary?.total?.toLocaleString?.() ?? 0}
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

export default WeeklyExpenses;
