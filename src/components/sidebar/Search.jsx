// src/sidebar/Search.jsx
import React, { useState } from "react";
import { FiCommand, FiSearch } from "react-icons/fi";
import { CommandMenu } from "./CommandMenu";

export const Search = ({ noMargin, isMobile }) => {
  const [open, setOpen] = useState(false);

  // If it's mobile, return just the search icon
  if (isMobile) {
    return (
      <>
        <FiSearch 
          size={18} 
          className="text-gray-600 cursor-pointer"
          onClick={() => setOpen(true)}
        />
        <CommandMenu open={open} setOpen={setOpen} />
      </>
    );
  }

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className={`group cursor-pointer relative rounded-lg flex items-center px-3 py-2 text-sm h-10
                   border border-gray-200 bg-white shadow-sm transition-all duration-200
                   hover:border-gray-300 hover:shadow-md hover:bg-gray-50 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 ${
          noMargin ? '' : 'mb-4'
        }`}
      >
        <FiSearch className="mr-2 text-gray-500 group-hover:text-gray-700 transition-colors flex-shrink-0" size={16} />
        <span className="text-gray-500 select-none group-hover:text-gray-700 transition-colors flex-1 truncate">
          Search commands...
        </span>
        <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded border border-gray-200 group-hover:bg-gray-200 transition-colors">
          <FiCommand className="w-3 h-3" />
          K
        </kbd>
      </div>
      <CommandMenu open={open} setOpen={setOpen} />
    </>
  );
};