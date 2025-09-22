// src/context/ProfileContext.js
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import * as dashboardAPI from '../services/dashboard';
import { useAuth } from './AuthContext';

// ===== CONSTANTS =====
const initialState = {
  profileData: null,
  addresses: [],
  roles: [],
  loading: {
    profile: false,
    addresses: false,
    roles: false,
    uploadingImage: false,
    savingProfile: false,
    savingAddress: false,
    changingPassword: false,
  },
  errors: {
    profile: null,
    addresses: null,
    roles: null,
  },
  fetched: {
    profile: false,
    addresses: false,
    roles: false,
  },
  toasts: []
};

const ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_DATA: 'SET_DATA',
  SET_ERROR: 'SET_ERROR',
  SET_FETCHED: 'SET_FETCHED',
  UPDATE_PROFILE_FIELD: 'UPDATE_PROFILE_FIELD',
  ADD_ADDRESS: 'ADD_ADDRESS',
  UPDATE_ADDRESS: 'UPDATE_ADDRESS',
  REMOVE_ADDRESS: 'REMOVE_ADDRESS',
  ADD_TOAST: 'ADD_TOAST',
  REMOVE_TOAST: 'REMOVE_TOAST',
  RESET_STATE: 'RESET_STATE'
};

// ===== REDUCER =====
const profileReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: { ...state.loading, [action.key]: action.payload }
      };

    case ACTIONS.SET_DATA:
      return {
        ...state,
        [action.key]: action.payload,
        loading: { ...state.loading, [action.key]: false },
        errors: { ...state.errors, [action.key]: null },
        fetched: { ...state.fetched, [action.key]: true }
      };

    case ACTIONS.SET_ERROR:
      return {
        ...state,
        errors: { ...state.errors, [action.key]: action.payload },
        loading: { ...state.loading, [action.key]: false }
      };

    case ACTIONS.SET_FETCHED:
      return {
        ...state,
        fetched: { ...state.fetched, [action.key]: action.payload }
      };

    case ACTIONS.UPDATE_PROFILE_FIELD:
      return {
        ...state,
        profileData: {
          ...state.profileData,
          [action.field]: action.value
        }
      };

    case ACTIONS.ADD_ADDRESS:
      return {
        ...state,
        addresses: [...state.addresses, action.payload]
      };

    case ACTIONS.UPDATE_ADDRESS:
      return {
        ...state,
        addresses: state.addresses.map(addr => 
          addr.id === action.payload.id ? action.payload : addr
        )
      };

    case ACTIONS.REMOVE_ADDRESS:
      return {
        ...state,
        addresses: state.addresses.filter(addr => addr.id !== action.payload)
      };

    case ACTIONS.ADD_TOAST:
      return {
        ...state,
        toasts: [...state.toasts, { ...action.payload, id: Date.now() }]
      };

    case ACTIONS.REMOVE_TOAST:
      return {
        ...state,
        toasts: state.toasts.filter(toast => toast.id !== action.payload)
      };

    case ACTIONS.RESET_STATE:
      return initialState;

    default:
      return state;
  }
};

// ===== CONTEXT SETUP =====
const ProfileContext = createContext();

export const ProfileContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(profileReducer, initialState);
  const { auth } = useAuth();

  // ===== HELPER FUNCTIONS =====
  const showToast = (message, type = 'info') => {
    dispatch({ type: ACTIONS.ADD_TOAST, payload: { message, type } });
  };

  const removeToast = (id) => {
    dispatch({ type: ACTIONS.REMOVE_TOAST, payload: id });
  };

  const resetState = () => {
    dispatch({ type: ACTIONS.RESET_STATE });
  };

  const handleApiCall = async (apiCall, loadingKey, dataKey, successMessage) => {
    if (!auth.isAuthenticated) return null;
    
    dispatch({ type: ACTIONS.SET_LOADING, key: loadingKey, payload: true });
    
    try {
      const response = await apiCall();
      const data = response.data;
      
      if (dataKey) {
        dispatch({ type: ACTIONS.SET_DATA, key: dataKey, payload: data });
      }
      
      if (successMessage) {
        showToast(successMessage, "success");
      }
      
      return data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Operation failed";
      if (dataKey) {
        dispatch({ type: ACTIONS.SET_ERROR, key: dataKey, payload: errorMessage });
      }
      showToast(errorMessage, "error");
      throw error;
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, key: loadingKey, payload: false });
    }
  };

  // ===== PROFILE FUNCTIONS =====
  const fetchProfileData = async (force = false) => {
    if (!auth.isAuthenticated) return null;
    if (state.fetched.profile && !force) return state.profileData;

    return handleApiCall(
      () => dashboardAPI.profileSettingGetApi(),
      'profile',
      'profileData',
      !state.fetched.profile ? "Profile data loaded successfully" : null
    );
  };

  const updateProfile = async (updatedData) => {
    const formData = new FormData();
    
    if (updatedData.profile_image instanceof File) {
      formData.append('profile_image', updatedData.profile_image);
    }
    
    Object.keys(updatedData).forEach(key => {
      if (key !== 'profile_image' && updatedData[key] !== null && updatedData[key] !== undefined) {
        formData.append(key, updatedData[key]);
      }
    });

    const result = await handleApiCall(
      () => dashboardAPI.profileSettingPutApi(formData),
      'savingProfile',
      null,
      "Profile updated successfully!"
    );
    
    dispatch({ type: ACTIONS.SET_DATA, key: 'profileData', payload: updatedData });
    return result;
  };

  const uploadProfileImage = async (file) => {
    const formData = new FormData();
    formData.append('profile_image', file);

    await handleApiCall(
      () => dashboardAPI.profileSettingImageApi(formData),
      'uploadingImage',
      null,
      "Profile image updated successfully!"
    );
    
    await fetchProfileData(true);
  };

  const changePassword = async (passwordData) => {
    return handleApiCall(
      () => dashboardAPI.changePasswordApi(passwordData),
      'changingPassword',
      null,
      "Password changed successfully!"
    );
  };

  const updateProfileField = (field, value) => {
    dispatch({ type: ACTIONS.UPDATE_PROFILE_FIELD, field, value });
  };

  // ===== ADDRESS FUNCTIONS =====
  const fetchAddresses = async (force = false) => {
    if (!auth.isAuthenticated) return [];
    if (state.fetched.addresses && !force) return state.addresses;

    return handleApiCall(
      () => dashboardAPI.allProfileAddresses(),
      'addresses',
      'addresses'
    );
  };

  const createAddress = async (addressData) => {
    const result = await handleApiCall(
      () => dashboardAPI.createProfileAddress(addressData),
      'savingAddress',
      null,
      "Address added successfully!"
    );
    
    await fetchAddresses(true);
    return result;
  };

  const updateAddress = async (id, addressData) => {
    await handleApiCall(
      () => dashboardAPI.updateProfileAddress(id, addressData),
      'savingAddress',
      null,
      "Address updated successfully!"
    );
    
    dispatch({ type: ACTIONS.UPDATE_ADDRESS, payload: { ...addressData, id } });
  };

  const deleteAddress = async (id) => {
    await handleApiCall(
      () => dashboardAPI.deleteProfileAddress(id),
      'savingAddress',
      null,
      "Address deleted successfully!"
    );
    
    dispatch({ type: ACTIONS.REMOVE_ADDRESS, payload: id });
  };

  const getSingleAddress = async (id) => {
    if (!auth.isAuthenticated) return null;
    
    try {
      const response = await dashboardAPI.singleProfileAddress(id);
      return response.data.profile_address;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to load address details";
      showToast(errorMessage, "error");
      throw error;
    }
  };

  // ===== ROLES FUNCTIONS =====
  const fetchRoles = async (force = false) => {
    if (!auth.isAuthenticated) return [];
    if (state.fetched.roles && !force) return state.roles;

    return handleApiCall(
      () => dashboardAPI.getRolesApi(),
      'roles',
      'roles'
    );
  };

  // ===== EFFECTS =====
  useEffect(() => {
    if (auth.isAuthenticated) {
      if (!state.fetched.profile) fetchProfileData();
      if (!state.fetched.addresses) fetchAddresses();
      if (!state.fetched.roles) fetchRoles();
    }
  }, [auth.isAuthenticated]);

  useEffect(() => {
    if (!auth.isAuthenticated && (state.fetched.profile || state.fetched.addresses || state.fetched.roles)) {
      resetState();
    }
  }, [auth.isAuthenticated]);

  // ===== CONTEXT VALUE =====
  const contextValue = {
    // State (destructured for easier access)
    profileData: state.profileData,
    addresses: state.addresses,
    roles: state.roles,
    
    // Loading states
    profileLoading: state.loading.profile,
    addressesLoading: state.loading.addresses,
    rolesLoading: state.loading.roles,
    uploadingImage: state.loading.uploadingImage,
    savingProfile: state.loading.savingProfile,
    savingAddress: state.loading.savingAddress,
    changingPassword: state.loading.changingPassword,
    
    // Error states
    profileError: state.errors.profile,
    addressesError: state.errors.addresses,
    rolesError: state.errors.roles,
    
    // Fetched flags
    profileFetched: state.fetched.profile,
    addressesFetched: state.fetched.addresses,
    rolesFetched: state.fetched.roles,
    
    // Toast
    toasts: state.toasts,
    
    // Actions
    fetchProfileData,
    updateProfile,
    uploadProfileImage,
    changePassword,
    updateProfileField,
    fetchAddresses,
    createAddress,
    updateAddress,
    deleteAddress,
    getSingleAddress,
    fetchRoles,
    showToast,
    removeToast,
    resetState
  };

  return (
    <ProfileContext.Provider value={contextValue}>
      {children}
    </ProfileContext.Provider>
  );
};

// ===== CUSTOM HOOK =====
export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};

export default ProfileContext;