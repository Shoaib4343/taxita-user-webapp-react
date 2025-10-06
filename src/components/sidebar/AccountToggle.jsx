// // src/sidebar/AccountToggle.jsx
// import React, { useState, useRef, useEffect } from "react";
// import {
//   FiChevronDown,
//   FiUser,
//   FiLogOut,
// } from "react-icons/fi";
// import { useAuth } from "../../context/AuthContext";
// import { Link, useNavigate } from "react-router-dom";
// import { logoutApi } from "../../services/authService";
// import toast from "react-hot-toast";

// const AccountToggle = ({ collapsed, variant = "sidebar" }) => {
//   const { auth, logout } = useAuth();
//   const [isOpen, setIsOpen] = useState(false);
//   const [isLoggingOut, setIsLoggingOut] = useState(false);
//   const navigate = useNavigate();
//   const dropdownRef = useRef(null);

//   const toggle = () => setIsOpen((prev) => !prev);

//   // Handle logout
//   const handleLogout = async () => {
//     if (isLoggingOut) return; // Prevent multiple clicks
//     setIsLoggingOut(true);
//     try {
//       await logoutApi();
//       logout(); // Clear auth context and localStorage
//       toast.success("Logged out successfully");
//       navigate("/login"); // Redirect to login page
//     } catch (error) {
//       console.error("Logout failed:", error);
//       toast.error("Failed to logout, please try again.");
//       setIsLoggingOut(false);
//     }
//   };

//   // Close on outside click
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target)
//       ) {
//         setIsOpen(false);
//       }
//     };

//     if (isOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isOpen]);

//   // Close dropdown on escape key
//   useEffect(() => {
//     const handleKeyDown = (event) => {
//       if (event.key === "Escape") {
//         setIsOpen(false);
//       }
//     };

//     if (isOpen) {
//       document.addEventListener("keydown", handleKeyDown);
//     }

//     return () => {
//       document.removeEventListener("keydown", handleKeyDown);
//     };
//   }, [isOpen]);

//   // Determine if we should show full content based on variant and screen size
//   const showFullContent = variant === "navbar" || (!collapsed && variant === "sidebar");
//   const isNavbar = variant === "navbar";

//   return (
//     <div ref={dropdownRef} className="relative w-full">
//       <button
//         onClick={toggle}
//         aria-expanded={isOpen}
//         aria-haspopup="true"
//         className={`flex items-center gap-2 h-10 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 border border-blue-100 hover:border-blue-200 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 cursor-pointer ${
//           isNavbar 
//             ? "px-3 max-w-[200px] sm:max-w-none" // Navbar: limited width on mobile, full on desktop
//             : collapsed 
//               ? "justify-center w-10 mx-auto" // Sidebar collapsed: centered square button
//               : "justify-between px-3 w-full" // Sidebar expanded: full width
//         }`}
//       >
//         <div className="flex items-center gap-2 min-w-0">
//           <img
//             src="https://api.dicebear.com/9.x/notionists/svg"
//             alt="User avatar"
//             className="w-6 h-6 rounded-full shadow-sm ring-2 ring-white flex-shrink-0"
//           />
//           {showFullContent && (
//             <div className="flex flex-col text-left min-w-0">
//               <span className={`font-medium text-gray-900 truncate ${
//                 isNavbar ? "text-sm hidden sm:block" : "text-sm"
//               }`}>
//                 {auth?.user?.first_name || "User"}
//               </span>
//               <span className={`text-gray-500 truncate ${
//                 isNavbar ? "text-xs hidden sm:block" : "text-xs"
//               }`}>
//                 {auth?.user?.email || "user@example.com"}
//               </span>
//             </div>
//           )}
//         </div>
//         {showFullContent && (
//           <FiChevronDown 
//             className={`w-4 h-4 text-gray-500 transition-transform duration-200 flex-shrink-0 ${
//               isOpen ? "rotate-180" : ""
//             } ${isNavbar ? "hidden sm:block" : ""}`}
//           />
//         )}
//       </button>

//       {/* Dropdown Menu */}
//       {isOpen && showFullContent && (
//         <div className={`absolute mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 z-50 overflow-hidden animate-slideDown ${
//           isNavbar ? "right-0" : "left-0"
//         }`}>
//           <div className="py-1">
//             <Link 
//               to="/dashboard/profile-information"
//               onClick={() => setIsOpen(false)}
//               className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200"
//             >
//               <FiUser className="w-4 h-4" />
//               <span>Profile Information</span>
//             </Link>

//             <div className="border-t border-gray-100 my-1" />

//             <button
//               onClick={handleLogout}
//               disabled={isLoggingOut}
//               className={`flex items-center gap-3 w-full px-4 py-3 text-sm transition-colors duration-200 text-left ${
//                 isLoggingOut
//                   ? "text-gray-400 cursor-not-allowed"
//                   : "text-red-600 hover:bg-red-50 hover:text-red-700"
//               }`}
//             >
//               <FiLogOut className="w-4 h-4" />
//               <span>{isLoggingOut ? "Logging out..." : "Sign Out"}</span>
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Animation styles */}
//       <style jsx>{`
//         @keyframes slideDown {
//           0% {
//             opacity: 0;
//             transform: translateY(-8px);
//           }
//           100% {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         .animate-slideDown {
//           animation: slideDown 0.1s ease-out forwards;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default AccountToggle;




























// src/sidebar/AccountToggle.jsx
import React, { useState, useRef, useEffect } from "react";
import {
  FiChevronDown,
  FiUser,
  FiLogOut,
} from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { useProfile } from "../../context/ProfileContext"; // Add ProfileContext
import { Link, useNavigate } from "react-router-dom";
import { logoutApi } from "../../services/authService";
import toast from "react-hot-toast";

const AccountToggle = ({ collapsed, variant = "sidebar" }) => {
  const { auth, logout } = useAuth();
  const { profileImageUrl, profileImageLoading } = useProfile(); // Get profile image from context
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const toggle = () => setIsOpen((prev) => !prev);

  // Handle logout
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
      toast.error("Failed to logout, please try again.");
      setIsLoggingOut(false);
    }
  };

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Close dropdown on escape key
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // Determine if we should show full content based on variant and screen size
  const showFullContent = variant === "navbar" || (!collapsed && variant === "sidebar");
  const isNavbar = variant === "navbar";

  // Get the appropriate avatar source
  const getAvatarSrc = () => {
    if (profileImageLoading) {
      return null; // Will show loading spinner
    }
    if (profileImageUrl) {
      return profileImageUrl;
    }
    // Fallback to generated avatar
    const name = auth?.user?.first_name || auth?.user?.email || "User";
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=4f46e5&color=fff&size=64`;
  };

  const avatarSrc = getAvatarSrc();

  return (
    <div ref={dropdownRef} className="relative w-full">
      <button
        onClick={toggle}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className={`flex items-center gap-2 h-10 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 border border-blue-100 hover:border-blue-200 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 cursor-pointer ${
          isNavbar 
            ? "px-3 max-w-[200px] sm:max-w-none" // Navbar: limited width on mobile, full on desktop
            : collapsed 
              ? "justify-center w-10 mx-auto" // Sidebar collapsed: centered square button
              : "justify-between px-3 w-full" // Sidebar expanded: full width
        }`}
      >
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-6 h-6 rounded-full shadow-sm ring-2 ring-white flex-shrink-0 overflow-hidden bg-gray-100">
            {profileImageLoading ? (
              <div className="w-full h-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-3 w-3 border-2 border-blue-600 border-t-transparent"></div>
              </div>
            ) : (
              <img
                src={avatarSrc}
                alt="User avatar"
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback if image fails to load
                  const name = auth?.user?.first_name || auth?.user?.email || "User";
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=4f46e5&color=fff&size=64`;
                }}
              />
            )}
          </div>
          {showFullContent && (
            <div className="flex flex-col text-left min-w-0">
              <span className={`font-medium text-gray-900 truncate ${
                isNavbar ? "text-sm hidden sm:block" : "text-sm"
              }`}>
                {auth?.user?.first_name || "User"}
              </span>
              <span className={`text-gray-500 truncate ${
                isNavbar ? "text-xs hidden sm:block" : "text-xs"
              }`}>
                {auth?.user?.email || "user@example.com"}
              </span>
            </div>
          )}
        </div>
        {showFullContent && (
          <FiChevronDown 
            className={`w-4 h-4 text-gray-500 transition-transform duration-200 flex-shrink-0 ${
              isOpen ? "rotate-180" : ""
            } ${isNavbar ? "hidden sm:block" : ""}`}
          />
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && showFullContent && (
        <div className={`absolute mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 z-50 overflow-hidden animate-slideDown ${
          isNavbar ? "right-0" : "left-0"
        }`}>
          <div className="py-1">
            <Link 
              to="/dashboard/profile-information"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200"
            >
              <FiUser className="w-4 h-4" />
              <span>Profile Information</span>
            </Link>

            <div className="border-t border-gray-100 my-1" />

            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className={`flex items-center gap-3 w-full px-4 py-3 text-sm transition-colors duration-200 text-left ${
                isLoggingOut
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-red-600 hover:bg-red-50 hover:text-red-700"
              }`}
            >
              <FiLogOut className="w-4 h-4" />
              <span>{isLoggingOut ? "Logging out..." : "Sign Out"}</span>
            </button>
          </div>
        </div>
      )}

      {/* Animation styles */}
      <style jsx>{`
        @keyframes slideDown {
          0% {
            opacity: 0;
            transform: translateY(-8px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.1s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default AccountToggle;