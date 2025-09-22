// components/FormField.js
import React from "react";

const FormField = ({ label, type, value, onChange, placeholder, error, required, icon }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {icon && <span className="inline w-4 h-4 mr-2">{icon}</span>}
        {label} {required && "*"}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
      />
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
};

export default FormField;