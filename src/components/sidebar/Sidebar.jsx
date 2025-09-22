// src/sidebar/Sidebar.jsx
import React from "react";
import AccountToggle from "./AccountToggle";
import Navigation from "./Navigation";
import { FiSettings, FiHelpCircle } from "react-icons/fi";

const Sidebar = ({ isOpen, setIsOpen }) => {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      <aside
        className={`bg-white text-gray-800 flex flex-col shadow-lg border-r border-gray-200 transition-all duration-300 ease-in-out z-[10] ${
          isOpen ? "w-64" : "w-24"
        } lg:relative ${
          isOpen ? "fixed lg:relative" : "hidden lg:flex"
        }`}
      >
      {/* Top Section */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Account Toggle */}
        <div className="p-4 border-b border-gray-100 mr-3">
          <AccountToggle collapsed={!isOpen} variant="sidebar" />
        </div>

        

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <Navigation collapsed={!isOpen} />
        </div>
      </div>

      {/* Footer Section */}
      <div className="p-4 border-t border-gray-100 bg-gray-50/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
              title="Settings"
            >
              <FiSettings className="w-4 h-4 text-gray-500 hover:text-gray-700" />
            </button>
            
            {isOpen && (
              <button
                className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
                title="Help & Support"
              >
                <FiHelpCircle className="w-4 h-4 text-gray-500 hover:text-gray-700" />
              </button>
            )}
          </div>

          {isOpen && (
            <div className="flex flex-col text-right">
              <span className="text-xs text-gray-500 font-medium">© 2025 Taxita</span>
              <span className="text-xs text-gray-400">v1.0.0</span>
            </div>
          )}
        </div>
      </div>
    </aside>
    </>
  );
};

export default Sidebar;