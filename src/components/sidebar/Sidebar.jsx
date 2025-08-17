// import React from "react";
// import AccountToggle from "./AccountToggle";
// import { Search } from "./Search";
// import Navigation from "./Navigation";
// import { FiSettings } from "react-icons/fi";

// const Sidebar = () => {
//   return (
//     <aside className="w-64 h-screen bg-white text-gray-800 flex flex-col justify-between shadow-lg border-r border-gray-200">
//       {/* Top Section */}
//       <div className="p-4 space-y-6 border-b border-gray-200">
//         <AccountToggle />
//         <Search />
//         <Navigation />
//       </div>

//       {/* Footer Section */}
//       <div className="p-4 border-t border-gray-200 flex flex-col gap-2">
//         <div className="flex items-center justify-between text-sm text-gray-500">
//           <span>© 2025 Taxita</span>
//           <FiSettings className="w-4 h-4 text-gray-400 hover:text-gray-800 cursor-pointer transition" />
//         </div>
//         <p className="text-xs text-gray-400">v1.0.0</p>
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;

























// // src/components/Sidebar.jsx
// import React, { useState } from "react";
// import AccountToggle from "./AccountToggle";
// import { Search } from "./Search";
// import Navigation from "./Navigation";
// import { FiSettings, FiMenu, FiX } from "react-icons/fi";

// const Sidebar = () => {
//   const [isOpen, setIsOpen] = useState(true);

//   return (
//     <>
//       {/* Toggle Button */}
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="p-3 fixed top-4 left-4 z-50 bg-white rounded-md shadow-md border border-gray-200 "
//       >
//         {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
//       </button>

//       {/* Sidebar */}
//       <aside
//         className={`fixed lg:static top-0 left-0 h-screen bg-white text-gray-800 flex flex-col justify-between shadow-lg border-r border-gray-200 transform transition-transform duration-300 ease-in-out
//         ${isOpen ? "translate-x-0" : "-translate-x-full"} w-64`}
//       >
//         {/* Top Section */}
//         <div className="p-4 space-y-6 border-b border-gray-200">
//           <AccountToggle />
//           <Search />
//           <Navigation />
//         </div>

//         {/* Footer Section */}
//         <div className="p-4 border-t border-gray-200 flex flex-col gap-2">
//           <div className="flex items-center justify-between text-sm text-gray-500">
//             <span>© 2025 Taxita</span>
//             <FiSettings className="w-4 h-4 text-gray-400 hover:text-gray-800 cursor-pointer transition" />
//           </div>
//           <p className="text-xs text-gray-400">v1.0.0</p>
//         </div>
//       </aside>
//     </>
//   );
// };

// export default Sidebar;













// // src/components/Sidebar.jsx
// import React, { useState } from "react";
// import AccountToggle from "./AccountToggle";
// import { Search } from "./Search";
// import Navigation from "./Navigation";
// import { FiSettings, FiMenu, FiX } from "react-icons/fi";

// const Sidebar = ({ isOpen }) => {
//   return (
//     <aside
//       className={`h-screen bg-white text-gray-800 flex flex-col justify-between shadow-lg border-r border-gray-200 transition-all duration-300
//       ${isOpen ? "w-64" : "w-0 overflow-hidden"}`}
//     >
//       {/* Top Section */}
//       <div className="p-4 space-y-6 border-b border-gray-200">
//         <AccountToggle />
//         <Search />
//         <Navigation />
//       </div>

//       {/* Footer Section */}
//       <div className="p-4 border-t border-gray-200 flex flex-col gap-2">
//         <div className="flex items-center justify-between text-sm text-gray-500">
//           <span>© 2025 Taxita</span>
//           <FiSettings className="w-4 h-4 text-gray-400 hover:text-gray-800 cursor-pointer transition" />
//         </div>
//         <p className="text-xs text-gray-400">v1.0.0</p>
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;





















import AccountToggle from "./AccountToggle";
import { Search } from "./Search";
import Navigation from "./Navigation";
import { FiSettings } from "react-icons/fi";

const Sidebar = ({ isOpen }) => {
  return (
    <aside
      className={`h-screen bg-white text-gray-800 flex flex-col justify-between shadow-lg border-r border-gray-200 transition-all duration-300 overflow-hidden`}
    >
      {/* Top Section */}
      <div className="p-4 space-y-6 border-b border-gray-200">
        <AccountToggle />
        <Search />
        <Navigation />
      </div>

      {/* Footer Section */}
      <div className="p-4 border-t border-gray-200 flex flex-col gap-2">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>© 2025 Taxita</span>
          <FiSettings className="w-4 h-4 text-gray-400 hover:text-gray-800 cursor-pointer transition" />
        </div>
        <p className="text-xs text-gray-400">v1.0.0</p>
      </div>
    </aside>
  );
};

export default Sidebar;
