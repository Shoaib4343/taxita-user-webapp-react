// PublicRoute.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PublicRoute = () => {
  const { auth } = useAuth();

  if (auth.isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />; // ✅ render child routes
};

export default PublicRoute;
