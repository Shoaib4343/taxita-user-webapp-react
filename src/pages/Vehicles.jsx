import { useState } from "react";
import { FaCar, FaSearch } from "react-icons/fa";
import toast from "react-hot-toast";

export default function VehiclesPage() {
  const [sold, setSold] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    make: "",
    model: "",
    regNo: "",
    co2: "",
    purchaseDate: "",
    purchasePrice: "",
    saleDate: "",
    salePrice: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Validate a single field
  const validateField = (name, value) => {
    let error = "";

    if (!value?.toString().trim()) {
      switch (name) {
        case "name":
          error = "Vehicle name is required";
          break;
        case "make":
          error = "Vehicle make is required";
          break;
        case "model":
          error = "Vehicle model is required";
          break;
        case "regNo":
          error = "Registration number is required";
          break;
        case "co2":
          error = "CO₂ emission is required";
          break;
        case "purchaseDate":
          error = "Purchase date is required";
          break;
        case "purchasePrice":
          error = "Purchase price is required";
          break;
        case "saleDate":
          if (sold) error = "Sale date is required when sold";
          break;
        case "salePrice":
          if (sold) error = "Sale price is required when sold";
          break;
        default:
          break;
      }
    }

    return error;
  };

  // Validate entire form
  const validateForm = () => {
    const newErrors = {};
    for (const key in formData) {
      // Only validate sale fields if sold
      if ((key === "saleDate" || key === "salePrice") && !sold) continue;

      const err = validateField(key, formData[key]);
      if (err) newErrors[key] = err;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Live validate
    if (touched[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name, type === "checkbox" ? checked : value),
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors before submitting");
      return;
    }

    toast.success("Vehicle saved successfully!");
    console.log("Form Data:", formData);
    // Reset form if needed
    setFormData({
      name: "",
      make: "",
      model: "",
      regNo: "",
      co2: "",
      purchaseDate: "",
      purchasePrice: "",
      saleDate: "",
      salePrice: "",
    });
  };

  return (
    <div className="flex flex-col rounded-xl h-full">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 p-4 rounded-t-xl">
        <h2 className="text-xl font-semibold mb-1">Vehicles</h2>
        <p className="text-sm text-gray-500">Vehicle listings go here...</p>
      </div>

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden bg-white rounded-b-xl ">
        {/* Left Sidebar */}
        <div className="w-full max-w-xs bg-white border border-gray-100 rounded-2xl p-6 shadow-sm mx-2 my-6 overflow-y-auto space-y-4">
          <div className="space-y-2">
            {/* Heading */}
            <h3 className="text-sm font-semibold text-gray-700">
              Your Vehicles
            </h3>

            {/* Search Input */}
            <div className="flex border border-gray-200 rounded-lg overflow-hidden">
              <input
                type="text"
                placeholder="Search my vehicles..."
                className="flex-1 px-3 py-2 text-sm text-gray-700 placeholder-gray-400 outline-none"
              />
              <button className="flex items-center justify-center bg-blue-600 text-white px-4 py-2 text-sm font-medium hover:bg-blue-700 transition">
                <FaSearch className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-white border border-gray-100 rounded-2xl hover:shadow-sm hover:border-gray-200 transition cursor-pointer">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-50 text-blue-600">
                <FaCar />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Car</p>
                <p className="text-xs text-gray-500">Reg no. 5030</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold mb-6">Add Vehicle</h3>
              {/* Add Vehicle Button */}
              <div className="flex justify-end mb-6">
                <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-xl shadow-lg hover:bg-green-700 transition transform hover:-translate-y-0.5">
                  <FaCar className="w-4 h-4" />
                  Add Vehicle
                </button>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Two-column layout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    label: "Vehicle Name",
                    name: "name",
                    placeholder: "Name of vehicle",
                  },
                  {
                    label: "Make",
                    name: "make",
                    placeholder: "Enter vehicle make",
                  },
                  {
                    label: "Model",
                    name: "model",
                    placeholder: "Enter vehicle model",
                  },
                  {
                    label: "Reg No.",
                    name: "regNo",
                    placeholder: "Enter registration number",
                  },
                ].map((field, idx) => (
                  <div key={idx}>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      {field.label}
                    </label>
                    <input
                      type="text"
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder={field.placeholder}
                      className={`w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring ${
                        errors[field.name]
                          ? "border-red-400 focus:ring-red-100"
                          : "border-gray-200 focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                      }`}
                    />
                    {errors[field.name] && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors[field.name]}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* CO2 emission */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  CO₂ emission
                </label>
                <input
                  type="text"
                  name="co2"
                  value={formData.co2}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="e.g: 130g"
                  className={`w-full border rounded-lg px-3 py-2 text-sm focus:ring outline-none ${
                    errors.co2
                      ? "border-red-400 focus:ring-red-100"
                      : "border-gray-200 focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                  }`}
                />
                {errors.co2 && (
                  <p className="text-xs text-red-500 mt-1">{errors.co2}</p>
                )}
              </div>

              {/* Purchase Date + Price */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Purchase date
                  </label>
                  <input
                    type="date"
                    name="purchaseDate"
                    value={formData.purchaseDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full border rounded-lg px-3 py-2 text-sm focus:ring outline-none ${
                      errors.purchaseDate
                        ? "border-red-400 focus:ring-red-100"
                        : "border-gray-200 focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                    }`}
                  />
                  {errors.purchaseDate && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.purchaseDate}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Purchase Price (£)
                  </label>
                  <input
                    type="number"
                    name="purchasePrice"
                    value={formData.purchasePrice}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Set vehicle purchase price"
                    className={`w-full border rounded-lg px-3 py-2 text-sm focus:ring outline-none ${
                      errors.purchasePrice
                        ? "border-red-400 focus:ring-red-100"
                        : "border-gray-200 focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                    }`}
                  />
                  {errors.purchasePrice && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.purchasePrice}
                    </p>
                  )}
                </div>
              </div>

              {/* Sold checkbox */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={sold}
                  onChange={() => setSold(!sold)}
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-600">
                  Click here only when you sell this vehicle.
                </span>
              </div>

              {/* Conditional sale fields */}
              {sold && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Sales or Disposal Date
                    </label>
                    <input
                      type="date"
                      name="saleDate"
                      value={formData.saleDate}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full border rounded-lg px-3 py-2 text-sm focus:ring outline-none ${
                        errors.saleDate
                          ? "border-red-400 focus:ring-red-100"
                          : "border-gray-200 focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                      }`}
                    />
                    {errors.saleDate && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.saleDate}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Sales or Disposal Cost (£)
                    </label>
                    <input
                      type="number"
                      name="salePrice"
                      value={formData.salePrice}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Set vehicle sale or disposal cost"
                      className={`w-full border rounded-lg px-3 py-2 text-sm focus:ring outline-none ${
                        errors.salePrice
                          ? "border-red-400 focus:ring-red-100"
                          : "border-gray-200 focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                      }`}
                    />
                    {errors.salePrice && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.salePrice}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Submit */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium shadow hover:bg-blue-700 transition"
                >
                  Save Vehicle
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
