// src/sidebar/AccountToggle.jsx
import React, { useState } from "react";
import {
  FiChevronDown,
  FiChevronUp,
  FiUser,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { logoutApi } from "../../services/authService";
import toast from "react-hot-toast";

const AccountToggle = ({ collapsed }) => {
  const { auth, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();
  const toggle = () => setIsOpen((prev) => !prev);

  // handle logout
  const handleLogout = async () => {
    if (isLoggingOut) return; // Prevent multiple clicks
    setIsLoggingOut(true);
    try {
      await logoutApi();
      logout(); // Clear auth context and localStorage
      toast.success("Logged out successfully");
      navigate("/login"); // Redirect to login page
    } catch (error) {
      console.error("Logout failed:", error);
      // Optionally show an error message to the user
      toast.error("Failed to logout, please try again.");
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="relative w-full">
      <button
        onClick={toggle}
        aria-expanded={isOpen}
        className={`flex items-center gap-3 p-2 rounded-lg bg-blue-50 cursor-pointer hover:bg-blue-100 transition-colors ${
          collapsed ? "justify-center" : "justify-start"
        }`}
      >
        <img
          src="https://api.dicebear.com/9.x/notionists/svg"
          alt="avatar"
          className={`rounded-full shadow-sm ring-2 ring-violet-400 transition-all duration-200 ${
            collapsed ? "w-6 h-6" : "w-9 h-9"
          }`}
        />
        {!collapsed && (
          <div className="flex flex-col text-left">
            <span className="text-sm font-semibold text-gray-900">
              {auth?.user?.first_name || "User"}
            </span>
            <span className="text-xs text-gray-500">
              {auth?.user?.email || "user@example.com"}
            </span>
          </div>
        )}
        {!collapsed && (isOpen ? <FiChevronUp /> : <FiChevronDown />)}
      </button>

      {/* Dropdown Menu */}
      {isOpen && !collapsed && (
        <div className="absolute left-0 mt-2 w-full bg-white rounded-lg shadow-md border border-gray-200 z-50 transition-all duration-200">
          <button className="flex items-center gap-2 w-full px-4 py-2 hover:bg-blue-50 transition-colors cursor-pointer">
            <FiUser className="text-gray-600" />
            Profile
          </button>
          <button className="flex items-center gap-2 w-full px-4 py-2 hover:bg-blue-50 transition-colors cursor-pointer">
            <FiSettings className="text-gray-600" />
            Settings
          </button>
          <button
  onClick={handleLogout}
  disabled={isLoggingOut}
  className={`flex items-center gap-2 w-full px-4 py-2 transition-colors rounded-md
    ${isLoggingOut
      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
      : "hover:bg-red-50 text-red-600 cursor-pointer"
    }`}
>
  <FiLogOut
    className={`${isLoggingOut ? "text-gray-400" : "text-red-600"}`}
  />
  {isLoggingOut ? "Logging out..." : "Logout"}
</button>

        </div>
      )}
    </div>
  );
};

export default AccountToggle;
