import React from "react";
import {
  FiDollarSign,
  FiHome,
  FiLink,
  FiPaperclip,
  FiUsers,
} from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";

const routes = [
  { title: "Dashboard", icon: FiHome, path: "/dashboard" },
  { title: "Team", icon: FiUsers, path: "/dashboard/team" },
  { title: "Invoices", icon: FiPaperclip, path: "/dashboard/invoices" },
  { title: "Integrations", icon: FiLink, path: "/dashboard/integrations" },
  { title: "Finance", icon: FiDollarSign, path: "/dashboard/finance" },
];

export const RouteSelect = () => {
  const location = useLocation();

  return (
    <div className="space-y-1">
      {routes.map((route) => (
        <Route
          key={route.path}
          title={route.title}
          Icon={route.icon}
          href={route.path}
          selected={location.pathname === route.path}
        />
      ))}
    </div>
  );
};

const Route = ({ selected, Icon, title, href }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(href)}
      className={`flex items-center gap-3 w-full rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 ${
        selected
          ? "bg-blue-50 text-gray-900 shadow-md"
          : "text-gray-700 hover:bg-blue-50 hover:text-gray-900"
      }`}
    >
      <Icon className={`text-lg ${selected ? "text-blue-600" : ""}`} />
      <span>{title}</span>
    </button>
  );
};
