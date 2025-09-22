// src/context/IDDocumentsContext.js
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import toast from 'react-hot-toast';
import {
  idDocumentTypesApi,
  idDocumentPostApi,
  idDocumentGetAllApi,
  idDocumentUpdateApi,
  idDocumentDeleteApi,
  idDocumentDownloadApi,
} from '../services/dashboard';
import { useAuth } from './AuthContext';
import { useTradingYear } from './TradingYearContext';

// ===== CONSTANTS =====
const initialState = {
  documents: [],
  documentTypes: [],
  loading: {
    fetching: false,
    fetchingTypes: false,
    submitting: false,
    updating: {},
    deleting: {},
    downloading: {},
  },
  errors: {
    fetching: null,
    fetchingTypes: null,
    submitting: null,
    updating: {},
    deleting: {},
    downloading: {},
  },
  fetched: {
    documents: false,
    documentTypes: false,
  }
};

const ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_DOCUMENTS: 'SET_DOCUMENTS',
  SET_DOCUMENT_TYPES: 'SET_DOCUMENT_TYPES',
  SET_ERROR: 'SET_ERROR',
  SET_FETCHED: 'SET_FETCHED',
  SET_SUBMITTING: 'SET_SUBMITTING',
  SET_UPDATING: 'SET_UPDATING',
  SET_DELETING: 'SET_DELETING',
  SET_DOWNLOADING: 'SET_DOWNLOADING',
  SET_SPECIFIC_ERROR: 'SET_SPECIFIC_ERROR',
  CLEAR_ERRORS: 'CLEAR_ERRORS',
  RESET_STATE: 'RESET_STATE',
  ADD_DOCUMENT: 'ADD_DOCUMENT',
  UPDATE_DOCUMENT: 'UPDATE_DOCUMENT',
  REMOVE_DOCUMENT: 'REMOVE_DOCUMENT'
};

// ===== REDUCER =====
const idDocumentsReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: { ...state.loading, [action.key]: action.payload }
      };

    case ACTIONS.SET_DOCUMENTS:
      return {
        ...state,
        documents: action.payload,
        loading: { ...state.loading, fetching: false },
        errors: { ...state.errors, fetching: null },
        fetched: { ...state.fetched, documents: true }
      };

    case ACTIONS.SET_DOCUMENT_TYPES:
      return {
        ...state,
        documentTypes: action.payload,
        loading: { ...state.loading, fetchingTypes: false },
        errors: { ...state.errors, fetchingTypes: null },
        fetched: { ...state.fetched, documentTypes: true }
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

    case ACTIONS.SET_SUBMITTING:
      return {
        ...state,
        loading: { ...state.loading, submitting: action.payload },
        errors: { ...state.errors, submitting: action.payload ? null : state.errors.submitting }
      };

    case ACTIONS.SET_UPDATING:
      return {
        ...state,
        loading: {
          ...state.loading,
          updating: { ...state.loading.updating, [action.id]: action.payload }
        },
        errors: {
          ...state.errors,
          updating: action.payload ? 
            { ...state.errors.updating, [action.id]: null } : 
            state.errors.updating
        }
      };

    case ACTIONS.SET_DELETING:
      return {
        ...state,
        loading: {
          ...state.loading,
          deleting: { ...state.loading.deleting, [action.id]: action.payload }
        },
        errors: {
          ...state.errors,
          deleting: action.payload ? 
            { ...state.errors.deleting, [action.id]: null } : 
            state.errors.deleting
        }
      };

    case ACTIONS.SET_DOWNLOADING:
      return {
        ...state,
        loading: {
          ...state.loading,
          downloading: { ...state.loading.downloading, [action.id]: action.payload }
        }
      };

    case ACTIONS.SET_SPECIFIC_ERROR:
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.category]: { ...state.errors[action.category], [action.id]: action.payload }
        },
        loading: {
          ...state.loading,
          [action.category]: { ...state.loading[action.category], [action.id]: false }
        }
      };

    case ACTIONS.ADD_DOCUMENT:
      return {
        ...state,
        documents: [...state.documents, action.payload]
      };

    case ACTIONS.UPDATE_DOCUMENT:
      return {
        ...state,
        documents: state.documents.map(doc =>
          doc.id === action.id ? { ...doc, ...action.payload } : doc
        )
      };

    case ACTIONS.REMOVE_DOCUMENT:
      return {
        ...state,
        documents: state.documents.filter(doc => doc.id !== action.id)
      };

    case ACTIONS.CLEAR_ERRORS:
      return {
        ...state,
        errors: {
          fetching: null,
          fetchingTypes: null,
          submitting: null,
          updating: {},
          deleting: {},
          downloading: {},
        }
      };

    case ACTIONS.RESET_STATE:
      return initialState;

    default:
      return state;
  }
};

// ===== CONTEXT SETUP =====
const IDDocumentsContext = createContext();

export const IDDocumentsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(idDocumentsReducer, initialState);
  const { auth } = useAuth();
  const { apiRefreshTrigger } = useTradingYear();

  // ===== HELPER FUNCTIONS =====
  const clearErrors = () => {
    dispatch({ type: ACTIONS.CLEAR_ERRORS });
  };

  const resetState = () => {
    dispatch({ type: ACTIONS.RESET_STATE });
  };

  // ===== MAIN FUNCTIONS =====
  const fetchDocumentTypes = async (force = false) => {
    // Don't fetch if not authenticated
    if (!auth.isAuthenticated) return [];
    
    // Don't fetch if already fetched and not forcing
    if (state.fetched.documentTypes && !force) return state.documentTypes;

    dispatch({ type: ACTIONS.SET_LOADING, key: 'fetchingTypes', payload: true });

    try {
      const response = await idDocumentTypesApi();
      const documentTypes = response.data || [];
      
      dispatch({ type: ACTIONS.SET_DOCUMENT_TYPES, payload: documentTypes });
      
      return documentTypes;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to load document types. Please try again.";
      dispatch({ type: ACTIONS.SET_ERROR, key: 'fetchingTypes', payload: errorMessage });
      
      console.error("Error fetching document types:", error);
      if (error.response?.status !== 404) {
        toast.error(errorMessage);
      }
      return [];
    }
  };

  const fetchDocuments = async (force = false) => {
    // Don't fetch if not authenticated
    if (!auth.isAuthenticated) return [];
    
    // Don't fetch if already fetched and not forcing
    if (state.fetched.documents && !force) return state.documents;

    dispatch({ type: ACTIONS.SET_LOADING, key: 'fetching', payload: true });

    try {
      const response = await idDocumentGetAllApi();
      const documents = response.data || [];
      
      dispatch({ type: ACTIONS.SET_DOCUMENTS, payload: documents });
      
      // Only show success toast on first fetch or forced refresh with data
      if ((!state.fetched.documents || force) && documents.length > 0) {
        // toast.success("Documents loaded successfully!");
        console.log("Documents loaded successfully!");
      }
      
      return documents;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to load documents. Please try again.";
      dispatch({ type: ACTIONS.SET_ERROR, key: 'fetching', payload: errorMessage });
      
      console.error("Error fetching documents:", error);
      if (error.response?.status !== 404) {
        toast.error(errorMessage);
      }
      return [];
    }
  };

  const uploadDocument = async (formData) => {
    if (!auth.isAuthenticated) {
      toast.error("You must be logged in to upload documents");
      return { success: false, error: "Not authenticated" };
    }

    dispatch({ type: ACTIONS.SET_SUBMITTING, payload: true });
    
    try {
      const uploadData = new FormData();
      uploadData.append("file_type", formData.file_type);
      uploadData.append("file_name", formData.file);
      uploadData.append("verified", "0");

      const response = await idDocumentPostApi(uploadData);
      
      // Refresh documents to get the latest data
      await fetchDocuments(true);
      
      dispatch({ type: ACTIONS.SET_SUBMITTING, payload: false });
      toast.success("Document uploaded successfully!");
      
      return { success: true, data: response.data };
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to upload document. Please try again.";
      dispatch({ type: ACTIONS.SET_ERROR, key: 'submitting', payload: errorMessage });
      
      toast.error(errorMessage);
      console.error("Error uploading document:", error);
      return { success: false, error: errorMessage };
    }
  };

  const updateDocument = async (docId, updateData) => {
    if (!auth.isAuthenticated) {
      toast.error("You must be logged in to update documents");
      return { success: false, error: "Not authenticated" };
    }

    dispatch({ type: ACTIONS.SET_UPDATING, id: docId, payload: true });
    
    try {
      const formData = new FormData();
      formData.append("file_type", updateData.file_type);
      formData.append("verified", "0");
      
      if (updateData.file) {
        formData.append("file_name", updateData.file);
      }

      await idDocumentUpdateApi(docId, formData);
      
      // Refresh documents to get the latest data
      await fetchDocuments(true);
      
      dispatch({ type: ACTIONS.SET_UPDATING, id: docId, payload: false });
      toast.success("Document updated successfully!");
      
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to update document. Please try again.";
      dispatch({ type: ACTIONS.SET_SPECIFIC_ERROR, category: 'updating', id: docId, payload: errorMessage });
      
      toast.error(errorMessage);
      console.error("Error updating document:", error);
      return { success: false, error: errorMessage };
    }
  };

  const deleteDocument = async (docId) => {
    if (!auth.isAuthenticated) {
      toast.error("You must be logged in to delete documents");
      return { success: false, error: "Not authenticated" };
    }

    dispatch({ type: ACTIONS.SET_DELETING, id: docId, payload: true });
    
    try {
      await idDocumentDeleteApi(docId);
      
      // Remove from local state immediately for better UX
      dispatch({ type: ACTIONS.REMOVE_DOCUMENT, id: docId });
      
      dispatch({ type: ACTIONS.SET_DELETING, id: docId, payload: false });
      toast.success("Document deleted successfully!");
      
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to delete document. Please try again.";
      dispatch({ type: ACTIONS.SET_SPECIFIC_ERROR, category: 'deleting', id: docId, payload: errorMessage });
      
      toast.error(errorMessage);
      console.error("Error deleting document:", error);
      
      // Refresh documents to restore state in case of error
      await fetchDocuments(true);
      
      return { success: false, error: errorMessage };
    }
  };

  const downloadDocument = async (doc) => {
    if (!auth.isAuthenticated) {
      toast.error("You must be logged in to download documents");
      return { success: false, error: "Not authenticated" };
    }

    dispatch({ type: ACTIONS.SET_DOWNLOADING, id: doc.id, payload: true });
    
    try {
      const response = await idDocumentDownloadApi(doc.id);
      
      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", doc.file_name || "document");
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      link.remove();
      window.URL.revokeObjectURL(url);
      
      dispatch({ type: ACTIONS.SET_DOWNLOADING, id: doc.id, payload: false });
      toast.success(`${doc.file_name} downloaded successfully!`);
      
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to download document. Please try again.";
      dispatch({ type: ACTIONS.SET_SPECIFIC_ERROR, category: 'downloading', id: doc.id, payload: errorMessage });
      
      toast.error(errorMessage);
      console.error("Error downloading document:", error);
      return { success: false, error: errorMessage };
    }
  };

  // Combined fetch function for initial data loading
  const fetchInitialData = async (force = false) => {
    if (!auth.isAuthenticated) return;
    
    try {
      await Promise.all([
        fetchDocumentTypes(force),
        fetchDocuments(force)
      ]);
    } catch (error) {
      console.error("Error fetching initial data:", error);
    }
  };

  const refreshData = async () => {
    console.log("IDDocumentsContext: Refreshing data due to trading year change");
    await fetchInitialData(true);
  };

  // ===== EFFECTS =====
  
  // Initial fetch when user is authenticated
  useEffect(() => {
    if (auth.isAuthenticated && (!state.fetched.documents || !state.fetched.documentTypes)) {
      fetchInitialData();
    }
  }, [auth.isAuthenticated]);

  // Reset state when user logs out
  useEffect(() => {
    if (!auth.isAuthenticated && (state.fetched.documents || state.fetched.documentTypes)) {
      resetState();
    }
  }, [auth.isAuthenticated]);

  // Listen for trading year changes and refresh data
  useEffect(() => {
    if (apiRefreshTrigger > 0 && auth.isAuthenticated) {
      refreshData();
    }
  }, [apiRefreshTrigger, auth.isAuthenticated]);

  // ===== CONTEXT VALUE =====
  const contextValue = {
    // State
    documents: state.documents,
    documentTypes: state.documentTypes,
    fetched: state.fetched,
    
    // Loading states
    isLoading: state.loading.fetching,
    isLoadingTypes: state.loading.fetchingTypes,
    isSubmitting: state.loading.submitting,
    updatingStates: state.loading.updating,
    deletingStates: state.loading.deleting,
    downloadingStates: state.loading.downloading,
    
    // Error states
    fetchError: state.errors.fetching,
    fetchTypesError: state.errors.fetchingTypes,
    submitError: state.errors.submitting,
    updateErrors: state.errors.updating,
    deleteErrors: state.errors.deleting,
    downloadErrors: state.errors.downloading,
    
    // Actions
    fetchDocuments,
    fetchDocumentTypes,
    uploadDocument,
    updateDocument,
    deleteDocument,
    downloadDocument,
    fetchInitialData,
    refreshData,
    clearErrors,
    resetState,
    
    // Helper functions
    isUpdating: (id) => !!state.loading.updating[id],
    isDeleting: (id) => !!state.loading.deleting[id],
    isDownloading: (id) => !!state.loading.downloading[id],
    
    // Combined loading state for initial page load
    isInitialLoading: state.loading.fetching || state.loading.fetchingTypes
  };

  return (
    <IDDocumentsContext.Provider value={contextValue}>
      {children}
    </IDDocumentsContext.Provider>
  );
};

// ===== CUSTOM HOOK =====
export const useIDDocuments = () => {
  const context = useContext(IDDocumentsContext);
  if (!context) {
    throw new Error('useIDDocuments must be used within an IDDocumentsProvider');
  }
  return context;
};

export default IDDocumentsContext;