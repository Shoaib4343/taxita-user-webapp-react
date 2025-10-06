


// // ProfileInformation.js
// import React, { useState, useEffect, useRef } from "react";
// import { toast } from "react-hot-toast";
// import { useProfile } from "../../context/ProfileContext";
// import { FaUser } from "react-icons/fa";
// import Swal from 'sweetalert2';

// // Import components
// import ProfileCard from "../../components/ProfileCard";
// import ProfileLoadingSkeleton from "../../components/ProfileLoadingSkeleton";
// import PageHeader from "../../components/PageHeader";

// // Import utility functions
// import { 
//   validateDateOfBirth, 
//   convertApiDateToInputFormat, 
//   convertInputDateToApiFormat 
// } from "../../utils/dateUtils";
// import { getCouncilValue, validateLocalCouncil } from "../../utils/dateUtils";

// // Validation utilities
// const validatePhone = (phone) =>
//   /^[\+]?[1-9][\d]{0,15}$/.test(phone.replace(/\s/g, ""));

// // SweetAlert2 confirmation function for unsaved changes
// const showUnsavedChangesConfirmation = () => {
//   return Swal.fire({
//     title: 'Unsaved Changes',
//     text: 'You have unsaved changes. Are you sure you want to cancel editing?',
//     icon: 'warning',
//     showCancelButton: true,
//     confirmButtonColor: '#d33',
//     cancelButtonColor: '#3085d6',
//     confirmButtonText: 'Yes, discard changes',
//     cancelButtonText: 'Keep editing',
//     reverseButtons: true,
//     focusConfirm: false,
//     focusCancel: true
//   });
// };

// const ProfileInformation = () => {
//   const {
//     profileData,
//     profileLoading,
//     profileImageUrl,
//     profileImageLoading,
//     roles,
//     rolesLoading,
//     uploadingImage,
//     savingProfile,
//     updateProfile,
//     updateProfileField,
//     fetchProfileImage,
//   } = useProfile();

//   const [editingProfile, setEditingProfile] = useState(false);
//   const [profileErrors, setProfileErrors] = useState({});
//   const [pendingImageFile, setPendingImageFile] = useState(null);
//   const [previewImageUrl, setPreviewImageUrl] = useState(null);
  
//   // Store the original data when entering edit mode
//   const originalDataRef = useRef(null);

//   // Store original data when entering edit mode
//   useEffect(() => {
//     if (editingProfile && profileData && !originalDataRef.current) {
//       // Deep clone the profile data and convert date format for editing
//       const clonedData = JSON.parse(JSON.stringify(profileData));
      
//       // Convert API date format (DD-MM-YYYY) to input format (YYYY-MM-DD)
//       if (clonedData.date_of_birth) {
//         clonedData.date_of_birth = convertApiDateToInputFormat(clonedData.date_of_birth);
//       }
      
//       originalDataRef.current = clonedData;
      
//       // Update the profile data in state with converted date for editing
//       if (profileData.date_of_birth) {
//         updateProfileField('date_of_birth', convertApiDateToInputFormat(profileData.date_of_birth));
//       }
//     } else if (!editingProfile) {
//       // Clear original data when exiting edit mode
//       originalDataRef.current = null;
//       // Clear pending image when exiting edit mode
//       setPendingImageFile(null);
//       if (previewImageUrl) {
//         URL.revokeObjectURL(previewImageUrl);
//         setPreviewImageUrl(null);
//       }
//     }
//   }, [editingProfile, profileData]);

//   // Clean up preview URL when component unmounts
//   useEffect(() => {
//     return () => {
//       if (previewImageUrl) {
//         URL.revokeObjectURL(previewImageUrl);
//       }
//     };
//   }, []);

//   // Function to compare objects deeply, handling council object vs ID comparison
//   const hasDataChanged = () => {
//     if (!originalDataRef.current || !profileData) return false;

//     // Check if there's a pending image file
//     if (pendingImageFile) return true;

//     const original = originalDataRef.current;
//     const current = profileData;

//     // Fields to compare (excluding date_of_birth for special handling)
//     const fieldsToCompare = [
//       'contact_no',
//       'your_role', 
//       'badge_no',
//       'taxi_company'
//     ];

//     // Check regular fields
//     for (const field of fieldsToCompare) {
//       if (original[field] !== current[field]) {
//         return true;
//       }
//     }

//     // Special handling for date_of_birth
//     const originalDate = original.date_of_birth;
//     const currentDate = current.date_of_birth;
    
//     if (originalDate !== currentDate) {
//       return true;
//     }

//     // Special handling for local_council (can be object vs ID)
//     const originalCouncil = original.local_council;
//     const currentCouncil = current.local_council;

//     // If both are objects, compare their IDs
//     if (typeof originalCouncil === 'object' && typeof currentCouncil === 'object') {
//       if (originalCouncil?.id !== currentCouncil?.id) {
//         return true;
//       }
//     }
//     // If one is object and one is ID, compare appropriately
//     else if (typeof originalCouncil === 'object' && typeof currentCouncil !== 'object') {
//       if (originalCouncil?.id != currentCouncil) {
//         return true;
//       }
//     }
//     else if (typeof originalCouncil !== 'object' && typeof currentCouncil === 'object') {
//       if (originalCouncil != currentCouncil?.id) {
//         return true;
//       }
//     }
//     // Both are primitives
//     else if (originalCouncil != currentCouncil) {
//       return true;
//     }

//     return false;
//   };

//   // Enhanced validations
//   const validateProfile = () => {
//     const errors = {};

//     // Contact number validation
//     if (!profileData.contact_no || profileData.contact_no.trim() === '') {
//       errors.contact_no = "Contact number is required";
//     } else if (!validatePhone(profileData.contact_no)) {
//       errors.contact_no = "Please enter a valid phone number";
//     }

//     // Role validation
//     if (!profileData.your_role || profileData.your_role.toString().trim() === '') {
//       errors.your_role = "Role is required";
//     } else if (profileData.your_role.length < 2) {
//       errors.your_role = "Role must be at least 2 characters";
//     }

//     // Badge number validation
//     if (!profileData.badge_no || profileData.badge_no.toString().trim() === '') {
//       errors.badge_no = "Badge number is required";
//     } else if (profileData.badge_no.length < 2) {
//       errors.badge_no = "Badge number must be at least 2 characters";
//     }

//     // Taxi company validation
//     if (!profileData.taxi_company || profileData.taxi_company.toString().trim() === '') {
//       errors.taxi_company = "Company name is required";
//     } else if (profileData.taxi_company.length < 2) {
//       errors.taxi_company = "Company name must be at least 2 characters";
//     }

//     // Local council validation
//     const councilError = validateLocalCouncil(profileData.local_council);
//     if (councilError) {
//       errors.local_council = councilError;
//     }

//     // Enhanced date of birth validation
//     const dateError = validateDateOfBirth(profileData.date_of_birth);
//     if (dateError) {
//       errors.date_of_birth = dateError;
//     }

//     setProfileErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   // Real-time field validation for immediate feedback
//   const validateField = (fieldName, value) => {
//     let error = null;

//     switch (fieldName) {
//       case 'contact_no':
//         if (!value || value.trim() === '') {
//           error = "Contact number is required";
//         } else if (!validatePhone(value)) {
//           error = "Please enter a valid phone number";
//         }
//         break;

//       case 'your_role':
//         if (!value || value.toString().trim() === '') {
//           error = "Role is required";
//         } else if (value.length < 2) {
//           error = "Role must be at least 2 characters";
//         }
//         break;

//       case 'badge_no':
//         if (!value || value.toString().trim() === '') {
//           error = "Badge number is required";
//         } else if (value.length < 2) {
//           error = "Badge number must be at least 2 characters";
//         }
//         break;

//       case 'taxi_company':
//         if (!value || value.toString().trim() === '') {
//           error = "Company name is required";
//         } else if (value.length < 2) {
//           error = "Company name must be at least 2 characters";
//         }
//         break;

//       case 'local_council':
//         error = validateLocalCouncil(value);
//         break;

//       case 'date_of_birth':
//         error = validateDateOfBirth(value);
//         break;

//       default:
//         break;
//     }

//     return error;
//   };

//   // Handle profile update
//   const handleProfileUpdate = async () => {
//     if (!validateProfile()) {
//       toast.error("Please fix all validation errors before saving");
//       return;
//     }

//     // Check if any data has changed
//     if (!hasDataChanged()) {
//       toast("No changes detected", {
//         icon: "ℹ️",
//         style: {
//           borderRadius: "10px",
//           background: "#f3f4f6",
//           color: "#374151",
//         },
//       });
//       return;
//     }

//     // Prepare the data to send to the API
//     const dataToSend = { ...profileData };
    
//     // Convert date back to API format (DD-MM-YYYY) before sending
//     if (dataToSend.date_of_birth) {
//       dataToSend.date_of_birth = convertInputDateToApiFormat(dataToSend.date_of_birth);
//     }
    
//     // Add the image file if one was selected
//     if (pendingImageFile) {
//       dataToSend.profile_image = pendingImageFile;
//     }
    
//     // Convert local council to ID for API
//     if (typeof dataToSend.local_council === 'object' && dataToSend.local_council?.id) {
//       dataToSend.local_council = dataToSend.local_council.id;
//     }
    
//     try {
//       await updateProfile(dataToSend);
//       setEditingProfile(false);
//       toast.success("Profile updated successfully!");
//       originalDataRef.current = null;
//       setPendingImageFile(null);
//       if (previewImageUrl) {
//         URL.revokeObjectURL(previewImageUrl);
//         setPreviewImageUrl(null);
//       }
//       // Refresh profile image if an image was uploaded
//       if (pendingImageFile) {
//         await fetchProfileImage(true);
//       }
//     } catch (error) {
//       toast.error("Failed to update profile");
//       console.error("Profile update error:", error);
//     }
//   };

//   // Updated image change handler - no longer uploads immediately
//   const handleImageChange = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     if (file.size > 5 * 1024 * 1024) {
//       return toast.error("Image size must be less than 5MB");
//     }
//     if (!file.type.startsWith("image/")) {
//       return toast.error("Please select a valid image file");
//     }

//     // Clean up previous preview URL
//     if (previewImageUrl) {
//       URL.revokeObjectURL(previewImageUrl);
//     }

//     // Store the file for later upload and create preview
//     setPendingImageFile(file);
//     const previewUrl = URL.createObjectURL(file);
//     setPreviewImageUrl(previewUrl);

//     toast.success("Image selected! Click 'Save Changes' to update your profile.");
//   };

//   // Input handlers
//   const handleProfileInputChange = (field, value) => {
//     // Handle special cases for field updates
//     if (field === 'local_council') {
//       updateProfileField(field, value);
//     } else {
//       updateProfileField(field, value);
//     }
    
//     // Real-time validation for immediate feedback
//     const fieldError = validateField(field, value);
//     setProfileErrors(prev => ({
//       ...prev,
//       [field]: fieldError
//     }));
//   };

//   // Handle edit toggle with SweetAlert2 confirmation if there are unsaved changes
//   const handleEditToggle = async () => {
//     if (editingProfile && hasDataChanged()) {
//       try {
//         const result = await showUnsavedChangesConfirmation();
        
//         if (result.isConfirmed) {
//           // Reset data to original values
//           if (originalDataRef.current) {
//             Object.keys(originalDataRef.current).forEach(key => {
//               updateProfileField(key, originalDataRef.current[key]);
//             });
//           }
//           setEditingProfile(false);
//           setProfileErrors({});
//           originalDataRef.current = null;
//           // Clear pending image
//           setPendingImageFile(null);
//           if (previewImageUrl) {
//             URL.revokeObjectURL(previewImageUrl);
//             setPreviewImageUrl(null);
//           }
//         }
//         // If cancelled, do nothing - stay in edit mode
//       } catch (error) {
//         console.error('Error showing confirmation dialog:', error);
//       }
//     } else {
//       setEditingProfile(!editingProfile);
//       if (!editingProfile) {
//         setProfileErrors({});
//       }
//     }
//   };

//   // Loading UI
//   if (profileLoading && !profileData) {
//     return <ProfileLoadingSkeleton />;
//   }

//   // Main render
//   return (
//     <div className="min-h-screen bg-white rounded-2xl">
//       <div className="max-w-6xl mx-auto px-4 py-8">
//         <PageHeader
//           icon={<FaUser />}
//           title="Profile Information"
//           currentPage="Profile Information"
//           showTradingYear={false}
//           subtitle="Manage your personal details and professional information."
//         />

//         <div className="mt-8">
//           <ProfileCard
//             profileData={profileData}
//             profileImageUrl={profileImageUrl}
//             profileImageLoading={profileImageLoading}
//             uploadingImage={uploadingImage}
//             editingProfile={editingProfile}
//             profileErrors={profileErrors}
//             roles={roles}
//             rolesLoading={rolesLoading}
//             onImageChange={handleImageChange}
//             onEditToggle={handleEditToggle}
//             onFieldChange={handleProfileInputChange}
//             onSave={handleProfileUpdate}
//             savingProfile={savingProfile}
//             hasUnsavedChanges={hasDataChanged()}
//             previewImageUrl={previewImageUrl}
//             pendingImageFile={pendingImageFile}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfileInformation;





























































// ProfileInformation.js
import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import { useProfile } from "../../context/ProfileContext";
import { FaUser } from "react-icons/fa";
import Swal from 'sweetalert2';

// Import components
import ProfileCard from "../../components/ProfileCard";
import ProfileLoadingSkeleton from "../../components/ProfileLoadingSkeleton";
import PageHeader from "../../components/PageHeader";

// Import utility functions
import { 
  validateDateOfBirth, 
  convertApiDateToInputFormat, 
  convertInputDateToApiFormat 
} from "../../utils/dateUtils";
import { 
  getCouncilIdForApi, 
  getCouncilValueForDropdown,
  validateLocalCouncil 
} from "../../utils/councilUtils";

// Validation utilities
const validatePhone = (phone) =>
  /^[\+]?[1-9][\d]{0,15}$/.test(phone.replace(/\s/g, ""));

// SweetAlert2 confirmation function for unsaved changes
const showUnsavedChangesConfirmation = () => {
  return Swal.fire({
    title: 'Unsaved Changes',
    text: 'You have unsaved changes. Are you sure you want to cancel editing?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, discard changes',
    cancelButtonText: 'Keep editing',
    reverseButtons: true,
    focusConfirm: false,
    focusCancel: true
  });
};

const ProfileInformation = () => {
  const {
    profileData,
    profileLoading,
    profileImageUrl,
    profileImageLoading,
    roles,
    rolesLoading,
    uploadingImage,
    savingProfile,
    updateProfile,
    updateProfileField,
    fetchProfileImage,
  } = useProfile();

  const [editingProfile, setEditingProfile] = useState(false);
  const [profileErrors, setProfileErrors] = useState({});
  const [pendingImageFile, setPendingImageFile] = useState(null);
  const [previewImageUrl, setPreviewImageUrl] = useState(null);
  const [localCouncils, setLocalCouncils] = useState([]);
  
  // Store the original data when entering edit mode
  const originalDataRef = useRef(null);

  // Store original data when entering edit mode
  useEffect(() => {
    if (editingProfile && profileData && !originalDataRef.current) {
      // Deep clone the profile data and convert date format for editing
      const clonedData = JSON.parse(JSON.stringify(profileData));
      
      // Convert API date format (DD-MM-YYYY) to input format (YYYY-MM-DD)
      if (clonedData.date_of_birth) {
        clonedData.date_of_birth = convertApiDateToInputFormat(clonedData.date_of_birth);
      }
      
      originalDataRef.current = clonedData;
      
      // Update the profile data in state with converted date for editing
      if (profileData.date_of_birth) {
        updateProfileField('date_of_birth', convertApiDateToInputFormat(profileData.date_of_birth));
      }
    } else if (!editingProfile) {
      // Clear original data when exiting edit mode
      originalDataRef.current = null;
      // Clear pending image when exiting edit mode
      setPendingImageFile(null);
      if (previewImageUrl) {
        URL.revokeObjectURL(previewImageUrl);
        setPreviewImageUrl(null);
      }
    }
  }, [editingProfile, profileData]);

  // Clean up preview URL when component unmounts
  useEffect(() => {
    return () => {
      if (previewImageUrl) {
        URL.revokeObjectURL(previewImageUrl);
      }
    };
  }, []);

  // Function to compare objects deeply, handling council object vs ID vs text comparison
  const hasDataChanged = () => {
    if (!originalDataRef.current || !profileData) return false;

    // Check if there's a pending image file
    if (pendingImageFile) return true;

    const original = originalDataRef.current;
    const current = profileData;

    // Fields to compare (excluding date_of_birth and local_council for special handling)
    const fieldsToCompare = [
      'contact_no',
      'your_role', 
      'badge_no',
      'taxi_company'
    ];

    // Check regular fields
    for (const field of fieldsToCompare) {
      if (original[field] !== current[field]) {
        return true;
      }
    }

    // Special handling for date_of_birth
    const originalDate = original.date_of_birth;
    const currentDate = current.date_of_birth;
    
    if (originalDate !== currentDate) {
      return true;
    }

    // Special handling for local_council (can be object vs ID vs text)
    const originalCouncil = original.local_council;
    const currentCouncil = current.local_council;

    // Convert both to IDs for comparison
    const originalCouncilId = getCouncilIdForApi(originalCouncil, localCouncils);
    const currentCouncilId = getCouncilIdForApi(currentCouncil, localCouncils);
    
    if (originalCouncilId != currentCouncilId) {
      return true;
    }

    return false;
  };

  // Enhanced validations
  const validateProfile = () => {
    const errors = {};

    // Contact number validation
    if (!profileData.contact_no || profileData.contact_no.trim() === '') {
      errors.contact_no = "Contact number is required";
    } else if (!validatePhone(profileData.contact_no)) {
      errors.contact_no = "Please enter a valid phone number";
    }

    // Role validation
    if (!profileData.your_role || profileData.your_role.toString().trim() === '') {
      errors.your_role = "Role is required";
    } else if (profileData.your_role.length < 2) {
      errors.your_role = "Role must be at least 2 characters";
    }

    // Badge number validation
    if (!profileData.badge_no || profileData.badge_no.toString().trim() === '') {
      errors.badge_no = "Badge number is required";
    } else if (profileData.badge_no.length < 2) {
      errors.badge_no = "Badge number must be at least 2 characters";
    }

    // Taxi company validation
    if (!profileData.taxi_company || profileData.taxi_company.toString().trim() === '') {
      errors.taxi_company = "Company name is required";
    } else if (profileData.taxi_company.length < 2) {
      errors.taxi_company = "Company name must be at least 2 characters";
    }

    // Local council validation
    const councilError = validateLocalCouncil(profileData.local_council);
    if (councilError) {
      errors.local_council = councilError;
    }

    // Enhanced date of birth validation
    const dateError = validateDateOfBirth(profileData.date_of_birth);
    if (dateError) {
      errors.date_of_birth = dateError;
    }

    setProfileErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Real-time field validation for immediate feedback
  const validateField = (fieldName, value) => {
    let error = null;

    switch (fieldName) {
      case 'contact_no':
        if (!value || value.trim() === '') {
          error = "Contact number is required";
        } else if (!validatePhone(value)) {
          error = "Please enter a valid phone number";
        }
        break;

      case 'your_role':
        if (!value || value.toString().trim() === '') {
          error = "Role is required";
        } else if (value.length < 2) {
          error = "Role must be at least 2 characters";
        }
        break;

      case 'badge_no':
        if (!value || value.toString().trim() === '') {
          error = "Badge number is required";
        } else if (value.length < 2) {
          error = "Badge number must be at least 2 characters";
        }
        break;

      case 'taxi_company':
        if (!value || value.toString().trim() === '') {
          error = "Company name is required";
        } else if (value.length < 2) {
          error = "Company name must be at least 2 characters";
        }
        break;

      case 'local_council':
        error = validateLocalCouncil(value);
        break;

      case 'date_of_birth':
        error = validateDateOfBirth(value);
        break;

      default:
        break;
    }

    return error;
  };

  // Handle profile update
  const handleProfileUpdate = async () => {
    if (!validateProfile()) {
      toast.error("Please fix all validation errors before saving");
      return;
    }

    // Check if any data has changed
    if (!hasDataChanged()) {
      toast("No changes detected", {
        icon: "ℹ",
        style: {
          borderRadius: "10px",
          background: "#f3f4f6",
          color: "#374151",
        },
      });
      return;
    }

    // Prepare the data to send to the API
    const dataToSend = { ...profileData };
    
    // Convert date back to API format (DD-MM-YYYY) before sending
    if (dataToSend.date_of_birth) {
      dataToSend.date_of_birth = convertInputDateToApiFormat(dataToSend.date_of_birth);
    }
    
    // Add the image file if one was selected
    if (pendingImageFile) {
      dataToSend.profile_image = pendingImageFile;
    }
    
    // Convert local council to ID for API (handles text/object/ID scenarios)
    dataToSend.local_council = getCouncilIdForApi(dataToSend.local_council, localCouncils);
    
    try {
      await updateProfile(dataToSend);
      setEditingProfile(false);
      toast.success("Profile updated successfully!");
      originalDataRef.current = null;
      setPendingImageFile(null);
      if (previewImageUrl) {
        URL.revokeObjectURL(previewImageUrl);
        setPreviewImageUrl(null);
      }
      // Refresh profile image if an image was uploaded
      if (pendingImageFile) {
        await fetchProfileImage(true);
      }
    } catch (error) {
      toast.error("Failed to update profile");
      console.error("Profile update error:", error);
    }
  };

  // Updated image change handler - no longer uploads immediately
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      return toast.error("Image size must be less than 5MB");
    }
    if (!file.type.startsWith("image/")) {
      return toast.error("Please select a valid image file");
    }

    // Clean up previous preview URL
    if (previewImageUrl) {
      URL.revokeObjectURL(previewImageUrl);
    }

    // Store the file for later upload and create preview
    setPendingImageFile(file);
    const previewUrl = URL.createObjectURL(file);
    setPreviewImageUrl(previewUrl);

    toast.success("Image selected! Click 'Save Changes' to update your profile.");
  };

  // Input handlers
  const handleProfileInputChange = (field, value) => {
    // Handle special cases for field updates
    updateProfileField(field, value);
    
    // Real-time validation for immediate feedback
    const fieldError = validateField(field, value);
    setProfileErrors(prev => ({
      ...prev,
      [field]: fieldError
    }));
  };

  // Handle edit toggle with SweetAlert2 confirmation if there are unsaved changes
  const handleEditToggle = async () => {
    if (editingProfile && hasDataChanged()) {
      try {
        const result = await showUnsavedChangesConfirmation();
        
        if (result.isConfirmed) {
          // Reset data to original values
          if (originalDataRef.current) {
            Object.keys(originalDataRef.current).forEach(key => {
              updateProfileField(key, originalDataRef.current[key]);
            });
          }
          setEditingProfile(false);
          setProfileErrors({});
          originalDataRef.current = null;
          // Clear pending image
          setPendingImageFile(null);
          if (previewImageUrl) {
            URL.revokeObjectURL(previewImageUrl);
            setPreviewImageUrl(null);
          }
        }
        // If cancelled, do nothing - stay in edit mode
      } catch (error) {
        console.error('Error showing confirmation dialog:', error);
      }
    } else {
      setEditingProfile(!editingProfile);
      if (!editingProfile) {
        setProfileErrors({});
      }
    }
  };

  // Loading UI
  if (profileLoading && !profileData) {
    return <ProfileLoadingSkeleton />;
  }

  // Main render
  return (
    <div className="min-h-screen bg-white rounded-2xl">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <PageHeader
          icon={<FaUser />}
          title="Profile Information"
          currentPage="Profile Information"
          showTradingYear={false}
          subtitle="Manage your personal details and professional information."
        />

        <div className="mt-8">
          <ProfileCard
            profileData={profileData}
            profileImageUrl={profileImageUrl}
            profileImageLoading={profileImageLoading}
            uploadingImage={uploadingImage}
            editingProfile={editingProfile}
            profileErrors={profileErrors}
            roles={roles}
            rolesLoading={rolesLoading}
            localCouncils={localCouncils}
            setLocalCouncils={setLocalCouncils}
            onImageChange={handleImageChange}
            onEditToggle={handleEditToggle}
            onFieldChange={handleProfileInputChange}
            onSave={handleProfileUpdate}
            savingProfile={savingProfile}
            hasUnsavedChanges={hasDataChanged()}
            previewImageUrl={previewImageUrl}
            pendingImageFile={pendingImageFile}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileInformation;