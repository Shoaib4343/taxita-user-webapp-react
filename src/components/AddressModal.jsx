// components/AddressModal.js
import React from "react";
import { X, MapPin, Home, Navigation, Save, Plus } from "lucide-react";

const AddressModal = ({ 
  isOpen, 
  editingAddress, 
  addressForm, 
  addressErrors,
  savingAddress,
  onClose, 
  onFieldChange, 
  onSubmit 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="px-8 py-6 bg-gradient-to-r from-blue-50 to-blue-50 border-b border-gray-200 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-600 rounded-lg shadow-sm">
                {editingAddress ? <MapPin className="w-6 h-6 text-white" /> : <Plus className="w-6 h-6 text-white" />}
              </div>
              <div>
                <h4 className="text-2xl font-bold text-gray-900">
                  {editingAddress ? "Edit Address" : "Add New Address"}
                </h4>
                <p className="text-gray-600">
                  {editingAddress ? "Update your address details" : "Enter your address information"}
                </p>
              </div>
            </div>
            <button 
              onClick={onClose} 
              className="p-3 hover:bg-gray-100 rounded-xl transition-all duration-200 hover:scale-105"
              title="Close modal"
            >
              <X size={24} className="text-gray-400 hover:text-gray-600" />
            </button>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-8">
          <div className="space-y-6">
            {/* Address Line 1 */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Home size={16} className="text-blue-600" />
                Address Line 1 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={addressForm.address_line1}
                onChange={(e) => onFieldChange('address_line1', e.target.value)}
                placeholder="Enter your street address"
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  addressErrors.address_line1 
                    ? 'border-red-300 bg-red-50 focus:ring-red-500' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                required
              />
              {addressErrors.address_line1 && (
                <p className="text-red-600 text-sm font-medium flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                  {addressErrors.address_line1}
                </p>
              )}
            </div>
            
            {/* Address Line 2 */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Home size={16} className="text-gray-400" />
                Address Line 2
                <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-500">Optional</span>
              </label>
              <input
                type="text"
                value={addressForm.address_line2}
                onChange={(e) => onFieldChange('address_line2', e.target.value)}
                placeholder="Apartment, suite, unit, building, floor, etc."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-400 transition-all duration-200"
              />
            </div>

            {/* Address Line 3 */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Home size={16} className="text-gray-400" />
                Address Line 3
                <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-500">Optional</span>
              </label>
              <input
                type="text"
                value={addressForm.address_line3}
                onChange={(e) => onFieldChange('address_line3', e.target.value)}
                placeholder="Additional address information, landmarks, etc."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-400 transition-all duration-200"
              />
            </div>

            {/* Town/City and County Row */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Navigation size={16} className="text-blue-600" />
                  Town/City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={addressForm.town_city}
                  onChange={(e) => onFieldChange('town_city', e.target.value)}
                  placeholder="Enter town or city"
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    addressErrors.town_city 
                      ? 'border-red-300 bg-red-50 focus:ring-red-500' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  required
                />
                {addressErrors.town_city && (
                  <p className="text-red-600 text-sm font-medium flex items-center gap-1">
                    <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                    {addressErrors.town_city}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <MapPin size={16} className="text-blue-600" />
                  County <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={addressForm.county}
                  onChange={(e) => onFieldChange('county', e.target.value)}
                  placeholder="Enter county"
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    addressErrors.county 
                      ? 'border-red-300 bg-red-50 focus:ring-red-500' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  required
                />
                {addressErrors.county && (
                  <p className="text-red-600 text-sm font-medium flex items-center gap-1">
                    <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                    {addressErrors.county}
                  </p>
                )}
              </div>
            </div>
            
            {/* Post Code */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Navigation size={16} className="text-blue-600" />
                Post Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={addressForm.post_code}
                onChange={(e) => onFieldChange('post_code', e.target.value.toUpperCase())}
                placeholder="e.g., SW1A 1AA"
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 uppercase ${
                  addressErrors.post_code 
                    ? 'border-red-300 bg-red-50 focus:ring-red-500' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                required
              />
              {addressErrors.post_code && (
                <p className="text-red-600 text-sm font-medium flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                  {addressErrors.post_code}
                </p>
              )}
            </div>

            {/* Form Tips */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-50 p-4 rounded-xl border border-blue-100">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                  <MapPin size={16} className="text-blue-600" />
                </div>
                <div>
                  <h5 className="font-medium text-blue-900 mb-1">Address Tips</h5>
                  <p className="text-blue-700 text-sm">
                    Ensure your address is complete and accurate for reliable service delivery and location identification.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                onClick={onSubmit}
                disabled={savingAddress}
                className="flex-1 flex items-center justify-center gap-3 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed font-semibold transform hover:-translate-y-0.5"
              >
                {savingAddress ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    {editingAddress ? "Updating..." : "Adding..."}
                  </>
                ) : (
                  <>
                    <Save size={20} />
                    {editingAddress ? "Update Address" : "Add Address"}
                  </>
                )}
              </button>
              
              <button
                onClick={onClose}
                className="px-8 py-4 border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 rounded-xl transition-all duration-200 font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressModal;