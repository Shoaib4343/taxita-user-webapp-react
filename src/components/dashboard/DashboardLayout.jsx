// // src/layout/DashboardLayout.jsx
// import { useState } from "react";
// import { Link, Outlet } from "react-router-dom";
// import Sidebar from "../sidebar/Sidebar";
// import { FiMenu, FiX, FiBell } from "react-icons/fi";
// import AccountToggle from "../sidebar/AccountToggle";
// import { Search } from "../sidebar/Search";
// import PreviousTradingYear from "../../pages/PreviousTradingYear";

// const DashboardLayout = () => {
//   const [isOpen, setIsOpen] = useState(true);

//   return (
//     <div className="h-screen flex flex-col">
//       {/* Navbar - full width */}
//       <header className="w-full bg-white shadow flex items-center justify-between pl-4 pr-7 py-2 sticky top-0 z-50">
//         {/* Left section: toggle + logo */}
//         <div className="flex items-center gap-3">
//           <button
//             onClick={() => setIsOpen(!isOpen)}
//             className="p-2 rounded-md border border-gray-200 bg-white hover:bg-gray-50 transition"
//           >
//             {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
//           </button>

//           {/* logo */}
//           <Link to="/" className="flex items-center gap-1">
//             <img src="/logo.png" alt="Logo" className="h-12 w-auto object-contain" />
//             <div>
//               <h1 className="text-lg font-semibold">Taxita</h1>
//               <p className="text-sm text-gray-500">Accountant on your driving seat</p>
//             </div>
//          </Link>
//         </div>

//         {/* Middle section: Search */}
//         <div className="flex-1 flex justify-center mx-4">
//           <div className="w-full max-w-xl">
//             <Search noMargin />
//           </div>
//         </div>

//         {/* Right section: Notification + Profile */}
//         <div className="flex items-center gap-4">

          
//           <button className="p-2 rounded-lg hover:bg-gray-100 transition relative">
//             <FiBell size={20} />
//             <span className="absolute top-0 right-0 block h-2 w-2 bg-red-500 rounded-full" />
//           </button>


// {/* Trading year drop down */}
//           <PreviousTradingYear />

//           {/* Accountant Toggle */}
//           <AccountToggle />
//         </div>
//       </header>

//       {/* Main content with sidebar + page */}
//       <div className="flex flex-1 overflow-hidden bg-gray-100">
//         {/* Sidebar - independent collapsible */}
//         <Sidebar isOpen={isOpen} />

//         {/* Page content */}
//         <main className="flex-1 bg-gray-100 overflow-y-auto transition-all duration-300">
//           <div className="p-4">
//             <Outlet />
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;


































// src/layout/DashboardLayout.jsx
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import Navbar from "./Navbar";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="h-screen flex flex-col">
      {/* Navbar - full width */}
      <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />

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