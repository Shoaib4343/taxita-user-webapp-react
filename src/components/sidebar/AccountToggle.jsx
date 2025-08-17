import React, { useState } from "react";
import {
  FiChevronDown,
  FiChevronUp,
  FiUser,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import { logoutApi } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AccountToggle = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const handleToggle = () => setIsOpen((prev) => !prev);
  const { logout, auth } = useAuth();
  const navigate = useNavigate();

  // handle logout
  const handleLogout = async () => {
    // safety check in case it somehow triggers again
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    try {
      await logoutApi(); // API call to backend logout
      logout(); // Remove token/user from localStorage + context
      toast.success("Logged out successfully");
      navigate("/login"); // redirect
    } catch (error) {
      console.error(error);
      toast.error("Failed to logout");
      setIsLoggingOut(false); // allow retry if failed
    }
  };

  return (
    <div className="relative">
      {/* Toggle Button */}
      <button
        onClick={handleToggle}
        className="flex items-center w-full gap-3 p-2 rounded-lg hover:bg-blue-100  bg-blue-50 transition-colors relative"
      >
        <img
          src="https://api.dicebear.com/9.x/notionists/svg"
          alt="avatar"
          className="w-9 h-9 rounded-full ring-2 ring-violet-400 shadow-sm"
        />
        <div className="flex flex-col text-left">
          <span className="text-sm font-semibold text-gray-900">
            {auth?.user?.first_name || "User"}
          </span>
          <span className="text-xs text-gray-500">
            {auth?.user?.email || "user@example.com"}
          </span>
        </div>
        {isOpen ? (
          <FiChevronUp className="absolute right-3 text-gray-500" />
        ) : (
          <FiChevronDown className="absolute right-3 text-gray-500" />
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 mt-2 w-full bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden z-50 animate-fadeIn">
          <MenuItem icon={<FiUser />} label="Profile" />
          <MenuItem icon={<FiSettings />} label="Settings" />
          <MenuItem
            icon={<FiLogOut />}
            label={isLoggingOut ? "Logging out..." : "Logout"}
            danger
            onClick={handleLogout}
            disabled={isLoggingOut}
          />
        </div>
      )}
    </div>
  );
};

const MenuItem = ({ icon, label, danger, onClick, disabled }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-3 w-full px-4 py-2 text-sm transition-colors 
      ${
        danger
          ? "text-red-600 hover:bg-red-50"
          : "text-gray-800 hover:bg-blue-50"
      }
       ${disabled ? "opacity-50 cursor-not-allowed hover:bg-transparent" : ""}
      `}
    disabled={disabled}
  >
    {icon}
    {label}
  </button>
);

export default AccountToggle;
