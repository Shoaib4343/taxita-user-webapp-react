import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar, ChevronDown, X } from "lucide-react";

const CustomDatePicker = ({
  name,
  value,
  onChange,
  placeholder = "Select date",
  error = null,
  disabled = false,
  className = "",
  allowClear = true,
  containerClassName = "",
  minDate = null,
  maxDate = null,
}) => {
  const handleChange = (date) => {
    onChange({ target: { name, value: date ? date.toISOString().split("T")[0] : "" } });
  };

  return (
    <div className={`relative ${containerClassName}`}>
      {/* Styled Input (same as dropdown) */}
      <div className="relative">
        <DatePicker
          selected={value ? new Date(value) : null}
          onChange={handleChange}
          minDate={minDate ? new Date(minDate) : null}
          maxDate={maxDate ? new Date(maxDate) : null}
          disabled={disabled}
          placeholderText={placeholder}
          className={`w-full pl-10 ${allowClear && value ? "pr-16" : "pr-10"} py-3 bg-white border-2 rounded-xl text-gray-700 transition-all duration-200
            ${disabled 
              ? "cursor-not-allowed bg-gray-50 border-gray-200 text-gray-400"
              : error 
                ? "border-red-300 bg-red-50 cursor-pointer"
                : value
                  ? "border-blue-300 bg-blue-50 cursor-pointer"
                  : "border-gray-200 hover:border-gray-300 cursor-pointer"
            } ${className}`}
          popperClassName="custom-datepicker-popper"
          calendarClassName="custom-datepicker-calendar"
        />

        {/* Left icon */}
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <Calendar className="w-5 h-5" />
        </div>

        {/* Right icons */}
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
          {allowClear && value && !disabled && (
            <button
              type="button"
              onClick={() => handleChange(null)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default CustomDatePicker;
