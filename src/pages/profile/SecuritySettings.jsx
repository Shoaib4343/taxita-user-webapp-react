// SecuritySettings.js
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useProfile } from "../../context/ProfileContext";
import { Shield } from "lucide-react";

// Import components
import PasswordSection from "../../components/PasswordSection";
import PageHeader from "../../components/PageHeader";

const SecuritySettings = () => {
  const {
    changingPassword,
    changePassword,
  } = useProfile();

  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const [passwordForm, setPasswordForm] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });

  const [passwordErrors, setPasswordErrors] = useState({});

  // --- VALIDATIONS ---
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
  const handlePasswordInputChange = (field, value) => {
    setPasswordForm({ ...passwordForm, [field]: value });
    if (passwordErrors[field]) {
      setPasswordErrors({ ...passwordErrors, [field]: "" });
    }
  };

  // --- MAIN RENDER ---
  return (
    <div className="min-h-screen bg-white rounded-2xl">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <PageHeader
          icon={<Shield />}
          title="Security Settings"
          currentPage="Security Settings"
          showTradingYear={false}
          subtitle="Manage your account security and password settings."
        />

        <div className="mt-8">
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
    </div>
  );
};

export default SecuritySettings;