// import { FiHome, FiSettings, FiUser, FiLogOut } from "react-icons/fi";
// import { NavLink, useLocation, useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import { useAuth } from "../../context/AuthContext";
// import { logoutApi } from "../../services/authService";
// import { useState } from "react";

// const Navigation = () => {
//   const [isLoggingOut, setIsLoggingOut] = useState(false);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { logout } = useAuth();

//   const navItems = [
//     { to: "/dashboard", label: "Dashboard", icon: <FiHome /> },
//     { to: "/dashboard/settings", label: "Settings", icon: <FiSettings /> },
//     { to: "/dashboard/profile", label: "Profile", icon: <FiUser /> },
//   ];

//   // handle logout
//   const handleLogout = async () => {
//     // safety check in case it somehow triggers again
//     if (isLoggingOut) return;
//     setIsLoggingOut(true);
//     try {
//       await logoutApi(); // API call to backend logout
//       logout(); // Remove token/user from localStorage + context
//       toast.success("Logged out successfully");
//       navigate("/login"); // redirect
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to logout");
//       setIsLoggingOut(false); // allow retry if failed
//     }
//   };

//   return (
//     <nav className="flex-1 space-y-1">
//       {navItems.map((item) => {
//         const isActive =
//           location.pathname === item.to ||
//           (item.to !== "/dashboard" && location.pathname.startsWith(item.to));

//         return (
//           <NavLink
//             key={item.to}
//             to={item.to}
//             end={item.to === "/dashboard"}
//             className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors duration-200 ${
//               isActive
//                 ? "bg-blue-50 text-gray-900"
//                 : "text-gray-800 hover:bg-blue-50 hover:text-gray-900"
//             }`}
//           >
//             <span className="text-lg">{item.icon}</span>
//             <span>{item.label}</span>
//           </NavLink>
//         );
//       })}

//       {/* Logout button */}
//       <button
//         onClick={handleLogout}
//         className="flex w-full items-center gap-3 px-3 py-2 rounded-md bg-red-50 hover:bg-red-100 text-red-600 transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
//         disabled={isLoggingOut} // disable while logging out
//       >
//         <span className="text-lg">
//           <FiLogOut />
//         </span>
//         <span>Logout</span>
//       </button>
//     </nav>
//   );
// };

// export default Navigation;

































// src/sidebar/Navigation.jsx
import { FiHome, FiSettings, FiUser, FiLogOut } from "react-icons/fi";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { logoutApi } from "../../services/authService";

const Navigation = ({ collapsed }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const navItems = [
    { to: "/dashboard", label: "Dashboard", icon: <FiHome /> },
    { to: "/dashboard/settings", label: "Settings", icon: <FiSettings /> },
    { to: "/dashboard/profile", label: "Profile", icon: <FiUser /> },
  ];

  const handleLogout = async () => {
    try {
      await logoutApi();
      logout();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch {
      toast.error("Failed to logout");
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
              justify-center ${collapsed ? "justify-center" : "justify-start"}`}
            title={collapsed ? item.label : undefined}
          >
            <span className="text-lg">{item.icon}</span>
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        );
      })}

      {/* Logout */}
      <button
        onClick={handleLogout}
        className={`flex items-center gap-3 p-2 rounded-md transition-colors duration-200 
          bg-red-50 hover:bg-red-100 text-red-600 ${collapsed ? "justify-center" : "justify-start"}`}
        title={collapsed ? "Logout" : undefined}
      >
        <FiLogOut className="text-lg" />
        {!collapsed && <span>Logout</span>}
      </button>
    </nav>
  );
};

export default Navigation;
