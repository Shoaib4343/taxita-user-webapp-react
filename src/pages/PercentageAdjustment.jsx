// src/pages/PercentageAdjustment.jsx
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { ChevronRight, Car, Phone, Settings, Calculator, Save, Home, ChevronDown, Check } from "lucide-react";
import { percentageAdjustmentsPostApi } from "../services/dashboard";

// Custom Dropdown Component
const CustomDropdown = ({ name, value, onChange, options, placeholder, icon, error }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  // Close dropdown when clicking outside
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

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  // Filter options based on search term
  const filteredOptions = options.filter(option => 
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (option) => {
    onChange({ target: { name, value: option } });
    setIsOpen(false);
    setSearchTerm('');
  };

  const displayValue = value ? (options.includes('Yes') ? value : `${value}%`) : '';

  return (
    <div ref={dropdownRef} className="relative">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full ${icon ? 'pl-10' : 'pl-4'} pr-10 py-3 bg-white border-2 rounded-xl text-gray-700 cursor-pointer transition-all duration-200 ${
          error 
            ? "border-red-300 bg-red-50" 
            : value 
              ? "border-blue-300 bg-blue-50" 
              : "border-gray-200 hover:border-gray-300"
        } ${isOpen ? 'border-blue-500 ring-4 ring-blue-100' : ''}`}
      >
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <span className={value ? 'text-gray-900' : 'text-gray-500'}>
            {displayValue || placeholder}
          </span>
          <ChevronDown 
            className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
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
                const displayOption = options.includes('Yes') ? option : `${option}%`;
                
                return (
                  <div
                    key={option}
                    onClick={() => handleSelect(option)}
                    className={`px-4 py-3 cursor-pointer transition-colors duration-150 flex items-center justify-between ${
                      isSelected 
                        ? 'bg-blue-50 text-blue-700 border-r-4 border-blue-500' 
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <span className={`text-sm ${isSelected ? 'font-semibold' : ''}`}>
                      {displayOption}
                    </span>
                    {isSelected && (
                      <Check className="w-4 h-4 text-blue-600" />
                    )}
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
      console.log("👉 Sending to API:", apiData);
      await percentageAdjustmentsPostApi(apiData);

      toast.success("Percentage adjustments saved successfully!");
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
    } catch (error) {
      console.error("❌ API Error:", error);
      toast.error(
        error.response?.data?.message || "Failed to save adjustments. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const percentageOptions = Array.from({ length: 101 }, (_, i) => i.toString());
  const yesNoOptions = ["Yes", "No"];

  const renderCustomDropdown = (name, value, options = percentageOptions, icon = null) => (
    <div className="space-y-1">
      <CustomDropdown
        name={name}
        value={value}
        onChange={handleChange}
        options={options}
        placeholder={options === yesNoOptions ? "Select option" : "Select percentage"}
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
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-lg">
            {icon}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">{title}</h2>
            {description && (
              <p className="text-blue-100 text-sm mt-1">{description}</p>
            )}
          </div>
        </div>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link 
              to="/dashboard" 
              className="flex items-center gap-1 hover:text-blue-600 transition-colors"
            >
              <Home className="w-4 h-4" />
              Dashboard
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-700 font-medium">Percentage Adjustment</span>
          </nav>
          
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Calculator className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Percentage Adjustment
                </h1>
                <p className="text-gray-600 text-lg">
                  Tax Year <span className="font-semibold text-blue-600">2025 / 2026</span>
                </p>
              </div>
            </div>
            
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
              <p className="text-blue-800 leading-relaxed">
                Configure percentage adjustments for private use of your vehicle and telephone if you choose not to complete the full mileage register. These settings will affect your tax calculations for the current year.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Private Use Adjustments */}
          <FormSection
            title="Private Use Adjustment"
            icon={<Settings className="w-6 h-6 text-white" />}
            description="Set percentages for vehicle and telephone private usage"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700">
                  Car Usage
                </label>
                {renderCustomDropdown("car", formData.car, percentageOptions, <Car className="w-5 h-5" />)}
                <p className="text-xs text-gray-500">
                  Percentage of private vehicle usage
                </p>
              </div>
              
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700">
                  Telephone Usage
                </label>
                {renderCustomDropdown("telephone", formData.telephone, percentageOptions, <Phone className="w-5 h-5" />)}
                <p className="text-xs text-gray-500">
                  Percentage of private telephone usage
                </p>
              </div>
              
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700">
                  Override Mileage
                </label>
                {renderCustomDropdown("override_mileage", formData.override_mileage, yesNoOptions)}
                <p className="text-xs text-gray-500">
                  Override automatic mileage calculations
                </p>
              </div>
              
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700">
                  Got Another Job
                </label>
                {renderCustomDropdown("got_another_job", formData.got_another_job, yesNoOptions)}
                <p className="text-xs text-gray-500">
                  Do you have additional employment?
                </p>
              </div>
            </div>
          </FormSection>

          {/* Radio Rent Adjustments */}
          <FormSection
            title="Radio Rent & Commission Adjustments"
            icon={<Calculator className="w-6 h-6 text-white" />}
            description="Configure percentage adjustments for different payment methods"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ position: 'relative', zIndex: '1' }}>
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
                {renderCustomDropdown("accountContract", formData.accountContract)}
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
                <h3 className="font-semibold text-gray-900">Ready to Submit?</h3>
                <p className="text-gray-600 text-sm">
                  Review your adjustments and save changes
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
                    Submitting...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Save Adjustments
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