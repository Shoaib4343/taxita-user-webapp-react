// import { useState } from "react";
// import { Outlet } from "react-router-dom";
// import Sidebar from "../sidebar/Sidebar";
// import { FiMenu, FiX } from "react-icons/fi";

// const DashboardLayout = () => {
//   const [isOpen, setIsOpen] = useState(true);

//   return (
//     <div className="h-screen flex overflow-hidden">
//       {/* Sidebar with smooth width transition */}
//       <div
//         className={`bg-white shadow-lg border-r border-gray-200 transition-all duration-300 ease-in-out overflow-hidden`}
//         style={{
//           width: isOpen ? "16rem" : "0rem", // smooth width animation
//         }}
//       >
//         <Sidebar isOpen={isOpen} />
//       </div>

//       {/* Main Content */}
//       <main className="flex-1 bg-gray-100 overflow-y-auto transition-all duration-300 ease-in-out">
//         {/* Header with Toggle Button */}
//         <div className="p-4 bg-white shadow flex items-center gap-2 sticky top-0 z-50">
//           <button
//             onClick={() => setIsOpen(!isOpen)}
//             className="p-2 rounded-md border border-gray-200 bg-white hover:bg-gray-50 transition"
//           >
//             {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
//           </button>
//           <h1 className="font-semibold text-lg">Taxita</h1>
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











































// // src/layout/DashboardLayout.jsx
// import { useState } from "react";
// import { Outlet } from "react-router-dom";
// import Sidebar from "../sidebar/Sidebar";
// import { FiMenu, FiX, FiBell, FiSearch } from "react-icons/fi";
// import AccountToggle from "../sidebar/AccountToggle";

// const DashboardLayout = () => {
//   const [isOpen, setIsOpen] = useState(true);

//   return (
//     <div className="h-screen flex overflow-hidden">
//       {/* Sidebar */}
//       <Sidebar isOpen={isOpen} />

//       {/* Main content */}
//       <main className="flex-1 bg-gray-100 overflow-y-auto transition-all duration-300">
//         {/* Navbar / Header */}
//         <div className="p-4 bg-white shadow flex items-center justify-between sticky top-0 z-50">
//           {/* Left section: Logo + toggle */}
//           <div className="flex items-center gap-3">
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="p-2 rounded-md border border-gray-200 bg-white hover:bg-gray-50 transition"
//             >
//               {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
//             </button>
//             <img
//               src="/logo.jpg"
//               alt="Logo"
//               className="h-10 w-auto object-contain"
//             />
//           </div>

//           {/* Middle section: Search + notification */}
//           <div className="flex items-center gap-4 flex-1 max-w-xl mx-4">
//             <div className="relative flex-1">
//               <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//               />
//             </div>
//             <button className="p-2 rounded-lg hover:bg-gray-100 transition relative">
//               <FiBell size={20} />
//               {/* Optional: notification badge */}
//               <span className="absolute top-0 right-0 block h-2 w-2 bg-red-500 rounded-full" />
//             </button>
//           </div>

//           {/* Right section: Profile */}
//           <div className="flex items-center">
//             <AccountToggle />
//           </div>
//         </div>

//         {/* Page content */}
//         <div className="p-4">
//           <Outlet />
//         </div>
//       </main>
//     </div>
//   );
// };

// export default DashboardLayout;





























// // src/layout/DashboardLayout.jsx
// import { useState } from "react";
// import { Outlet } from "react-router-dom";
// import Sidebar from "../sidebar/Sidebar";
// import { FiMenu, FiX, FiBell } from "react-icons/fi";
// import AccountToggle from "../sidebar/AccountToggle";
// import { Search } from "../sidebar/Search";

// const DashboardLayout = () => {
//   const [isOpen, setIsOpen] = useState(true);

//   return (
//     <div className="h-screen flex overflow-hidden">
//       {/* Sidebar */}
//       <Sidebar isOpen={isOpen} />

//       {/* Main content */}
//       <main className="flex-1 bg-gray-100 overflow-y-auto transition-all duration-300">
//         {/* Navbar / Header */}
//         <div className="p-4 bg-white shadow flex items-center justify-between sticky top-0 z-50">
//           {/* Left section: Sidebar toggle + Logo */}
//           <div className="flex items-center gap-3">
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="p-2 rounded-md border border-gray-200 bg-white hover:bg-gray-50 transition"
//             >
//               {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
//             </button>
//             <img
//               src="/logo.jpg"
//               alt="Logo"
//               className="h-10 w-auto object-contain"
//             />
//           </div>

//           {/* Middle section: Search */}
//           <div className="flex-1 mx-6 max-w-xl">
//             <Search />
//           </div>

//           {/* Right section: Notification + Profile */}
//           <div className="flex items-center gap-4">
//             <button className="p-2 rounded-lg hover:bg-gray-100 transition relative">
//               <FiBell size={20} />
//               {/* Optional notification badge */}
//               <span className="absolute top-0 right-0 block h-2 w-2 bg-red-500 rounded-full" />
//             </button>
//             <AccountToggle />
//           </div>
//         </div>

//         {/* Page content */}
//         <div className="p-4">
//           <Outlet />
//         </div>
//       </main>
//     </div>
//   );
// };

// export default DashboardLayout;




























// src/layout/DashboardLayout.jsx
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import { FiMenu, FiX, FiBell } from "react-icons/fi";
import AccountToggle from "../sidebar/AccountToggle";
import { Search } from "../sidebar/Search";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="h-screen flex flex-col">
      {/* Navbar - full width */}
      <header className="w-full bg-white shadow flex items-center justify-between pl-4 pr-7 py-2 sticky top-0 z-50">
        {/* Left section: toggle + logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-md border border-gray-200 bg-white hover:bg-gray-50 transition"
          >
            {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
          <div className="flex items-center gap-1">
            <img src="/logo.png" alt="Logo" className="h-12 w-auto object-contain" />
            <div>
              <h1 className="text-lg font-semibold">Taxita</h1>
              <p className="text-sm text-gray-500">Accountant on your driving seat</p>
            </div>
         </div>
        </div>

        {/* Middle section: Search */}
        <div className="flex-1 flex justify-center mx-4">
          <div className="w-full max-w-xl">
            <Search noMargin />
          </div>
        </div>

        {/* Right section: Notification + Profile */}
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-lg hover:bg-gray-100 transition relative">
            <FiBell size={20} />
            <span className="absolute top-0 right-0 block h-2 w-2 bg-red-500 rounded-full" />
          </button>
          <AccountToggle />
        </div>
      </header>

      {/* Main content with sidebar + page */}
      <div className="flex flex-1 overflow-hidden bg-gray-100">
        {/* Sidebar - independent collapsible */}
        <Sidebar isOpen={isOpen} />

        {/* Page content */}
        <main className="flex-1 bg-gray-100 overflow-y-auto transition-all duration-300">
          <div className="p-4">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
