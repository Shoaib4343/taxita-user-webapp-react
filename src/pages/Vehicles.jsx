import { useState, useEffect } from "react";
import {
  FaCar,
  FaSearch,
  FaPlus,
  FaCheckCircle,
  FaSpinner,
  FaCalendar,
  FaPoundSign,
  FaGasPump,
  FaPalette,
  FaEdit,
  FaTrash,
  FaEye,
} from "react-icons/fa";
import {
  vehiclesApi,
  dvlaEnquiryApi,
  vehiclesGetAllApi,
} from "../services/dashboard";
import toast from "react-hot-toast";

export default function VehiclesPage() {
  const [sold, setSold] = useState(false);
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [isLoadingDvla, setIsLoadingDvla] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dvlaDataFetched, setDvlaDataFetched] = useState(false);
  const [vehicles, setVehicles] = useState([]);
  const [isLoadingVehicles, setIsLoadingVehicles] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    yearOfManufacture: "",
    co2Emissions: "",
    fuelType: "",
    colour: "",
    monthOfFirstRegistration: "",
    purchaseDate: "",
    purchasePrice: "",
    saleDate: "",
    salePrice: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Fetch all vehicles on component mount
  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      setIsLoadingVehicles(true);
      const response = await vehiclesGetAllApi();
      console.log("Vehicles API response:", response);
      if (response.data) {
        setVehicles(response.data);
      }
    } catch (error) {
      console.error("Error fetching vehicles:", error);
      toast.error("Failed to fetch vehicles");
    } finally {
      setIsLoadingVehicles(false);
    }
  };

  const handleFetchDvlaData = async () => {
    if (!registrationNumber.trim()) {
      toast.error("Please enter a registration number");
      return;
    }

    if (
      !/^[A-Z]{2}\d{2}[A-Z]{3}$/.test(
        registrationNumber.replace(/\s/g, "").toUpperCase()
      )
    ) {
      toast.error("Invalid registration number format");
      return;
    }

    setIsLoadingDvla(true);
    try {
      const response = await dvlaEnquiryApi({
        registration_number: registrationNumber
          .replace(/\s/g, "")
          .toUpperCase(),
      });

      if (response.data && response.data.success) {
        const dvlaData = response.data.data;

        setFormData((prev) => ({
          ...prev,
          make: dvlaData.make || "",
          model: dvlaData.model || "",
          yearOfManufacture: dvlaData.yearOfManufacture?.toString() || "",
          co2Emissions: dvlaData.co2Emissions?.toString() || "",
          fuelType: dvlaData.fuelType || "",
          colour: dvlaData.colour || "",
          monthOfFirstRegistration: dvlaData.monthOfFirstRegistration || "",
        }));

        setDvlaDataFetched(true);
        toast.success("Vehicle details fetched successfully!");
      } else {
        toast.error(
          response.data?.message || "Failed to fetch vehicle details"
        );
      }
    } catch (error) {
      console.error("DVLA API Error:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Error fetching vehicle details";
      toast.error(errorMessage);
    } finally {
      setIsLoadingDvla(false);
    }
  };

  const validateField = (name, value) => {
    let error = "";

    if (!value?.toString().trim()) {
      switch (name) {
        case "make":
          error = "Vehicle make is required";
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

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = ["purchaseDate", "purchasePrice"];

    if (sold) {
      requiredFields.push("saleDate", "salePrice");
    }

    for (const field of requiredFields) {
      const err = validateField(field, formData[field]);
      if (err) newErrors[field] = err;
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

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    if (isNaN(date)) return "";
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const formatMonthYear = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    if (isNaN(date)) return "";
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}-${year}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!dvlaDataFetched) {
      toast.error("Please fetch vehicle details first");
      return;
    }

    if (!validateForm()) {
      toast.error("Please fix the errors before submitting");
      return;
    }

    setIsSubmitting(true);
    try {
      const submitData = {
        vehicle_regno: registrationNumber.replace(/\s/g, "").toUpperCase(),
        vehicle_make: formData.make,
        vehicle_modal: formData.model,
        year_of_manufacture: formData.yearOfManufacture,
        co2_emission: formData.co2Emissions,
        fuel_type: formData.fuelType,
        colour: formData.colour,
        month_of_first_registration: formatMonthYear(
          formData.monthOfFirstRegistration
        ),
        vehicle_purchase_date: formatDate(formData.purchaseDate),
        vehicle_purchase_price: formData.purchasePrice,
        vehicle_sold_out: sold ? 1 : 0,
      };

      if (sold) {
        submitData.vehicle_disposal_date = formatDate(formData.saleDate);
        submitData.vehicle_disposal_cost = formData.salePrice;
      }

      const response = await vehiclesApi(submitData);

      if (response.data && response.data.success) {
        const successMessage =
          response.data.message || "Vehicle saved successfully!";
        toast.success(successMessage);
        console.log("Vehicle saved:", response.data.data);

        // Reset form
        setFormData({
          make: "",
          model: "",
          yearOfManufacture: "",
          co2Emissions: "",
          fuelType: "",
          colour: "",
          monthOfFirstRegistration: "",
          purchaseDate: "",
          purchasePrice: "",
          saleDate: "",
          salePrice: "",
        });
        setRegistrationNumber("");
        setTouched({});
        setErrors({});
        setSold(false);
        setDvlaDataFetched(false);

        // Refresh vehicles list
        fetchVehicles();
      } else {
        const errorMessage = response.data?.message || "Failed to save vehicle";
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error("Save Vehicle Error:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Error saving vehicle";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVehicleClick = (vehicleId) => {
    setSelectedVehicleId(vehicleId);
    // You can add navigation logic here if needed
  };

  const handleDeleteVehicle = (vehicleId) => {
    // Add delete logic here
    console.log("Delete vehicle:", vehicleId);
    toast.success("Vehicle deleted successfully!");
  };

  const handleUpdateVehicle = (vehicleId) => {
    // Add update logic here
    console.log("Update vehicle:", vehicleId);
    toast.success("Update vehicle functionality!");
  };

  // Filter vehicles based on search query
  const filteredVehicles = vehicles.filter(
    (vehicle) =>
      vehicle.vehicle_regno.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.vehicle_make.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (vehicle.vehicle_modal &&
        vehicle.vehicle_modal.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Vehicle Management
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Add and manage your vehicle fleet
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-blue-50 px-3 py-2 rounded-lg">
              <span className="text-sm font-medium text-blue-700">
                Total Vehicles: {vehicles.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col h-[calc(100vh-10rem)] ">
          <div className="p-4 border-b border-gray-100 flex-shrink-0">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-gray-900">
                Your Vehicles
              </h2>
              <button className="text-xs text-blue-600 hover:text-blue-700 font-medium px-2 py-1 rounded-md hover:bg-blue-50 transition-colors">
                View All
              </button>
            </div>
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search vehicles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 pb-0">
            {isLoadingVehicles ? (
              <div className="flex items-center justify-center py-8">
                <FaSpinner className="w-6 h-6 animate-spin text-gray-400" />
                <span className="ml-2 text-gray-500">Loading vehicles...</span>
              </div>
            ) : (
              <div className="space-y-3 pb-4">
                {filteredVehicles.length === 0 ? (
                  <div className="text-center py-8">
                    <FaCar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 text-sm">No vehicles found</p>
                  </div>
                ) : (
                  filteredVehicles.map((vehicle) => (
                    <div
                      key={vehicle.id}
                      onClick={() => handleVehicleClick(vehicle.id)}
                      className={`group p-4 bg-white border rounded-xl hover:shadow-lg transition-all cursor-pointer ${
                        selectedVehicleId === vehicle.id
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-blue-300"
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          <div
                            className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                              vehicle.vehicle_sold_out === 1
                                ? "bg-orange-100"
                                : "bg-blue-100"
                            }`}
                          >
                            <FaCar
                              className={`w-6 h-6 ${
                                vehicle.vehicle_sold_out === 1
                                  ? "text-orange-600"
                                  : "text-blue-600"
                              }`}
                            />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="text-sm font-semibold text-gray-900 truncate">
                              {vehicle.vehicle_make}{" "}
                              {vehicle.vehicle_modal || ""}
                            </h3>
                            <span
                              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                vehicle.vehicle_sold_out === 1
                                  ? "bg-orange-100 text-orange-800"
                                  : "bg-green-100 text-green-800"
                              }`}
                            >
                              {vehicle.vehicle_sold_out === 1
                                ? "Sold"
                                : "Active"}
                            </span>
                          </div>
                          <p className="text-sm text-gray-900 font-mono mb-2 bg-yellow-100 px-2 py-1 rounded border-l-4 border-yellow-400 inline-block">
                            {vehicle.vehicle_regno}
                          </p>
                          <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                            <span className="flex items-center space-x-1">
                              <FaGasPump className="w-3 h-3" />
                              <span>{vehicle.fuel_type}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <FaCalendar className="w-3 h-3" />
                              <span>{vehicle.year_of_manufacture}</span>
                            </span>
                          </div>
                          <div className="flex items-center space-x-2 pt-2 border-t border-gray-100">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleUpdateVehicle(vehicle.id);
                              }}
                              className="flex items-center space-x-1 px-2 py-1 text-xs bg-green-50 text-green-700 hover:bg-green-100 rounded-md transition-colors"
                            >
                              <FaEdit className="w-3 h-3" />
                              <span>Edit</span>
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteVehicle(vehicle.id);
                              }}
                              className="flex items-center space-x-1 px-2 py-1 text-xs bg-red-50 text-red-700 hover:bg-red-100 rounded-md transition-colors"
                            >
                              <FaTrash className="w-3 h-3" />
                              <span>Delete</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          <div className="p-4 bg-white border-t border-gray-100 flex-shrink-0">
            <button className="w-full p-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-medium flex items-center justify-center space-x-2 transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-xl">
              <FaPlus className="w-4 h-4" />
              <span>Add New Vehicle</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 h-[calc(100vh-10rem)] overflow-hidden">
          <div className="h-full overflow-y-auto">
            <div className="p-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">
                      Add New Vehicle
                    </h2>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      <span>Step 1 of 2</span>
                    </div>
                  </div>

                  {/* Registration Section */}
                  <div className="mb-10">
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 flex flex-col items-center">
                      <h3 className="text-xl font-semibold text-gray-900 mb-6">
                        Enter Your Vehicle Registration Number
                      </h3>

                      {/* Number Plate Input */}
                      <div className="relative mb-6">
                        <div className="flex items-center rounded-lg overflow-hidden border-2 border-gray-800 bg-yellow-300 shadow-lg transform hover:scale-105 transition-transform">
                          {/* GB Badge */}
                          <div className="bg-blue-700 px-3 py-3 flex flex-col items-center justify-center">
                            <div className="w-4 h-4 border-2 border-yellow-300 rounded-full border-dashed"></div>
                            <span className="text-[10px] font-bold text-yellow-300 mt-1">
                              GB
                            </span>
                          </div>

                          {/* Plate Input */}
                          <div className="px-6 py-3 bg-yellow-300">
                            <input
                              type="text"
                              value={registrationNumber}
                              onChange={(e) => {
                                let val = e.target.value
                                  .toUpperCase()
                                  .replace(/[^A-Z0-9]/g, "");
                                if (val.length > 7) val = val.slice(0, 7);
                                setRegistrationNumber(val);
                              }}
                              placeholder="BD51SMR"
                              maxLength="7"
                              disabled={dvlaDataFetched}
                              className="bg-transparent text-black text-2xl font-extrabold tracking-widest text-center w-32 border-none outline-none placeholder-gray-600"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Fetch Button */}
                      <button
                        onClick={handleFetchDvlaData}
                        disabled={isLoadingDvla || dvlaDataFetched}
                        className={`w-full max-w-xs py-3 rounded-xl font-medium transition-all transform hover:scale-[1.02] shadow-md ${
                          dvlaDataFetched
                            ? "bg-green-100 text-green-700 cursor-not-allowed shadow-green-200"
                            : isLoadingDvla
                            ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                            : "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-blue-200"
                        }`}
                      >
                        {isLoadingDvla ? (
                          <div className="flex items-center justify-center space-x-2">
                            <FaSpinner className="w-5 h-5 animate-spin" />
                            <span>Fetching...</span>
                          </div>
                        ) : dvlaDataFetched ? (
                          <div className="flex items-center justify-center space-x-2">
                            <FaCheckCircle className="w-5 h-5" />
                            <span>Details Fetched</span>
                          </div>
                        ) : (
                          "Fetch Vehicle Details"
                        )}
                      </button>

                      {/* Hint */}
                      <p className="text-sm text-gray-500 mt-6 text-center max-w-md leading-relaxed">
                        Enter your vehicle registration number to automatically
                        fetch details from the{" "}
                        <span className="font-medium text-gray-700">
                          DVLA database
                        </span>
                        .
                      </p>
                    </div>
                  </div>

                  {/* Vehicle Details */}
                  <div
                    className={`transition-all duration-500 ${
                      !dvlaDataFetched
                        ? "opacity-40 pointer-events-none"
                        : "opacity-100"
                    }`}
                  >
                    <div className="space-y-8">
                      {/* Vehicle Information */}
                      <div className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-xl p-6 border border-slate-200">
                        <h3 className="text-lg font-medium text-gray-900 mb-6 flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span>Vehicle Information</span>
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                              Make
                            </label>
                            <input
                              type="text"
                              value={formData.make}
                              readOnly
                              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-800 focus:outline-none shadow-sm"
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                              Model{" "}
                              <span className="text-gray-400">(Optional)</span>
                            </label>
                            <input
                              type="text"
                              name="model"
                              value={formData.model}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="Enter model"
                              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                              Year
                            </label>
                            <input
                              type="text"
                              value={formData.yearOfManufacture}
                              readOnly
                              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-800 focus:outline-none shadow-sm"
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                              CO₂ Emissions
                            </label>
                            <input
                              type="text"
                              value={formData.co2Emissions}
                              readOnly
                              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-800 focus:outline-none shadow-sm"
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                              Fuel Type
                            </label>
                            <input
                              type="text"
                              value={formData.fuelType}
                              readOnly
                              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-800 focus:outline-none shadow-sm"
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                              Colour
                            </label>
                            <input
                              type="text"
                              value={formData.colour}
                              readOnly
                              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-800 focus:outline-none shadow-sm"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Purchase Information */}
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                        <h4 className="text-lg font-medium text-gray-900 mb-6 flex items-center space-x-2">
                          <FaPoundSign className="w-4 h-4 text-gray-600" />
                          <span>Purchase Information</span>
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                              Purchase Date{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="date"
                              name="purchaseDate"
                              value={formData.purchaseDate}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 shadow-sm ${
                                errors.purchaseDate
                                  ? "border-red-300 focus:ring-red-200"
                                  : "border-gray-200 focus:ring-blue-500 focus:border-blue-500"
                              }`}
                            />
                            {errors.purchaseDate && (
                              <p className="text-sm text-red-600 flex items-center space-x-1">
                                <span>⚠️</span>
                                <span>{errors.purchaseDate}</span>
                              </p>
                            )}
                          </div>

                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                              Purchase Price (£){" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="number"
                              name="purchasePrice"
                              value={formData.purchasePrice}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="0.00"
                              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 shadow-sm ${
                                errors.purchasePrice
                                  ? "border-red-300 focus:ring-red-200"
                                  : "border-gray-200 focus:ring-blue-500 focus:border-blue-500"
                              }`}
                            />
                            {errors.purchasePrice && (
                              <p className="text-sm text-red-600 flex items-center space-x-1">
                                <span>⚠️</span>
                                <span>{errors.purchasePrice}</span>
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Sale Information */}
                      <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6 border border-orange-200">
                        <div className="flex items-center space-x-3 mb-6">
                          <input
                            type="checkbox"
                            id="soldCheckbox"
                            checked={sold}
                            onChange={() => setSold(!sold)}
                            className="w-5 h-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                          />
                          <label
                            htmlFor="soldCheckbox"
                            className="text-lg font-medium text-gray-900 cursor-pointer"
                          >
                            Vehicle has been sold or disposed
                          </label>
                        </div>

                        {sold && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 animate-in slide-in-from-top duration-300">
                            <div className="space-y-2">
                              <label className="block text-sm font-medium text-gray-700">
                                Sale/Disposal Date{" "}
                                <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="date"
                                name="saleDate"
                                value={formData.saleDate}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 shadow-sm ${
                                  errors.saleDate
                                    ? "border-red-300 focus:ring-red-200"
                                    : "border-gray-200 focus:ring-orange-500 focus:border-orange-500"
                                }`}
                              />
                              {errors.saleDate && (
                                <p className="text-sm text-red-600 flex items-center space-x-1">
                                  <span>⚠️</span>
                                  <span>{errors.saleDate}</span>
                                </p>
                              )}
                            </div>

                            <div className="space-y-2">
                              <label className="block text-sm font-medium text-gray-700">
                                Sale/Disposal Price (£){" "}
                                <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="number"
                                name="salePrice"
                                value={formData.salePrice}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="0.00"
                                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 shadow-sm ${
                                  errors.salePrice
                                    ? "border-red-300 focus:ring-red-200"
                                    : "border-gray-200 focus:ring-orange-500 focus:border-orange-500"
                                }`}
                              />
                              {errors.salePrice && (
                                <p className="text-sm text-red-600 flex items-center space-x-1">
                                  <span>⚠️</span>
                                  <span>{errors.salePrice}</span>
                                </p>
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Submit Button */}
                      <div className="flex justify-end pt-6 border-t border-gray-200">
                        <button
                          onClick={handleSubmit}
                          disabled={!dvlaDataFetched || isSubmitting}
                          className={`px-10 py-4 rounded-xl font-medium transition-all transform hover:scale-105 shadow-lg ${
                            !dvlaDataFetched || isSubmitting
                              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                              : "bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 shadow-green-200 hover:shadow-xl"
                          }`}
                        >
                          {isSubmitting ? (
                            <div className="flex items-center space-x-2">
                              <FaSpinner className="w-5 h-5 animate-spin" />
                              <span>Saving Vehicle...</span>
                            </div>
                          ) : (
                            <div className="flex items-center space-x-2">
                              <FaCheckCircle className="w-5 h-5" />
                              <span>Save Vehicle</span>
                            </div>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
