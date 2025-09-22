// src/sidebar/CommandMenu.jsx
import React, { useEffect, useRef, useState } from "react";
import { AiFillCalculator } from "react-icons/ai";
import { 
  FiX, FiHome, FiSettings, FiLogOut, FiSearch, FiUser, FiFileText, 
  FiDollarSign, FiTrendingUp, FiTruck,
  FiFolder, FiCreditCard, FiCalendar, FiCamera, FiPieChart,
  FiBarChart2
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export const CommandMenu = ({ open, setOpen }) => {
  const modalRef = useRef();
  const inputRef = useRef();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const commands = [
    { 
      label: "Dashboard", 
      icon: <FiHome />, 
      action: () => navigate("/dashboard"),
      shortcut: "D",
      category: "Navigation"
    },
    { 
      label: "Personal Details", 
      icon: <FiUser />, 
      action: () => navigate("/dashboard/personal-details"),
      shortcut: "P",
      category: "Profile"
    },
    { 
      label: "Income", 
      icon: <FiDollarSign />, 
      action: () => navigate("/dashboard/income"),
      shortcut: "I",
      category: "Finance",
      description: "All your income"
    },
    { 
      label: "Weekly Income", 
      icon: <FiTrendingUp />, 
      action: () => navigate("/dashboard/weekly-income"),
      category: "Finance",
      description: "Weekly income listings"
    },
    { 
      label: "Expenses", 
      icon: <FiCreditCard />, 
      action: () => navigate("/dashboard/expenses"),
      shortcut: "E",
      category: "Finance",
      description: "All your expenses"
    },
    { 
      label: "Weekly Expenses", 
      icon: <FiBarChart2 />, 
      action: () => navigate("/dashboard/weekly-expenses"),
      category: "Finance",
      description: "Weekly expense listings"
    },
    { 
      label: "Adjustment", 
      icon: <AiFillCalculator />, 
      action: () => navigate("/dashboard/percentage-adjustment"),
      category: "Finance",
      description: "Income percentage adjustment"
    },
    { 
      label: "Vehicles", 
      icon: <FiTruck />, 
      action: () => navigate("/dashboard/vehicles"),
      shortcut: "V",
      category: "Assets",
      description: "All your vehicles"
    },
    { 
      label: "Profit & Loss", 
      icon: <FiPieChart />, 
      action: () => navigate("/dashboard/rolling-pl"),
      category: "Reports",
      description: "Rolling tax estimate to date"
    },
    { 
      label: "Self Assessment Returns", 
      icon: <FiFileText />, 
      action: () => navigate("/dashboard/self-assessment"),
      shortcut: "A",
      category: "Tax",
      description: "Estimate of tax to date"
    },
    { 
      label: "Statements", 
      icon: <FiBarChart2 />, 
      action: () => navigate("/dashboard/financial-statements"),
      shortcut: "F",
      category: "Reports",
      description: "All your financial statements"
    },
    { 
      label: "Documents", 
      icon: <FiFolder />, 
      action: () => navigate("/dashboard/uploaded-documents"),
      category: "Documents",
      description: "Your uploaded documents"
    },
    { 
      label: "ID Documents", 
      icon: <FiFileText />, 
      action: () => navigate("/dashboard/id-documents"),
      category: "Documents",
      description: "Money laundering compliance"
    },
    { 
      label: "Buy / Renew Plan", 
      icon: <FiCreditCard />, 
      action: () => navigate("/dashboard/buy-renew-plan"),
      shortcut: "B",
      category: "Subscription",
      description: "Buy or renew your Taxita plan"
    },
    { 
      label: "Tax Year", 
      icon: <FiCalendar />, 
      action: () => navigate("/dashboard/tax-year"),
      shortcut: "T",
      category: "Tax",
      description: "Finalise this year's tax filing"
    },
    { 
      label: "Image Upload", 
      icon: <FiCamera />, 
      action: () => navigate("/dashboard/image"),
      category: "Tools",
      description: "Upload and manage images"
    },
    { 
      label: "Logout", 
      icon: <FiLogOut />, 
      action: () => {
        // Add logout logic here
        localStorage.removeItem('token'); // or however you handle logout
        navigate("/login");
      },
      shortcut: "L",
      destructive: true,
      category: "Account"
    },
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Open command menu with Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(true);
      }

      // Close on Escape
      if (e.key === 'Escape') {
        setOpen(false);
        setSearchQuery("");
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [setOpen]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setOpen(false);
        setSearchQuery("");
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, setOpen]);

  // Focus input when opened
  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  // Reset search when closed
  useEffect(() => {
    if (!open) {
      setSearchQuery("");
    }
  }, [open]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  if (!open) return null;

  const handleCommandSelect = (command) => {
    command.action();
    setOpen(false);
    setSearchQuery("");
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-start justify-center p-4 pt-16 sm:pt-20">
      {/* Backdrop - This will blur everything behind it */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Modal */}
      <div
        ref={modalRef}
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden animate-scaleIn"
        style={{ zIndex: 10000 }} // Inline style to ensure it's above backdrop
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 bg-gray-50/50">
          <FiSearch className="text-gray-400 w-5 h-5 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command or search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
          />
          <button
            onClick={() => setOpen(false)}
            className="p-1.5 rounded-md hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
            aria-label="Close"
          >
            <FiX className="text-gray-500 w-4 h-4" />
          </button>
        </div>

        {/* Commands List */}
        <div className="max-h-80 overflow-y-auto py-2">
          {filteredCommands.length > 0 ? (
            <div className="space-y-1 px-2">
              {/* Group commands by category for better organization */}
              {(() => {
                const groupedCommands = filteredCommands.reduce((acc, cmd) => {
                  const category = cmd.category || 'Other';
                  if (!acc[category]) acc[category] = [];
                  acc[category].push(cmd);
                  return acc;
                }, {});

                return Object.entries(groupedCommands).map(([category, categoryCommands]) => (
                  <div key={category} className="mb-3 last:mb-0">
                    {Object.keys(groupedCommands).length > 1 && filteredCommands.length > 6 && (
                      <div className="px-3 py-1 text-xs font-medium text-gray-400 uppercase tracking-wide">
                        {category}
                      </div>
                    )}
                    <div className="space-y-1">
                      {categoryCommands.map((cmd, index) => (
                        <button
                          key={`${category}-${index}`}
                          onClick={() => handleCommandSelect(cmd)}
                          className={`w-full flex items-center justify-between gap-3 px-3 py-3 text-sm rounded-lg transition-all duration-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 ${
                            cmd.destructive 
                              ? 'text-red-600 hover:bg-red-50 hover:text-red-700' 
                              : 'text-gray-700'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className={`${cmd.destructive ? 'text-red-500' : 'text-gray-500'}`}>
                              {cmd.icon}
                            </span>
                            <div className="flex flex-col items-start">
                              <span className="font-medium">{cmd.label}</span>
                              {cmd.description && (
                                <span className="text-xs text-gray-400 truncate max-w-[200px]">
                                  {cmd.description}
                                </span>
                              )}
                            </div>
                          </div>
                          {cmd.shortcut && (
                            <kbd className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded border border-gray-200">
                              {cmd.shortcut}
                            </kbd>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                ));
              })()}
            </div>
          ) : (
            <div className="px-4 py-8 text-center">
              <div className="text-gray-400 text-sm">
                <FiSearch className="w-8 h-8 mx-auto mb-2 opacity-50" />
                No commands found for "{searchQuery}"
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-3 bg-gray-50/50 border-t border-gray-100 text-xs text-gray-500 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white rounded border">↑↓</kbd>
              navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white rounded border">↵</kbd>
              select
            </span>
          </div>
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 bg-white rounded border">esc</kbd>
            close
          </span>
        </div>
      </div>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes scaleIn {
          0% {
            transform: scale(0.95);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-scaleIn {
          animation: scaleIn 0.15s ease-out forwards;
        }
      `}</style>
    </div>
  );
};