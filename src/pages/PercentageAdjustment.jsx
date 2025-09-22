// src/pages/PercentageAdjustment.jsx
import React, { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import {
  ChevronDown,
  Check,
  Car,
  Phone,
  Settings,
  Calculator,
  Save,
} from "lucide-react";
import {
  percentageAdjustmentsPostApi,
  percentageAdjustmentsGetAllApi,
  percentageAdjustmentsPutApi,
} from "../services/dashboard";
import { useTradingYear } from "../context/TradingYearContext";
import PageHeader from "../components/PageHeader";
import LoadingSkeleton from "../components/LoadingSkeleton";

// Custom Dropdown Component
const CustomDropdown = ({
  name,
  value,
  onChange,
  options,
  placeholder,
  icon,
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  // Filter options based on search term
  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (option) => {
    onChange({ target: { name, value: option } });
    setIsOpen(false);
    setSearchTerm("");
  };

  const displayValue = value
    ? options.includes("Yes")
      ? value
      : `${value}%`
    : "";

  return (
    <div ref={dropdownRef} className="relative">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full ${
          icon ? "pl-10" : "pl-4"
        } pr-10 py-3 bg-white border-2 rounded-xl text-gray-700 cursor-pointer transition-all duration-200 ${
          error
            ? "border-red-300 bg-red-50"
            : value
            ? "border-blue-300 bg-blue-50"
            : "border-gray-200 hover:border-gray-300"
        } ${isOpen ? "border-blue-500 ring-4 ring-blue-100" : ""}`}
      >
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className={value ? "text-gray-900" : "text-gray-500"}>
            {displayValue || placeholder}
          </span>
          <ChevronDown
            className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl max-h-64 overflow-hidden">
          {/* Search Input for percentage options */}
          {options.length > 10 && (
            <div className="p-3 border-b border-gray-100">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}

          {/* Options List */}
          <div className="max-h-48 overflow-y-auto">
            {filteredOptions.length === 0 ? (
              <div className="px-4 py-3 text-sm text-gray-500 text-center">
                No options found
              </div>
            ) : (
              filteredOptions.map((option) => {
                const isSelected = option === value;
                const displayOption = options.includes("Yes")
                  ? option
                  : `${option}%`;

                return (
                  <div
                    key={option}
                    onClick={() => handleSelect(option)}
                    className={`px-4 py-3 cursor-pointer transition-colors duration-150 flex items-center justify-between ${
                      isSelected
                        ? "bg-blue-50 text-blue-700 border-r-4 border-blue-500"
                        : "hover:bg-gray-50 text-gray-700"
                    }`}
                  >
                    <span
                      className={`text-sm ${isSelected ? "font-semibold" : ""}`}
                    >
                      {displayOption}
                    </span>
                    {isSelected && <Check className="w-4 h-4 text-blue-600" />}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const PercentageAdjustment = () => {
  const [formData, setFormData] = useState({
    car: "",
    telephone: "",
    override_mileage: "",
    got_another_job: "",
    cash: "",
    cardBank: "",
    accountContract: "",
    subContract: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [existingData, setExistingData] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // Get API refresh trigger from trading year context
  const { apiRefreshTrigger, activeTradingYear } = useTradingYear();

  // Fetch existing data
  const fetchExistingData = async () => {
    try {
      setIsLoading(true);
      const response = await percentageAdjustmentsGetAllApi();

      if (response.data) {
        const data = response.data;
        setExistingData(data);
        setIsUpdating(true);

        // Populate form with existing data
        setFormData({
          car: data.private_use_adj_car?.toString() || "",
          telephone: data.private_use_adj_phone?.toString() || "",
          override_mileage: data.override_mileage || "",
          got_another_job: data.got_another_job || "",
          cash: data.radio_rent_cash?.toString() || "",
          cardBank: data.radio_rent_card_bank?.toString() || "",
          accountContract: data.radio_rent_acc_contract?.toString() || "",
          subContract: data.radio_rent_sub_contract?.toString() || "",
        });

        toast.success("Existing data loaded successfully!");
      }
    } catch (error) {
      console.log("No existing data found, starting with empty form");
      setIsUpdating(false);
      // Reset form data when no existing data
      setFormData({
        car: "",
        telephone: "",
        override_mileage: "",
        got_another_job: "",
        cash: "",
        cardBank: "",
        accountContract: "",
        subContract: "",
      });
      setExistingData(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchExistingData();
  }, []);

  // Listen for trading year changes and refresh data
  useEffect(() => {
    if (apiRefreshTrigger > 0) {
      console.log(
        "PercentageAdjustment: Refreshing data due to trading year change"
      );
      fetchExistingData();
    }
  }, [apiRefreshTrigger]);

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // simple validation
    let newErrors = {};
    for (let key in formData) {
      if (!formData[key]) newErrors[key] = "This field is required.";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fill all fields.");
      setIsSubmitting(false);
      return;
    }

    // prepare data for API
    const apiData = {
      private_use_adj_car: parseInt(formData.car) || 0,
      private_use_adj_phone: parseInt(formData.telephone) || 0,
      override_mileage: formData.override_mileage,
      got_another_job: formData.got_another_job,
      radio_rent_cash: parseInt(formData.cash) || 0,
      radio_rent_card_bank: parseInt(formData.cardBank) || 0,
      radio_rent_acc_contract: parseInt(formData.accountContract) || 0,
      radio_rent_sub_contract: parseInt(formData.subContract) || 0,
    };

    try {
      console.log("Sending to API:", apiData);

      if (isUpdating && existingData?.id) {
        // Use PUT API for updates
        await percentageAdjustmentsPutApi(existingData.id, apiData);
        toast.success("Percentage adjustments updated successfully!");
      } else {
        // Use POST API for creation
        await percentageAdjustmentsPostApi(apiData);
        toast.success("Percentage adjustments saved successfully!");
        setIsUpdating(true);
      }

      // Fetch updated data
      await fetchExistingData();
    } catch (error) {
      console.error("API Error:", error);
      toast.error(
        error.response?.data?.message ||
          `Failed to ${
            isUpdating ? "update" : "save"
          } adjustments. Please try again.`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const percentageOptions = Array.from({ length: 101 }, (_, i) => i.toString());
  const yesNoOptions = ["Yes", "No"];

  const renderCustomDropdown = (
    name,
    value,
    options = percentageOptions,
    icon = null
  ) => (
    <div className="space-y-1">
      <CustomDropdown
        name={name}
        value={value}
        onChange={handleChange}
        options={options}
        placeholder={
          options === yesNoOptions ? "Select option" : "Select percentage"
        }
        icon={icon}
        error={errors[name]}
      />
      {errors[name] && (
        <p className="text-red-500 text-sm flex items-center gap-1 ml-1">
          <span className="w-1 h-1 bg-red-500 rounded-full"></span>
          {errors[name]}
        </p>
      )}
    </div>
  );

  const FormSection = ({ title, icon, children, description }) => (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-visible">
      <div className="bg-blue-50 px-6 py-4 rounded-t-2xl">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/80 rounded-lg">
            {React.cloneElement(icon, { className: "w-6 h-6 text-blue-700" })}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-blue-900">{title}</h2>
            {description && (
              <p className="text-blue-700 text-sm mt-1">{description}</p>
            )}
          </div>
        </div>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );

  if (isLoading) {
    return <LoadingSkeleton type="percentage-adjustment" />;
  }

  return (
    <div className="min-h-screen bg-white rounded-2xl">
      <div className="max-w-6xl mx-auto px-4 py-8">
       <PageHeader
  icon={<Calculator />}
  title="Percentage Adjustment"
  currentPage="Percentage Adjustment"
  showTradingYear={true}
  activeTradingYear={activeTradingYear}
  description="Configure percentage adjustments for private use of your vehicle and telephone."
/>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Private Use Adjustments */}
          <FormSection
            title="Private Use Adjustment"
            icon={<Settings />}
            description="Set percentages for vehicle and telephone private usage"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700">
                  Car Usage
                </label>
                {renderCustomDropdown(
                  "car",
                  formData.car,
                  percentageOptions,
                  <Car className="w-5 h-5" />
                )}
                <p className="text-xs text-gray-500">
                  Percentage of private vehicle usage
                </p>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700">
                  Telephone Usage
                </label>
                {renderCustomDropdown(
                  "telephone",
                  formData.telephone,
                  percentageOptions,
                  <Phone className="w-5 h-5" />
                )}
                <p className="text-xs text-gray-500">
                  Percentage of private telephone usage
                </p>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700">
                  Override Mileage
                </label>
                {renderCustomDropdown(
                  "override_mileage",
                  formData.override_mileage,
                  yesNoOptions
                )}
                <p className="text-xs text-gray-500">
                  Override automatic mileage calculations
                </p>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700">
                  Got Another Job
                </label>
                {renderCustomDropdown(
                  "got_another_job",
                  formData.got_another_job,
                  yesNoOptions
                )}
                <p className="text-xs text-gray-500">
                  Do you have additional employment?
                </p>
              </div>
            </div>
          </FormSection>

          {/* Radio Rent Adjustments */}
          <FormSection
            title="Radio Rent & Commission Adjustments"
            icon={<Calculator />}
            description="Configure percentage adjustments for different payment methods"
          >
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              style={{ position: "relative", zIndex: "1" }}
            >
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700">
                  Cash Transactions
                </label>
                {renderCustomDropdown("cash", formData.cash)}
                <p className="text-xs text-gray-500">
                  Percentage for cash-based transactions
                </p>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700">
                  Card / Bank Transactions
                </label>
                {renderCustomDropdown("cardBank", formData.cardBank)}
                <p className="text-xs text-gray-500">
                  Percentage for card and bank transactions
                </p>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700">
                  Account / Contract
                </label>
                {renderCustomDropdown(
                  "accountContract",
                  formData.accountContract
                )}
                <p className="text-xs text-gray-500">
                  Percentage for account-based contracts
                </p>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700">
                  Sub Contract
                </label>
                {renderCustomDropdown("subContract", formData.subContract)}
                <p className="text-xs text-gray-500">
                  Percentage for subcontractor arrangements
                </p>
              </div>
            </div>
          </FormSection>

          {/* Submit Section */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="text-center sm:text-left">
                <h3 className="font-semibold text-gray-900">
                  {isUpdating ? "Ready to Update?" : "Ready to Submit?"}
                </h3>
                <p className="text-gray-600 text-sm">
                  {isUpdating
                    ? "Review your adjustments and update changes"
                    : "Review your adjustments and save changes"}
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-200 transform ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed scale-95"
                    : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 hover:scale-105 shadow-lg hover:shadow-xl"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    {isUpdating ? "Updating..." : "Submitting..."}
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    {isUpdating ? "Update Adjustments" : "Save Adjustments"}
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PercentageAdjustment;