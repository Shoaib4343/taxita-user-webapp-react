// components/AddressSection.js
import React from "react";
import { MapPin, Plus, Edit3, Trash2, Home, Navigation } from "lucide-react";
import { showDeleteConfirmation } from "./SweetAlert2Confirmation"; // Adjust path as needed

const AddressCard = ({ address, onEdit, onDelete }) => {
  const handleDelete = async () => {
    const result = await showDeleteConfirmation(
      "Delete Address", 
      "Are you sure you want to delete this address? This action cannot be undone."
    );
    
    if (result.isConfirmed) {
      onDelete();
    }
  };

  return (
    <div className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200 bg-gradient-to-br from-white to-gray-50 group hover:border-blue-200">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
              <Home size={16} className="text-blue-600" />
            </div>
            <span className="text-sm font-medium text-blue-600 uppercase tracking-wide">Address</span>
          </div>
          
          <div className="space-y-3 mb-4">
            {/* Address Line 1 - Main address */}
            {address.address_line1 && (
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="font-semibold text-gray-900 text-lg leading-relaxed">
                  {address.address_line1}
                </p>
              </div>
            )}
            
            {/* Address Line 2 - Additional details */}
            {address.address_line2 && (
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700 font-medium leading-relaxed">
                  {address.address_line2}
                </p>
              </div>
            )}
            
            {/* Address Line 3 - Extra details */}
            {address.address_line3 && (
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-gray-300 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-600 leading-relaxed">
                  {address.address_line3}
                </p>
              </div>
            )}
            
            {/* City and County */}
            <div className="flex items-center gap-2 text-gray-700 mt-3 pt-2 border-t border-gray-100">
              <Navigation size={16} className="text-gray-400" />
              <span className="font-semibold text-gray-800">
                {address.town_city}
                {address.county && (
                  <span className="text-gray-600 font-normal">, {address.county}</span>
                )}
              </span>
            </div>
            
            {/* Post Code */}
            {address.post_code && (
              <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg mt-2 border border-blue-100">
                <MapPin size={14} className="text-blue-600" />
                <span className="text-blue-700 font-bold text-sm tracking-wide">
                  {address.post_code}
                </span>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex flex-col gap-2 ml-4">
          <button
            onClick={onEdit}
            className="flex items-center gap-2 px-4 py-3 text-blue-600 hover:bg-blue-50 hover:text-blue-700 rounded-xl transition-all duration-200 hover:scale-105 font-medium text-sm border border-transparent hover:border-blue-200"
            title="Edit address"
          >
            <Edit3 size={16} />
            <span>Edit</span>
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 px-4 py-3 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-xl transition-all duration-200 hover:scale-105 font-medium text-sm border border-transparent hover:border-red-200"
            title="Delete address"
          >
            <Trash2 size={16} />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const AddressSection = ({ 
  addresses, 
  addressesLoading, 
  onAddAddress, 
  onEditAddress, 
  onDeleteAddress 
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8">
      {/* Header Section with Gradient */}
      <div className="px-8 py-6 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-600 rounded-lg shadow-sm">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Address Management</h3>
              <p className="text-gray-600">Manage your saved addresses and locations</p>
            </div>
          </div>
          
          <button
            onClick={onAddAddress}
            className="flex items-center gap-3 px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-semibold"
          >
            <Plus size={20} />
            Add New Address
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-8">
        {addressesLoading && addresses.length === 0 ? (
          <div className="text-center py-12">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-200 border-t-green-600"></div>
                <MapPin className="absolute inset-0 m-auto w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-gray-600 font-medium">Loading addresses...</p>
                <p className="text-gray-400 text-sm">Please wait while we fetch your saved locations</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Address Count Header */}
            {addresses.length > 0 && (
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600 font-medium">
                    {addresses.length} {addresses.length === 1 ? 'address' : 'addresses'} saved
                  </span>
                </div>
              </div>
            )}

            {/* Address Cards */}
            <div className="grid gap-6">
              {addresses.map((address) => (
                <AddressCard
                  key={address.id}
                  address={address}
                  onEdit={() => onEditAddress(address.id)}
                  onDelete={() => onDeleteAddress(address.id)}
                />
              ))}
            </div>

            {/* Empty State */}
            {addresses.length === 0 && !addressesLoading && (
              <div className="text-center py-16">
                <div className="flex flex-col items-center gap-6">
                  <div className="relative">
                    <div className="w-24 h-24 bg-gray-100 rounded-2xl flex items-center justify-center">
                      <MapPin size={48} className="text-gray-300" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Plus size={16} className="text-green-600" />
                    </div>
                  </div>
                  
                  <div className="text-center max-w-md">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No addresses added yet</h3>
                    <p className="text-gray-500 mb-6">
                      Add your home, work, or other frequently used addresses to make booking easier and faster.
                    </p>
                    <button
                      onClick={onAddAddress}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-colors duration-200 shadow-sm hover:shadow-md font-medium"
                    >
                      <Plus size={18} />
                      Add Your First Address
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Address Tips */}
        {addresses.length > 0 && (
          <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-blue-50 rounded-xl border border-blue-100">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                <MapPin size={18} className="text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-blue-900 mb-2">Address Tips</h4>
                <ul className="text-blue-700 text-sm space-y-1">
                  <li>• Keep your addresses up to date for accurate service</li>
                  <li>• Add specific landmarks or notes in additional address lines</li>
                  <li>• Verify postal codes to ensure precise location services</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressSection;