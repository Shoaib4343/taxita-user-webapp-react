// import { useState, useEffect } from "react";
// import {
//   FaCar,
//   FaSearch,
//   FaPlus,
//   FaCheckCircle,
//   FaSpinner,
//   FaCalendar,
//   FaPoundSign,
//   FaGasPump,
//   FaEdit,
//   FaTrash,
//   FaTimes,
//   FaArrowLeft,
//   FaInfoCircle,
//   FaHistory,
//   FaCog,
// } from "react-icons/fa";
// import {
//   vehiclesApi,
//   dvlaEnquiryApi,
//   vehiclesGetAllApi,
//   vehiclesDeleteApi,
//   vehiclesUpdateApi,
//   vehiclesGetSingleApi, // Add this import
// } from "../services/dashboard";
// import toast from "react-hot-toast";
// import Swal from "sweetalert2";

// export default function VehiclesPage() {
//   const [sold, setSold] = useState(false);
//   const [registrationNumber, setRegistrationNumber] = useState("");
//   const [isLoadingDvla, setIsLoadingDvla] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [dvlaDataFetched, setDvlaDataFetched] = useState(false);
//   const [vehicles, setVehicles] = useState([]);
//   const [isLoadingVehicles, setIsLoadingVehicles] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedVehicleId, setSelectedVehicleId] = useState(null);
//   const [isUpdating, setIsUpdating] = useState(false);
//   const [updateVehicleData, setUpdateVehicleData] = useState(null);

//   // New states for single vehicle view
//   const [showSingleVehicle, setShowSingleVehicle] = useState(false);
//   const [singleVehicleData, setSingleVehicleData] = useState(null);
//   const [isLoadingSingleVehicle, setIsLoadingSingleVehicle] = useState(false);

//   const [formData, setFormData] = useState({
//     make: "",
//     model: "",
//     yearOfManufacture: "",
//     co2Emissions: "",
//     fuelType: "",
//     colour: "",
//     monthOfFirstRegistration: "",
//     purchaseDate: "",
//     purchasePrice: "",
//     saleDate: "",
//     salePrice: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [touched, setTouched] = useState({});

//   // Fetch all vehicles on component mount
//   useEffect(() => {
//     fetchVehicles();
//   }, []);

//   const fetchVehicles = async () => {
//     try {
//       setIsLoadingVehicles(true);
//       const response = await vehiclesGetAllApi();
//       console.log("Vehicles API response:", response);
//       if (response.data) {
//         setVehicles(response.data);
//       }
//     } catch (error) {
//       console.error("Error fetching vehicles:", error);
//       toast.error("Failed to fetch vehicles");
//     } finally {
//       setIsLoadingVehicles(false);
//     }
//   };

//   // New function to fetch single vehicle data
//   const fetchSingleVehicle = async (vehicleId) => {
//     try {
//       setIsLoadingSingleVehicle(true);
//       const response = await vehiclesGetSingleApi(vehicleId);
//       console.log("Single vehicle API response:", response);
//       if (response.data && response.data.vehicle) {
//         setSingleVehicleData(response.data.vehicle);
//         setShowSingleVehicle(true);
//       }
//     } catch (error) {
//       console.error("Error fetching single vehicle:", error);
//       toast.error("Failed to fetch vehicle details");
//     } finally {
//       setIsLoadingSingleVehicle(false);
//     }
//   };

//   const handleFetchDvlaData = async () => {
//     if (!registrationNumber.trim()) {
//       toast.error("Please enter a registration number");
//       return;
//     }

//     if (
//       !/^[A-Z]{2}\d{2}[A-Z]{3}$/.test(
//         registrationNumber.replace(/\s/g, "").toUpperCase()
//       )
//     ) {
//       toast.error("Invalid registration number format");
//       return;
//     }

//     setIsLoadingDvla(true);
//     try {
//       const response = await dvlaEnquiryApi({
//         registration_number: registrationNumber
//           .replace(/\s/g, "")
//           .toUpperCase(),
//       });

//       if (response.data && response.data.success) {
//         const dvlaData = response.data.data;

//         setFormData((prev) => ({
//           ...prev,
//           make: dvlaData.make || "",
//           model: dvlaData.model || "",
//           yearOfManufacture: dvlaData.yearOfManufacture?.toString() || "",
//           co2Emissions: dvlaData.co2Emissions?.toString() || "",
//           fuelType: dvlaData.fuelType || "",
//           colour: dvlaData.colour || "",
//           monthOfFirstRegistration: dvlaData.monthOfFirstRegistration || "",
//         }));

//         setDvlaDataFetched(true);
//         toast.success("Vehicle details fetched successfully!");
//       } else {
//         toast.error(
//           response.data?.message || "Failed to fetch vehicle details"
//         );
//       }
//     } catch (error) {
//       console.error("DVLA API Error:", error);
//       const errorMessage =
//         error.response?.data?.message ||
//         error.message ||
//         "Error fetching vehicle details";
//       toast.error(errorMessage);
//     } finally {
//       setIsLoadingDvla(false);
//     }
//   };

//   const validateField = (name, value) => {
//     let error = "";

//     if (!value?.toString().trim()) {
//       switch (name) {
//         case "make":
//           error = "Vehicle make is required";
//           break;
//         case "purchaseDate":
//           error = "Purchase date is required";
//           break;
//         case "purchasePrice":
//           error = "Purchase price is required";
//           break;
//         case "saleDate":
//           if (sold) error = "Sale date is required when sold";
//           break;
//         case "salePrice":
//           if (sold) error = "Sale price is required when sold";
//           break;
//         default:
//           break;
//       }
//     }

//     return error;
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     const requiredFields = ["purchaseDate", "purchasePrice"];

//     if (sold) {
//       requiredFields.push("saleDate", "salePrice");
//     }

//     for (const field of requiredFields) {
//       const err = validateField(field, formData[field]);
//       if (err) newErrors[field] = err;
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));

//     if (touched[name]) {
//       setErrors((prev) => ({
//         ...prev,
//         [name]: validateField(name, type === "checkbox" ? checked : value),
//       }));
//     }
//   };

//   const handleBlur = (e) => {
//     const { name, value } = e.target;
//     setTouched((prev) => ({ ...prev, [name]: true }));
//     setErrors((prev) => ({
//       ...prev,
//       [name]: validateField(name, value),
//     }));
//   };

//   const formatDate = (dateStr) => {
//     if (!dateStr) return "";
//     const date = new Date(dateStr);
//     if (isNaN(date)) return "";
//     const day = String(date.getDate()).padStart(2, "0");
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const year = date.getFullYear();
//     return `${day}-${month}-${year}`;
//   };

//   const formatDateForInput = (dateStr) => {
//     if (!dateStr) return "";
//     // Handle both DD-MM-YYYY and YYYY-MM-DD formats
//     if (dateStr.includes("-")) {
//       const parts = dateStr.split("-");
//       if (parts.length === 3) {
//         if (parts[0].length === 4) {
//           // Already in YYYY-MM-DD format
//           return dateStr;
//         } else {
//           // Convert DD-MM-YYYY to YYYY-MM-DD
//           return `${parts[2]}-${parts[1]}-${parts[0]}`;
//         }
//       }
//     }
//     return dateStr;
//   };

//   const formatMonthYear = (dateStr) => {
//     if (!dateStr) return "";
//     const date = new Date(dateStr);
//     if (isNaN(date)) return "";
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const year = date.getFullYear();
//     return `${month}-${year}`;
//   };

//   // New function to format display date
//   const formatDisplayDate = (dateStr) => {
//     if (!dateStr) return "Not specified";
//     const date = new Date(dateStr);
//     if (isNaN(date)) return "Invalid date";
//     return date.toLocaleDateString('en-GB', {
//       day: '2-digit',
//       month: 'long',
//       year: 'numeric'
//     });
//   };

//   const resetForm = () => {
//     setFormData({
//       make: "",
//       model: "",
//       yearOfManufacture: "",
//       co2Emissions: "",
//       fuelType: "",
//       colour: "",
//       monthOfFirstRegistration: "",
//       purchaseDate: "",
//       purchasePrice: "",
//       saleDate: "",
//       salePrice: "",
//     });
//     setRegistrationNumber("");
//     setTouched({});
//     setErrors({});
//     setSold(false);
//     setDvlaDataFetched(false);
//     setIsUpdating(false);
//     setUpdateVehicleData(null);
//     setShowSingleVehicle(false);
//     setSingleVehicleData(null);
//     setSelectedVehicleId(null);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!isUpdating && !dvlaDataFetched) {
//       toast.error("Please fetch vehicle details first");
//       return;
//     }

//     if (!validateForm()) {
//       toast.error("Please fix the errors before submitting");
//       return;
//     }

//     setIsSubmitting(true);
//     try {
//       const submitData = {
//         vehicle_regno: registrationNumber.replace(/\s/g, "").toUpperCase(),
//         vehicle_make: formData.make,
//         vehicle_modal: formData.model,
//         year_of_manufacture: formData.yearOfManufacture,
//         co2_emission: formData.co2Emissions,
//         fuel_type: formData.fuelType,
//         colour: formData.colour,
//         month_of_first_registration: formatMonthYear(
//           formData.monthOfFirstRegistration
//         ),
//         vehicle_purchase_date: formatDate(formData.purchaseDate),
//         vehicle_purchase_price: formData.purchasePrice,
//         vehicle_sold_out: sold ? 1 : 0,
//       };

//       if (sold) {
//         submitData.vehicle_disposal_date = formatDate(formData.saleDate);
//         submitData.vehicle_disposal_cost = formData.salePrice;
//       }

//       let response;
//       if (isUpdating) {
//         response = await vehiclesUpdateApi(updateVehicleData.id, submitData);
//       } else {
//         response = await vehiclesApi(submitData);
//       }

//       if (response.data && response.data.success) {
//         const successMessage = isUpdating
//           ? response.data.message || "Vehicle updated successfully!"
//           : response.data.message || "Vehicle saved successfully!";
//         toast.success(successMessage);
//         console.log("Vehicle saved:", response.data.data);

//         // Reset form
//         resetForm();

//         // Refresh vehicles list
//         fetchVehicles();
//       } else {
//         const errorMessage =
//           response.data?.message ||
//           (isUpdating ? "Failed to update vehicle" : "Failed to save vehicle");
//         toast.error(errorMessage);
//       }
//     } catch (error) {
//       console.error("Save Vehicle Error:", error);
//       const errorMessage =
//         error.response?.data?.message ||
//         error.message ||
//         (isUpdating ? "Error updating vehicle" : "Error saving vehicle");
//       toast.error(errorMessage);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleVehicleClick = async (vehicleId) => {
//     if (selectedVehicleId === vehicleId && showSingleVehicle) {
//       // If clicking on the same vehicle that's already selected, toggle the view
//       setShowSingleVehicle(false);
//       setSelectedVehicleId(null);
//       setSingleVehicleData(null);
//     } else {
//       setSelectedVehicleId(vehicleId);
//       await fetchSingleVehicle(vehicleId);
//     }
//   };

//   const handleDeleteVehicle = async (vehicleId) => {
//     const result = await Swal.fire({
//       title: "Are you sure?",
//       text: "This will permanently delete the vehicle record.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!",
//       cancelButtonText: "Cancel",
//     });
//     if (result.isConfirmed) {
//       try {
//         setIsSubmitting(true);
//         const response = await vehiclesDeleteApi(vehicleId);
//         if (response.data && response.data.success) {
//           toast.success(
//             response.data.message || "Vehicle deleted successfully"
//           );
//           fetchVehicles();
//           // Reset single vehicle view if the deleted vehicle was selected
//           if (selectedVehicleId === vehicleId) {
//             setShowSingleVehicle(false);
//             setSelectedVehicleId(null);
//             setSingleVehicleData(null);
//           }
//         }
//       } catch (error) {
//         console.error("Delete Vehicle Error:", error);
//         const errorMessage =
//           error.response?.data?.message ||
//           error.message ||
//           "Error deleting vehicle";
//         toast.error(errorMessage);
//       } finally {
//         setIsSubmitting(false);
//       }
//     }
//   };

//   const handleUpdateVehicle = (vehicle) => {
//     setIsUpdating(true);
//     setUpdateVehicleData(vehicle);
//     setShowSingleVehicle(false); // Hide single vehicle view

//     // Pre-populate form with existing vehicle data
//     setFormData({
//       make: vehicle.vehicle_make || "",
//       model: vehicle.vehicle_modal || "",
//       yearOfManufacture: vehicle.year_of_manufacture || "",
//       co2Emissions: vehicle.co2_emission || "",
//       fuelType: vehicle.fuel_type || "",
//       colour: vehicle.colour || "",
//       monthOfFirstRegistration: vehicle.month_of_first_registration || "",
//       purchaseDate: formatDateForInput(vehicle.vehicle_purchase_date) || "",
//       purchasePrice: vehicle.vehicle_purchase_price || "",
//       saleDate: formatDateForInput(vehicle.vehicle_disposal_date) || "",
//       salePrice: vehicle.vehicle_disposal_cost || "",
//     });

//     setRegistrationNumber(vehicle.vehicle_regno || "");
//     setSold(vehicle.vehicle_sold_out === 1 || vehicle.vehicle_sold_out === "1");
//     setDvlaDataFetched(true); // Skip DVLA fetch for updates
//     setErrors({});
//     setTouched({});
//   };

//   const handleCancelUpdate = () => {
//     resetForm();
//   };

//   const handleBackToForm = () => {
//     setShowSingleVehicle(false);
//     setSelectedVehicleId(null);
//     setSingleVehicleData(null);
//   };

//   // Filter vehicles based on search query
//   const filteredVehicles = vehicles.filter(
//     (vehicle) =>
//       vehicle.vehicle_regno.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       vehicle.vehicle_make.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       (vehicle.vehicle_modal &&
//         vehicle.vehicle_modal.toLowerCase().includes(searchQuery.toLowerCase()))
//   );

//   return (
//     <div className="flex flex-col h-full bg-gray-50">
//       {/* Header */}
//       <div className="bg-white border-b border-gray-200 px-6 py-4">
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900">
//               Vehicle Management
//             </h1>
//             <p className="text-sm text-gray-600 mt-1">
//               Vehicles listings goes here...
//             </p>
//           </div>
//           <div className="flex items-center space-x-4">
//             <div className="bg-blue-50 px-3 py-2 rounded-lg">
//               <span className="text-sm font-medium text-blue-700">
//                 Total Vehicles: {vehicles.length}
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="flex-1 flex overflow-hidden">
//         {/* Sidebar */}
//         <div className="w-80 bg-white border-r border-gray-200 flex flex-col h-[calc(100vh-10rem)]">
//           <div className="p-4 border-b border-gray-100 flex-shrink-0">
//             <div className="flex items-center justify-between mb-3">
//               <h2 className="text-lg font-semibold text-gray-900">
//                 Your Vehicles
//               </h2>
//               <button className="text-xs text-blue-600 hover:text-blue-700 font-medium px-2 py-1 rounded-md hover:bg-blue-50 transition-colors">
//                 View All
//               </button>
//             </div>
//             <div className="relative">
//               <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//               <input
//                 type="text"
//                 placeholder="Search vehicles..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               />
//             </div>
//           </div>

//           <div className="flex-1 overflow-y-auto p-4 pb-0">
//             {isLoadingVehicles ? (
//               <div className="flex items-center justify-center py-8">
//                 <FaSpinner className="w-6 h-6 animate-spin text-gray-400" />
//                 <span className="ml-2 text-gray-500">Loading vehicles...</span>
//               </div>
//             ) : (
//               <div className="space-y-3 pb-4">
//                 {filteredVehicles.length === 0 ? (
//                   <div className="text-center py-8">
//                     <FaCar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
//                     <p className="text-gray-500 text-sm">No vehicles found</p>
//                   </div>
//                 ) : (
//                   filteredVehicles.map((vehicle) => (
//                     <div
//                       key={vehicle.id}
//                       onClick={() => handleVehicleClick(vehicle.id)}
//                       className={`group p-4 bg-white border rounded-xl hover:shadow-lg transition-all cursor-pointer ${
//                         selectedVehicleId === vehicle.id
//                           ? "border-blue-500 bg-blue-50"
//                           : "border-gray-200 hover:border-blue-300"
//                       }`}
//                     >
//                       <div className="flex items-start space-x-3">
//                         <div className="flex-shrink-0">
//                           <div
//                             className={`w-12 h-12 rounded-xl flex items-center justify-center ${
//                               vehicle.vehicle_sold_out === 1 ||
//                               vehicle.vehicle_sold_out === "1"
//                                 ? "bg-orange-100"
//                                 : "bg-blue-100"
//                             }`}
//                           >
//                             <FaCar
//                               className={`w-6 h-6 ${
//                                 vehicle.vehicle_sold_out === 1 ||
//                                 vehicle.vehicle_sold_out === "1"
//                                   ? "text-orange-600"
//                                   : "text-blue-600"
//                               }`}
//                             />
//                           </div>
//                         </div>
//                         <div className="flex-1 min-w-0">
//                           <div className="flex items-center justify-between mb-1">
//                             <h3 className="text-sm font-semibold text-gray-900 truncate">
//                               {vehicle.vehicle_make}{" "}
//                               {vehicle.vehicle_modal || ""}
//                             </h3>
//                             <span
//                               className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
//                                 vehicle.vehicle_sold_out === 1 ||
//                                 vehicle.vehicle_sold_out === "1"
//                                   ? "bg-orange-100 text-orange-800"
//                                   : "bg-green-100 text-green-800"
//                               }`}
//                             >
//                               {vehicle.vehicle_sold_out === 1 ||
//                               vehicle.vehicle_sold_out === "1"
//                                 ? "Sold"
//                                 : "Active"}
//                             </span>
//                           </div>
//                           <p className="text-sm text-gray-900 font-mono mb-2 bg-yellow-100 px-2 py-1 rounded border-l-4 border-yellow-400 inline-block">
//                             {vehicle.vehicle_regno}
//                           </p>
//                           <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
//                             <span className="flex items-center space-x-1">
//                               <FaGasPump className="w-3 h-3" />
//                               <span>{vehicle.fuel_type}</span>
//                             </span>
//                             <span className="flex items-center space-x-1">
//                               <FaCalendar className="w-3 h-3" />
//                               <span>{vehicle.year_of_manufacture}</span>
//                             </span>
//                           </div>
//                           <div className="flex items-center space-x-2 pt-2 border-t border-gray-100">
//                             <button
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 handleUpdateVehicle(vehicle);
//                               }}
//                               className="flex items-center space-x-1 px-2 py-1 text-xs bg-green-50 text-green-700 hover:bg-green-100 rounded-md transition-colors"
//                             >
//                               <FaEdit className="w-3 h-3" />
//                               <span>Edit</span>
//                             </button>
//                             <button
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 handleDeleteVehicle(vehicle.id);
//                               }}
//                               disabled={isSubmitting}
//                               className={`flex items-center space-x-1 px-2 py-1 text-xs rounded-md transition-colors ${
//                                 isSubmitting
//                                   ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//                                   : "bg-red-50 text-red-700 hover:bg-red-100"
//                               }`}
//                             >
//                               <FaTrash className="w-3 h-3" />
//                               <span>Delete</span>
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))
//                 )}
//               </div>
//             )}
//           </div>

//           <div className="p-4 bg-white border-t border-gray-100 flex-shrink-0">
//             <button
//               onClick={resetForm}
//               className="w-full p-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-medium flex items-center justify-center space-x-2 transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
//             >
//               <FaPlus className="w-4 h-4" />
//               <span>Add New Vehicle</span>
//             </button>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="flex-1 h-[calc(100vh-10rem)] overflow-hidden">
//           <div className="h-full overflow-y-auto">
//             <div className="p-6">
//               {/* Single Vehicle View */}
//              {showSingleVehicle && singleVehicleData ? (
//   <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
//     {isLoadingSingleVehicle ? (
//       <div className="flex flex-col items-center justify-center py-20">
//         <FaSpinner className="w-8 h-8 animate-spin text-gray-400" />
//         <span className="mt-3 text-gray-500">Loading vehicle detail...</span>
//       </div>
//     ) : (
//       <div className="p-6">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-6">
//           <div className="min-w-0">
//             <h2 className="text-xl font-semibold text-gray-900 truncate">
//               {singleVehicleData.vehicle_make} {singleVehicleData.vehicle_modal || ""}
//             </h2>
//             <div className="flex items-center space-x-3 mt-2">
//               <span className="text-sm font-mono bg-yellow-50 px-3 py-1 rounded border border-yellow-300 text-yellow-800">
//                 {singleVehicleData.vehicle_regno}
//               </span>
//               <span
//                 className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
//                   singleVehicleData.vehicle_sold_out === 1
//                     ? "bg-orange-100 text-orange-800"
//                     : "bg-green-100 text-green-800"
//                 }`}
//               >
//                 {singleVehicleData.vehicle_sold_out === 1 ? "Sold" : "Active"}
//               </span>
//             </div>
//           </div>
//           <div className="flex items-center space-x-2">
//             <button
//               onClick={handleBackToForm}
//               className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
//             >
//               <FaArrowLeft className="inline w-4 h-4 mr-1" />
//               Back
//             </button>
//             <button
//               onClick={() => handleUpdateVehicle(singleVehicleData)}
//               className="flex items-center space-x-1 px-3 py-2 text-sm bg-green-50 text-green-700 hover:bg-green-100 rounded-lg transition-colors"
//             >
//               <FaEdit className="w-4 h-4" />
//               <span>Edit</span>
//             </button>
//           </div>
//         </div>

//         {/* Vehicle Details Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           {/* Vehicle Info */}
//           <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
//             <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center space-x-2">
//               <FaInfoCircle className="w-4 h-4 text-gray-500" />
//               <span>Vehicle Information</span>
//             </h3>
//             <dl className="space-y-3 text-sm">
//               <div className="flex justify-between border-b border-gray-100 pb-2">
//                 <dt className="text-gray-600">Make</dt>
//                 <dd className="text-gray-900 font-medium">{singleVehicleData.vehicle_make || "Not specified"}</dd>
//               </div>
//               <div className="flex justify-between border-b border-gray-100 pb-2">
//                 <dt className="text-gray-600">Model</dt>
//                 <dd className="text-gray-900 font-medium">{singleVehicleData.vehicle_modal || "Not specified"}</dd>
//               </div>
//               <div className="flex justify-between border-b border-gray-100 pb-2">
//                 <dt className="text-gray-600">Year</dt>
//                 <dd className="text-gray-900 font-medium">{singleVehicleData.year_of_manufacture || "Not specified"}</dd>
//               </div>
//               <div className="flex justify-between border-b border-gray-100 pb-2">
//                 <dt className="text-gray-600">Fuel</dt>
//                 <dd className="text-gray-900 font-medium flex items-center space-x-1">
//                   <FaGasPump className="w-3 h-3 text-gray-500" />
//                   <span>{singleVehicleData.fuel_type || "Not specified"}</span>
//                 </dd>
//               </div>
//               <div className="flex justify-between border-b border-gray-100 pb-2">
//                 <dt className="text-gray-600">Colour</dt>
//                 <dd className="text-gray-900 font-medium">{singleVehicleData.colour || "Not specified"}</dd>
//               </div>
//               <div className="flex justify-between">
//                 <dt className="text-gray-600">CO₂</dt>
//                 <dd className="text-gray-900 font-medium">
//                   {singleVehicleData.co2_emission ? `${singleVehicleData.co2_emission} g/km` : "Not specified"}
//                 </dd>
//               </div>
//             </dl>
//           </div>

//           {/* Purchase Info */}
//           <div className="bg-blue-50 rounded-xl p-5 border border-blue-200">
//             <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center space-x-2">
//               <FaPoundSign className="w-4 h-4 text-gray-500" />
//               <span>Purchase Information</span>
//             </h3>
//             <dl className="space-y-3 text-sm">
//               <div className="flex justify-between border-b border-blue-100 pb-2">
//                 <dt className="text-gray-600">Purchase Date</dt>
//                 <dd className="text-gray-900 font-medium">{formatDisplayDate(singleVehicleData.vehicle_purchase_date)}</dd>
//               </div>
//               <div className="flex justify-between border-b border-blue-100 pb-2">
//                 <dt className="text-gray-600">Price</dt>
//                 <dd className="text-gray-900 font-medium">£{singleVehicleData.vehicle_purchase_price || "0.00"}</dd>
//               </div>
//               <div className="flex justify-between">
//                 <dt className="text-gray-600">First Registration</dt>
//                 <dd className="text-gray-900 font-medium">{formatDisplayDate(singleVehicleData.month_of_first_registration)}</dd>
//               </div>
//             </dl>
//           </div>

//           {/* Sale Info */}
//           {singleVehicleData.vehicle_sold_out === 1 && (
//             <div className="bg-orange-50 rounded-xl p-5 border border-orange-200">
//               <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center space-x-2">
//                 <FaHistory className="w-4 h-4 text-gray-500" />
//                 <span>Sale Information</span>
//               </h3>
//               <dl className="space-y-3 text-sm">
//                 <div className="flex justify-between border-b border-orange-100 pb-2">
//                   <dt className="text-gray-600">Sale Date</dt>
//                   <dd className="text-gray-900 font-medium">{formatDisplayDate(singleVehicleData.vehicle_disposal_date)}</dd>
//                 </div>
//                 <div className="flex justify-between">
//                   <dt className="text-gray-600">Sale Price</dt>
//                   <dd className="text-gray-900 font-medium">£{singleVehicleData.vehicle_disposal_cost || "0.00"}</dd>
//                 </div>
//               </dl>
//             </div>
//           )}
//         </div>

//         {/* Actions */}
//         <div className="mt-6 flex justify-end space-x-3 pt-4 border-t border-gray-100">
//           <button
//             onClick={() => handleDeleteVehicle(singleVehicleData.id)}
//             disabled={isSubmitting}
//             className={`flex items-center space-x-1 px-4 py-2 text-sm rounded-lg font-medium transition-colors ${
//               isSubmitting
//                 ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//                 : "bg-red-50 text-red-700 hover:bg-red-100"
//             }`}
//           >
//             <FaTrash className="w-4 h-4" />
//             <span>Delete</span>
//           </button>
//           <button
//             onClick={() => handleUpdateVehicle(singleVehicleData)}
//             className="flex items-center space-x-1 px-4 py-2 text-sm bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 rounded-lg font-medium shadow-sm"
//           >
//             <FaEdit className="w-4 h-4" />
//             <span>Edit</span>
//           </button>
//         </div>
//       </div>
//     )}
//   </div>

// ) : (
//                 /* Add/Edit Vehicle Form */
//                 <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
//                   <div className="p-6">
//                     <div className="flex items-center justify-between mb-6">
//                       <h2 className="text-xl font-semibold text-gray-900">
//                         {isUpdating ? "Update Vehicle" : "Add New Vehicle"}
//                       </h2>
//                       <div className="flex items-center space-x-3">
//                         {isUpdating && (
//                           <button
//                             onClick={handleCancelUpdate}
//                             className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
//                           >
//                             <FaTimes className="w-4 h-4" />
//                             <span>Cancel</span>
//                           </button>
//                         )}
//                         <div className="flex items-center space-x-2 text-sm text-gray-500">
//                           <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
//                           <span>{isUpdating ? "Update Mode" : "Step 1 of 2"}</span>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Registration Section */}
//                     {!isUpdating && (
//                       <div className="mb-10">
//                         <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 flex flex-col items-center">
//                           <h3 className="text-xl font-semibold text-gray-900 mb-6">
//                             Enter Your Vehicle Registration Number
//                           </h3>

//                           {/* Number Plate Input */}
//                           <div className="relative mb-6">
//                             <div className="flex items-center rounded-lg overflow-hidden border-2 border-gray-800 bg-yellow-300 shadow-lg transform hover:scale-105 transition-transform">
//                               {/* GB Badge */}
//                               <div className="bg-blue-700 px-3 py-3 flex flex-col items-center justify-center">
//                                 <div className="w-4 h-4 border-2 border-yellow-300 rounded-full border-dashed"></div>
//                                 <span className="text-[10px] font-bold text-yellow-300 mt-1">
//                                   GB
//                                 </span>
//                               </div>

//                               {/* Plate Input */}
//                               <div className="px-6 py-3 bg-yellow-300">
//                                 <input
//                                   type="text"
//                                   value={registrationNumber}
//                                   onChange={(e) => {
//                                     let val = e.target.value
//                                       .toUpperCase()
//                                       .replace(/[^A-Z0-9]/g, "");
//                                     if (val.length > 7) val = val.slice(0, 7);
//                                     setRegistrationNumber(val);
//                                   }}
//                                   placeholder="BD51SMR"
//                                   maxLength="7"
//                                   disabled={dvlaDataFetched}
//                                   className="bg-transparent text-black text-2xl font-extrabold tracking-widest text-center w-32 border-none outline-none placeholder-gray-600"
//                                 />
//                               </div>
//                             </div>
//                           </div>

//                           {/* Fetch Button */}
//                           <button
//                             onClick={handleFetchDvlaData}
//                             disabled={isLoadingDvla || dvlaDataFetched}
//                             className={`w-full max-w-xs py-3 rounded-xl font-medium transition-all transform hover:scale-[1.02] shadow-md ${
//                               dvlaDataFetched
//                                 ? "bg-green-100 text-green-700 cursor-not-allowed shadow-green-200"
//                                 : isLoadingDvla
//                                 ? "bg-gray-100 text-gray-500 cursor-not-allowed"
//                                 : "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-blue-200"
//                             }`}
//                           >
//                             {isLoadingDvla ? (
//                               <div className="flex items-center justify-center space-x-2">
//                                 <FaSpinner className="w-5 h-5 animate-spin" />
//                                 <span>Fetching...</span>
//                               </div>
//                             ) : dvlaDataFetched ? (
//                               <div className="flex items-center justify-center space-x-2">
//                                 <FaCheckCircle className="w-5 h-5" />
//                                 <span>Details Fetched</span>
//                               </div>
//                             ) : (
//                               "Fetch Vehicle Details"
//                             )}
//                           </button>

//                           {/* Hint */}
//                           <p className="text-sm text-gray-500 mt-6 text-center max-w-md leading-relaxed">
//                             Enter your vehicle registration number to automatically
//                             fetch details from the{" "}
//                             <span className="font-medium text-gray-700">
//                               DVLA database
//                             </span>
//                             .
//                           </p>
//                         </div>
//                       </div>
//                     )}

//                     {/* Vehicle Details */}
//                     <div
//                       className={`transition-all duration-500 ${
//                         !dvlaDataFetched && !isUpdating
//                           ? "opacity-40 pointer-events-none"
//                           : "opacity-100"
//                       }`}
//                     >
//                       <div className="space-y-8">
//                         {/* Registration Number for Update Mode */}
//                         {isUpdating && (
//                           <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-6 border border-yellow-200">
//                             <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center space-x-2">
//                               <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
//                               <span>Vehicle Registration</span>
//                             </h3>
//                             <div className="space-y-2">
//                               <label className="block text-sm font-medium text-gray-700">
//                                 Registration Number
//                               </label>
//                               <input
//                                 type="text"
//                                 value={registrationNumber}
//                                 onChange={(e) => {
//                                   let val = e.target.value
//                                     .toUpperCase()
//                                     .replace(/[^A-Z0-9]/g, "");
//                                   if (val.length > 7) val = val.slice(0, 7);
//                                   setRegistrationNumber(val);
//                                 }}
//                                 className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 shadow-sm font-mono text-lg"
//                               />
//                             </div>
//                           </div>
//                         )}

//                         {/* Vehicle Information */}
//                         <div className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-xl p-6 border border-slate-200">
//                           <h3 className="text-lg font-medium text-gray-900 mb-6 flex items-center space-x-2">
//                             <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
//                             <span>Vehicle Information</span>
//                           </h3>
//                           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                             <div className="space-y-2">
//                               <label className="block text-sm font-medium text-gray-700">
//                                 Make <span className="text-red-500">*</span>
//                               </label>
//                               <input
//                                 type="text"
//                                 name="make"
//                                 value={formData.make}
//                                 onChange={handleChange}
//                                 onBlur={handleBlur}
//                                 readOnly={!isUpdating}
//                                 className={`w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-800 focus:outline-none shadow-sm ${
//                                   isUpdating
//                                     ? "focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                                     : "bg-white"
//                                 }`}
//                               />
//                               {errors.make && (
//                                 <p className="text-sm text-red-600 flex items-center space-x-1">
//                                   <span>⚠️</span>
//                                   <span>{errors.make}</span>
//                                 </p>
//                               )}
//                             </div>

//                             <div className="space-y-2">
//                               <label className="block text-sm font-medium text-gray-700">
//                                 Model{" "}
//                                 <span className="text-gray-400">(Optional)</span>
//                               </label>
//                               <input
//                                 type="text"
//                                 name="model"
//                                 value={formData.model}
//                                 onChange={handleChange}
//                                 onBlur={handleBlur}
//                                 placeholder="Enter model"
//                                 className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
//                               />
//                             </div>

//                             <div className="space-y-2">
//                               <label className="block text-sm font-medium text-gray-700">
//                                 Year
//                               </label>
//                               <input
//                                 type="text"
//                                 name="yearOfManufacture"
//                                 value={formData.yearOfManufacture}
//                                 onChange={handleChange}
//                                 onBlur={handleBlur}
//                                 readOnly={!isUpdating}
//                                 className={`w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-800 focus:outline-none shadow-sm ${
//                                   isUpdating
//                                     ? "focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                                     : "bg-white"
//                                 }`}
//                               />
//                             </div>

//                             <div className="space-y-2">
//                               <label className="block text-sm font-medium text-gray-700">
//                                 CO₂ Emissions
//                               </label>
//                               <input
//                                 type="text"
//                                 name="co2Emissions"
//                                 value={formData.co2Emissions}
//                                 onChange={handleChange}
//                                 onBlur={handleBlur}
//                                 readOnly={!isUpdating}
//                                 className={`w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-800 focus:outline-none shadow-sm ${
//                                   isUpdating
//                                     ? "focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                                     : "bg-white"
//                                 }`}
//                               />
//                             </div>

//                             <div className="space-y-2">
//                               <label className="block text-sm font-medium text-gray-700">
//                                 Fuel Type
//                               </label>
//                               <input
//                                 type="text"
//                                 name="fuelType"
//                                 value={formData.fuelType}
//                                 onChange={handleChange}
//                                 onBlur={handleBlur}
//                                 readOnly={!isUpdating}
//                                 className={`w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-800 focus:outline-none shadow-sm ${
//                                   isUpdating
//                                     ? "focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                                     : "bg-white"
//                                 }`}
//                               />
//                             </div>

//                             <div className="space-y-2">
//                               <label className="block text-sm font-medium text-gray-700">
//                                 Colour
//                               </label>
//                               <input
//                                 type="text"
//                                 name="colour"
//                                 value={formData.colour}
//                                 onChange={handleChange}
//                                 onBlur={handleBlur}
//                                 readOnly={!isUpdating}
//                                 className={`w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-800 focus:outline-none shadow-sm ${
//                                   isUpdating
//                                     ? "focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                                     : "bg-white"
//                                 }`}
//                               />
//                             </div>
//                           </div>
//                         </div>

//                         {/* Purchase Information */}
//                         <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
//                           <h4 className="text-lg font-medium text-gray-900 mb-6 flex items-center space-x-2">
//                             <FaPoundSign className="w-4 h-4 text-gray-600" />
//                             <span>Purchase Information</span>
//                           </h4>
//                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             <div className="space-y-2">
//                               <label className="block text-sm font-medium text-gray-700">
//                                 Purchase Date{" "}
//                                 <span className="text-red-500">*</span>
//                               </label>
//                               <input
//                                 type="date"
//                                 name="purchaseDate"
//                                 value={formData.purchaseDate}
//                                 onChange={handleChange}
//                                 onBlur={handleBlur}
//                                 className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 shadow-sm ${
//                                   errors.purchaseDate
//                                     ? "border-red-300 focus:ring-red-200"
//                                     : "border-gray-200 focus:ring-blue-500 focus:border-blue-500"
//                                 }`}
//                               />
//                               {errors.purchaseDate && (
//                                 <p className="text-sm text-red-600 flex items-center space-x-1">
//                                   <span>⚠️</span>
//                                   <span>{errors.purchaseDate}</span>
//                                 </p>
//                               )}
//                             </div>

//                             <div className="space-y-2">
//                               <label className="block text-sm font-medium text-gray-700">
//                                 Purchase Price (£){" "}
//                                 <span className="text-red-500">*</span>
//                               </label>
//                               <input
//                                 type="number"
//                                 name="purchasePrice"
//                                 value={formData.purchasePrice}
//                                 onChange={handleChange}
//                                 onBlur={handleBlur}
//                                 placeholder="0.00"
//                                 className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 shadow-sm ${
//                                   errors.purchasePrice
//                                     ? "border-red-300 focus:ring-red-200"
//                                     : "border-gray-200 focus:ring-blue-500 focus:border-blue-500"
//                                 }`}
//                               />
//                               {errors.purchasePrice && (
//                                 <p className="text-sm text-red-600 flex items-center space-x-1">
//                                   <span>⚠️</span>
//                                   <span>{errors.purchasePrice}</span>
//                                 </p>
//                               )}
//                             </div>
//                           </div>
//                         </div>

//                         {/* Sale Information */}
//                         <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6 border border-orange-200">
//                           <div className="flex items-center space-x-3 mb-6">
//                             <input
//                               type="checkbox"
//                               id="soldCheckbox"
//                               checked={sold}
//                               onChange={() => setSold(!sold)}
//                               className="w-5 h-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
//                             />
//                             <label
//                               htmlFor="soldCheckbox"
//                               className="text-lg font-medium text-gray-900 cursor-pointer"
//                             >
//                               {isUpdating
//                                 ? "Vehicle has been sold"
//                                 : "Click here only when you sell this vehicle."
//                               }
//                             </label>
//                           </div>

//                           {sold && (
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 animate-in slide-in-from-top duration-300">
//                               <div className="space-y-2">
//                                 <label className="block text-sm font-medium text-gray-700">
//                                   Sale/Disposal Date{" "}
//                                   <span className="text-red-500">*</span>
//                                 </label>
//                                 <input
//                                   type="date"
//                                   name="saleDate"
//                                   value={formData.saleDate}
//                                   onChange={handleChange}
//                                   onBlur={handleBlur}
//                                   className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 shadow-sm ${
//                                     errors.saleDate
//                                       ? "border-red-300 focus:ring-red-200"
//                                       : "border-gray-200 focus:ring-orange-500 focus:border-orange-500"
//                                   }`}
//                                 />
//                                 {errors.saleDate && (
//                                   <p className="text-sm text-red-600 flex items-center space-x-1">
//                                     <span>⚠️</span>
//                                     <span>{errors.saleDate}</span>
//                                   </p>
//                                 )}
//                               </div>

//                               <div className="space-y-2">
//                                 <label className="block text-sm font-medium text-gray-700">
//                                   Sale/Disposal Price (£){" "}
//                                   <span className="text-red-500">*</span>
//                                 </label>
//                                 <input
//                                   type="number"
//                                   name="salePrice"
//                                   value={formData.salePrice}
//                                   onChange={handleChange}
//                                   onBlur={handleBlur}
//                                   placeholder="0.00"
//                                   className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 shadow-sm ${
//                                     errors.salePrice
//                                       ? "border-red-300 focus:ring-red-200"
//                                       : "border-gray-200 focus:ring-orange-500 focus:border-orange-500"
//                                   }`}
//                                 />
//                                 {errors.salePrice && (
//                                   <p className="text-sm text-red-600 flex items-center space-x-1">
//                                     <span>⚠️</span>
//                                     <span>{errors.salePrice}</span>
//                                   </p>
//                                 )}
//                               </div>
//                             </div>
//                           )}
//                         </div>

//                         {/* Submit Button */}
//                         <div className="flex justify-end pt-6 border-t border-gray-200">
//                           <button
//                             onClick={handleSubmit}
//                             disabled={(!dvlaDataFetched && !isUpdating) || isSubmitting}
//                             className={`px-10 py-4 rounded-xl font-medium transition-all transform hover:scale-105 shadow-lg ${
//                               (!dvlaDataFetched && !isUpdating) || isSubmitting
//                                 ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                                 : isUpdating
//                                 ? "bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 shadow-green-200 hover:shadow-xl"
//                                 : "bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 shadow-green-200 hover:shadow-xl"
//                             }`}
//                           >
//                             {isSubmitting ? (
//                               <div className="flex items-center space-x-2">
//                                 <FaSpinner className="w-5 h-5 animate-spin" />
//                                 <span>
//                                   {isUpdating ? "Updating Vehicle..." : "Saving Vehicle..."}
//                                 </span>
//                               </div>
//                             ) : (
//                               <div className="flex items-center space-x-2">
//                                 <FaCheckCircle className="w-5 h-5" />
//                                 <span>
//                                   {isUpdating ? "Update Vehicle" : "Save Vehicle"}
//                                 </span>
//                               </div>
//                             )}
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }











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
  FaEdit,
  FaTrash,
  FaTimes,
  FaArrowLeft,
  FaInfoCircle,
  FaHistory,
} from "react-icons/fa";
import {
  vehiclesApi,
  dvlaEnquiryApi,
  vehiclesGetAllApi,
  vehiclesDeleteApi,
  vehiclesUpdateApi,
  vehiclesGetSingleApi,
} from "../services/dashboard";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import PageHeader from "../components/PageHeader";
import { useTradingYear } from "../context/TradingYearContext";

// Loading Skeleton Component
const LoadingSkeleton = () => (
  <div className="flex flex-col h-full rounded-2xl bg-gray-50">
    {/* Header Skeleton */}
    <div className="bg-white border-b rounded-2xl border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-blue-100 rounded-xl animate-pulse"></div>
          <div className="space-y-2">
            <div className="h-8 bg-gray-200 rounded w-64 animate-pulse"></div>
            <div className="h-5 bg-gray-200 rounded w-48 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>

    <div className="flex-1 flex overflow-hidden">
      {/* Sidebar Skeleton */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-100">
          <div className="h-6 bg-gray-200 rounded w-32 mb-3 animate-pulse"></div>
          <div className="h-10 bg-gray-100 rounded-lg animate-pulse"></div>
        </div>
        <div className="flex-1 p-4 space-y-3">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="p-4 bg-white border border-gray-200 rounded-xl animate-pulse"
            >
              <div className="flex items-start space-x-3">
                <div className="w-12 h-12 bg-gray-100 rounded-xl"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="flex-1 p-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-6">
          <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
          <div className="h-40 bg-gray-100 rounded-xl animate-pulse"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-20 bg-gray-100 rounded-xl animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

// UK Number Plate Component
const UKNumberPlate = ({
  value,
  onChange,
  disabled = false,
  onFetch,
  isLoading = false,
  dataFetched = false,
  showFetchButton = true,
}) => {
  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Number Plate */}
      <div className="relative">
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
              value={value}
              onChange={(e) => {
                let val = e.target.value
                  .toUpperCase()
                  .replace(/[^A-Z0-9]/g, "");
                if (val.length > 7) val = val.slice(0, 7);
                onChange(val);
              }}
              placeholder="BD51SMR"
              maxLength="7"
              disabled={disabled}
              className="bg-transparent text-black text-2xl font-extrabold tracking-widest text-center w-32 border-none outline-none placeholder-gray-600"
            />
          </div>
        </div>
      </div>

      {/* Fetch Button */}
      {showFetchButton && (
        <button
          onClick={onFetch}
          disabled={isLoading || dataFetched || disabled}
          className={`w-full max-w-xs py-3 rounded-xl font-medium transition-all transform hover:scale-[1.02] shadow-md ${
            dataFetched
              ? "bg-green-100 text-green-700 cursor-not-allowed shadow-green-200"
              : isLoading
              ? "bg-gray-100 text-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-blue-200"
          }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <FaSpinner className="w-5 h-5 animate-spin" />
              <span>Fetching...</span>
            </div>
          ) : dataFetched ? (
            <div className="flex items-center justify-center space-x-2">
              <FaCheckCircle className="w-5 h-5" />
              <span>Details Fetched</span>
            </div>
          ) : (
            "Fetch Vehicle Details"
          )}
        </button>
      )}
    </div>
  );
};

// Vehicle Card Component
const VehicleCard = ({
  vehicle,
  isSelected,
  onClick,
  onUpdate,
  onDelete,
  isSubmitting,
}) => {
  return (
    <div
      onClick={() => onClick(vehicle.id)}
      className={`group p-4 bg-white border rounded-xl hover:shadow-lg transition-all cursor-pointer ${
        isSelected
          ? "border-blue-500 bg-blue-50"
          : "border-gray-200 hover:border-blue-300"
      }`}
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              vehicle.vehicle_sold_out === 1 || vehicle.vehicle_sold_out === "1"
                ? "bg-orange-100"
                : "bg-blue-100"
            }`}
          >
            <FaCar
              className={`w-6 h-6 ${
                vehicle.vehicle_sold_out === 1 ||
                vehicle.vehicle_sold_out === "1"
                  ? "text-orange-600"
                  : "text-blue-600"
              }`}
            />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm font-semibold text-gray-900 truncate">
              {vehicle.vehicle_make} {vehicle.vehicle_modal || ""}
            </h3>
            <span
              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                vehicle.vehicle_sold_out === 1 ||
                vehicle.vehicle_sold_out === "1"
                  ? "bg-orange-100 text-orange-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {vehicle.vehicle_sold_out === 1 ||
              vehicle.vehicle_sold_out === "1"
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
                onUpdate(vehicle);
              }}
              className="flex items-center space-x-1 px-2 py-1 text-xs bg-green-50 text-green-700 hover:bg-green-100 rounded-md transition-colors"
            >
              <FaEdit className="w-3 h-3" />
              <span>Edit</span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(vehicle.id);
              }}
              disabled={isSubmitting}
              className={`flex items-center space-x-1 px-2 py-1 text-xs rounded-md transition-colors ${
                isSubmitting
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-red-50 text-red-700 hover:bg-red-100"
              }`}
            >
              <FaTrash className="w-3 h-3" />
              <span>Delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Step Indicator Component
const StepIndicator = ({ currentStep, dvlaDataFetched, isUpdating }) => {
  return (
    <div className="flex items-center justify-center space-x-4 mb-6">
      {/* Step 1 */}
      <div className="flex items-center space-x-2">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            dvlaDataFetched || isUpdating
              ? "bg-green-100 text-green-700"
              : currentStep === 1
              ? "bg-blue-100 text-blue-700"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          {dvlaDataFetched || isUpdating ? (
            <FaCheckCircle className="w-4 h-4" />
          ) : (
            "1"
          )}
        </div>
        <span
          className={`text-sm font-medium ${
            dvlaDataFetched || isUpdating
              ? "text-green-700"
              : currentStep === 1
              ? "text-blue-700"
              : "text-gray-500"
          }`}
        >
          Vehicle Registration
        </span>
      </div>

      {/* Divider */}
      <div
        className={`w-8 h-0.5 ${
          dvlaDataFetched || isUpdating ? "bg-green-300" : "bg-gray-300"
        }`}
      ></div>

      {/* Step 2 */}
      <div className="flex items-center space-x-2">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            dvlaDataFetched || isUpdating
              ? currentStep === 2
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 text-gray-500"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          2
        </div>
        <span
          className={`text-sm font-medium ${
            dvlaDataFetched || isUpdating
              ? currentStep === 2
                ? "text-blue-700"
                : "text-gray-500"
              : "text-gray-500"
          }`}
        >
          Vehicle Details
        </span>
      </div>
    </div>
  );
};

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
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateVehicleData, setUpdateVehicleData] = useState(null);
  const [showSingleVehicle, setShowSingleVehicle] = useState(false);
  const [singleVehicleData, setSingleVehicleData] = useState(null);
  const [isLoadingSingleVehicle, setIsLoadingSingleVehicle] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  // Trading year context
  const { activeTradingYear, apiRefreshTrigger } = useTradingYear();

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

  // Fetch all vehicles on component mount and when trading year changes
  useEffect(() => {
    fetchVehicles();
  }, [apiRefreshTrigger]);

  // Update current step based on form state
  useEffect(() => {
    if (dvlaDataFetched || isUpdating) {
      setCurrentStep(2);
    } else {
      setCurrentStep(1);
    }
  }, [dvlaDataFetched, isUpdating]);

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

  const fetchSingleVehicle = async (vehicleId) => {
    try {
      setIsLoadingSingleVehicle(true);
      const response = await vehiclesGetSingleApi(vehicleId);
      console.log("Single vehicle API response:", response);
      if (response.data && response.data.vehicle) {
        setSingleVehicleData(response.data.vehicle);
        setShowSingleVehicle(true);
      }
    } catch (error) {
      console.error("Error fetching single vehicle:", error);
      toast.error("Failed to fetch vehicle details");
    } finally {
      setIsLoadingSingleVehicle(false);
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

  const formatDateForInput = (dateStr) => {
    if (!dateStr) return "";
    if (dateStr.includes("-")) {
      const parts = dateStr.split("-");
      if (parts.length === 3) {
        if (parts[0].length === 4) {
          return dateStr;
        } else {
          return `${parts[2]}-${parts[1]}-${parts[0]}`;
        }
      }
    }
    return dateStr;
  };

  const formatMonthYear = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    if (isNaN(date)) return "";
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}-${year}`;
  };

  const formatDisplayDate = (dateStr) => {
    if (!dateStr) return "Not specified";
    const date = new Date(dateStr);
    if (isNaN(date)) return "Invalid date";
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const resetForm = () => {
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
    setIsUpdating(false);
    setUpdateVehicleData(null);
    setShowSingleVehicle(false);
    setSingleVehicleData(null);
    setSelectedVehicleId(null);
    setCurrentStep(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isUpdating && !dvlaDataFetched) {
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

      let response;
      if (isUpdating) {
        response = await vehiclesUpdateApi(updateVehicleData.id, submitData);
      } else {
        response = await vehiclesApi(submitData);
      }

      if (response.data && response.data.success) {
        const successMessage = isUpdating
          ? response.data.message || "Vehicle updated successfully!"
          : response.data.message || "Vehicle saved successfully!";
        toast.success(successMessage);
        console.log("Vehicle saved:", response.data.data);

        resetForm();
        fetchVehicles();
      } else {
        const errorMessage =
          response.data?.message ||
          (isUpdating ? "Failed to update vehicle" : "Failed to save vehicle");
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error("Save Vehicle Error:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        (isUpdating ? "Error updating vehicle" : "Error saving vehicle");
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVehicleClick = async (vehicleId) => {
    if (selectedVehicleId === vehicleId && showSingleVehicle) {
      setShowSingleVehicle(false);
      setSelectedVehicleId(null);
      setSingleVehicleData(null);
    } else {
      setSelectedVehicleId(vehicleId);
      await fetchSingleVehicle(vehicleId);
    }
  };

  const handleDeleteVehicle = async (vehicleId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the vehicle record.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });
    if (result.isConfirmed) {
      try {
        setIsSubmitting(true);
        const response = await vehiclesDeleteApi(vehicleId);
        if (response.data && response.data.success) {
          toast.success(
            response.data.message || "Vehicle deleted successfully"
          );
          fetchVehicles();
          if (selectedVehicleId === vehicleId) {
            setShowSingleVehicle(false);
            setSelectedVehicleId(null);
            setSingleVehicleData(null);
          }
        }
      } catch (error) {
        console.error("Delete Vehicle Error:", error);
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Error deleting vehicle";
        toast.error(errorMessage);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleUpdateVehicle = (vehicle) => {
    setIsUpdating(true);
    setUpdateVehicleData(vehicle);
    setShowSingleVehicle(false);

    setFormData({
      make: vehicle.vehicle_make || "",
      model: vehicle.vehicle_modal || "",
      yearOfManufacture: vehicle.year_of_manufacture || "",
      co2Emissions: vehicle.co2_emission || "",
      fuelType: vehicle.fuel_type || "",
      colour: vehicle.colour || "",
      monthOfFirstRegistration: vehicle.month_of_first_registration || "",
      purchaseDate: formatDateForInput(vehicle.vehicle_purchase_date) || "",
      purchasePrice: vehicle.vehicle_purchase_price || "",
      saleDate: formatDateForInput(vehicle.vehicle_disposal_date) || "",
      salePrice: vehicle.vehicle_disposal_cost || "",
    });

    setRegistrationNumber(vehicle.vehicle_regno || "");
    setSold(vehicle.vehicle_sold_out === 1 || vehicle.vehicle_sold_out === "1");
    setDvlaDataFetched(true);
    setErrors({});
    setTouched({});
  };

  const handleCancelUpdate = () => {
    resetForm();
  };

  const handleBackToForm = () => {
    setShowSingleVehicle(false);
    setSelectedVehicleId(null);
    setSingleVehicleData(null);
  };

  const filteredVehicles = vehicles.filter(
    (vehicle) =>
      vehicle.vehicle_regno.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.vehicle_make.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (vehicle.vehicle_modal &&
        vehicle.vehicle_modal.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (isLoadingVehicles) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="flex flex-col h-full bg-gray-50 rounded-2xl">
      {/* Header with PageHeader component */}
      <div className="bg-white rounded-t-2xl border-b border-gray-200 px-6 py-4">
        <PageHeader
          icon={<FaCar />}
          title="Vehicle Management"
          currentPage="Vehicles"
          showTradingYear={false}
          activeTradingYear={activeTradingYear}
          subtitle=" Your vehicle listings will appear here."
        />
        
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col h-[calc(100vh-12rem)]">
          <div className="p-4 border-b border-gray-100 flex-shrink-0">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-gray-900">
                Your Vehicles
              </h2>
              <button className="text-xs text-blue-600 hover:text-blue-700 font-medium px-2 py-1 rounded-md bg-blue-50 transition-colors">
                Total Vehicles: {vehicles.length}
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
                    <VehicleCard
                      key={vehicle.id}
                      vehicle={vehicle}
                      isSelected={selectedVehicleId === vehicle.id}
                      onClick={handleVehicleClick}
                      onUpdate={handleUpdateVehicle}
                      onDelete={handleDeleteVehicle}
                      isSubmitting={isSubmitting}
                    />
                  ))
                )}
              </div>
            )}
          </div>

          <div className="p-4 bg-white border-t border-gray-100 flex-shrink-0">
            <button
              onClick={resetForm}
              className="w-full p-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-medium flex items-center justify-center space-x-2 transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
            >
              <FaPlus className="w-4 h-4" />
              <span>Add New Vehicle</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 h-[calc(100vh-12rem)] overflow-hidden">
          <div className="h-full overflow-y-auto">
            <div className="p-6">
              {/* Single Vehicle View */}
              {showSingleVehicle && singleVehicleData ? (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                  {isLoadingSingleVehicle ? (
                    <div className="p-6 animate-pulse">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="min-w-0 space-y-3">
                          <div className="h-6 w-40 bg-gray-200 rounded"></div>
                          <div className="flex space-x-3">
                            <div className="h-6 w-24 bg-yellow-100 rounded"></div>
                            <div className="h-6 w-16 bg-green-100 rounded-full"></div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <div className="h-9 w-20 bg-gray-200 rounded-lg"></div>
                          <div className="h-9 w-20 bg-green-100 rounded-lg"></div>
                        </div>
                      </div>

                      {/* Vehicle Details Grid */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Vehicle Info Skeleton */}
                        <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 space-y-3">
                          <div className="h-5 w-40 bg-gray-200 rounded mb-4"></div>
                          {Array.from({ length: 6 }).map((_, i) => (
                            <div
                              key={i}
                              className="flex justify-between border-b border-gray-100 pb-2 last:border-0 last:pb-0"
                            >
                              <div className="h-4 w-24 bg-gray-200 rounded"></div>
                              <div className="h-4 w-32 bg-gray-300 rounded"></div>
                            </div>
                          ))}
                        </div>

                        {/* Purchase Info Skeleton */}
                        <div className="bg-blue-50 rounded-xl p-5 border border-blue-200 space-y-3">
                          <div className="h-5 w-48 bg-gray-200 rounded mb-4"></div>
                          {Array.from({ length: 3 }).map((_, i) => (
                            <div
                              key={i}
                              className="flex justify-between border-b border-blue-100 pb-2 last:border-0 last:pb-0"
                            >
                              <div className="h-4 w-28 bg-gray-200 rounded"></div>
                              <div className="h-4 w-24 bg-gray-300 rounded"></div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="mt-6 flex justify-end space-x-3 pt-4 border-t border-gray-100">
                        <div className="h-10 w-24 bg-red-100 rounded-lg"></div>
                        <div className="h-10 w-24 bg-green-100 rounded-lg"></div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-6">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="min-w-0">
                          <h2 className="text-xl font-semibold text-gray-900 truncate">
                            {singleVehicleData.vehicle_make}{" "}
                            {singleVehicleData.vehicle_modal || ""}
                          </h2>
                          <div className="flex items-center space-x-3 mt-2">
                            <span className="text-sm font-mono bg-yellow-50 px-3 py-1 rounded border border-yellow-300 text-yellow-800">
                              {singleVehicleData.vehicle_regno}
                            </span>
                            <span
                              className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                                singleVehicleData.vehicle_sold_out === 1
                                  ? "bg-orange-100 text-orange-800"
                                  : "bg-green-100 text-green-800"
                              }`}
                            >
                              {singleVehicleData.vehicle_sold_out === 1
                                ? "Sold"
                                : "Active"}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={handleBackToForm}
                            className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            <FaArrowLeft className="inline w-4 h-4 mr-1" />
                            Back
                          </button>
                          <button
                            onClick={() =>
                              handleUpdateVehicle(singleVehicleData)
                            }
                            className="flex items-center space-x-1 px-3 py-2 text-sm bg-green-50 text-green-700 hover:bg-green-100 rounded-lg transition-colors"
                          >
                            <FaEdit className="w-4 h-4" />
                            <span>Edit</span>
                          </button>
                        </div>
                      </div>

                      {/* Vehicle Details Grid */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Vehicle Info */}
                        <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                          <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                            <FaInfoCircle className="w-4 h-4 text-gray-500" />
                            <span>Vehicle Information</span>
                          </h3>
                          <dl className="space-y-3 text-sm">
                            <div className="flex justify-between border-b border-gray-100 pb-2">
                              <dt className="text-gray-600">Make</dt>
                              <dd className="text-gray-900 font-medium">
                                {singleVehicleData.vehicle_make ||
                                  "Not specified"}
                              </dd>
                            </div>
                            <div className="flex justify-between border-b border-gray-100 pb-2">
                              <dt className="text-gray-600">Model</dt>
                              <dd className="text-gray-900 font-medium">
                                {singleVehicleData.vehicle_modal ||
                                  "Not specified"}
                              </dd>
                            </div>
                            <div className="flex justify-between border-b border-gray-100 pb-2">
                              <dt className="text-gray-600">Year</dt>
                              <dd className="text-gray-900 font-medium">
                                {singleVehicleData.year_of_manufacture ||
                                  "Not specified"}
                              </dd>
                            </div>
                            <div className="flex justify-between border-b border-gray-100 pb-2">
                              <dt className="text-gray-600">Fuel</dt>
                              <dd className="text-gray-900 font-medium flex items-center space-x-1">
                                <FaGasPump className="w-3 h-3 text-gray-500" />
                                <span>
                                  {singleVehicleData.fuel_type ||
                                    "Not specified"}
                                </span>
                              </dd>
                            </div>
                            <div className="flex justify-between border-b border-gray-100 pb-2">
                              <dt className="text-gray-600">Colour</dt>
                              <dd className="text-gray-900 font-medium">
                                {singleVehicleData.colour || "Not specified"}
                              </dd>
                            </div>
                            <div className="flex justify-between">
                              <dt className="text-gray-600">CO₂</dt>
                              <dd className="text-gray-900 font-medium">
                                {singleVehicleData.co2_emission
                                  ? `${singleVehicleData.co2_emission} g/km`
                                  : "Not specified"}
                              </dd>
                            </div>
                          </dl>
                        </div>

                        {/* Purchase Info */}
                        <div className="bg-blue-50 rounded-xl p-5 border border-blue-200">
                          <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                            <FaPoundSign className="w-4 h-4 text-gray-500" />
                            <span>Purchase Information</span>
                          </h3>
                          <dl className="space-y-3 text-sm">
                            <div className="flex justify-between border-b border-blue-100 pb-2">
                              <dt className="text-gray-600">Purchase Date</dt>
                              <dd className="text-gray-900 font-medium">
                                {formatDisplayDate(
                                  singleVehicleData.vehicle_purchase_date
                                )}
                              </dd>
                            </div>
                            <div className="flex justify-between border-b border-blue-100 pb-2">
                              <dt className="text-gray-600">Price</dt>
                              <dd className="text-gray-900 font-medium">
                                £
                                {singleVehicleData.vehicle_purchase_price ||
                                  "0.00"}
                              </dd>
                            </div>
                            <div className="flex justify-between">
                              <dt className="text-gray-600">
                                First Registration
                              </dt>
                              <dd className="text-gray-900 font-medium">
                                {formatDisplayDate(
                                  singleVehicleData.month_of_first_registration
                                )}
                              </dd>
                            </div>
                          </dl>
                        </div>

                        {/* Sale Info */}
                        {singleVehicleData.vehicle_sold_out === 1 && (
                          <div className="bg-orange-50 rounded-xl p-5 border border-orange-200">
                            <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                              <FaHistory className="w-4 h-4 text-gray-500" />
                              <span>Sale Information</span>
                            </h3>
                            <dl className="space-y-3 text-sm">
                              <div className="flex justify-between border-b border-orange-100 pb-2">
                                <dt className="text-gray-600">Sale Date</dt>
                                <dd className="text-gray-900 font-medium">
                                  {formatDisplayDate(
                                    singleVehicleData.vehicle_disposal_date
                                  )}
                                </dd>
                              </div>
                              <div className="flex justify-between">
                                <dt className="text-gray-600">Sale Price</dt>
                                <dd className="text-gray-900 font-medium">
                                  £
                                  {singleVehicleData.vehicle_disposal_cost ||
                                    "0.00"}
                                </dd>
                              </div>
                            </dl>
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="mt-6 flex justify-end space-x-3 pt-4 border-t border-gray-100">
                        <button
                          onClick={() =>
                            handleDeleteVehicle(singleVehicleData.id)
                          }
                          disabled={isSubmitting}
                          className={`flex items-center space-x-1 px-4 py-2 text-sm rounded-lg font-medium transition-colors ${
                            isSubmitting
                              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                              : "bg-red-50 text-red-700 hover:bg-red-100"
                          }`}
                        >
                          <FaTrash className="w-4 h-4" />
                          <span>Delete</span>
                        </button>
                        <button
                          onClick={() => handleUpdateVehicle(singleVehicleData)}
                          className="flex items-center space-x-1 px-4 py-2 text-sm bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 rounded-lg font-medium shadow-sm"
                        >
                          <FaEdit className="w-4 h-4" />
                          <span>Edit</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Add/Edit Vehicle Form */
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold text-gray-900">
                        {isUpdating ? "Update Vehicle" : "Add New Vehicle"}
                      </h2>
                      <div className="flex items-center space-x-3">
                        {isUpdating && (
                          <button
                            onClick={handleCancelUpdate}
                            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            <FaTimes className="w-4 h-4" />
                            <span>Cancel</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Step Indicator */}
                    <StepIndicator
                      currentStep={currentStep}
                      dvlaDataFetched={dvlaDataFetched}
                      isUpdating={isUpdating}
                    />

                    {/* Registration Section */}
                    {!isUpdating && currentStep === 1 && (
                      <div className="mb-10">
                        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 flex flex-col items-center">
                          <h3 className="text-xl font-semibold text-gray-900 mb-6">
                            Enter Your Vehicle Registration Number
                          </h3>

                          <UKNumberPlate
                            value={registrationNumber}
                            onChange={setRegistrationNumber}
                            disabled={dvlaDataFetched}
                            onFetch={handleFetchDvlaData}
                            isLoading={isLoadingDvla}
                            dataFetched={dvlaDataFetched}
                          />

                          <p className="text-sm text-gray-500 mt-6 text-center max-w-md leading-relaxed">
                            Enter your vehicle registration number to
                            automatically fetch details from the{" "}
                            <span className="font-medium text-gray-700">
                              DVLA database
                            </span>
                            .
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Vehicle Details */}
                    <div
                      className={`transition-all duration-500 ${
                        !dvlaDataFetched && !isUpdating
                          ? "opacity-40 pointer-events-none"
                          : "opacity-100"
                      }`}
                    >
                      <div className="space-y-8">
                        {/* Registration Number for Update Mode */}
                        {isUpdating && (
                          <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-6 border border-yellow-200">
                            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center space-x-2">
                              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                              <span>Vehicle Registration</span>
                            </h3>
                            <div className="flex justify-center mb-4">
                              <UKNumberPlate
                                value={registrationNumber}
                                onChange={setRegistrationNumber}
                                disabled={false}
                                showFetchButton={false}
                              />
                            </div>
                          </div>
                        )}

                        {/* Vehicle Information */}
                        <div className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-xl p-6 border border-slate-200">
                          <h3 className="text-lg font-medium text-gray-900 mb-6 flex items-center space-x-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span>Vehicle Information</span>
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                              <label className="block text-sm font-medium text-gray-700">
                                Make <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="text"
                                name="make"
                                value={formData.make}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                readOnly={!isUpdating}
                                className={`w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-800 focus:outline-none shadow-sm ${
                                  isUpdating
                                    ? "focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    : "bg-white"
                                }`}
                              />
                              {errors.make && (
                                <p className="text-sm text-red-600 flex items-center space-x-1">
                                  <span>⚠️</span>
                                  <span>{errors.make}</span>
                                </p>
                              )}
                            </div>

                            <div className="space-y-2">
                              <label className="block text-sm font-medium text-gray-700">
                                Model{" "}
                                <span className="text-gray-400">
                                  (Optional)
                                </span>
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
                                name="yearOfManufacture"
                                value={formData.yearOfManufacture}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                readOnly={!isUpdating}
                                className={`w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-800 focus:outline-none shadow-sm ${
                                  isUpdating
                                    ? "focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    : "bg-white"
                                }`}
                              />
                            </div>

                            <div className="space-y-2">
                              <label className="block text-sm font-medium text-gray-700">
                                CO₂ Emissions
                              </label>
                              <input
                                type="text"
                                name="co2Emissions"
                                value={formData.co2Emissions}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                readOnly={!isUpdating}
                                className={`w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-800 focus:outline-none shadow-sm ${
                                  isUpdating
                                    ? "focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    : "bg-white"
                                }`}
                              />
                            </div>

                            <div className="space-y-2">
                              <label className="block text-sm font-medium text-gray-700">
                                Fuel Type
                              </label>
                              <input
                                type="text"
                                name="fuelType"
                                value={formData.fuelType}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                readOnly={!isUpdating}
                                className={`w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-800 focus:outline-none shadow-sm ${
                                  isUpdating
                                    ? "focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    : "bg-white"
                                }`}
                              />
                            </div>

                            <div className="space-y-2">
                              <label className="block text-sm font-medium text-gray-700">
                                Colour
                              </label>
                              <input
                                type="text"
                                name="colour"
                                value={formData.colour}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                readOnly={!isUpdating}
                                className={`w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-800 focus:outline-none shadow-sm ${
                                  isUpdating
                                    ? "focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    : "bg-white"
                                }`}
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
                              {isUpdating
                                ? "Vehicle has been sold"
                                : "Click here only when you sell this vehicle."}
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
                            disabled={
                              (!dvlaDataFetched && !isUpdating) || isSubmitting
                            }
                            className={`px-10 py-4 rounded-xl font-medium transition-all transform hover:scale-105 shadow-lg ${
                              (!dvlaDataFetched && !isUpdating) || isSubmitting
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                : isUpdating
                                ? "bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 shadow-green-200 hover:shadow-xl"
                                : "bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 shadow-green-200 hover:shadow-xl"
                            }`}
                          >
                            {isSubmitting ? (
                              <div className="flex items-center space-x-2">
                                <FaSpinner className="w-5 h-5 animate-spin" />
                                <span>
                                  {isUpdating
                                    ? "Updating Vehicle..."
                                    : "Saving Vehicle..."}
                                </span>
                              </div>
                            ) : (
                              <div className="flex items-center space-x-2">
                                <FaCheckCircle className="w-5 h-5" />
                                <span>
                                  {isUpdating
                                    ? "Update Vehicle"
                                    : "Save Vehicle"}
                                </span>
                              </div>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
