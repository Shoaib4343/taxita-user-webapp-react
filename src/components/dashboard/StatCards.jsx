// import React from "react";
// import { FiTrendingUp, FiTrendingDown } from "react-icons/fi";
// import dashboardData from "./dashboardData";
// import { useNavigate } from "react-router-dom";


// const bgColorOptions = [
//   "bg-blue-50",
//   "bg-indigo-50",
//   "bg-purple-50",
//   "bg-yellow-50",
//   "bg-pink-50",
//   "bg-sky-50",
//   "bg-teal-50",
//   "bg-orange-50",
//   "bg-emerald-50",
//   "bg-gray-50",
// ];

// const StatCards = () => {
//   const navigate = useNavigate();
//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-6">
//       {dashboardData.map((item, index) => {
//         const Icon = item.icon;
//         const { trend, pillText, path } = item;
//         const cardBg = bgColorOptions[index % bgColorOptions.length];

//         const badgeColor =
//           trend === "up"
//             ? "bg-green-100 text-green-700"
//             : trend === "down"
//             ? "bg-red-100 text-red-700"
//             : "bg-gray-200 text-gray-600";

//         return (
//           <div
//             key={index}
//             onClick={() => path && navigate(path)}
//             className={`relative flex flex-col justify-between p-6 rounded-2xl shadow-sm border border-gray-200 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 ${cardBg}`}
//             style={{ minHeight: "180px" }}
//           >
//             {/* Badge */}
//             {trend && pillText && (
//               <div
//                 className={`absolute top-4 left-4 inline-flex items-center text-xs font-medium px-2 py-1 rounded-full ${badgeColor}`}
//               >
//                 {trend === "up" ? (
//                   <FiTrendingUp className="mr-1" size={14} />
//                 ) : (
//                   <FiTrendingDown className="mr-1" size={14} />
//                 )}
//                 {pillText}
//               </div>
//             )}

//             {/* Icon */}
//             <div className="absolute top-4 right-4 p-3 rounded-full bg-white shadow-inner">
//               <Icon size={26} className="text-blue-600" />
//             </div>

//             {/* Main Content */}
//             <div className="pt-10">
//               <h4 className="text-sm font-medium text-gray-600 uppercase tracking-wide">
//                 {item.title}
//               </h4>
//               <p className="text-3xl font-bold text-gray-900 mt-1">
//                 {item.value}
//               </p>
//               <p className="text-sm text-gray-500">{item.description}</p>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default StatCards;


















// // src/pages/StatCards.jsx
// import React from "react";
// import { FiTrendingUp, FiTrendingDown } from "react-icons/fi";
// import dashboardData from "./dashboardData";
// import { useNavigate } from "react-router-dom";

// // Lighter card background colors
// const bgColorOptions = [
//   "bg-blue-50",
//   "bg-indigo-50",
//   "bg-purple-50",
//   "bg-yellow-50",
//   "bg-pink-50",
//   "bg-sky-50",
//   "bg-teal-50",
//   "bg-orange-50",
//   "bg-emerald-50",
//   "bg-gray-50",
// ];

// // Darker icon background colors corresponding to the cards
// const iconBgColorOptions = [
//   "bg-blue-600",
//   "bg-indigo-600",
//   "bg-purple-600",
//   "bg-yellow-600",
//   "bg-pink-600",
//   "bg-sky-600",
//   "bg-teal-600",
//   "bg-orange-600",
//   "bg-emerald-600",
//   "bg-gray-600",
// ];

// const StatCards = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-6">
//       {dashboardData.map((item, index) => {
//         const Icon = item.icon;
//         const { trend, pillText, path } = item;
//         const cardBg = bgColorOptions[index % bgColorOptions.length];
//         const iconBg = iconBgColorOptions[index % iconBgColorOptions.length];

//         const badgeColor =
//           trend === "up"
//             ? "bg-green-100 text-green-700"
//             : trend === "down"
//             ? "bg-red-100 text-red-700"
//             : "bg-gray-200 text-gray-600";

//         return (
//           <div
//             key={index}
//             onClick={() => path && navigate(path)}
//             className={`relative flex flex-col justify-between p-6 rounded-2xl shadow-sm border border-gray-200 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 ${cardBg}`}
//             style={{ minHeight: "180px" }}
//           >
//             {/* Badge */}
//             {trend && pillText && (
//               <div
//                 className={`absolute top-4 left-4 inline-flex items-center text-xs font-medium px-2 py-1 rounded-full ${badgeColor}`}
//               >
//                 {trend === "up" ? (
//                   <FiTrendingUp className="mr-1" size={14} />
//                 ) : (
//                   <FiTrendingDown className="mr-1" size={14} />
//                 )}
//                 {pillText}
//               </div>
//             )}

//             {/* Icon */}
//             <div className={`absolute top-4 right-4 p-3 rounded-full ${iconBg} flex items-center justify-center shadow-inner`}>
//               <Icon size={26} className="text-white" />
//             </div>

//             {/* Main Content */}
//             <div className="pt-10">
//               <h4 className="text-sm font-medium text-gray-600 uppercase tracking-wide">
//                 {item.title}
//               </h4>
//               <p className="text-3xl font-bold text-gray-900 mt-1">
//                 {item.value}
//               </p>
//               <p className="text-sm text-gray-500">{item.description}</p>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default StatCards;













// src/pages/StatCards.jsx
import React from "react";
import { FiTrendingUp, FiTrendingDown } from "react-icons/fi";
import dashboardData from "./dashboardData";
import { useNavigate } from "react-router-dom";

// Card colors
const bgColorOptions = [
  "bg-blue-50",
  "bg-indigo-50",
  "bg-purple-50",
  "bg-yellow-50",
  "bg-pink-50",
  "bg-sky-50",
  "bg-teal-50",
  "bg-orange-50",
  "bg-emerald-50",
  "bg-gray-50",
];

const iconBgColorOptions = [
  "bg-blue-600",
  "bg-indigo-600",
  "bg-purple-600",
  "bg-yellow-600",
  "bg-pink-600",
  "bg-sky-600",
  "bg-teal-600",
  "bg-orange-600",
  "bg-emerald-600",
  "bg-gray-600",
];

const StatCards = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-6 py-4">
      {dashboardData.map((item, index) => {
        const Icon = item.icon;
        const { trend, pillText, path } = item;
        const cardBg = bgColorOptions[index % bgColorOptions.length];
        const iconBg = iconBgColorOptions[index % iconBgColorOptions.length];

        const badgeColor =
          trend === "up"
            ? "bg-green-100 text-green-700"
            : trend === "down"
            ? "bg-red-100 text-red-700"
            : "bg-gray-200 text-gray-600";

        return (
          <div
            key={index}
            onClick={() => path && navigate(path)}
            className={`relative flex flex-col justify-between p-6 rounded-2xl shadow-md border border-gray-200 transition-transform duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer ${cardBg}`}
            style={{ minHeight: "180px" }}
          >
            {/* Badge */}
            {trend && pillText && (
              <div
                className={`absolute top-4 left-4 inline-flex items-center text-xs font-semibold px-2.5 py-1.5 rounded-full ${badgeColor} drop-shadow`}
              >
                {trend === "up" ? (
                  <FiTrendingUp className="mr-1" size={14} />
                ) : (
                  <FiTrendingDown className="mr-1" size={14} />
                )}
                {pillText}
              </div>
            )}

            {/* Icon */}
            <div
              className={`absolute top-4 right-4 p-3 rounded-full ${iconBg} flex items-center justify-center shadow-lg`}
            >
              <Icon size={26} className="text-white" />
            </div>

            {/* Content */}
            <div className="pt-10 flex flex-col gap-1">
              <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                {item.title}
              </h4>
              <p className="text-3xl font-bold text-gray-900 mt-1">{item.value}</p>
              <p className="text-sm text-gray-500">{item.description}</p>
            </div>

            {/* Hover overlay effect */}
            <div className="absolute inset-0 rounded-2xl bg-white/5 opacity-0 hover:opacity-10 transition-opacity duration-300"></div>
          </div>
        );
      })}
    </div>
  );
};

export default StatCards;
