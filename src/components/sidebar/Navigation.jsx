// src/sidebar/Navigation.jsx
import { FiHome, FiSettings, FiUser, FiLogOut } from "react-icons/fi";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { logoutApi } from "../../services/authService";
import { useState } from "react";
import { FaArrowDown, FaCalendarAlt, FaCar, FaChartPie, FaDollarSign, FaFileAlt, FaFolderOpen, FaIdCard, FaPercentage, FaRegCalendarCheck, FaShoppingCart, FaUpload } from "react-icons/fa";
import { PoundSterlingIcon } from "lucide-react";

const Navigation = ({ collapsed }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const navItems = [
    { to: "/dashboard", label: "Dashboard", icon: <FiHome /> },
    // { to: "/dashboard/settings", label: "Settings", icon: <FiSettings /> },
    { to: "/dashboard/personal-details", label: "Profile", icon: <FiUser /> },
    { to: "/dashboard/income", label: "Income", icon: <PoundSterlingIcon /> },
    { to: "/dashboard/weekly-income", label: "Weekly Income", icon: <FaCalendarAlt /> },
    { to: "/dashboard/expenses", label: "Expenses", icon: <FaArrowDown /> },
    { to: "/dashboard/weekly-expenses", label: "Weekly Expenses", icon: <FaCalendarAlt /> },
    { to: "/dashboard/percentage-adjustment", label: "Adjustment", icon: <FaPercentage /> },
    { to: "/dashboard/vehicles", label: "Vehicles", icon: <FaCar /> },
    { to: "/dashboard/rolling-pl", label: "Profit & Loss", icon: <FaChartPie /> },
    { to: "/dashboard/self-assessment", label: "Self Assessment Returns", icon: <FaFileAlt /> },
    { to: "/dashboard/financial-statements", label: "Statements", icon: <FaFolderOpen /> },
    { to: "/dashboard/uploaded-documents", label: "Documents", icon: <FaUpload /> },
    { to: "/dashboard/id-documents", label: "ID Verification", icon: <FaIdCard /> },
    { to: "/dashboard/buy-renew-plan", label: "Buy / Renew Plan", icon: <FaShoppingCart /> },
    { to: "/dashboard/tax-year", label: "Tax Year", icon: <FaRegCalendarCheck /> },
  ];

  const handleLogout = async () => {
    if (isLoggingOut) return; // Prevent double click
    setIsLoggingOut(true);
    try {
      await logoutApi();
      logout();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Failed to logout, please try again.");
      setIsLoggingOut(false);
    }
  };

  return (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => {
        const isActive =
          location.pathname === item.to ||
          (item.to !== "/dashboard" && location.pathname.startsWith(item.to));

        return (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/dashboard"}
            className={`flex items-center gap-3 p-2 rounded-md transition-colors duration-200 
              ${isActive ? "bg-blue-50 text-gray-900" : "text-gray-800 hover:bg-blue-50"}
              ${collapsed ? "justify-center" : "justify-start"}`}
            title={collapsed ? item.label : undefined}
          >
            <span className="text-lg">{item.icon}</span>
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        );
      })}

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        disabled={isLoggingOut}
        className={`flex items-center gap-3 p-2 rounded-md transition-colors duration-200 
          ${isLoggingOut
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-red-50 hover:bg-red-100 text-red-600 cursor-pointer"
          } ${collapsed ? "justify-center" : "justify-start"}`}
        title={collapsed ? "Logout" : undefined}
      >
        <FiLogOut className={`${isLoggingOut ? "text-gray-400" : "text-red-600"} text-lg`} />
        {!collapsed && <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>}
      </button>
    </nav>
  );
};

export default Navigation;
