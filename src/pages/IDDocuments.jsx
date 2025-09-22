import React, { useState, useRef, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import {
  Upload,
  File,
  Trash2,
  Edit3,
  X,
  Download,
  FileText,
  Eye,
  Save,
  FolderOpen,
} from "lucide-react";
import { idDocumentDownloadApi } from "../services/dashboard";
import { showDeleteConfirmation, showSuccessAlert, showErrorAlert } from "../components/SweetAlert2Confirmation";
import PageHeader from "../components/PageHeader";
import CustomDropdown from "../components/CustomDropdown";
import { FaIdCard } from "react-icons/fa";
import { useIDDocuments } from "../context/IDDocumentsContext";

// Loading Skeleton Component
const LoadingSkeleton = ({ type = "id-documents" }) => {
  if (type === "id-documents") {
    return (
      <div className="min-h-screen bg-white rounded-2xl">
        <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
          {/* PageHeader Skeleton */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-blue-100 rounded-xl animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-8 bg-gray-200 rounded w-64 animate-pulse"></div>
                  <div className="h-5 bg-gray-200 rounded w-48 animate-pulse"></div>
                </div>
              </div>
            </div>
            <div className="h-4 bg-gray-200 rounded w-96 animate-pulse"></div>
          </div>
          
          {/* Upload Form Skeleton */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-blue-50 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-200 rounded-lg animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-5 bg-blue-200 rounded w-40 animate-pulse"></div>
                  <div className="h-3 bg-blue-200 rounded w-64 animate-pulse"></div>
                </div>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                <div className="h-12 bg-gray-200 rounded-xl animate-pulse"></div>
              </div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                <div className="h-32 bg-gray-200 rounded-xl animate-pulse"></div>
              </div>
              <div className="h-12 bg-gray-200 rounded-xl w-40 animate-pulse"></div>
            </div>
          </div>

          {/* Table Skeleton */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-blue-50 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-200 rounded-lg animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-5 bg-blue-200 rounded w-32 animate-pulse"></div>
                  <div className="h-3 bg-blue-200 rounded w-48 animate-pulse"></div>
                </div>
              </div>
            </div>
            <div className="p-6 space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center gap-4 p-4 border border-gray-100 rounded-lg animate-pulse">
                  <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                  <div className="w-16 h-12 bg-gray-200 rounded"></div>
                  <div className="h-8 bg-gray-200 rounded w-20"></div>
                  <div className="flex gap-2">
                    <div className="h-8 w-20 bg-gray-200 rounded-lg"></div>
                    <div className="h-8 w-16 bg-gray-200 rounded-lg"></div>
                    <div className="h-8 w-16 bg-gray-200 rounded-lg"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

const IDDocuments = () => {
  // Context
  const {
    documents,
    documentTypes,
    isInitialLoading,
    uploadDocument,
    updateDocument,
    deleteDocument,
    downloadDocument,
    isSubmitting,
    isUpdating,
    isDeleting,
    isDownloading,
    fetchError
  } = useIDDocuments();

  // Local state for form management
  const [formData, setFormData] = useState({
    file_type: "",
    file_name: "",
    file: null,
  });
  const [errors, setErrors] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [editFile, setEditFile] = useState(null);
  
  // Image optimization states
  const [viewedImage, setViewedImage] = useState(null);
  const [imageUrls, setImageUrls] = useState({});
  const [loadingImages, setLoadingImages] = useState(new Set());
  const loadAttempted = useRef(new Set());
  const loadingQueue = useRef(new Set());
  const isLoadingBatch = useRef(false);

  // Helper function to check if file is an image
  const isImageFile = useCallback((fileName) => {
    if (!fileName) return false;
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'];
    const fileExtension = '.' + fileName.split('.').pop().toLowerCase();
    return imageExtensions.includes(fileExtension);
  }, []);

  // Optimized batch image loading
  const loadImageBatch = useCallback(async () => {
    if (isLoadingBatch.current || loadingQueue.current.size === 0) return;
    
    isLoadingBatch.current = true;
    const batch = Array.from(loadingQueue.current).slice(0, 2); // Load 2 at a time
    batch.forEach(docId => loadingQueue.current.delete(docId));

    const newImageUrls = {};
    const newLoadingImages = new Set(loadingImages);

    batch.forEach(docId => newLoadingImages.add(docId));
    setLoadingImages(new Set(newLoadingImages));

    const loadPromises = batch.map(async (docId) => {
      const doc = documents.find(d => d.id === docId);
      if (!doc) return;

      try {
        const response = await idDocumentDownloadApi(docId);
        const contentType = response.headers["content-type"] || "application/octet-stream";
        
        if (contentType.startsWith("image/")) {
          const blob = new Blob([response.data], { type: contentType });
          const blobUrl = window.URL.createObjectURL(blob);
          newImageUrls[docId] = blobUrl;
        }
      } catch (error) {
        console.error(`Failed to load image for doc ${docId}:`, error);
      } finally {
        newLoadingImages.delete(docId);
        loadAttempted.current.add(docId);
      }
    });

    await Promise.allSettled(loadPromises);

    if (Object.keys(newImageUrls).length > 0) {
      setImageUrls(prev => ({ ...prev, ...newImageUrls }));
    }
    setLoadingImages(new Set(newLoadingImages));
    
    isLoadingBatch.current = false;
    
    if (loadingQueue.current.size > 0) {
      setTimeout(() => loadImageBatch(), 100);
    }
  }, [documents, loadingImages]);

  // Queue images for loading when documents change
  useEffect(() => {
    if (documents.length === 0) return;

    const imagesToLoad = documents.filter(doc => 
      doc.file_path && 
      isImageFile(doc.file_name) && 
      !imageUrls[doc.id] && 
      !loadAttempted.current.has(doc.id) &&
      !loadingImages.has(doc.id)
    );

    if (imagesToLoad.length > 0) {
      imagesToLoad.forEach(doc => loadingQueue.current.add(doc.id));
      loadImageBatch();
    }
  }, [documents, imageUrls, loadingImages, isImageFile, loadImageBatch]);

  // Cleanup image URLs when component unmounts
  useEffect(() => {
    return () => {
      Object.values(imageUrls).forEach((url) => {
        if (url.startsWith('blob:')) {
          window.URL.revokeObjectURL(url);
        }
      });
    };
  }, []);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      file: file,
      file_name: file ? file.name : "",
    }));
    setErrors(prev => ({ ...prev, file: "" }));
  };

  const handleEditFileChange = (e) => {
    const file = e.target.files[0];
    setEditFile(file);
  };

  // Form submission using context
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    let newErrors = {};
    if (!formData.file_type) newErrors.file_type = "Document type is required";
    if (!formData.file) newErrors.file = "File is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fill all required fields");
      return;
    }

    try {
      const result = await uploadDocument(formData);
      
      if (result.success) {
        // Reset form
        setFormData({ file_type: "", file_name: "", file: null });
        setErrors({});
        const fileInput = document.getElementById("fileInput");
        if (fileInput) fileInput.value = "";
        
        await showSuccessAlert("Uploaded!", "Document uploaded successfully!");
      } else {
        await showErrorAlert("Upload Failed", result.error || "Failed to upload document");
      }
    } catch (error) {
      console.error("Error uploading document:", error);
      await showErrorAlert("Upload Failed", "Failed to upload document");
    }
  };

  // Edit functions using context
  const handleEdit = (doc) => {
    setEditingId(doc.id);
    setEditForm({ file_type: doc.file_type });
    setEditFile(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({});
    setEditFile(null);
  };

  const handleUpdate = async (docId) => {
    if (isUpdating(docId)) return;

    try {
      if (!editForm.file_type) {
        toast.error("Document type is required");
        return;
      }

      const updateData = {
        file_type: editForm.file_type,
        file: editFile
      };

      // Cleanup old image URL if replacing file
      if (editFile && imageUrls[docId]) {
        window.URL.revokeObjectURL(imageUrls[docId]);
        setImageUrls(prev => {
          const newUrls = { ...prev };
          delete newUrls[docId];
          return newUrls;
        });
        loadAttempted.current.delete(docId);
      }

      const result = await updateDocument(docId, updateData);
      
      if (result.success) {
        handleCancelEdit();
        await showSuccessAlert("Updated!", "Document updated successfully!");
      } else {
        await showErrorAlert("Update Failed", result.error || "Failed to update document");
      }
    } catch (error) {
      console.error("Error updating document:", error);
      await showErrorAlert("Update Failed", "Failed to update document");
    }
  };

  // Delete function using context
  const handleDelete = async (docId) => {
    if (isDeleting(docId)) return;

    try {
      const result = await showDeleteConfirmation(
        "Delete Document",
        "Are you sure you want to delete this document? This action cannot be undone."
      );

      if (!result.isConfirmed) return;

      // Cleanup image URL
      if (imageUrls[docId]) {
        window.URL.revokeObjectURL(imageUrls[docId]);
        setImageUrls(prev => {
          const newUrls = { ...prev };
          delete newUrls[docId];
          return newUrls;
        });
      }

      const deleteResult = await deleteDocument(docId);
      
      if (deleteResult.success) {
        await showSuccessAlert("Deleted!", "Document deleted successfully!");
      } else {
        await showErrorAlert("Delete Failed", deleteResult.error || "Failed to delete document");
      }
    } catch (error) {
      console.error("Error deleting document:", error);
      await showErrorAlert("Delete Failed", "Failed to delete document");
    }
  };

  // Download function using context
  const handleDownload = async (doc) => {
    if (isDownloading(doc.id)) return;

    try {
      const result = await downloadDocument(doc);
      
      if (!result.success) {
        await showErrorAlert("Download Failed", result.error || "Failed to download document");
      }
    } catch (error) {
      console.error("Download failed:", error);
      toast.error("Failed to download document");
    }
  };

  // Load image on demand
  const loadImageOnDemand = useCallback(async (docId) => {
    if (imageUrls[docId] || loadAttempted.current.has(docId) || loadingImages.has(docId)) return;
    
    const doc = documents.find(d => d.id === docId);
    if (!doc || !doc.file_path || !isImageFile(doc.file_name)) return;

    setLoadingImages(prev => new Set(prev).add(docId));
    loadAttempted.current.add(docId);

    try {
      const response = await idDocumentDownloadApi(docId);
      const contentType = response.headers["content-type"] || "application/octet-stream";
      
      if (contentType.startsWith("image/")) {
        const blob = new Blob([response.data], { type: contentType });
        const blobUrl = window.URL.createObjectURL(blob);
        setImageUrls(prev => ({ ...prev, [docId]: blobUrl }));
      }
    } catch (error) {
      console.error(`Failed to load image on demand for doc ${docId}:`, error);
    } finally {
      setLoadingImages(prev => {
        const newSet = new Set(prev);
        newSet.delete(docId);
        return newSet;
      });
    }
  }, [documents, imageUrls, loadingImages, isImageFile]);

  // View image modal
  const handleViewImage = useCallback((docId, fileName) => {
    if (imageUrls[docId]) {
      setViewedImage({ url: imageUrls[docId], name: fileName });
    } else {
      loadImageOnDemand(docId).then(() => {
        setTimeout(() => {
          if (imageUrls[docId]) {
            setViewedImage({ url: imageUrls[docId], name: fileName });
          } else {
            toast.error("Failed to load image for viewing");
          }
        }, 500);
      });
    }
  }, [imageUrls, loadImageOnDemand]);

  // Remove file functions
  const removeFile = () => {
    setFormData(prev => ({ ...prev, file: null, file_name: "" }));
    const fileInput = document.getElementById("fileInput");
    if (fileInput) fileInput.value = "";
  };

  const removeEditFile = () => {
    setEditFile(null);
    const editFileInput = document.getElementById(`editFileInput-${editingId}`);
    if (editFileInput) editFileInput.value = "";
  };

  // Form Section Component
  const FormSection = ({ title, icon, children, description }) => (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-visible">
      <div className="bg-blue-50 px-6 py-4 rounded-t-2xl">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/80 rounded-lg">
            {React.cloneElement(icon, { className: "w-6 h-6 text-blue-700" })}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-blue-900">{title}</h2>
            {description && (
              <p className="text-blue-700 text-sm mt-1">{description}</p>
            )}
          </div>
        </div>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );

  // Error state
  if (fetchError) {
    return (
      <div className="min-h-screen bg-white rounded-2xl">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <PageHeader
            icon={<FaIdCard />}
            title="ID Documents"
            currentPage="ID Documents"
            showTradingYear={false}
            subtitle="Upload and manage your identification and verification documents."
          />
          
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Unable to Load Documents</h3>
                <p className="text-red-600 mb-6">{fetchError}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-medium"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Loading state
  if (isInitialLoading) {
    return <LoadingSkeleton type="id-documents" />;
  }

  return (
    <div className="min-h-screen bg-white rounded-2xl">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <PageHeader
          icon={<FaIdCard />}
          title="ID Documents"
          currentPage="ID Documents"
          showTradingYear={false}
          subtitle="Upload and manage your identification and verification documents."
        />

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Upload Form Section */}
          <FormSection
            title="Upload New Document"
            icon={<Upload />}
            description="Select document type and upload your file"
          >
            <div className="space-y-6">
              {/* Document Type Selection - Full Width */}
              <div className="w-full space-y-3">
                <label className="block text-sm font-semibold text-gray-700">
                  Document Type
                </label>
                <div className="space-y-1">
                  <CustomDropdown
                    name="file_type"
                    value={formData.file_type}
                    onChange={handleChange}
                    options={documentTypes}
                    placeholder="Select Document Type..."
                    icon={<FileText className="w-5 h-5" />}
                    error={errors.file_type}
                    allowClear
                    showSearch
                    searchPlaceholder="Search document types..."
                    emptyMessage="No document types found"
                  />
                  {errors.file_type && (
                    <p className="text-red-500 text-sm flex items-center gap-1 ml-1">
                      <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                      {errors.file_type}
                    </p>
                  )}
                </div>
                <p className="text-xs text-gray-500">
                  Choose the type of document you're uploading
                </p>
              </div>

              {/* File Upload - Full Width */}
              <div className="w-full space-y-3">
                <label className="block text-sm font-semibold text-gray-700">
                  Upload File
                </label>
                <div 
                  className={`border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer group ${
                    errors.file 
                      ? "border-red-300 bg-red-50" 
                      : "border-gray-300 hover:border-blue-400 hover:bg-blue-50"
                  }`}
                  onClick={() => document.getElementById("fileInput").click()}
                >
                  <Upload className="mx-auto w-8 h-8 text-blue-500 mb-3 group-hover:scale-110 transition-transform" />
                  <p className="text-sm font-medium text-gray-700 mb-1">Choose file to upload</p>
                  <p className="text-xs text-gray-500">JPG, JPEG, PNG, PDF files supported</p>
                  
                  <input
                    id="fileInput"
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".jpg,.jpeg,.png,.pdf"
                  />
                </div>
                
                {errors.file && (
                  <p className="text-red-500 text-sm flex items-center gap-1 ml-1">
                    <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                    {errors.file}
                  </p>
                )}

                {/* File Preview */}
                {formData.file && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <File className="text-blue-600 w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">{formData.file.name}</p>
                          <p className="text-xs text-gray-500">
                            {(formData.file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                        {formData.file.type.startsWith("image/") && (
                          <img
                            src={URL.createObjectURL(formData.file)}
                            alt="Preview"
                            className="w-12 h-12 object-cover rounded-lg border"
                          />
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={removeFile}
                        className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Remove file"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
                
                <p className="text-xs text-gray-500">
                  Maximum file size: 10MB
                </p>
              </div>
            </div>
          </FormSection>

          {/* Submit Section */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="text-center sm:text-left">
                <h3 className="font-semibold text-gray-900">Ready to Upload?</h3>
                <p className="text-gray-600 text-sm">
                  Review your document and submit for verification
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !formData.file_type || !formData.file}
                className={`flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-200 transform ${
                  isSubmitting || !formData.file_type || !formData.file
                    ? "bg-gray-400 cursor-not-allowed scale-95"
                    : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 hover:scale-105 shadow-lg hover:shadow-xl"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Uploading...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Upload Document
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Documents List Section */}
        <div className="mt-8">
          <FormSection
            title="Your Documents"
            icon={<FolderOpen />}
            description={`${documents.length} document${documents.length !== 1 ? 's' : ''} uploaded`}
          >
            {documents.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 p-3 bg-gray-100 rounded-full">
                  <FileText className="w-full h-full text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-500 mb-2">No documents uploaded yet</h3>
                <p className="text-gray-400">Upload your first document to get started</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Document Type
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        File Name
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Preview
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {documents.map((doc) => {
                      const imageUrl = imageUrls[doc.id];
                      const isImageLoading = loadingImages.has(doc.id);
                      const isImage = isImageFile(doc.file_name);

                      return (
                        <tr key={doc.id} className="hover:bg-gray-50 transition-colors">
                          {/* DOCUMENT TYPE COLUMN */}
                          <td className="px-6 py-4">
                            {editingId === doc.id ? (
                              <CustomDropdown
                                name="file_type"
                                value={editForm.file_type}
                                onChange={(e) => setEditForm(prev => ({ ...prev, file_type: e.target.value }))}
                                options={documentTypes}
                                placeholder="Select type..."
                                icon={<FileText className="w-3 h-3" />}
                                className="text-sm py-2"
                                containerClassName="min-w-[200px]"
                                showSearch={false}
                                maxHeight="12rem"
                              />
                            ) : (
                              <div className="flex items-center gap-2">
                                <FileText className="w-4 h-4 text-gray-400" />
                                <span className="text-sm font-medium text-gray-900">
                                  {doc.file_type}
                                </span>
                              </div>
                            )}
                          </td>
                          
                          {/* FILE NAME COLUMN */}
                          <td className="px-6 py-4">
                            {editingId === doc.id ? (
                              <div className="space-y-3">
                                <div className="text-sm text-gray-600">
                                  <span className="font-medium">Current:</span> {doc.file_name}
                                </div>
                                
                                <div className="flex items-center gap-2">
                                  <input
                                    id={`editFileInput-${doc.id}`}
                                    type="file"
                                    onChange={handleEditFileChange}
                                    className="hidden"
                                    accept=".jpg,.jpeg,.png,.pdf"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => document.getElementById(`editFileInput-${doc.id}`).click()}
                                    className="inline-flex items-center gap-2 text-xs bg-blue-100 text-blue-700 px-3 py-2 rounded-lg hover:bg-blue-200 transition-colors font-medium"
                                  >
                                    <Upload className="w-3 h-3" />
                                    {editFile ? "Change File" : "Replace File"}
                                  </button>
                                  {editFile && (
                                    <button
                                      type="button"
                                      onClick={removeEditFile}
                                      className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
                                      title="Remove selected file"
                                    >
                                      <X className="w-3 h-3" />
                                    </button>
                                  )}
                                </div>
                                
                                {editFile && (
                                  <div className="text-xs text-green-600 bg-green-50 p-2 rounded">
                                    <span className="font-medium">New file:</span> {editFile.name}
                                  </div>
                                )}
                              </div>
                            ) : (
                              <span className="text-sm text-gray-700 break-all">
                                {doc.file_name}
                              </span>
                            )}
                          </td>
                          
                          {/* PREVIEW COLUMN */}
                          <td className="px-6 py-4">
                            {doc.file_path ? (
                              isImage ? (
                                <div 
                                  className="w-16 h-12 bg-gray-100 rounded flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors"
                                  onMouseEnter={() => loadImageOnDemand(doc.id)}
                                  onClick={() => handleViewImage(doc.id, doc.file_name)}
                                  title="Click to view full image"
                                >
                                  {imageUrl ? (
                                    <img
                                      src={imageUrl}
                                      alt={doc.file_name}
                                      className="w-full h-full object-cover rounded"
                                    />
                                  ) : isImageLoading ? (
                                    <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                                  ) : (
                                    <Eye className="w-4 h-4 text-gray-400" />
                                  )}
                                </div>
                              ) : (
                                <div className="w-16 h-12 bg-gray-200 rounded flex items-center justify-center">
                                  <span className="text-xs text-gray-500">FILE</span>
                                </div>
                              )
                            ) : (
                              <span className="text-gray-400">No file</span>
                            )}
                          </td>

                          {/* STATUS COLUMN */}
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              {doc.verified ? (
                                <>
                                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                  <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                                    Verified
                                  </span>
                                </>
                              ) : (
                                <>
                                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                  <span className="px-3 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                                    Pending
                                  </span>
                                </>
                              )}
                            </div>
                          </td>

                          {/* ACTIONS COLUMN */}
                          <td className="px-6 py-4">
                            {editingId === doc.id ? (
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleUpdate(doc.id)}
                                  disabled={isUpdating(doc.id)}
                                  className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 text-sm font-medium"
                                  title="Save changes"
                                >
                                  {isUpdating(doc.id) ? (
                                    <>
                                      <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                      Saving
                                    </>
                                  ) : (
                                    <>
                                      <Save className="w-4 h-4" />
                                      Save
                                    </>
                                  )}
                                </button>
                                <button
                                  onClick={handleCancelEdit}
                                  className="inline-flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors text-sm font-medium"
                                  title="Cancel editing"
                                >
                                  <X className="w-4 h-4" />
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleDownload(doc)}
                                  disabled={isDownloading(doc.id)}
                                  className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 hover:bg-blue-100 hover:scale-105 px-3 py-2 rounded-lg transition-all duration-300 cursor-pointer disabled:opacity-50 text-xs font-medium"
                                  title="Download document"
                                >
                                  {isDownloading(doc.id) ? (
                                    <>
                                      <div className="w-3 h-3 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                                      Downloading
                                    </>
                                  ) : (
                                    <>
                                      <Download className="w-3 h-3" />
                                      Download
                                    </>
                                  )}
                                </button>

                                <button
                                  onClick={() => handleEdit(doc)}
                                  className="inline-flex items-center gap-2 text-green-600 bg-green-50 px-3 py-2 rounded-lg hover:scale-105 hover:bg-green-100 transition-all duration-300 cursor-pointer text-xs font-medium"
                                  title="Edit document"
                                >
                                  <Edit3 className="w-3 h-3" />
                                  Edit
                                </button>

                                <button
                                  onClick={() => handleDelete(doc.id)}
                                  disabled={isDeleting(doc.id)}
                                  className="inline-flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 px-3 py-2 rounded-lg disabled:opacity-50 text-xs font-medium cursor-pointer hover:scale-105 transition-all duration-300"
                                  title="Delete document"
                                >
                                  {isDeleting(doc.id) ? (
                                    <>
                                      <div className="w-3 h-3 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                                      Deleting
                                    </>
                                  ) : (
                                    <>
                                      <Trash2 className="w-3 h-3" />
                                      Delete
                                    </>
                                  )}
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </FormSection>
        </div>
      </div>

      {/* Image Modal */}
      {viewedImage && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">
                {viewedImage.name}
              </h3>
              <button
                onClick={() => setViewedImage(null)}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 flex justify-center">
              <img
                src={viewedImage.url}
                alt={viewedImage.name}
                className="max-h-[70vh] max-w-full object-contain rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IDDocuments;










