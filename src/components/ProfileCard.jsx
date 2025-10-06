// // components/ProfileCard.js
// import React, { useState, useEffect } from "react";
// import { Camera, Edit3, X, Phone, Badge, Calendar, User, Building, Users, Save, Image as ImageIcon } from "lucide-react";
// import CustomDropdown from "./CustomDropdown";
// import CustomDatePicker from "./CustomDatePicker";
// import { getLocalCouncilsApi } from "../services/dashboard";
// import { useAuth } from "../context/AuthContext";

// // Import utility functions
// import { 
//   formatDateForDisplay, 
//   isDateEmpty, 
//   validateDateOfBirth,
//   convertApiDateToInputFormat 
// } from "../utils/dateUtils";
// import { 
//   getCouncilDisplayValue, 
//   getCouncilValue 
// } from "../utils/dateUtils";

// const ProfileCard = ({ 
//   profileData, 
//   profileImageUrl,
//   profileImageLoading,
//   uploadingImage, 
//   editingProfile, 
//   profileErrors,
//   roles,
//   rolesLoading,
//   onImageChange, 
//   onEditToggle, 
//   onFieldChange, 
//   onSave, 
//   savingProfile,
//   hasUnsavedChanges,
//   previewImageUrl,
//   pendingImageFile
// }) => {
//   const { auth } = useAuth();
//   const [localCouncils, setLocalCouncils] = useState([]);
//   const [councilsLoading, setCouncilsLoading] = useState(false);

//   // Fetch local councils data
//   useEffect(() => {
//     const fetchLocalCouncils = async () => {
//       try {
//         setCouncilsLoading(true);
//         const response = await getLocalCouncilsApi();
//         setLocalCouncils(response.data.local_councils || []);
//       } catch (error) {
//         console.error("Error fetching local councils:", error);
//         setLocalCouncils([]);
//       } finally {
//         setCouncilsLoading(false);
//       }
//     };

//     fetchLocalCouncils();
//   }, []);

//   // Enhanced field change handler with proper date handling
//   const handleFieldChange = (field, value) => {
//     if (field === 'date_of_birth') {
//       // For date inputs, validate immediately
//       const dateError = validateDateOfBirth(value);
//       if (dateError && value) { // Only show error if user has entered something
//         console.log('Date validation error:', dateError);
//       }
//     }
//     onFieldChange(field, value);
//   };

//   // Get the appropriate avatar source with preview support
//   const getAvatarSrc = () => {
//     if (profileImageLoading) {
//       return null; // Will show loading spinner
//     }
    
//     // Show preview image if available (when user selects new image)
//     if (previewImageUrl && editingProfile) {
//       return previewImageUrl;
//     }
    
//     if (profileImageUrl) {
//       return profileImageUrl;
//     }
    
//     // Fallback to generated avatar using user's actual name
//     const name = auth?.user?.first_name || profileData?.your_role || auth?.user?.email || "User";
//     return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=4f46e5&color=fff&size=128`;
//   };

//   // Handler specifically for custom components that send different event formats
//   const handleCustomComponentChange = (field, value) => {
//     onFieldChange(field, value);
//   };

//   // Get the current council display value using utility function
//   const getCurrentCouncilDisplay = () => {
//     return getCouncilDisplayValue(profileData?.local_council, localCouncils);
//   };

//   // Get current council value for dropdown using utility function
//   const getCurrentCouncilValue = () => {
//     return getCouncilValue(profileData?.local_council, localCouncils, false);
//   };

//   // Get the date value for display and editing
//   const getDateValue = () => {
//     if (!profileData?.date_of_birth) return "";
    
//     if (editingProfile) {
//       // In edit mode, use the converted format (YYYY-MM-DD) for HTML input
//       return profileData.date_of_birth;
//     } else {
//       // In display mode, show formatted date
//       return profileData.date_of_birth;
//     }
//   };

//   // Check if date field should show error state
//   const shouldShowDateError = () => {
//     if (!editingProfile) {
//       // In display mode, show error if date is empty or invalid from API
//       return isDateEmpty(profileData?.date_of_birth);
//     }
    
//     // In edit mode, show error from validation
//     return profileErrors.date_of_birth || isDateEmpty(profileData?.date_of_birth);
//   };

//   const avatarSrc = getAvatarSrc();

//   return (
//     <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden pb-8">
//       {/* Profile Content */}
//       <div className="p-8">
//         <div className="flex flex-col lg:flex-row items-center gap-8 mb-8">
//           {/* Enhanced Profile Image Section with Preview Support */}
//           <div className="relative group">
//             <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-blue-100 shadow-lg bg-gradient-to-br from-blue-50 to-blue-50 relative">
//               {profileImageLoading ? (
//                 <div className="w-full h-full flex items-center justify-center">
//                   <div className="animate-spin rounded-full h-8 w-8 border-3 border-blue-600 border-t-transparent"></div>
//                 </div>
//               ) : (
//                 <img
//                   src={avatarSrc}
//                   alt="Profile"
//                   className="w-full h-full object-cover"
//                   onError={(e) => {
//                     // Fallback if image fails to load
//                     const name = auth?.user?.first_name || profileData?.your_role || auth?.user?.email || "User";
//                     e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=4f46e5&color=fff&size=128`;
//                   }}
//                 />
//               )}
              
//               {/* Preview Overlay */}
//               {previewImageUrl && editingProfile && (
//                 <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded-lg text-xs font-medium shadow-lg">
//                   Preview
//                 </div>
//               )}
              
//               {uploadingImage && (
//                 <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center rounded-2xl">
//                   <div className="flex flex-col items-center gap-2">
//                     <div className="animate-spin rounded-full h-8 w-8 border-3 border-white border-t-transparent"></div>
//                     <span className="text-white text-xs font-medium">Uploading...</span>
//                   </div>
//                 </div>
//               )}
//             </div>
            
//             {editingProfile && (
//               <label className="absolute -bottom-2 -right-2 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl cursor-pointer shadow-lg transition-all duration-200 group-hover:scale-110 group-hover:shadow-xl">
//                 <input
//                   type="file"
//                   className="hidden"
//                   accept="image/*"
//                   onChange={onImageChange}
//                   disabled={uploadingImage}
//                 />
//                 <Camera size={18} />
//               </label>
//             )}
            
//             {/* Image Status Indicator */}
//             {editingProfile && pendingImageFile && (
//               <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-lg text-xs font-medium shadow-lg">
//                 <ImageIcon size={12} />
//                 Image ready to upload
//               </div>
//             )}
//           </div>

//           {/* Enhanced Profile Info */}
//           <div className="flex-1 text-center lg:text-left">
//             <div className="mb-4">
//               <h3 className="text-3xl font-bold text-gray-900 mb-2">
//                 {profileData?.your_role || auth?.user?.first_name || "User Profile"}
//               </h3>
//               <div className="flex flex-col lg:flex-row gap-4 text-gray-600">
//                 <div className="flex items-center gap-2 justify-center lg:justify-start">
//                   <div className="p-1.5 bg-blue-100 rounded-lg">
//                     <Phone size={14} className="text-blue-600" />
//                   </div>
//                   <span className="font-medium">{profileData?.contact_no || "No phone provided"}</span>
//                 </div>
//                 <div className="flex items-center gap-2 justify-center lg:justify-start">
//                   <div className="p-1.5 bg-green-100 rounded-lg">
//                     <Badge size={14} className="text-green-600" />
//                   </div>
//                   <span className="font-medium">Badge: {profileData?.badge_no || "N/A"}</span>
//                 </div>
//               </div>
//             </div>

//             {/* Additional Info Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
//               <div className="bg-gradient-to-br from-blue-50 to-blue-50 p-4 rounded-xl border border-blue-100">
//                 <div className="flex items-center gap-2 mb-1">
//                   <Building size={16} className="text-blue-600" />
//                   <span className="text-sm font-medium text-blue-800">Company</span>
//                 </div>
//                 <p className="text-blue-700 font-semibold">{profileData?.taxi_company || "Not specified"}</p>
//               </div>
//               <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-4 rounded-xl border border-emerald-100">
//                 <div className="flex items-center gap-2 mb-1">
//                   <Users size={16} className="text-emerald-600" />
//                   <span className="text-sm font-medium text-emerald-800">Council</span>
//                 </div>
//                 <p className="text-emerald-700 font-semibold">{getCurrentCouncilDisplay() || "Not specified"}</p>
//               </div>
//             </div>
//           </div>

//           {/* Enhanced Edit Button */}
//           <div className="flex flex-col gap-3">
//             <button
//               onClick={onEditToggle}
//               className={`flex items-center gap-3 px-8 py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-medium ${
//                 editingProfile 
//                   ? "bg-gray-600 hover:bg-gray-700 text-white" 
//                   : "bg-blue-600 hover:bg-blue-700 text-white"
//               }`}
//             >
//               {editingProfile ? <X size={20} /> : <Edit3 size={20} />}
//               {editingProfile ? "Cancel Edit" : "Edit Profile"}
//             </button>
            
//             {/* Status Indicator with Unsaved Changes Warning */}
//             <div className="text-center">
//               <div className="flex items-center justify-center gap-2 text-sm">
//                 {hasUnsavedChanges && editingProfile ? (
//                   <>
//                     <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
//                     <span className="text-orange-600 font-medium">Unsaved Changes</span>
//                   </>
//                 ) : (
//                   <>
//                     <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
//                     <span className="text-green-600 font-medium">Profile Active</span>
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Profile Details Section - Always Visible */}
//         <div className="border-t border-gray-200 pt-8">
//           <div className="mb-6">
//             <div className="flex items-center gap-3 mb-4">
//               <div className="p-2 bg-blue-500 rounded-lg">
//                 <User className="w-5 h-5 text-white" />
//               </div>
//               <h3 className="text-xl font-semibold text-gray-800">Profile Details</h3>
//             </div>
//           </div>

//           <div className="space-y-6">
//             {/* Form Grid with Enhanced Styling */}
//             <div className="grid md:grid-cols-2 gap-6">
//               {/* Date of Birth - Enhanced with proper format handling */}
//               <div className="space-y-1">
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                   <Calendar className="inline w-4 h-4 mr-2 text-blue-600" />
//                   Date of Birth *
//                 </label>
//                 {editingProfile ? (
//                   <>
//                     <input
//                       type="date"
//                       value={getDateValue()}
//                       onChange={(e) => handleFieldChange('date_of_birth', e.target.value)}
//                       className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
//                         profileErrors.date_of_birth || shouldShowDateError() 
//                           ? 'border-red-300 bg-red-50' 
//                           : 'border-gray-300 hover:border-gray-400'
//                       }`}
//                       required
//                       max={new Date().toISOString().split('T')[0]} // Prevent future dates
//                     />
//                     {(profileErrors.date_of_birth || (editingProfile && isDateEmpty(profileData?.date_of_birth))) && (
//                       <p className="text-red-600 text-sm mt-1 font-medium">
//                         {profileErrors.date_of_birth || "Date of birth is required"}
//                       </p>
//                     )}
//                     <p className="text-gray-500 text-xs mt-1">
//                       Please select your date of birth (must be 18 or older)
//                     </p>
//                   </>
//                 ) : (
//                   <div className={`px-4 py-3 rounded-xl border-2 ${
//                     shouldShowDateError() 
//                       ? 'bg-red-50 border-red-200' 
//                       : 'bg-gray-50 border-gray-200'
//                   }`}>
//                     <span className={
//                       shouldShowDateError() 
//                         ? "text-red-600 font-medium" 
//                         : "text-gray-700"
//                     }>
//                       {formatDateForDisplay(profileData?.date_of_birth)}
//                       {shouldShowDateError() && (
//                         <span className="text-xs block mt-1">⚠️ Date of birth required</span>
//                       )}
//                     </span>
//                   </div>
//                 )}
//               </div>
              
//               {/* Contact Number */}
//               <div className="space-y-1">
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                   <Phone className="inline w-4 h-4 mr-2 text-blue-600" />
//                   Contact Number *
//                 </label>
//                 {editingProfile ? (
//                   <>
//                     <input
//                       type="tel"
//                       value={profileData?.contact_no || ""}
//                       onChange={(e) => handleFieldChange('contact_no', e.target.value)}
//                       placeholder="+44 123 456 7890"
//                       className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
//                         profileErrors.contact_no ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
//                       }`}
//                       required
//                     />
//                     {profileErrors.contact_no && (
//                       <p className="text-red-600 text-sm mt-1 font-medium">{profileErrors.contact_no}</p>
//                     )}
//                   </>
//                 ) : (
//                   <div className="px-4 py-3 bg-gray-50 rounded-xl border-2 border-gray-200">
//                     <span className="text-gray-700">{profileData?.contact_no || "Not provided"}</span>
//                   </div>
//                 )}
//               </div>
              
//               {/* Your Role */}
//               <div className="space-y-1">
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                   <User className="inline w-4 h-4 mr-2 text-blue-600" />
//                   Your Role *
//                 </label>
//                 {editingProfile ? (
//                   <>
//                     <CustomDropdown
//                       name="your_role"
//                       value={profileData?.your_role || ""}
//                       onChange={(e) => handleCustomComponentChange(e.target.name, e.target.value)}
//                       options={rolesLoading ? [] : (roles || [])}
//                       placeholder={rolesLoading ? "Loading roles..." : "Select your role"}
//                       icon={<User className="w-5 h-5" />}
//                       error={profileErrors.your_role}
//                       disabled={rolesLoading}
//                       allowClear={true}
//                       showSearch={true}
//                       searchThreshold={3}
//                       emptyMessage={rolesLoading ? "Loading roles..." : "No roles available"}
//                       className={profileErrors.your_role ? 'border-red-300 bg-red-50' : ''}
//                     />
//                     {profileErrors.your_role && (
//                       <p className="text-red-600 text-sm mt-1 font-medium">{profileErrors.your_role}</p>
//                     )}
//                     {rolesLoading && (
//                       <p className="text-blue-600 text-sm mt-1">Loading available roles...</p>
//                     )}
//                   </>
//                 ) : (
//                   <div className="px-4 py-3 bg-gray-50 rounded-xl border-2 border-gray-200">
//                     <span className="text-gray-700">{profileData?.your_role || "Not provided"}</span>
//                   </div>
//                 )}
//               </div>
              
//               {/* Badge Number */}
//               <div className="space-y-1">
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                   <Badge className="inline w-4 h-4 mr-2 text-blue-600" />
//                   Badge Number *
//                 </label>
//                 {editingProfile ? (
//                   <>
//                     <input
//                       type="text"
//                       value={profileData?.badge_no || ""}
//                       onChange={(e) => handleFieldChange('badge_no', e.target.value)}
//                       placeholder="e.g., AB1234"
//                       className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
//                         profileErrors.badge_no ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
//                       }`}
//                       required
//                     />
//                     {profileErrors.badge_no && (
//                       <p className="text-red-600 text-sm mt-1 font-medium">{profileErrors.badge_no}</p>
//                     )}
//                   </>
//                 ) : (
//                   <div className="px-4 py-3 bg-gray-50 rounded-xl border-2 border-gray-200">
//                     <span className="text-gray-700">{profileData?.badge_no || "Not provided"}</span>
//                   </div>
//                 )}
//               </div>
              
//               {/* Taxi Company */}
//               <div className="space-y-1">
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                   <Building className="inline w-4 h-4 mr-2 text-blue-600" />
//                   Company *
//                 </label>
//                 {editingProfile ? (
//                   <>
//                     <input
//                       type="text"
//                       value={profileData?.taxi_company || ""}
//                       onChange={(e) => handleFieldChange('taxi_company', e.target.value)}
//                       placeholder="Company Name"
//                       className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
//                         profileErrors.taxi_company ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
//                       }`}
//                       required
//                     />
//                     {profileErrors.taxi_company && (
//                       <p className="text-red-600 text-sm mt-1 font-medium">{profileErrors.taxi_company}</p>
//                     )}
//                   </>
//                 ) : (
//                   <div className="px-4 py-3 bg-gray-50 rounded-xl border-2 border-gray-200">
//                     <span className="text-gray-700">{profileData?.taxi_company || "Not provided"}</span>
//                   </div>
//                 )}
//               </div>
              
//               {/* Local Council */}
//               <div className="space-y-1">
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                   <Users className="inline w-4 h-4 mr-2 text-blue-600" />
//                   Local Council *
//                 </label>
//                 {editingProfile ? (
//                   <>
//                    <CustomDropdown
//                       name="local_council"
//                       value={getCurrentCouncilValue()}
//                       onChange={(e) => handleCustomComponentChange(e.target.name, e.target.value)}
//                       options={councilsLoading ? [] : localCouncils}
//                       placeholder={councilsLoading ? "Loading councils..." : "Select your local council"}
//                       icon={<Users className="w-5 h-5" />}
//                       error={profileErrors.local_council}
//                       disabled={councilsLoading}
//                       allowClear={true}
//                       showSearch={true}
//                       searchThreshold={3}
//                       emptyMessage={councilsLoading ? "Loading councils..." : "No councils available"}
//                       displayFormatter={(option) => option.title || option}
//                       className={profileErrors.local_council ? 'border-red-300 bg-red-50' : ''}
//                     />
//                     {profileErrors.local_council && (
//                       <p className="text-red-600 text-sm mt-1 font-medium">{profileErrors.local_council}</p>
//                     )}
//                     {councilsLoading && (
//                       <p className="text-blue-600 text-sm mt-1">Loading available councils...</p>
//                     )}
//                   </>
//                 ) : (
//                   <div className="px-4 py-3 bg-gray-50 rounded-xl border-2 border-gray-200">
//                     <span className="text-gray-700">{getCurrentCouncilDisplay() || "Not provided"}</span>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Save Button - Only show in edit mode */}
//             {editingProfile && (
//               <div className="flex justify-end pt-6">
//                 <button
//                   onClick={onSave}
//                   disabled={savingProfile}
//                   className="flex items-center gap-3 px-10 py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5 font-semibold"
//                 >
//                   {savingProfile ? (
//                     <>
//                       <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                       Saving Changes...
//                     </>
//                   ) : (
//                     <>
//                       <Save size={20} />
//                       Save Changes
//                     </>
//                   )}
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfileCard;
























































// components/ProfileCard.js
import React, { useState, useEffect } from "react";
import { Camera, Edit3, X, Phone, Badge, Calendar, User, Building, Users, Save, Image as ImageIcon } from "lucide-react";
import CustomDropdown from "./CustomDropdown";
import CustomDatePicker from "./CustomDatePicker";
import { getLocalCouncilsApi } from "../services/dashboard";
import { useAuth } from "../context/AuthContext";

// Import utility functions
import { 
  formatDateForDisplay, 
  isDateEmpty, 
  validateDateOfBirth,
  convertApiDateToInputFormat 
} from "../utils/dateUtils";
import { 
  getCouncilDisplayValue, 
  getCouncilValueForDropdown
} from "../utils/councilUtils";

const ProfileCard = ({ 
  profileData, 
  profileImageUrl,
  profileImageLoading,
  uploadingImage, 
  editingProfile, 
  profileErrors,
  roles,
  rolesLoading,
  localCouncils,
  setLocalCouncils,
  onImageChange, 
  onEditToggle, 
  onFieldChange, 
  onSave, 
  savingProfile,
  hasUnsavedChanges,
  previewImageUrl,
  pendingImageFile
}) => {
  const { auth } = useAuth();
  const [councilsLoading, setCouncilsLoading] = useState(false);

  // Fetch local councils data
  useEffect(() => {
    const fetchLocalCouncils = async () => {
      try {
        setCouncilsLoading(true);
        const response = await getLocalCouncilsApi();
        const councils = response.data.local_councils || [];
        setLocalCouncils(councils);
      } catch (error) {
        console.error("Error fetching local councils:", error);
        setLocalCouncils([]);
      } finally {
        setCouncilsLoading(false);
      }
    };

    if (localCouncils.length === 0) {
      fetchLocalCouncils();
    }
  }, [localCouncils.length, setLocalCouncils]);

  // Enhanced field change handler with proper date handling
  const handleFieldChange = (field, value) => {
    if (field === 'date_of_birth') {
      // For date inputs, validate immediately
      const dateError = validateDateOfBirth(value);
      if (dateError && value) { // Only show error if user has entered something
        console.log('Date validation error:', dateError);
      }
    }
    onFieldChange(field, value);
  };

  // Get the appropriate avatar source with preview support
  const getAvatarSrc = () => {
    if (profileImageLoading) {
      return null; // Will show loading spinner
    }
    
    // Show preview image if available (when user selects new image)
    if (previewImageUrl && editingProfile) {
      return previewImageUrl;
    }
    
    if (profileImageUrl) {
      return profileImageUrl;
    }
    
    // Fallback to generated avatar using user's actual name
    const name = auth?.user?.first_name || profileData?.your_role || auth?.user?.email || "User";
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=4f46e5&color=fff&size=128`;
  };

  // Handler specifically for custom components that send different event formats
  const handleCustomComponentChange = (field, value) => {
    onFieldChange(field, value);
  };

  // Get the current council display value using utility function
  const getCurrentCouncilDisplay = () => {
    return getCouncilDisplayValue(profileData?.local_council, localCouncils);
  };

  // Get current council value for dropdown using utility function
  const getCurrentCouncilValue = () => {
    return getCouncilValueForDropdown(profileData?.local_council, localCouncils);
  };

  // Get the date value for display and editing
  const getDateValue = () => {
    if (!profileData?.date_of_birth) return "";
    
    if (editingProfile) {
      // In edit mode, use the converted format (YYYY-MM-DD) for HTML input
      return profileData.date_of_birth;
    } else {
      // In display mode, show formatted date
      return profileData.date_of_birth;
    }
  };

  // Check if date field should show error state
  const shouldShowDateError = () => {
    if (!editingProfile) {
      // In display mode, show error if date is empty or invalid from API
      return isDateEmpty(profileData?.date_of_birth);
    }
    
    // In edit mode, show error from validation
    return profileErrors.date_of_birth || isDateEmpty(profileData?.date_of_birth);
  };

  const avatarSrc = getAvatarSrc();

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden pb-8">
      {/* Profile Content */}
      <div className="p-8">
        <div className="flex flex-col lg:flex-row items-center gap-8 mb-8">
          {/* Enhanced Profile Image Section with Preview Support */}
          <div className="relative group">
            <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-blue-100 shadow-lg bg-gradient-to-br from-blue-50 to-blue-50 relative">
              {profileImageLoading ? (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-3 border-blue-600 border-t-transparent"></div>
                </div>
              ) : (
                <img
                  src={avatarSrc}
                  alt="Profile"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback if image fails to load
                    const name = auth?.user?.first_name || profileData?.your_role || auth?.user?.email || "User";
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=4f46e5&color=fff&size=128`;
                  }}
                />
              )}
              
              {/* Preview Overlay */}
              {previewImageUrl && editingProfile && (
                <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded-lg text-xs font-medium shadow-lg">
                  Preview
                </div>
              )}
              
              {uploadingImage && (
                <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center rounded-2xl">
                  <div className="flex flex-col items-center gap-2">
                    <div className="animate-spin rounded-full h-8 w-8 border-3 border-white border-t-transparent"></div>
                    <span className="text-white text-xs font-medium">Uploading...</span>
                  </div>
                </div>
              )}
            </div>
            
            {editingProfile && (
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
            )}
            
            {/* Image Status Indicator */}
            {editingProfile && pendingImageFile && (
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-lg text-xs font-medium shadow-lg">
                <ImageIcon size={12} />
                Image ready to upload
              </div>
            )}
          </div>

          {/* Enhanced Profile Info */}
          <div className="flex-1 text-center lg:text-left">
            <div className="mb-4">
              <h3 className="text-3xl font-bold text-gray-900 mb-2">
                {profileData?.your_role || auth?.user?.first_name || "User Profile"}
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
                <p className="text-emerald-700 font-semibold">{getCurrentCouncilDisplay() || "Not specified"}</p>
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
            
            {/* Status Indicator with Unsaved Changes Warning */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-sm">
                {hasUnsavedChanges && editingProfile ? (
                  <>
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                    <span className="text-orange-600 font-medium">Unsaved Changes</span>
                  </>
                ) : (
                  <>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-green-600 font-medium">Profile Active</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Profile Details Section - Always Visible */}
        <div className="border-t border-gray-200 pt-8">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-500 rounded-lg">
                <User className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Profile Details</h3>
            </div>
          </div>

          <div className="space-y-6">
            {/* Form Grid with Enhanced Styling */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Date of Birth - Enhanced with proper format handling */}
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Calendar className="inline w-4 h-4 mr-2 text-blue-600" />
                  Date of Birth *
                </label>
                {editingProfile ? (
                  <>
                    <input
                      type="date"
                      value={getDateValue()}
                      onChange={(e) => handleFieldChange('date_of_birth', e.target.value)}
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                        profileErrors.date_of_birth || shouldShowDateError() 
                          ? 'border-red-300 bg-red-50' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      required
                      max={new Date().toISOString().split('T')[0]} // Prevent future dates
                    />
                    {(profileErrors.date_of_birth || (editingProfile && isDateEmpty(profileData?.date_of_birth))) && (
                      <p className="text-red-600 text-sm mt-1 font-medium">
                        {profileErrors.date_of_birth || "Date of birth is required"}
                      </p>
                    )}
                    <p className="text-gray-500 text-xs mt-1">
                      Please select your date of birth (must be 18 or older)
                    </p>
                  </>
                ) : (
                  <div className={`px-4 py-3 rounded-xl border-2 ${
                    shouldShowDateError() 
                      ? 'bg-red-50 border-red-200' 
                      : 'bg-gray-50 border-gray-200'
                  }`}>
                    <span className={
                      shouldShowDateError() 
                        ? "text-red-600 font-medium" 
                        : "text-gray-700"
                    }>
                      {formatDateForDisplay(profileData?.date_of_birth)}
                      {shouldShowDateError() && (
                        <span className="text-xs block mt-1">⚠ Date of birth required</span>
                      )}
                    </span>
                  </div>
                )}
              </div>
              
              {/* Contact Number */}
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Phone className="inline w-4 h-4 mr-2 text-blue-600" />
                  Contact Number *
                </label>
                {editingProfile ? (
                  <>
                    <input
                      type="tel"
                      value={profileData?.contact_no || ""}
                      onChange={(e) => handleFieldChange('contact_no', e.target.value)}
                      placeholder="+44 123 456 7890"
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                        profileErrors.contact_no ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                      }`}
                      required
                    />
                    {profileErrors.contact_no && (
                      <p className="text-red-600 text-sm mt-1 font-medium">{profileErrors.contact_no}</p>
                    )}
                  </>
                ) : (
                  <div className="px-4 py-3 bg-gray-50 rounded-xl border-2 border-gray-200">
                    <span className="text-gray-700">{profileData?.contact_no || "Not provided"}</span>
                  </div>
                )}
              </div>
              
              {/* Your Role */}
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <User className="inline w-4 h-4 mr-2 text-blue-600" />
                  Your Role *
                </label>
                {editingProfile ? (
                  <>
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
                  </>
                ) : (
                  <div className="px-4 py-3 bg-gray-50 rounded-xl border-2 border-gray-200">
                    <span className="text-gray-700">{profileData?.your_role || "Not provided"}</span>
                  </div>
                )}
              </div>
              
              {/* Badge Number */}
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Badge className="inline w-4 h-4 mr-2 text-blue-600" />
                  Badge Number *
                </label>
                {editingProfile ? (
                  <>
                    <input
                      type="text"
                      value={profileData?.badge_no || ""}
                      onChange={(e) => handleFieldChange('badge_no', e.target.value)}
                      placeholder="e.g., AB1234"
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                        profileErrors.badge_no ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                      }`}
                      required
                    />
                    {profileErrors.badge_no && (
                      <p className="text-red-600 text-sm mt-1 font-medium">{profileErrors.badge_no}</p>
                    )}
                  </>
                ) : (
                  <div className="px-4 py-3 bg-gray-50 rounded-xl border-2 border-gray-200">
                    <span className="text-gray-700">{profileData?.badge_no || "Not provided"}</span>
                  </div>
                )}
              </div>
              
              {/* Taxi Company */}
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Building className="inline w-4 h-4 mr-2 text-blue-600" />
                  Company *
                </label>
                {editingProfile ? (
                  <>
                    <input
                      type="text"
                      value={profileData?.taxi_company || ""}
                      onChange={(e) => handleFieldChange('taxi_company', e.target.value)}
                      placeholder="Company Name"
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                        profileErrors.taxi_company ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                      }`}
                      required
                    />
                    {profileErrors.taxi_company && (
                      <p className="text-red-600 text-sm mt-1 font-medium">{profileErrors.taxi_company}</p>
                    )}
                  </>
                ) : (
                  <div className="px-4 py-3 bg-gray-50 rounded-xl border-2 border-gray-200">
                    <span className="text-gray-700">{profileData?.taxi_company || "Not provided"}</span>
                  </div>
                )}
              </div>
              
              {/* Local Council */}
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Users className="inline w-4 h-4 mr-2 text-blue-600" />
                  Local Council *
                </label>
                {editingProfile ? (
                  <>
                   <CustomDropdown
                      name="local_council"
                      value={getCurrentCouncilValue()}
                      onChange={(e) => handleCustomComponentChange(e.target.name, e.target.value)}
                      options={councilsLoading ? [] : localCouncils}
                      placeholder={councilsLoading ? "Loading councils..." : "Select your local council"}
                      icon={<Users className="w-5 h-5" />}
                      error={profileErrors.local_council}
                      disabled={councilsLoading}
                      allowClear={true}
                      showSearch={true}
                      searchThreshold={3}
                      emptyMessage={councilsLoading ? "Loading councils..." : "No councils available"}
                      displayFormatter={(option) => option.title || option}
                      className={profileErrors.local_council ? 'border-red-300 bg-red-50' : ''}
                    />
                    {profileErrors.local_council && (
                      <p className="text-red-600 text-sm mt-1 font-medium">{profileErrors.local_council}</p>
                    )}
                    {councilsLoading && (
                      <p className="text-blue-600 text-sm mt-1">Loading available councils...</p>
                    )}
                  </>
                ) : (
                  <div className="px-4 py-3 bg-gray-50 rounded-xl border-2 border-gray-200">
                    <span className="text-gray-700">{getCurrentCouncilDisplay() || "Not provided"}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Save Button - Only show in edit mode */}
            {editingProfile && (
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;