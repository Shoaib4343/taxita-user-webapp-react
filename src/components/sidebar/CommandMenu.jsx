


import React, { useEffect, useRef, useState } from "react";
import { FiX, FiHome, FiSettings, FiLogOut, FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export const CommandMenu = ({ open, setOpen }) => {
  const modalRef = useRef();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const commands = [
    { label: "Dashboard", icon: <FiHome />, action: () => navigate("/dashboard") },
    { label: "Settings", icon: <FiSettings />, action: () => navigate("/dashboard/settings") },
    { label: "Logout", icon: <FiLogOut />, action: () => alert("Logged out") },
  ];

  const filtered = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, setOpen]);

  if (!open) return null;

  return (
    <div className="fixed h-screen inset-0 z-50 flex items-start justify-center p-4 sm:pt-20">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Modal */}
      <div
        ref={modalRef}
        className="relative w-full  max-w-md bg-white/95 rounded-xl shadow-xl border border-stone-200 
                   overflow-hidden animate-scaleIn"
      >
        {/* Close button */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-3 right-3 p-1.5 rounded-md hover:bg-stone-100 transition"
        >
          <FiX className="text-stone-500 w-4 h-4" />
        </button>

        {/* Search Bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-stone-200 bg-stone-50">
          <FiSearch className="text-stone-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search commands..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent outline-none text-sm text-stone-700 placeholder-stone-400"
            autoFocus
          />
        </div>

        {/* Command List */}
        <ul className="max-h-80 overflow-y-auto py-2">
          {filtered.length > 0 ? (
            filtered.map((cmd, index) => (
              <li
                key={index}
                onClick={() => {
                  cmd.action();
                  setOpen(false);
                }}
                className="flex items-center gap-3 px-4 py-2 text-sm text-stone-700 hover:bg-blue-100 
                           cursor-pointer transition"
              >
                <span className="text-stone-500">{cmd.icon}</span>
                <span>{cmd.label}</span>
              </li>
            ))
          ) : (
            <div className="text-stone-400 text-sm px-4 py-3">No results found.</div>
          )}
        </ul>
      </div>

      {/* Animation */}
      <style>{`
        @keyframes scaleIn {
          0% { transform: scale(0.95); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-scaleIn {
          animation: scaleIn 0.15s ease-out forwards;
        }
      `}</style>
    </div>
  );
};
