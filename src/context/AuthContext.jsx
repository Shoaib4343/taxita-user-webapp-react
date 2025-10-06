// // src/context/AuthContext.jsx
// import React, { createContext, useContext, useState } from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [auth, setAuth] = useState(() => {
//     const token = localStorage.getItem("token");
//     const user = localStorage.getItem("user");
//     return {
//       isAuthenticated: !!token,
//       token: token || null,
//       user: user ? JSON.parse(user) : null,
//     };
//   });

//   const login = (token, user) => {
//     localStorage.setItem("token", token);
//     localStorage.setItem("user", JSON.stringify(user));
//     setAuth({ isAuthenticated: true, token, user });
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setAuth({ isAuthenticated: false, token: null, user: null });
//   };

//   return (
//     <AuthContext.Provider value={{ auth, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);









// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    token: null,
    user: null,
  });
  
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  // Check authentication on app startup
  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");
        
        if (token && user) {
          setAuth({
            isAuthenticated: true,
            token,
            user: JSON.parse(user),
          });
        } else {
          setAuth({
            isAuthenticated: false,
            token: null,
            user: null,
          });
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        // Clear invalid data
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setAuth({
          isAuthenticated: false,
          token: null,
          user: null,
        });
      } finally {
        setIsLoading(false); // Auth check complete
      }
    };

    checkAuth();
  }, []);

  const login = (token, user) => {
    try {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setAuth({ isAuthenticated: true, token, user });
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setAuth({ isAuthenticated: false, token: null, user: null });
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};