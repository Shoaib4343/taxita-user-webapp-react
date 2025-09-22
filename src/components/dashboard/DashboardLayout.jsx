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