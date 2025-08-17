// src/pages/PercentageAdjustment.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const PercentageAdjustment = () => {
  const [formData, setFormData] = useState({
    car: "",
    telephone: "",
    cash: "",
    cardBank: "",
    accountContract: "",
    subContract: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error for this field when user selects a value
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value) {
        newErrors[key] = "This field is required.";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Clear errors and show success toast
    setErrors({});
    toast.success("Percentage adjustments saved successfully!");
    setFormData({
    car: "",
    telephone: "",
    cash: "",
    cardBank: "",
    accountContract: "",
    subContract: "",
  })

    console.log("Form Data:", formData);
  };

  const percentageOptions = Array.from({ length: 101 }, (_, i) => `${i}%`);

  const renderSelect = (name, value) => (
    <div>
      <select
        name={name}
        value={value}
        onChange={handleChange}
        className={`border rounded px-2 py-1 w-24 ${
          errors[name] ? "border-red-500" : "border-gray-300"
        }`}
      >
        <option value="">Select</option>
        {percentageOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {errors[name] && (
        <p className="text-red-500 text-xs mt-1">{errors[name]}</p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen p-6 bg-white rounded-xl">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">
            Percentage Adjustment
          </h1>
          <p className="text-gray-600">
            PERCENTAGE ADJUSTMENT FOR TAX YEAR{" "}
            <span className="font-semibold">2025 / 2026</span>
          </p>
        </div>
        <div className="flex items-center text-sm text-gray-500 mt-2 md:mt-0">
          <Link to="/dashboard" className="hover:underline text-blue-600">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span>Dashboard</span>
        </div>
      </div>

      {/* Intro Text */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <p className="text-gray-700">
          You must select what element of private use of your vehicle you think you use,
          expressed as a percentage over the year if you decide to choose not to fully
          complete the mileage register. Likewise private use of your telephone.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Private use adjustment:
        </h2>
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-4 py-2 text-left">Item</th>
                <th className="px-4 py-2 text-left">Percentage</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="px-4 py-2">Car (%)</td>
                <td className="px-4 py-2">{renderSelect("car", formData.car)}</td>
              </tr>
              <tr>
                <td className="px-4 py-2">Telephone (%)</td>
                <td className="px-4 py-2">
                  {renderSelect("telephone", formData.telephone)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Radio Rent / Commission fee / Subscription fee Percentage adjustment:
        </h2>
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-4 py-2 text-left">Item</th>
                <th className="px-4 py-2 text-left">Percentage</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="px-4 py-2">Cash (%)</td>
                <td className="px-4 py-2">{renderSelect("cash", formData.cash)}</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="px-4 py-2">Card / Bank (%)</td>
                <td className="px-4 py-2">
                  {renderSelect("cardBank", formData.cardBank)}
                </td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="px-4 py-2">Account / Contract (%)</td>
                <td className="px-4 py-2">
                  {renderSelect("accountContract", formData.accountContract)}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2">Sub Contract (%)</td>
                <td className="px-4 py-2">
                  {renderSelect("subContract", formData.subContract)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default PercentageAdjustment;
