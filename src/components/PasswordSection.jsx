// components/PasswordSection.js
import React, { useState } from "react";
import { Lock, Shield, Eye, EyeOff, Key, AlertCircle, CheckCircle } from "lucide-react";

const PasswordStrengthIndicator = ({ password }) => {
  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: '', color: 'gray' };
    
    let score = 0;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    
    const strengthMap = {
      0: { label: 'Very Weak', color: 'red' },
      1: { label: 'Weak', color: 'red' },
      2: { label: 'Fair', color: 'yellow' },
      3: { label: 'Good', color: 'blue' },
      4: { label: 'Strong', color: 'green' },
      5: { label: 'Very Strong', color: 'green' }
    };
    
    return { strength: score, ...strengthMap[score] };
  };
  
  const { strength, label, color } = getPasswordStrength(password);
  
  return (
    <div className="mt-2">
      <div className="flex gap-1 mb-2">
        {[1, 2, 3, 4, 5].map((level) => (
          <div
            key={level}
            className={`h-2 flex-1 rounded-full transition-all duration-300 ${
              level <= strength
                ? color === 'red' ? 'bg-red-500'
                : color === 'yellow' ? 'bg-yellow-500'
                : color === 'blue' ? 'bg-blue-500'
                : 'bg-green-500'
                : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
      <p className={`text-xs font-medium ${
        color === 'red' ? 'text-red-600'
        : color === 'yellow' ? 'text-yellow-600'
        : color === 'blue' ? 'text-blue-600'
        : color === 'green' ? 'text-green-600'
        : 'text-gray-500'
      }`}>
        Password Strength: {label}
      </p>
    </div>
  );
};

const PasswordSection = ({ 
  showPasswordForm, 
  passwordForm, 
  passwordErrors,
  changingPassword,
  onToggleForm, 
  onFieldChange, 
  onSubmit, 
  onCancel 
}) => {
  const [showPasswords, setShowPasswords] = useState({
    old_password: false,
    new_password: false,
    confirm_password: false
  });

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const passwordsMatch = passwordForm.new_password && passwordForm.confirm_password && 
                         passwordForm.new_password === passwordForm.confirm_password;

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header Section with Gradient */}
      <div className="px-8 py-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-600 rounded-lg shadow-sm">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Security Settings</h3>
              <p className="text-gray-600">Keep your account secure with a strong password</p>
            </div>
          </div>
          
          <button
            onClick={onToggleForm}
            className="flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-semibold"
          >
            <Lock size={20} />
            {showPasswordForm ? "Cancel" : "Change Password"}
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-8">
        {!showPasswordForm ? (
          // Security Status
          <div className="space-y-6">
           

            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                <div className="flex items-center gap-3 mb-3">
                  <Key className="w-5 h-5 text-blue-600" />
                  <h5 className="font-semibold text-blue-900">Password Security</h5>
                </div>
                <ul className="text-blue-700 text-sm space-y-1">
                  <li>• Use at least 8 characters</li>
                  <li>• Include uppercase and lowercase letters</li>
                  <li>• Add numbers and special characters</li>
                </ul>
              </div>

              <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100">
                <div className="flex items-center gap-3 mb-3">
                  <AlertCircle className="w-5 h-5 text-emerald-600" />
                  <h5 className="font-semibold text-emerald-900">Security Tips</h5>
                </div>
                <ul className="text-emerald-700 text-sm space-y-1">
                  <li>• Don't share your password</li>
                  <li>• Use unique passwords for each account</li>
                  <li>• Update regularly for better security</li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          // Password Change Form
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-500 rounded-lg">
                <Lock className="w-5 h-5 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-gray-800">Update Your Password</h4>
            </div>

            {/* Current Password */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Shield size={16} className="text-blue-600" />
                Current Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPasswords.old_password ? "text" : "password"}
                  placeholder="Enter your current password"
                  value={passwordForm.old_password}
                  onChange={(e) => onFieldChange('old_password', e.target.value)}
                  className={`w-full px-4 py-3 pr-12 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    passwordErrors.old_password ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                  }`}
                  required
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('old_password')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPasswords.old_password ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {passwordErrors.old_password && (
                <p className="text-red-600 text-sm font-medium flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                  {passwordErrors.old_password}
                </p>
              )}
            </div>

            {/* New Password */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Key size={16} className="text-blue-600" />
                New Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPasswords.new_password ? "text" : "password"}
                  placeholder="Enter your new password (min 8 characters)"
                  value={passwordForm.new_password}
                  onChange={(e) => onFieldChange('new_password', e.target.value)}
                  className={`w-full px-4 py-3 pr-12 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    passwordErrors.new_password ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                  }`}
                  required
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('new_password')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPasswords.new_password ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {passwordErrors.new_password && (
                <p className="text-red-600 text-sm font-medium flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                  {passwordErrors.new_password}
                </p>
              )}
              {passwordForm.new_password && (
                <PasswordStrengthIndicator password={passwordForm.new_password} />
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Lock size={16} className="text-blue-600" />
                Confirm New Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPasswords.confirm_password ? "text" : "password"}
                  placeholder="Confirm your new password"
                  value={passwordForm.confirm_password}
                  onChange={(e) => onFieldChange('confirm_password', e.target.value)}
                  className={`w-full px-4 py-3 pr-12 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    passwordErrors.confirm_password ? 'border-red-300 bg-red-50' : 
                    passwordsMatch && passwordForm.confirm_password ? 'border-green-300 bg-green-50' :
                    'border-gray-300 hover:border-gray-400'
                  }`}
                  required
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('confirm_password')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPasswords.confirm_password ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                {passwordsMatch && (
                  <CheckCircle className="absolute right-12 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                )}
              </div>
              {passwordErrors.confirm_password && (
                <p className="text-red-600 text-sm font-medium flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                  {passwordErrors.confirm_password}
                </p>
              )}
              {passwordsMatch && (
                <p className="text-green-600 text-sm font-medium flex items-center gap-1">
                  <CheckCircle size={14} />
                  Passwords match
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6">
              <button
                onClick={onSubmit}
                disabled={changingPassword || !passwordsMatch || !passwordForm.old_password || !passwordForm.new_password}
                className="flex items-center justify-center gap-3 px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed font-semibold transform hover:-translate-y-0.5"
              >
                {changingPassword ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Updating Password...
                  </>
                ) : (
                  <>
                    <Key size={20} />
                    Update Password
                  </>
                )}
              </button>
              
              <button
                onClick={onCancel}
                className="px-8 py-4 border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 rounded-xl transition-all duration-200 font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PasswordSection;