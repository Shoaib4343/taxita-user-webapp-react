// components/CustomDropdown.jsx
import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

const CustomDropdown = ({ 
  name, 
  value, 
  onChange, 
  options = [], 
  placeholder = "Select option", 
  icon = null, 
  error = null,
  displayFormatter = null, 
  valueFormatter = null,   
  searchPlaceholder = "Search...",
  disabled = false,
  className = "",
  showSearch = null, 
  searchThreshold = 5, 
  allowClear = false, 
  maxHeight = "15rem", 
  emptyMessage = "No options found",
  displayValue = null, 
  optionRenderer = null, 
  containerClassName = "",
  dropdownClassName = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  const shouldShowSearch = showSearch !== null 
    ? showSearch 
    : options.length > searchThreshold;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && shouldShowSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, shouldShowSearch]);

  const filteredOptions = shouldShowSearch && searchTerm
    ? options.filter(option => {
        const searchableText = displayFormatter 
          ? displayFormatter(option).toString()
          : option.toString();
        return searchableText.toLowerCase().includes(searchTerm.toLowerCase());
      })
    : options;

  const handleSelect = (option) => {
    onChange({ target: { name, value: option } });
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleClear = (e) => {
    e.stopPropagation();
    onChange({ target: { name, value: '' } });
  };

  const getDisplayValue = () => {
    if (displayValue) return displayValue(value);
    if (!value && value !== 0) return '';
    if (displayFormatter) return displayFormatter(value);
    if (valueFormatter) return valueFormatter(value);
    return value.toString();
  };

  const getOptionDisplay = (option) => {
    if (displayFormatter) return displayFormatter(option);
    return option.toString();
  };

  const renderOption = (option, index) => {
    if (optionRenderer) {
      return optionRenderer(option, index, option === value);
    }
    const isSelected = option === value;
    return (
      <div
        key={`${option}-${index}`}
        onClick={() => handleSelect(option)}
        className={`px-4 py-3 cursor-pointer transition-colors duration-150 flex items-center justify-between ${
          isSelected 
            ? 'bg-blue-50 text-blue-700 border-r-4 border-blue-500' 
            : 'hover:bg-gray-50 text-gray-700'
        }`}
      >
        <span className={`text-sm ${isSelected ? 'font-semibold' : ''}`}>
          {getOptionDisplay(option)}
        </span>
        {isSelected && <Check className="w-4 h-4 text-blue-600" />}
      </div>
    );
  };

  return (
    <div ref={dropdownRef} className={`relative ${containerClassName}`}>
      {/* Input Box */}
      <div
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`relative w-full min-w-[12rem] max-w-full py-3 ${icon ? 'pl-10' : 'pl-4'} pr-12 bg-white border-2 rounded-xl text-gray-700 transition-all duration-200 overflow-hidden ${
          disabled 
            ? "cursor-not-allowed bg-gray-50 border-gray-200 text-gray-400"
            : error 
              ? "border-red-300 bg-red-50 cursor-pointer" 
              : value || value === 0
                ? "border-blue-300 bg-blue-50 cursor-pointer" 
                : "border-gray-200 hover:border-gray-300 cursor-pointer"
        } ${isOpen && !disabled ? 'border-blue-500 ring-4 ring-blue-100' : ''} ${className}`}
      >
        {/* Left Icon - Fixed positioning */}
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
            {icon}
          </div>
        )}

        {/* Text content with proper spacing for icon */}
        <div className="flex items-center">
          <span className={`block truncate ${(value || value === 0) ? 'text-gray-900' : 'text-gray-500'}`}>
            {getDisplayValue() || placeholder}
          </span>
        </div>

        {/* Right-side Icons - Fixed positioning */}
        <div className="absolute inset-y-0 right-3 flex items-center gap-2 pointer-events-none">
          {allowClear && (value || value === 0) && !disabled && (
            <button
              type="button"
              onClick={handleClear}
              className="text-gray-400 hover:text-gray-600 transition-colors pointer-events-auto"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          <ChevronDown 
            className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </div>
      </div>

      {/* Dropdown Menu */}
      {isOpen && !disabled && (
        <div 
          className={`absolute z-[99999] w-full min-w-[16rem] mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl overflow-hidden ${dropdownClassName}`} 
          style={{ maxHeight }}
        >
          {shouldShowSearch && (
            <div className="p-3 border-b border-gray-100 bg-gray-50">
              <input
                ref={searchInputRef}
                type="text"
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}
          <div 
            className="overflow-y-auto" 
            style={{ 
              maxHeight: shouldShowSearch ? 'calc(200px - 60px)' : '200px'
            }}
          >
            {filteredOptions.length === 0 ? (
              <div className="px-4 py-6 text-sm text-gray-500 text-center">
                {emptyMessage}
              </div>
            ) : (
              filteredOptions.map((option, index) => renderOption(option, index))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;