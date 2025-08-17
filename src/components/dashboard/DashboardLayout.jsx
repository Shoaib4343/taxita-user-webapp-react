// import { Outlet } from "react-router-dom";
// import Sidebar from "../sidebar/Sidebar";
// // import { TopBar } from "./TopBar";

// const DashboardLayout = () => {
//   return (
//     <div className="flex h-screen">
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Main Content */}
//       <main className="flex-1 bg-gray-100 p-4 overflow-y-auto">
//         {/* <div className="bg-white rounded-lg pb-4 shadow my-1"> */}
//           {/* <TopBar /> */}

//           {/* <div className="px-6 py-6 bg-white  ">
//             <h2 className="text-2xl font-bold text-gray-800 mb-2">
//               👋 Welcome to Taxita Dashboard
//             </h2>
//             <p className="text-gray-600 text-sm leading-relaxed">
//               Manage your profile, access various support modules, and control
//               your data dynamically from the sidebar. Everything you need is
//               just a click away.
//             </p>
//           </div> */}
//         {/* </div> */}
//         <Outlet />
//       </main>
//     </div>
//   );
// };

// export default DashboardLayout;

// import { useState } from "react";
// import { Outlet } from "react-router-dom";
// import Sidebar from "../sidebar/Sidebar";
// import { FiMenu, FiX } from "react-icons/fi";

// const DashboardLayout = () => {
//   const [isOpen, setIsOpen] = useState(true);

//   return (
//     <div className="flex h-screen relative">
//       {/* Toggle Button */}
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="p-3 fixed top-4 left-4 z-50 bg-white rounded-md shadow-md border border-gray-200"
//       >
//         {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
//       </button>

//       {/* Sidebar */}
//       <Sidebar isOpen={isOpen} />

//       {/* Main Content */}
//       <main
//         className={`bg-gray-100 p-4 overflow-y-auto transition-all duration-300
//         ${isOpen ? "flex-1" : "w-full"}`}
//       >
//         <Outlet />
//       </main>
//     </div>
//   );
// };

// export default DashboardLayout;

// import { useState } from "react";
// import { Outlet } from "react-router-dom";
// import Sidebar from "../sidebar/Sidebar";
// import { FiMenu, FiX } from "react-icons/fi";

// const DashboardLayout = () => {
//   const [isOpen, setIsOpen] = useState(true);

//   return (
//     <div
//       className={`h-screen grid transition-all duration-300`}
//       style={{
//         gridTemplateColumns: isOpen ? "16rem 1fr" : "0rem 1fr", // Sidebar width
//       }}
//     >
//       {/* Sidebar */}
//       <Sidebar isOpen={isOpen} />

//       {/* Main Content */}
//       <main className="bg-gray-100 overflow-y-auto">
//         {/* Header with Toggle Button */}
//         <div className="p-4 bg-white shadow flex items-center gap-2 ">
//           <button
//             onClick={() => setIsOpen(!isOpen)}
//             className="p-2 rounded-md border border-gray-200 bg-white hover:bg-gray-50 transition"
//           >
//             {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
//           </button>
//           <h1 className="font-semibold text-lg">Dashboard</h1>
//         </div>

//         {/* Page Content */}
//         <div className="p-4">
//           <Outlet />
//         </div>
//       </main>
//     </div>
//   );
// };

// export default DashboardLayout;

import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import { FiMenu, FiX } from "react-icons/fi";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Sidebar with smooth width transition */}
      <div
        className={`bg-white shadow-lg border-r border-gray-200 transition-all duration-300 ease-in-out overflow-hidden`}
        style={{
          width: isOpen ? "16rem" : "0rem", // smooth width animation
        }}
      >
        <Sidebar isOpen={isOpen} />
      </div>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 overflow-y-auto transition-all duration-300 ease-in-out">
        {/* Header with Toggle Button */}
        <div className="p-4 bg-white shadow flex items-center gap-2 sticky top-0 z-100">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-md border border-gray-200 bg-white hover:bg-gray-50 transition"
          >
            {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
          <h1 className="font-semibold text-lg">Taxita</h1>
        </div>

        {/* Page Content */}
        <div className="p-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
