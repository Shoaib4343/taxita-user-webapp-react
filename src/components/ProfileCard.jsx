// components/ProfileCard.js
import React from "react";
import { Camera, Edit3, X, Phone, Badge, Calendar, User, Building, Users, Save } from "lucide-react";
import CustomDropdown from "./CustomDropdown";
import CustomDatePicker from "./CustomDatePicker";

const ProfileCard = ({ 
  profileData, 
  uploadingImage, 
  editingProfile, 
  profileErrors,
  roles,
  rolesLoading,
  onImageChange, 
  onEditToggle, 
  onFieldChange, 
  onSave, 
  savingProfile 
}) => {
  // Handler specifically for custom components that send different event formats
  const handleCustomComponentChange = (field, value) => {
    onFieldChange(field, value);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8">
      {/* Header Section with Gradient */}
      <div className="px-8 py-6 bg-gradient-to-r from-blue-50 to-blue-50 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-600 rounded-lg shadow-sm">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
            <p className="text-gray-600">Manage your personal details and contact information</p>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="p-8">
        <div className="flex flex-col lg:flex-row items-center gap-8 mb-8">
          {/* Enhanced Profile Image Section */}
          <div className="relative group">
            <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-blue-100 shadow-lg bg-gradient-to-br from-blue-50 to-blue-50">
              <img
                src="https://api.dicebear.com/9.x/notionists/svg"
                // src={profileData?.profile_image || `https://ui-avatars.com/api/?name=${profileData?.your_role || 'User'}&background=4f46e5&color=fff&size=128`}
                alt="Profile"
                className="w-full h-full object-cover"
              />
              {uploadingImage && (
                <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center rounded-2xl">
                  <div className="flex flex-col items-center gap-2">
                    <div className="animate-spin rounded-full h-8 w-8 border-3 border-white border-t-transparent"></div>
                    <span className="text-white text-xs font-medium">Uploading...</span>
                  </div>
                </div>
              )}
            </div>
            <label className="absolute -bottom-2 -right-2 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl cursor-pointer shadow-lg transition-all duration-200 group-hover:scale-110 group-hover:shadow-xl">
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={onImageChange}
                disabled={uploadingImage}
              />
              <Camera size={18} />
            </label>
          </div>

          {/* Enhanced Profile Info */}
          <div className="flex-1 text-center lg:text-left">
            <div className="mb-4">
              <h3 className="text-3xl font-bold text-gray-900 mb-2">
                {profileData?.your_role || "User Profile"}
              </h3>
              <div className="flex flex-col lg:flex-row gap-4 text-gray-600">
                <div className="flex items-center gap-2 justify-center lg:justify-start">
                  <div className="p-1.5 bg-blue-100 rounded-lg">
                    <Phone size={14} className="text-blue-600" />
                  </div>
                  <span className="font-medium">{profileData?.contact_no || "No phone provided"}</span>
                </div>
                <div className="flex items-center gap-2 justify-center lg:justify-start">
                  <div className="p-1.5 bg-green-100 rounded-lg">
                    <Badge size={14} className="text-green-600" />
                  </div>
                  <span className="font-medium">Badge: {profileData?.badge_no || "N/A"}</span>
                </div>
              </div>
            </div>

            {/* Additional Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-50 p-4 rounded-xl border border-blue-100">
                <div className="flex items-center gap-2 mb-1">
                  <Building size={16} className="text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">Company</span>
                </div>
                <p className="text-blue-700 font-semibold">{profileData?.taxi_company || "Not specified"}</p>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-4 rounded-xl border border-emerald-100">
                <div className="flex items-center gap-2 mb-1">
                  <Users size={16} className="text-emerald-600" />
                  <span className="text-sm font-medium text-emerald-800">Council</span>
                </div>
                <p className="text-emerald-700 font-semibold">{profileData?.local_council || "Not specified"}</p>
              </div>
            </div>
          </div>

          {/* Enhanced Edit Button */}
          <div className="flex flex-col gap-3">
            <button
              onClick={onEditToggle}
              className={`flex items-center gap-3 px-8 py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-medium ${
                editingProfile 
                  ? "bg-gray-600 hover:bg-gray-700 text-white" 
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {editingProfile ? <X size={20} /> : <Edit3 size={20} />}
              {editingProfile ? "Cancel Edit" : "Edit Profile"}
            </button>
            
            {/* Status Indicator */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-600 font-medium">Profile Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Profile Form */}
        {editingProfile && (
          <div className="border-t border-gray-200 pt-8">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-500 rounded-lg">
                  <Edit3 className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Edit Profile Details</h3>
              </div>
            </div>

            <div className="space-y-6">
              {/* Form Grid with Enhanced Styling */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Date of Birth - Regular Input */}
                <div className="space-y-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Calendar className="inline w-4 h-4 mr-2 text-blue-600" />
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={profileData?.date_of_birth || ""}
                    onChange={(e) => onFieldChange('date_of_birth', e.target.value)}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      profileErrors.date_of_birth ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                    }`}
                    required
                  />
                  {profileErrors.date_of_birth && (
                    <p className="text-red-600 text-sm mt-1 font-medium">{profileErrors.date_of_birth}</p>
                  )}
                </div>
                
                <div className="space-y-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Phone className="inline w-4 h-4 mr-2 text-blue-600" />
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    value={profileData?.contact_no || ""}
                    onChange={(e) => onFieldChange('contact_no', e.target.value)}
                    placeholder="+44 123 456 7890"
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      profileErrors.contact_no ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                    }`}
                    required
                  />
                  {profileErrors.contact_no && (
                    <p className="text-red-600 text-sm mt-1 font-medium">{profileErrors.contact_no}</p>
                  )}
                </div>
                
                {/* Custom Role Dropdown */}
                <div className="space-y-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <User className="inline w-4 h-4 mr-2 text-blue-600" />
                    Your Role
                  </label>
                  <CustomDropdown
                    name="your_role"
                    value={profileData?.your_role || ""}
                    onChange={(e) => handleCustomComponentChange(e.target.name, e.target.value)}
                    options={rolesLoading ? [] : (roles || [])}
                    placeholder={rolesLoading ? "Loading roles..." : "Select your role"}
                    icon={<User className="w-5 h-5" />}
                    error={profileErrors.your_role}
                    disabled={rolesLoading}
                    allowClear={true}
                    showSearch={true}
                    searchThreshold={3}
                    emptyMessage={rolesLoading ? "Loading roles..." : "No roles available"}
                    className={profileErrors.your_role ? 'border-red-300 bg-red-50' : ''}
                  />
                  {profileErrors.your_role && (
                    <p className="text-red-600 text-sm mt-1 font-medium">{profileErrors.your_role}</p>
                  )}
                  {rolesLoading && (
                    <p className="text-blue-600 text-sm mt-1">Loading available roles...</p>
                  )}
                </div>
                
                <div className="space-y-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Badge className="inline w-4 h-4 mr-2 text-blue-600" />
                    Badge Number
                  </label>
                  <input
                    type="text"
                    value={profileData?.badge_no || ""}
                    onChange={(e) => onFieldChange('badge_no', e.target.value)}
                    placeholder="e.g., AB1234"
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      profileErrors.badge_no ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                    }`}
                    required
                  />
                  {profileErrors.badge_no && (
                    <p className="text-red-600 text-sm mt-1 font-medium">{profileErrors.badge_no}</p>
                  )}
                </div>
                
                <div className="space-y-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Building className="inline w-4 h-4 mr-2 text-blue-600" />
                    Taxi Company
                  </label>
                  <input
                    type="text"
                    value={profileData?.taxi_company || ""}
                    onChange={(e) => onFieldChange('taxi_company', e.target.value)}
                    placeholder="Company Name"
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      profileErrors.taxi_company ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                    }`}
                    required
                  />
                  {profileErrors.taxi_company && (
                    <p className="text-red-600 text-sm mt-1 font-medium">{profileErrors.taxi_company}</p>
                  )}
                </div>
                
                <div className="space-y-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Users className="inline w-4 h-4 mr-2 text-blue-600" />
                    Local Council
                  </label>
                  <input
                    type="text"
                    value={profileData?.local_council || ""}
                    onChange={(e) => onFieldChange('local_council', e.target.value)}
                    placeholder="Council ID/Name"
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      profileErrors.local_council ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                    }`}
                    required
                  />
                  {profileErrors.local_council && (
                    <p className="text-red-600 text-sm mt-1 font-medium">{profileErrors.local_council}</p>
                  )}
                </div>
              </div>

              {/* Enhanced Save Button */}
              <div className="flex justify-end pt-6">
                <button
                  onClick={onSave}
                  disabled={savingProfile}
                  className="flex items-center gap-3 px-10 py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5 font-semibold"
                >
                  {savingProfile ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Saving Changes...
                    </>
                  ) : (
                    <>
                      <Save size={20} />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;