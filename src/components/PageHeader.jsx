// src/components/PageHeader.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Home, ChevronRight } from "lucide-react";

const PageHeader = ({
  icon,
  title,
  subtitle,
  description,
  currentPage,
  breadcrumbItems = [], // Optional additional breadcrumb items
  showTradingYear = true,
  activeTradingYear = null,
  infoCard = null, // New prop for card content (separate from description)
}) => {
  return (
    <div className="mb-8">
      <div className="">
        <div className="flex items-center justify-between mb-4">
          {/* Left side - Icon, Title, and Subtitle/Trading Year */}
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 rounded-xl">
              {React.cloneElement(icon, { className: "w-8 h-8 text-blue-600" })}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
              {showTradingYear && (
                <p className="text-gray-600 text-lg">
                  {subtitle || "Tax Year"}{" "}
                  <span className="font-semibold text-blue-600">
                    {activeTradingYear
                      ? activeTradingYear.trading_year
                      : "2025 / 2026"}
                  </span>
                </p>
              )}
              {!showTradingYear && subtitle && (
                <p className="text-gray-600 text-lg">{subtitle}</p>
              )}
            </div>
          </div>
          
          {/* Right side - Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link
              to="/dashboard"
              className="flex items-center gap-1 hover:text-blue-600 transition-colors"
            >
              <Home className="w-4 h-4" />
              Dashboard
            </Link>
            
            {/* Additional breadcrumb items */}
            {breadcrumbItems.map((item, index) => (
              <React.Fragment key={index}>
                <ChevronRight className="w-4 h-4" />
                {item.link ? (
                  <Link
                    to={item.link}
                    className="hover:text-blue-600 transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span>{item.label}</span>
                )}
              </React.Fragment>
            ))}
            
            {/* Current page */}
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-700 font-medium">{currentPage}</span>
          </nav>
        </div>

        {/* Simple Description */}
        {description && (
          <div className="mb-4">
            <p className="text-gray-600 leading-relaxed">{description}</p>
          </div>
        )}

        {/* Optional Info Card - separate prop */}
        {infoCard && (
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
            <p className="text-blue-800 leading-relaxed">{infoCard}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PageHeader;