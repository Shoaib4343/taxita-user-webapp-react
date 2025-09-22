// src/context/UploadedDocumentsContext.js
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import toast from 'react-hot-toast';
import { documentsApi, documentsDownloadApi } from '../services/dashboard';
import { useAuth } from './AuthContext';
import { useTradingYear } from './TradingYearContext';

// ===== CONSTANTS =====
const initialState = {
  documents: [],
  loading: {
    fetching: false,
    downloading: {},
    zipDownload: false,
  },
  errors: {
    fetching: null,
    downloading: {},
    zipDownload: null,
  },
  fetched: false,
  imageUrls: {},
  selectedDocs: [],
};

const ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_DOCUMENTS: 'SET_DOCUMENTS',
  SET_ERROR: 'SET_ERROR',
  SET_FETCHED: 'SET_FETCHED',
  SET_DOWNLOADING: 'SET_DOWNLOADING',
  SET_DOWNLOAD_ERROR: 'SET_DOWNLOAD_ERROR',
  SET_ZIP_LOADING: 'SET_ZIP_LOADING',
  SET_ZIP_ERROR: 'SET_ZIP_ERROR',
  SET_IMAGE_URLS: 'SET_IMAGE_URLS',
  ADD_IMAGE_URL: 'ADD_IMAGE_URL',
  SET_SELECTED_DOCS: 'SET_SELECTED_DOCS',
  CLEAR_ERRORS: 'CLEAR_ERRORS',
  RESET_STATE: 'RESET_STATE'
};

// ===== REDUCER =====
const uploadedDocumentsReducer = (state, action) => {
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
        fetched: true
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
        fetched: action.payload
      };

    case ACTIONS.SET_DOWNLOADING:
      return {
        ...state,
        loading: {
          ...state.loading,
          downloading: { ...state.loading.downloading, [action.id]: action.payload }
        }
      };

    case ACTIONS.SET_DOWNLOAD_ERROR:
      return {
        ...state,
        errors: {
          ...state.errors,
          downloading: { ...state.errors.downloading, [action.id]: action.payload }
        },
        loading: {
          ...state.loading,
          downloading: { ...state.loading.downloading, [action.id]: false }
        }
      };

    case ACTIONS.SET_ZIP_LOADING:
      return {
        ...state,
        loading: { ...state.loading, zipDownload: action.payload }
      };

    case ACTIONS.SET_ZIP_ERROR:
      return {
        ...state,
        errors: { ...state.errors, zipDownload: action.payload },
        loading: { ...state.loading, zipDownload: false }
      };

    case ACTIONS.SET_IMAGE_URLS:
      return {
        ...state,
        imageUrls: action.payload
      };

    case ACTIONS.ADD_IMAGE_URL:
      return {
        ...state,
        imageUrls: { ...state.imageUrls, [action.id]: action.url }
      };

    case ACTIONS.SET_SELECTED_DOCS:
      return {
        ...state,
        selectedDocs: action.payload
      };

    case ACTIONS.CLEAR_ERRORS:
      return {
        ...state,
        errors: { fetching: null, downloading: {}, zipDownload: null }
      };

    case ACTIONS.RESET_STATE:
      // Cleanup image URLs before resetting
      Object.values(state.imageUrls).forEach((url) => {
        if (url && typeof url === 'string' && url.startsWith('blob:')) {
          window.URL.revokeObjectURL(url);
        }
      });
      return initialState;

    default:
      return state;
  }
};

// ===== CONTEXT SETUP =====
const UploadedDocumentsContext = createContext();

export const UploadedDocumentsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(uploadedDocumentsReducer, initialState);
  const { auth } = useAuth();
  const { apiRefreshTrigger } = useTradingYear();

  // ===== HELPER FUNCTIONS =====
  const clearErrors = () => {
    dispatch({ type: ACTIONS.CLEAR_ERRORS });
  };

  const resetState = () => {
    dispatch({ type: ACTIONS.RESET_STATE });
  };

  // Convert date from DD/MM/YYYY to YYYY-MM-DD for date comparisons
  const convertDateFormat = (dateString) => {
    if (!dateString) return null;
    const parts = dateString.split("/");
    if (parts.length === 3) {
      return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
    return dateString;
  };

  // Sort documents by date (newest first)
  const sortDocuments = (docs) => {
    return docs.sort((a, b) => {
      const dateA = new Date(convertDateFormat(a.transaction_date) || a.created_at);
      const dateB = new Date(convertDateFormat(b.transaction_date) || b.created_at);
      return dateB - dateA;
    });
  };

  // Extract ID from attachment URL
  const extractIdFromAttachment = (attachmentUrl) => {
    if (!attachmentUrl) return null;
    const fileName = attachmentUrl.split('/').pop();
    return fileName?.split("-")[0] || null;
  };

  // ===== MAIN FUNCTIONS =====
  const fetchDocuments = async (force = false) => {
    // Don't fetch if not authenticated
    if (!auth.isAuthenticated) return [];
    
    // Don't fetch if already fetched and not forcing
    if (state.fetched && !force) return state.documents;

    dispatch({ type: ACTIONS.SET_LOADING, key: 'fetching', payload: true });

    try {
      const response = await documentsApi();
      const documents = response.data || [];
      const sortedDocs = sortDocuments(documents);
      
      dispatch({ type: ACTIONS.SET_DOCUMENTS, payload: sortedDocs });
      
      // Only show success toast on first fetch or forced refresh with data
      if ((!state.fetched || force) && sortedDocs.length > 0) {
        // toast.success("Documents loaded successfully!");
        console.log("Documents loaded successfully!");
      }
      
      return sortedDocs;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to load documents. Please try again.";
      dispatch({ type: ACTIONS.SET_ERROR, key: 'fetching', payload: errorMessage });
      
      // Show error toast
      toast.error(errorMessage);
      console.error("Error fetching documents:", error);
      return [];
    }
  };

  // Load image for document preview
  const loadImageForDocument = async (docId, attachmentUrl) => {
    if (!docId || !attachmentUrl || state.imageUrls[docId]) return;

    try {
      const response = await documentsDownloadApi(docId, {
        responseType: "blob",
      });
      
      const contentType = response.headers["content-type"] || "application/octet-stream";
      
      if (contentType.startsWith("image/")) {
        const blob = new Blob([response.data], { type: contentType });
        const blobUrl = window.URL.createObjectURL(blob);
        dispatch({ type: ACTIONS.ADD_IMAGE_URL, id: docId, url: blobUrl });
      }
    } catch (error) {
      console.error(`Failed to load image for document ${docId}:`, error);
    }
  };

  // Download single document
  const downloadDocument = async (attachmentUrl, fileName) => {
    const docId = extractIdFromAttachment(attachmentUrl);
    if (!docId) {
      toast.error("Invalid document ID");
      return false;
    }

    if (!auth.isAuthenticated) {
      toast.error("You must be logged in to download documents");
      return false;
    }

    if (state.loading.downloading[docId]) return false;

    dispatch({ type: ACTIONS.SET_DOWNLOADING, id: docId, payload: true });
    
    // Show loading toast
    toast.loading("Preparing download...", { id: `download-${docId}` });

    try {
      const response = await documentsDownloadApi(docId, {
        responseType: "blob",
      });

      const contentType = response.headers["content-type"] || "application/octet-stream";
      const blob = new Blob([response.data], { type: contentType });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);

      // Determine file extension
      const getFileExtension = (contentType, fileName) => {
        if (fileName && fileName.includes(".")) return "";
        
        const extensionMap = {
          "image/jpeg": ".jpg",
          "image/jpg": ".jpg",
          "image/png": ".png",
          "image/gif": ".gif",
          "image/webp": ".webp",
          "image/bmp": ".bmp",
          "image/svg+xml": ".svg",
          "application/pdf": ".pdf",
          "text/plain": ".txt",
          "application/msword": ".doc",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document": ".docx",
          "application/vnd.ms-excel": ".xls",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": ".xlsx",
        };
        return extensionMap[contentType] || ".bin";
      };

      const fileExtension = getFileExtension(contentType, fileName);
      const downloadFileName = fileName.includes(".") ? fileName : `${fileName}${fileExtension}`;
      link.download = downloadFileName || `document-${docId}${fileExtension}`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(link.href);

      // Show success toast
      toast.success(`${downloadFileName} downloaded successfully!`, { id: `download-${docId}` });
      
      dispatch({ type: ACTIONS.SET_DOWNLOADING, id: docId, payload: false });
      return true;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to download file. Please try again.";
      dispatch({ type: ACTIONS.SET_DOWNLOAD_ERROR, id: docId, payload: errorMessage });
      
      // Show error toast
      toast.error(errorMessage, { id: `download-${docId}` });
      console.error("Download failed:", error);
      return false;
    }
  };

  // Download multiple documents as ZIP
  const downloadDocumentsAsZip = async (documentsToDownload) => {
    if (!auth.isAuthenticated) {
      toast.error("You must be logged in to download documents");
      return false;
    }

    if (documentsToDownload.length === 0) {
      toast.error("No documents to download");
      return false;
    }

    if (state.loading.zipDownload) return false;

    dispatch({ type: ACTIONS.SET_ZIP_LOADING, payload: true });
    
    // Show loading toast
    const loadingToastId = `zip-download-${Date.now()}`;
    toast.loading("Preparing ZIP download...", { id: loadingToastId });

    try {
      const JSZip = (await import("jszip")).default;
      const zip = new JSZip();

      let completed = 0;
      const expenseTypeMapping = {
        1: "Cash Account", 2: "Card Account", 3: "Contract Account", 4: "Sub Contract Account",
        5: "Vehicle rental income", 6: "Fuel", 7: "Oil", 8: "Car tax", 9: "Insurance",
        10: "Servicing/repairs", 11: "Tyres", 12: "Vehicle rental/lease", 13: "Vehicle loan interest",
        14: "Other motor expenses", 15: "Radio", 16: "Mobile/telephone costs", 17: "Driver/licences/badge/medical",
        18: "Repairs/renewals to equipment", 19: "Legal and accountancy costs", 20: "Car cleaning/valeting",
        21: "Wages to employee", 22: "Use of home as office", 23: "Misc/sundry expenses", 24: "Parking/Toll charges",
      };

      const getExpenseType = (accountId) => expenseTypeMapping[accountId] || `Account ${accountId}`;
      const getTransactionType = (accountId) => accountId <= 5 ? "Income" : "Expense";
      const getFileName = (attachmentUrl) => attachmentUrl?.split("/").pop() || "Unknown file";

      const downloadPromises = documentsToDownload.map(async (doc) => {
        try {
          if (!doc.attachment) return;

          const extractedId = extractIdFromAttachment(doc.attachment);
          if (!extractedId) return;

          const response = await documentsDownloadApi(extractedId, {
            responseType: "blob",
          });

          const contentType = response.headers["content-type"] || "application/octet-stream";
          const fileName = getFileName(doc.attachment);
          const fileExtension = fileName.includes(".") ? "" : 
            (contentType.startsWith("image/") ? ".jpg" : 
             contentType === "application/pdf" ? ".pdf" : ".bin");
          
          const finalFileName = `${fileName}${fileExtension}`;
          const uniqueFileName = `${doc.id}_${getTransactionType(doc.account_id)}_${getExpenseType(doc.account_id)}_${finalFileName}`;

          zip.file(uniqueFileName, response.data);
          completed++;
        } catch (error) {
          console.error(`Failed to download document ${doc.id}:`, error);
        }
      });

      await Promise.all(downloadPromises);

      if (completed === 0) {
        toast.error("No files could be downloaded. Please try again.", { id: loadingToastId });
        dispatch({ type: ACTIONS.SET_ZIP_ERROR, payload: "No files could be downloaded" });
        return false;
      }

      const zipBlob = await zip.generateAsync({
        type: "blob",
        compression: "DEFLATE",
        compressionOptions: { level: 6 },
      });

      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(zipBlob);
      const currentDate = new Date().toISOString().split("T")[0];
      link.download = `documents_${currentDate}_${completed}files.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(link.href);

      // Show success toast
      toast.success(`Successfully downloaded ${completed} document(s) as ZIP file!`, { id: loadingToastId });
      
      dispatch({ type: ACTIONS.SET_ZIP_LOADING, payload: false });
      return true;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to create ZIP file. Please try again.";
      dispatch({ type: ACTIONS.SET_ZIP_ERROR, payload: errorMessage });
      
      // Show error toast
      toast.error(errorMessage, { id: loadingToastId });
      console.error("ZIP download failed:", error);
      return false;
    }
  };

  // Selection management
  const selectDocument = (docId) => {
    const newSelection = state.selectedDocs.includes(docId)
      ? state.selectedDocs.filter(id => id !== docId)
      : [...state.selectedDocs, docId];
    
    dispatch({ type: ACTIONS.SET_SELECTED_DOCS, payload: newSelection });
  };

  const selectAllDocuments = (allDocIds) => {
    const newSelection = state.selectedDocs.length === allDocIds.length ? [] : allDocIds;
    dispatch({ type: ACTIONS.SET_SELECTED_DOCS, payload: newSelection });
  };

  const clearSelection = () => {
    dispatch({ type: ACTIONS.SET_SELECTED_DOCS, payload: [] });
  };

  const refreshDocuments = async () => {
    console.log("UploadedDocumentsContext: Refreshing data due to trading year change");
    // Clear selection when refreshing
    dispatch({ type: ACTIONS.SET_SELECTED_DOCS, payload: [] });
    await fetchDocuments(true);
  };

  // ===== EFFECTS =====
  
  // Initial fetch when user is authenticated
  useEffect(() => {
    if (auth.isAuthenticated && !state.fetched) {
      fetchDocuments();
    }
  }, [auth.isAuthenticated]);

  // Reset state when user logs out
  useEffect(() => {
    if (!auth.isAuthenticated && state.fetched) {
      resetState();
    }
  }, [auth.isAuthenticated]);

  // Listen for trading year changes and refresh data
  useEffect(() => {
    if (apiRefreshTrigger > 0 && auth.isAuthenticated) {
      refreshDocuments();
    }
  }, [apiRefreshTrigger, auth.isAuthenticated]);

  // Cleanup image URLs when component unmounts
  useEffect(() => {
    return () => {
      Object.values(state.imageUrls).forEach((url) => {
        if (url && typeof url === 'string' && url.startsWith('blob:')) {
          window.URL.revokeObjectURL(url);
        }
      });
    };
  }, []);

  // ===== CONTEXT VALUE =====
  const contextValue = {
    // State
    documents: state.documents,
    fetched: state.fetched,
    imageUrls: state.imageUrls,
    selectedDocs: state.selectedDocs,
    
    // Loading states
    isLoading: state.loading.fetching,
    downloadingStates: state.loading.downloading,
    isZipDownloading: state.loading.zipDownload,
    
    // Error states
    fetchError: state.errors.fetching,
    downloadErrors: state.errors.downloading,
    zipDownloadError: state.errors.zipDownload,
    
    // Actions
    fetchDocuments,
    downloadDocument,
    downloadDocumentsAsZip,
    loadImageForDocument,
    refreshDocuments,
    clearErrors,
    resetState,
    
    // Selection actions
    selectDocument,
    selectAllDocuments,
    clearSelection,
    
    // Helper functions
    isDownloading: (id) => !!state.loading.downloading[id],
    convertDateFormat,
    extractIdFromAttachment,
    
    // Utility functions that were in the original component
    formatDate: (dateString) => {
      if (!dateString) return "N/A";
      if (dateString.includes("/")) return dateString;
      const date = new Date(dateString);
      return date.toLocaleDateString("en-GB");
    },
    
    getFileName: (attachmentUrl) => {
      if (!attachmentUrl) return "No file";
      return attachmentUrl.split("/").pop() || "Unknown file";
    },
    
    getExpenseType: (accountId) => {
      const expenseTypeMapping = {
        1: "Cash Account", 2: "Card Account", 3: "Contract Account", 4: "Sub Contract Account",
        5: "Vehicle rental income", 6: "Fuel", 7: "Oil", 8: "Car tax", 9: "Insurance",
        10: "Servicing/repairs", 11: "Tyres", 12: "Vehicle rental/lease", 13: "Vehicle loan interest",
        14: "Other motor expenses", 15: "Radio", 16: "Mobile/telephone costs", 17: "Driver/licences/badge/medical",
        18: "Repairs/renewals to equipment", 19: "Legal and accountancy costs", 20: "Car cleaning/valeting",
        21: "Wages to employee", 22: "Use of home as office", 23: "Misc/sundry expenses", 24: "Parking/Toll charges",
      };
      return expenseTypeMapping[accountId] || `Account ${accountId}`;
    },
    
    getTransactionType: (accountId) => accountId <= 5 ? "Income" : "Expense"
  };

  return (
    <UploadedDocumentsContext.Provider value={contextValue}>
      {children}
    </UploadedDocumentsContext.Provider>
  );
};

// ===== CUSTOM HOOK =====
export const useUploadedDocuments = () => {
  const context = useContext(UploadedDocumentsContext);
  if (!context) {
    throw new Error('useUploadedDocuments must be used within an UploadedDocumentsProvider');
  }
  return context;
};

export default UploadedDocumentsContext;