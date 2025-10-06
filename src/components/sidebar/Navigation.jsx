// // src/sidebar/Navigation.jsx
// import { FiHome, FiSettings, FiUser, FiLogOut } from "react-icons/fi";
// import { NavLink, useLocation, useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import { useAuth } from "../../context/AuthContext";
// import { logoutApi } from "../../services/authService";
// import { useState } from "react";
// import { FaArrowDown, FaCalendarAlt, FaCar, FaChartPie, FaDollarSign, FaFileAlt, FaFolderOpen, FaIdCard, FaPercentage, FaRegCalendarCheck, FaShoppingCart, FaUpload } from "react-icons/fa";
// import { PoundSterlingIcon } from "lucide-react";

// const Navigation = ({ collapsed }) => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { logout } = useAuth();
//   const [isLoggingOut, setIsLoggingOut] = useState(false);

//   const navItems = [
//     { to: "/dashboard", label: "Dashboard", icon: <FiHome /> },
//     // { to: "/dashboard/settings", label: "Settings", icon: <FiSettings /> },
//     { to: "/dashboard/personal-details", label: "Profile", icon: <FiUser /> },
//     { to: "/dashboard/income", label: "Income", icon: <PoundSterlingIcon /> },
//     { to: "/dashboard/weekly-income", label: "Weekly Income", icon: <FaCalendarAlt /> },
//     { to: "/dashboard/expenses", label: "Expenses", icon: <FaArrowDown /> },
//     { to: "/dashboard/weekly-expenses", label: "Weekly Expenses", icon: <FaCalendarAlt /> },
//     { to: "/dashboard/percentage-adjustment", label: "Adjustment", icon: <FaPercentage /> },
//     { to: "/dashboard/vehicles", label: "Vehicles", icon: <FaCar /> },
//     { to: "/dashboard/rolling-pl", label: "Profit & Loss", icon: <FaChartPie /> },
//     { to: "/dashboard/self-assessment", label: "Self Assessment Returns", icon: <FaFileAlt /> },
//     { to: "/dashboard/financial-statements", label: "Statements", icon: <FaFolderOpen /> },
//     { to: "/dashboard/uploaded-documents", label: "Documents", icon: <FaUpload /> },
//     { to: "/dashboard/id-documents", label: "ID Verification", icon: <FaIdCard /> },
//     { to: "/dashboard/buy-renew-plan", label: "Buy / Renew Plan", icon: <FaShoppingCart /> },
//     { to: "/dashboard/tax-year", label: "Tax Year", icon: <FaRegCalendarCheck /> },
//   ];

//   const handleLogout = async () => {
//     if (isLoggingOut) return; // Prevent double click
//     setIsLoggingOut(true);
//     try {
//       await logoutApi();
//       logout();
//       toast.success("Logged out successfully");
//       navigate("/login");
//     } catch (error) {
//       console.error("Logout failed:", error);
//       toast.error("Failed to logout, please try again.");
//       setIsLoggingOut(false);
//     }
//   };

//   return (
//     <nav className="flex flex-col gap-1">
//       {navItems.map((item) => {
//         const isActive =
//           location.pathname === item.to ||
//           (item.to !== "/dashboard" && location.pathname.startsWith(item.to));

//         return (
//           <NavLink
//             key={item.to}
//             to={item.to}
//             end={item.to === "/dashboard"}
//             className={`flex items-center gap-3 p-2 rounded-md transition-colors duration-200 
//               ${isActive ? "bg-blue-50 text-gray-900" : "text-gray-800 hover:bg-blue-50"}
//               ${collapsed ? "justify-center" : "justify-start"}`}
//             title={collapsed ? item.label : undefined}
//           >
//             <span className="text-lg">{item.icon}</span>
//             {!collapsed && <span>{item.label}</span>}
//           </NavLink>
//         );
//       })}

//       {/* Logout Button */}
//       <button
//         onClick={handleLogout}
//         disabled={isLoggingOut}
//         className={`flex items-center gap-3 p-2 rounded-md transition-colors duration-200 
//           ${isLoggingOut
//             ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//             : "bg-red-50 hover:bg-red-100 text-red-600 cursor-pointer"
//           } ${collapsed ? "justify-center" : "justify-start"}`}
//         title={collapsed ? "Logout" : undefined}
//       >
//         <FiLogOut className={`${isLoggingOut ? "text-gray-400" : "text-red-600"} text-lg`} />
//         {!collapsed && <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>}
//       </button>
//     </nav>
//   );
// };

// export default Navigation;



























// src/sidebar/Navigation.jsx
import { FiHome, FiSettings, FiUser, FiLogOut, FiChevronDown, FiChevronRight } from "react-icons/fi";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { logoutApi } from "../../services/authService";
import { useState } from "react";
import { 
  FaArrowDown, 
  FaCalendarAlt, 
  FaCar, 
  FaChartPie, 
  FaDollarSign, 
  FaFileAlt, 
  FaFolderOpen, 
  FaIdCard, 
  FaPercentage, 
  FaRegCalendarCheck, 
  FaShoppingCart, 
  FaUpload,
  FaUserCircle,
  FaMapMarkerAlt,
  FaShieldAlt,
  FaFile,
  FaUser,
} from "react-icons/fa";
import { PoundSterlingIcon } from "lucide-react";

const Navigation = ({ collapsed }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isProfile2Expanded, setIsProfile2Expanded] = useState(false);

  // Profile 2 sub-items (new expandable section)
  const profile2SubItems = [
    { 
      to: "/dashboard/profile-information", 
      label: "Profile Information", 
      icon: <FaUserCircle className="text-sm" /> 
    },
    { 
      to: "/dashboard/address-management", 
      label: "Address Management", 
      icon: <FaMapMarkerAlt className="text-sm" /> 
    },
    { 
      to: "/dashboard/security-settings", 
      label: "Security Settings", 
      icon: <FaShieldAlt className="text-sm" /> 
    },
    { 
      to: "/dashboard/ni&utr", 
      label: "NI & UTR", 
      icon: <FaFile className="text-sm" /> 
    },
  ];

  const navItems = [
    { to: "/dashboard", label: "Dashboard", icon: <FiHome /> },
    // Keep original Profile menu item
    // { to: "/dashboard/personal-details", label: "Profile", icon: <FiUser /> },
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

  const toggleProfile2 = () => {
    if (collapsed) return; // Don't allow expansion when sidebar is collapsed
    setIsProfile2Expanded(!isProfile2Expanded);
  };

  // Check if any profile 2 sub-item is active
  const isProfile2Active = profile2SubItems.some(item => 
    location.pathname === item.to || location.pathname.startsWith(item.to)
  );

  return (
    <nav className="flex flex-col gap-1">
      {/* Profile 2 Section with Expandable Sub-items - AT THE TOP */}
      <div className="mb-2">
        {/* Profile 2 Header */}
        <button
          onClick={toggleProfile2}
          className={`w-full flex items-center gap-3 p-2 rounded-md transition-all duration-300 ease-in-out cursor-pointer transform hover:scale-[1.02]
            ${isProfile2Active ? "bg-blue-50 text-gray-900 shadow-sm" : "text-gray-800 hover:bg-blue-50"}
            ${collapsed ? "justify-center" : "justify-start"}`}
          title={collapsed ? "Profile " : undefined}
        >
          <span className="text-lg">
            <FaUser />
          </span>
          {!collapsed && (
            <>
              <span className="flex-1 text-left font-medium">Profile </span>
              <span className={`text-sm transition-all duration-300 ease-in-out transform ${isProfile2Expanded ? 'rotate-180' : 'rotate-0'}`}>
                <FiChevronDown />
              </span>
            </>
          )}
        </button>

        {/* Profile 2 Sub-items with Smooth Animation */}
        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
          !collapsed && isProfile2Expanded 
            ? 'max-h-64 opacity-100' 
            : 'max-h-0 opacity-0'
        }`}>
          {!collapsed && (
            <div className="ml-4 mt-2 space-y-1 border-l-2 border-blue-200 pl-3 animate-fadeIn">
              {profile2SubItems.map((subItem, index) => {
                const isSubItemActive = 
                  location.pathname === subItem.to || 
                  location.pathname.startsWith(subItem.to);

                return (
                  <NavLink
                    key={subItem.to}
                    to={subItem.to}
                    className={`flex items-center gap-3 p-2 rounded-md transition-all duration-200 ease-in-out text-sm cursor-pointer transform hover:translate-x-1
                      ${isSubItemActive 
                        ? "bg-blue-100 text-blue-800 border-l-3 border-blue-500 -ml-5 pl-4 shadow-sm" 
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-800 hover:shadow-sm"
                      }`}
                    style={{
                      animationDelay: `${index * 50}ms`
                    }}
                    title={subItem.label}
                  >
                    <span className="text-base transition-transform duration-200 hover:scale-110">{subItem.icon}</span>
                    <span className="transition-all duration-200">{subItem.label}</span>
                  </NavLink>
                );
              })}
            </div>
          )}
        </div>

        {/* Collapsed state - show sub-items as tooltips on hover */}
        {collapsed && (
          <div className="relative group">
            {/* Enhanced Tooltip on hover for collapsed state */}
            <div className="absolute left-full top-0 ml-3 hidden group-hover:block z-50 animate-slideInRight">
              <div className="bg-gray-900 text-white text-xs rounded-lg py-3 px-4 whitespace-nowrap shadow-2xl border border-gray-700">
                <div className="font-semibold mb-2 text-blue-300">Profile 2</div>
                <div className="space-y-2">
                  {profile2SubItems.map((subItem, index) => (
                    <div 
                      key={subItem.to} 
                      className="text-gray-300 hover:text-white transition-colors duration-150 flex items-center gap-2"
                      style={{
                        animationDelay: `${index * 30}ms`
                      }}
                    >
                      <span className="text-xs">{subItem.icon}</span>
                      {subItem.label}
                    </div>
                  ))}
                </div>
                {/* Enhanced Arrow */}
                <div className="absolute left-0 top-3 transform -translate-x-1 w-0 h-0 border-t-4 border-b-4 border-r-4 border-t-transparent border-b-transparent border-r-gray-900"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Regular Navigation Items */}
      {navItems.map((item) => {
        const isActive =
          location.pathname === item.to ||
          (item.to !== "/dashboard" && location.pathname.startsWith(item.to));

        return (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/dashboard"}
            className={`flex items-center gap-3 p-2 rounded-md transition-all duration-200 ease-in-out cursor-pointer transform hover:scale-[1.02]
              ${isActive ? "bg-blue-50 text-gray-900 shadow-sm" : "text-gray-800 hover:bg-blue-50"}
              ${collapsed ? "justify-center" : "justify-start"}`}
            title={collapsed ? item.label : undefined}
          >
            <span className="text-lg transition-transform duration-200 hover:scale-110">{item.icon}</span>
            {!collapsed && <span className="transition-all duration-200">{item.label}</span>}
          </NavLink>
        );
      })}

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        disabled={isLoggingOut}
        className={`flex items-center gap-3 p-2 rounded-md transition-all duration-200 ease-in-out cursor-pointer transform hover:scale-[1.02]
          ${isLoggingOut
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-red-50 hover:bg-red-100 text-red-600 hover:shadow-sm"
          } ${collapsed ? "justify-center" : "justify-start"}`}
        title={collapsed ? "Logout" : undefined}
      >
        <FiLogOut className={`${isLoggingOut ? "text-gray-400" : "text-red-600"} text-lg transition-transform duration-200 hover:scale-110`} />
        {!collapsed && <span className="transition-all duration-200">{isLoggingOut ? "Logging out..." : "Logout"}</span>}
      </button>

      {/* Custom CSS for additional animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        
        .animate-slideInRight {
          animation: slideInRight 0.2s ease-out forwards;
        }
      `}</style>
    </nav>
  );
};

export default Navigation;