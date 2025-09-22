// ProfileSettingsPage.js
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useProfile } from "../context/ProfileContext";
import { Settings, User, Sparkles } from "lucide-react";
import { FaUser } from "react-icons/fa";

// Import components
import ProfileCard from "../components/ProfileCard";
import AddressSection from "../components/AddressSection";
import AddressModal from "../components/AddressModal";
import PasswordSection from "../components/PasswordSection";
import ProfileLoadingSkeleton from "../components/ProfileLoadingSkeleton";
import PageHeader from "../components/PageHeader";

// Validation utilities
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePhone = (phone) =>
  /^[\+]?[1-9][\d]{0,15}$/.test(phone.replace(/\s/g, ""));
const validatePostCode = (postCode) =>
  /^[A-Z]{1,2}[0-9R][0-9A-Z]? [0-9][ABD-HJLNP-UW-Z]{2}$/i.test(postCode);

const ProfileSettingsPage = () => {
  const {
    profileData,
    profileLoading,
    addresses,
    addressesLoading,
    roles,
    rolesLoading,
    uploadingImage,
    savingProfile,
    savingAddress,
    changingPassword,
    updateProfile,
    uploadProfileImage,
    changePassword,
    createAddress,
    updateAddress,
    deleteAddress,
    getSingleAddress,
    updateProfileField,
  } = useProfile();

  const [editingProfile, setEditingProfile] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  const [addressForm, setAddressForm] = useState({
    address_line1: "",
    address_line2: "",
    address_line3: "",
    county: "",
    post_code: "",
    town_city: "",
  });

  const [passwordForm, setPasswordForm] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });

  const [profileErrors, setProfileErrors] = useState({});
  const [addressErrors, setAddressErrors] = useState({});
  const [passwordErrors, setPasswordErrors] = useState({});

  // --- VALIDATIONS ---
  const validateProfile = () => {
    const errors = {};
    if (!profileData.contact_no) {
      errors.contact_no = "Contact number is required";
    } else if (!validatePhone(profileData.contact_no)) {
      errors.contact_no = "Please enter a valid phone number";
    }

    if (!profileData.your_role || profileData.your_role.length < 2)
      errors.your_role = "Role must be at least 2 characters";

    if (!profileData.badge_no || profileData.badge_no.length < 2)
      errors.badge_no = "Badge number must be at least 2 characters";

    if (!profileData.taxi_company || profileData.taxi_company.length < 2)
      errors.taxi_company = "Taxi company name must be at least 2 characters";

    if (!profileData.local_council)
      errors.local_council = "Local council is required";

    if (!profileData.date_of_birth) {
      errors.date_of_birth = "Date of birth is required";
    } else {
      const birthDate = new Date(profileData.date_of_birth);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      if (age < 18) errors.date_of_birth = "Must be at least 18 years old";
    }

    setProfileErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateAddress = () => {
    const errors = {};
    if (!addressForm.address_line1 || addressForm.address_line1.length < 5)
      errors.address_line1 = "Address line 1 must be at least 5 characters";

    if (!addressForm.town_city || addressForm.town_city.length < 2)
      errors.town_city = "Town/City must be at least 2 characters";

    if (!addressForm.county || addressForm.county.length < 2)
      errors.county = "County must be at least 2 characters";

    if (!addressForm.post_code) {
      errors.post_code = "Post code is required";
    } else if (!validatePostCode(addressForm.post_code)) {
      errors.post_code = "Please enter a valid UK postcode";
    }

    setAddressErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validatePassword = () => {
    const errors = {};
    if (!passwordForm.old_password)
      errors.old_password = "Current password is required";

    if (!passwordForm.new_password) {
      errors.new_password = "New password is required";
    } else if (passwordForm.new_password.length < 8) {
      errors.new_password = "Password must be at least 8 characters";
    }

    if (!passwordForm.confirm_password) {
      errors.confirm_password = "Please confirm your password";
    } else if (passwordForm.new_password !== passwordForm.confirm_password) {
      errors.confirm_password = "Passwords do not match";
    }

    setPasswordErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // --- HANDLERS ---
  const handleProfileUpdate = async () => {
    if (!validateProfile()) {
      toast.error("Please fix the validation errors");
      return;
    }
    try {
      await updateProfile(profileData);
      setEditingProfile(false);
      toast.success("Profile updated successfully!");
    } catch {
      toast.error("Failed to update profile");
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024)
      return toast.error("Image size must be less than 5MB");
    if (!file.type.startsWith("image/"))
      return toast.error("Please select a valid image file");

    try {
      await uploadProfileImage(file);
      toast.success("Profile image updated successfully!");
    } catch {
      toast.error("Failed to upload image");
    }
  };

  const handleAddressSubmit = async () => {
    if (!validateAddress()) {
      toast.error("Please fix the validation errors");
      return;
    }
    try {
      if (editingAddress) {
        await updateAddress(editingAddress, addressForm);
        toast.success("Address updated successfully!");
      } else {
        await createAddress(addressForm);
        toast.success("Address added successfully!");
      }
      resetAddressForm();
    } catch {
      toast.error(
        `Failed to ${editingAddress ? "update" : "add"} address`
      );
    }
  };

  const handleDeleteAddress = async (id) => {
    try {
      await deleteAddress(id);
      toast.success("Address deleted successfully!");
    } catch {
      toast.error("Failed to delete address");
    }
  };

  const handlePasswordChange = async () => {
    if (!validatePassword()) {
      toast.error("Please fix the validation errors");
      return;
    }
    try {
      await changePassword({
        old_password: passwordForm.old_password,
        new_password: passwordForm.new_password,
      });
      resetPasswordForm();
      toast.success("Password changed successfully!");
    } catch {
      toast.error("Failed to change password");
    }
  };

  const startEditingAddress = async (id) => {
    try {
      const address = await getSingleAddress(id);
      setAddressForm({
        address_line1: address.address_line1 || "",
        address_line2: address.address_line2 || "",
        address_line3: address.address_line3 || "",
        county: address.county || "",
        post_code: address.post_code || "",
        town_city: address.town_city || "",
      });
      setEditingAddress(id);
      setShowAddressForm(true);
      setAddressErrors({});
    } catch {
      toast.error("Failed to load address details");
    }
  };

  const resetAddressForm = () => {
    setShowAddressForm(false);
    setEditingAddress(null);
    setAddressForm({
      address_line1: "",
      address_line2: "",
      address_line3: "",
      county: "",
      post_code: "",
      town_city: "",
    });
    setAddressErrors({});
  };

  const resetPasswordForm = () => {
    setShowPasswordForm(false);
    setPasswordForm({
      old_password: "",
      new_password: "",
      confirm_password: "",
    });
    setPasswordErrors({});
  };

  // --- INPUT HANDLERS ---
  const handleProfileInputChange = (field, value) => {
    updateProfileField(field, value);
    if (profileErrors[field]) {
      setProfileErrors({ ...profileErrors, [field]: "" });
    }
  };

  const handleAddressInputChange = (field, value) => {
    setAddressForm({ ...addressForm, [field]: value });
    if (addressErrors[field]) {
      setAddressErrors({ ...addressErrors, [field]: "" });
    }
  };

  const handlePasswordInputChange = (field, value) => {
    setPasswordForm({ ...passwordForm, [field]: value });
    if (passwordErrors[field]) {
      setPasswordErrors({ ...passwordErrors, [field]: "" });
    }
  };

  // --- LOADING UI ---
  if (profileLoading && !profileData) {
    return <ProfileLoadingSkeleton />;
  }

  // --- MAIN RENDER ---
  return (
    <div className="min-h-screen bg-white rounded-2xl">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <PageHeader
          icon={<FaUser />}
          title="Profile Settings"
          currentPage="Profile Settings"
          showTradingYear={false}
          subtitle="Manage your personal details, addresses, and security settings."
        />

        <div className="space-y-8 mt-8">
          <ProfileCard
            profileData={profileData}
            uploadingImage={uploadingImage}
            editingProfile={editingProfile}
            profileErrors={profileErrors}
            roles={roles}
            rolesLoading={rolesLoading}
            onImageChange={handleImageChange}
            onEditToggle={() => setEditingProfile(!editingProfile)}
            onFieldChange={handleProfileInputChange}
            onSave={handleProfileUpdate}
            savingProfile={savingProfile}
          />

          <AddressSection
            addresses={addresses}
            addressesLoading={addressesLoading}
            onAddAddress={() => {
              setShowAddressForm(true);
              setAddressErrors({});
            }}
            onEditAddress={startEditingAddress}
            onDeleteAddress={handleDeleteAddress}
          />

          <PasswordSection
            showPasswordForm={showPasswordForm}
            passwordForm={passwordForm}
            passwordErrors={passwordErrors}
            changingPassword={changingPassword}
            onToggleForm={() => {
              setShowPasswordForm(!showPasswordForm);
              setPasswordErrors({});
            }}
            onFieldChange={handlePasswordInputChange}
            onSubmit={handlePasswordChange}
            onCancel={resetPasswordForm}
          />
        </div>
      </div>

      <AddressModal
        isOpen={showAddressForm}
        editingAddress={editingAddress}
        addressForm={addressForm}
        addressErrors={addressErrors}
        savingAddress={savingAddress}
        onClose={resetAddressForm}
        onFieldChange={handleAddressInputChange}
        onSubmit={handleAddressSubmit}
      />
    </div>
  );
};

export default ProfileSettingsPage;