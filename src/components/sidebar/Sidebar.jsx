// import AccountToggle from "./AccountToggle";
// import { Search } from "./Search";
// import Navigation from "./Navigation";
// import { FiSettings } from "react-icons/fi";

// const Sidebar = ({ isOpen }) => {
//   return (
//     <aside
//       className={`h-screen bg-white text-gray-800 flex flex-col justify-between shadow-lg border-r border-gray-200 transition-all duration-300 overflow-hidden`}
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

// src/sidebar/Sidebar.jsx
import React from "react";
import AccountToggle from "./AccountToggle";
import { Search } from "./Search";
import Navigation from "./Navigation";
import { FiSettings } from "react-icons/fi";

const Sidebar = ({ isOpen }) => {
  return (
    <aside
      className={`   bg-white  text-gray-800 flex flex-col justify-between shadow-lg border-r border-gray-200  `}
      style={{ width: isOpen ? "16rem" : "4.5rem" }}
    >
      {/* Top Section */}
      <div className="p-4 space-y-6 border-b border-gray-200 flex-1 overflow-auto">
        {/* AccountToggle */}
        <div
          className="flex justify-center "
          style={{ padding: isOpen ? "0" : "0.5rem 0" }}
        >
          <AccountToggle collapsed={!isOpen} />
        </div>

        {/* Show Search only when sidebar is open */}
        {isOpen && <Search />}

        {/* Navigation */}
        <Navigation collapsed={!isOpen} />
      </div>

      {/* Footer Section */}
      <div className="p-4 border-t border-gray-200 flex flex-col gap-2 items-center">
        <FiSettings
          className="w-5 h-5 text-gray-400 hover:text-gray-800 cursor-pointer transition"
          title="Settings"
        />
        {isOpen && (
          <>
            <span className="text-sm text-gray-500">© 2025 Taxita</span>
            <p className="text-xs text-gray-400">v1.0.0</p>
          </>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
