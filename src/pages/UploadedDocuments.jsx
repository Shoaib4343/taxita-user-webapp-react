import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { documentsApi, documentsDownloadApi } from "../services/dashboard";
import { FaDownload, FaTimes, FaFileAlt } from "react-icons/fa";
import CustomDropdown from "../components/CustomDropdown";
import CustomDatePicker from "../components/CustomDatePicker";
import PageHeader from "../components/PageHeader";
import toast from "react-hot-toast";
import {
  Filter,
  Calendar,
  Archive,
  FileText,
  TrendingUp,
  TrendingDown,
  Folder,
  X,
  CheckSquare,
  Square,
  Package
} from "lucide-react";

// Loading Skeleton Component
const LoadingSkeleton = () => (
  <div className="min-h-screen bg-white rounded-2xl">
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header Skeleton */}
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
      
      {/* Filters Skeleton */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 animate-pulse">
        <div className="h-6 bg-blue-200 rounded w-40 mb-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-24"></div>
              <div className="h-12 bg-gray-200 rounded-xl"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions Bar Skeleton */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 animate-pulse">
        <div className="flex justify-between items-center">
          <div className="h-5 bg-gray-200 rounded w-32"></div>
          <div className="h-10 bg-gray-200 rounded-xl w-48"></div>
        </div>
      </div>

      {/* Table Skeleton */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 animate-pulse">
        <div className="h-6 bg-blue-200 rounded w-32 mb-4"></div>
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 p-4 border border-gray-100 rounded-lg">
              <div className="h-4 w-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-8"></div>
              <div className="h-6 bg-gray-200 rounded w-24"></div>
              <div className="h-4 bg-gray-200 rounded w-32"></div>
              <div className="h-4 bg-gray-200 rounded w-20"></div>
              <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
              <div className="h-8 bg-gray-200 rounded w-20"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const UploadedDocuments = () => {
  const [documents, setDocuments] = useState([]);
  const [filteredDocs, setFilteredDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [downloadLoading, setDownloadLoading] = useState({});
  const [zipDownloadLoading, setZipDownloadLoading] = useState(false);
  const [viewedImage, setViewedImage] = useState(null);
  const [imageUrls, setImageUrls] = useState({});
  const [selectedDocs, setSelectedDocs] = useState([]);

  // Filters
  const [transactionType, setTransactionType] = useState("");
  const [expenseType, setExpenseType] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // Expense type mapping
  const expenseTypeMapping = {
    1: "Cash Account",
    2: "Card Account",
    3: "Contract Account",
    4: "Sub Contract Account",
    5: "Vehicle rental income",
    6: "Fuel",
    7: "Oil",
    8: "Car tax",
    9: "Insurance",
    10: "Servicing/repairs",
    11: "Tyres",
    12: "Vehicle rental/lease",
    13: "Vehicle loan interest",
    14: "Other motor expenses",
    15: "Radio",
    16: "Mobile/telephone costs",
    17: "Driver/licences/badge/medical",
    18: "Repairs/renewals to equipment",
    19: "Legal and accountancy costs",
    20: "Car cleaning/valeting",
    21: "Wages to employee",
    22: "Use of home as office",
    23: "Misc/sundry expenses",
    24: "Parking/Toll charges",
  };

  // Fetch documents
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        setLoading(true);
        const response = await documentsApi();
        const sortedData = (response.data || []).sort((a, b) => {
          const dateA = new Date(
            convertDateFormat(a.transaction_date) || a.created_at
          );
          const dateB = new Date(
            convertDateFormat(b.transaction_date) || b.created_at
          );
          return dateB - dateA;
        });
        setDocuments(sortedData);
      } catch (err) {
        setError("Failed to fetch documents");
        console.error("Error fetching documents:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDocuments();
  }, []);

  // Convert date from DD/MM/YYYY to YYYY-MM-DD for date comparisons
  const convertDateFormat = (dateString) => {
    if (!dateString) return null;
    const parts = dateString.split("/");
    if (parts.length === 3) {
      return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
    return dateString;
  };

  // Apply filters with proper reset logic
  useEffect(() => {
    let filtered = [...documents];

    if (transactionType === "Income") {
      filtered = filtered.filter((doc) => doc.account_id <= 5);
    } else if (transactionType === "Expense") {
      filtered = filtered.filter((doc) => doc.account_id >= 6);
    }

    if (expenseType) {
      filtered = filtered.filter(
        (doc) => getExpenseType(doc.account_id) === expenseType
      );
    }

    if (fromDate) {
      filtered = filtered.filter((doc) => {
        const docDate = convertDateFormat(doc.transaction_date);
        return docDate && new Date(docDate) >= new Date(fromDate);
      });
    }
    if (toDate) {
      filtered = filtered.filter((doc) => {
        const docDate = convertDateFormat(doc.transaction_date);
        return docDate && new Date(docDate) <= new Date(toDate);
      });
    }

    setFilteredDocs(filtered);
  }, [documents, transactionType, expenseType, fromDate, toDate]);

  // Reset expense type when transaction type changes
  useEffect(() => {
    setExpenseType("");
  }, [transactionType]);

  // Load images for display in table
  useEffect(() => {
    const loadImages = async () => {
      const newImageUrls = {};

      for (const doc of filteredDocs) {
        if (doc.attachment) {
          const docId = extractIdFromAttachment(doc.attachment);
          if (docId && !imageUrls[docId]) {
            try {
              const response = await documentsDownloadApi(docId, {
                responseType: "blob",
              });
              const contentType =
                response.headers["content-type"] || "application/octet-stream";

              if (contentType.startsWith("image/")) {
                const blob = new Blob([response.data], { type: contentType });
                const blobUrl = window.URL.createObjectURL(blob);
                newImageUrls[docId] = blobUrl;
              }
            } catch (error) {
              console.error(`Failed to load image for doc ${docId}:`, error);
            }
          }
        }
      }

      if (Object.keys(newImageUrls).length > 0) {
        setImageUrls((prev) => ({ ...prev, ...newImageUrls }));
      }
    };

    if (filteredDocs.length > 0) {
      loadImages();
    }
  }, [filteredDocs]);

  // Cleanup image URLs when component unmounts
  useEffect(() => {
    return () => {
      Object.values(imageUrls).forEach((url) => {
        window.URL.revokeObjectURL(url);
      });
    };
  }, []);

  // Helper functions
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    if (dateString.includes("/")) {
      return dateString;
    }
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };

  const getExpenseType = (accountId) => {
    return expenseTypeMapping[accountId] || `Account ${accountId}`;
  };

  const getTransactionType = (accountId) => {
    return accountId <= 5 ? "Income" : "Expense";
  };

  const getFileName = (attachmentUrl) => {
    if (!attachmentUrl) return "No file";
    const urlParts = attachmentUrl.split("/");
    return urlParts[urlParts.length - 1] || "Unknown file";
  };

  const extractIdFromAttachment = (attachmentUrl) => {
    if (!attachmentUrl) return null;
    const fileName = getFileName(attachmentUrl);
    return fileName.split("-")[0];
  };

  const getFileExtension = (contentType, fileName) => {
    if (fileName && fileName.includes(".")) {
      return "";
    }

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

  // Download document function with loading state
  const handleDownload = async (attachmentUrl, fileName) => {
    const docId = extractIdFromAttachment(attachmentUrl);
    if (!docId) {
      toast.error("Invalid document ID");
      return;
    }

    if (downloadLoading[docId]) return;

    try {
      setDownloadLoading((prev) => ({ ...prev, [docId]: true }));

      const response = await documentsDownloadApi(docId, {
        responseType: "blob",
      });

      const contentType =
        response.headers["content-type"] || "application/octet-stream";

      const blob = new Blob([response.data], { type: contentType });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);

      const fileExtension = getFileExtension(contentType, fileName);
      const downloadFileName = fileName.includes(".")
        ? fileName
        : `${fileName}${fileExtension}`;
      link.download = downloadFileName || `document-${docId}${fileExtension}`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(link.href);
    } catch (err) {
      console.error("Download failed:", err);
      toast.error("Failed to download file. Please try again.");
    } finally {
      setDownloadLoading((prev) => ({ ...prev, [docId]: false }));
    }
  };

  // View image in modal
  const handleViewImageModal = (docId, fileName) => {
    if (imageUrls[docId]) {
      setViewedImage({
        url: imageUrls[docId],
        name: fileName,
      });
    }
  };

  // Close image modal
  const closeImageModal = () => {
    setViewedImage(null);
  };

  // Download ALL filtered documents as ZIP
  const handleDownloadAll = async () => {
    const docsToDownload =
      selectedDocs.length > 0
        ? filteredDocs.filter((doc) => selectedDocs.includes(doc.id))
        : filteredDocs;

    if (docsToDownload.length === 0) {
      toast.error("No documents to download");
      return;
    }

    if (zipDownloadLoading) return;

    try {
      setZipDownloadLoading(true);
      const JSZip = (await import("jszip")).default;
      const zip = new JSZip();

      const totalFiles = docsToDownload.length;
      let completed = 0;

      const downloadPromises = docsToDownload.map(async (doc) => {
        try {
          if (!doc.attachment) return;

          const extractedId = extractIdFromAttachment(doc.attachment);
          if (!extractedId) return;

          const response = await documentsDownloadApi(extractedId, {
            responseType: "blob",
          });

          const contentType =
            response.headers["content-type"] || "application/octet-stream";
          const fileName = getFileName(doc.attachment);
          const fileExtension = getFileExtension(contentType, fileName);
          const finalFileName = fileName.includes(".")
            ? fileName
            : `${fileName}${fileExtension}`;

          const uniqueFileName = `${doc.id}_${getTransactionType(
            doc.account_id
          )}_${getExpenseType(doc.account_id)}_${finalFileName}`;

          zip.file(uniqueFileName, response.data);
          completed++;
        } catch (error) {
          console.error(`Failed to download document ${doc.id}:`, error);
        }
      });

      await Promise.all(downloadPromises);

      if (completed === 0) {
        toast.error("No files could be downloaded. Please try again.");
        return;
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

      toast.success(
        `Successfully downloaded ${completed} document(s) as ZIP file!`
      );
    } catch (error) {
      console.error("ZIP download failed:", error);
      toast.error("Failed to create ZIP file. Please try again.");
    } finally {
      setZipDownloadLoading(false);
    }
  };

  // Filtered Expense Types based on transaction type
  const getFilteredExpenseTypes = () => {
    if (transactionType === "Income") {
      return Object.entries(expenseTypeMapping).filter(
        ([id]) => parseInt(id) <= 5
      );
    }
    if (transactionType === "Expense") {
      return Object.entries(expenseTypeMapping).filter(
        ([id]) => parseInt(id) >= 6
      );
    }
    return Object.entries(expenseTypeMapping);
  };

  // Handle selecting a single document
  const handleSelectDoc = (docId) => {
    setSelectedDocs((prev) =>
      prev.includes(docId)
        ? prev.filter((id) => id !== docId)
        : [...prev, docId]
    );
  };

  // Handle select all toggle
  const handleSelectAll = () => {
    if (selectedDocs.length === filteredDocs.length) {
      setSelectedDocs([]);
    } else {
      setSelectedDocs(filteredDocs.map((doc) => doc.id));
    }
  };

  // Page Header Component - Remove this as we're using imported PageHeader
  // const PageHeader = ({ icon, title, currentPage, subtitle }) => (...)

  // Form Section Component - Updated to remove header section
  const FormSection = ({ children }) => (
    <div className="bg-white rounded-2xl p-6">
      {children}
    </div>
  );

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white rounded-2xl">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Unable to Load Documents</h3>
                <p className="text-red-600 mb-6">{error}</p>
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

  return (
    <div className="min-h-screen bg-white rounded-2xl">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <PageHeader
          icon={<FaFileAlt />}
          title="Uploaded Documents"
          currentPage="Uploaded Documents"
          subtitle="Manage, filter and download your uploaded documents."
          showTradingYear={false}
        />

        {/* Filters Section */}
        <FormSection>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Transaction Type
              </label>
              <CustomDropdown
                name="transactionType"
                value={transactionType}
                onChange={(e) => setTransactionType(e.target.value)}
                options={["", "Income", "Expense"]}
                placeholder="All Types"
                displayFormatter={(option) =>
                  option === "" ? "All Types" : option
                }
                valueFormatter={(value) => (value === "" ? "" : value)}
                allowClear={true}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Category
              </label>
              <CustomDropdown
                name="expenseType"
                value={expenseType}
                onChange={(e) => setExpenseType(e.target.value)}
                options={[
                  "",
                  ...getFilteredExpenseTypes().map(([id, name]) => name),
                ]}
                placeholder="All Categories"
                displayFormatter={(option) =>
                  option === "" ? "All Categories" : option
                }
                valueFormatter={(value) => (value === "" ? "" : value)}
                allowClear={true}
                showSearch={true}
                searchPlaceholder="Search categories..."
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                From Date
              </label>
              <CustomDatePicker
                name="fromDate"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                placeholder="Select date"
                allowClear={true}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                To Date
              </label>
              <CustomDatePicker
                name="toDate"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                placeholder="Select date"
                allowClear={true}
                minDate={fromDate}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Actions
              </label>
              <button
                type="button"
                onClick={() => {
                  setTransactionType("");
                  setExpenseType("");
                  setFromDate("");
                  setToDate("");
                }}
                className="w-full bg-gray-500 text-white px-4 py-3 rounded-xl shadow hover:bg-gray-600 text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2"
              >
                <X className="w-4 h-4" />
                Clear Filters
              </button>
            </div>
          </div>
        </FormSection>

        {/* Actions Bar */}
        <div className="bg-white rounded-2xl p-4 mb-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={handleSelectAll}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                {selectedDocs.length === filteredDocs.length && filteredDocs.length > 0 ? (
                  <CheckSquare className="w-5 h-5" />
                ) : (
                  <Square className="w-5 h-5" />
                )}
                <span className="text-sm font-medium">
                  Select All
                </span>
              </button>
              
              {selectedDocs.length > 0 && (
                <span className="text-sm text-blue-600 font-medium">
                  {selectedDocs.length} document{selectedDocs.length !== 1 ? 's' : ''} selected
                </span>
              )}
            </div>

            <button
              onClick={handleDownloadAll}
              disabled={zipDownloadLoading || filteredDocs.length === 0}
              className="flex items-center gap-3 bg-gradient-to-r from-green-600 to-green-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl shadow hover:from-green-700 hover:to-green-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm"
            >
              {zipDownloadLoading ? (
                <>
                  <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span className="hidden sm:inline">Preparing ZIP...</span>
                  <span className="sm:hidden">Preparing...</span>
                </>
              ) : (
                <>
                  <Package className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="hidden sm:inline">
                    {selectedDocs.length > 0 
                      ? `Download Selected as ZIP (${selectedDocs.length})`
                      : `Download All as ZIP (${filteredDocs.length})`
                    }
                  </span>
                  <span className="sm:hidden">
                    {selectedDocs.length > 0 ? `ZIP (${selectedDocs.length})` : `ZIP (${filteredDocs.length})`}
                  </span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Documents Table */}
        <FormSection>
          {filteredDocs.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 p-3 bg-gray-100 rounded-full">
                <FileText className="w-full h-full text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-500 mb-2">
                {documents.length === 0 ? "No documents uploaded yet" : "No documents match your filters"}
              </h3>
              <p className="text-gray-400 mb-4">
                {documents.length === 0 
                  ? "Upload your first document to get started" 
                  : "Try adjusting your filter criteria"
                }
              </p>
              {documents.length > 0 && (
                <button
                  onClick={() => {
                    setTransactionType("");
                    setExpenseType("");
                    setFromDate("");
                    setToDate("");
                  }}
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-3 sm:px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedDocs.length === filteredDocs.length && filteredDocs.length > 0}
                          onChange={handleSelectAll}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="hidden sm:inline">Select</span>
                      </div>
                    </th>
                    <th className="px-3 sm:px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      S.No
                    </th>
                    <th className="px-3 sm:px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <span className="hidden sm:inline">Transaction Type</span>
                      <span className="sm:hidden">Type</span>
                    </th>
                    <th className="px-3 sm:px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-3 sm:px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <span className="hidden sm:inline">Transaction Date</span>
                      <span className="sm:hidden">Date</span>
                    </th>
                    <th className="px-3 sm:px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <span className="hidden sm:inline">Document Image</span>
                      <span className="sm:hidden">Image</span>
                    </th>
                    <th className="px-3 sm:px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredDocs.map((doc, index) => {
                    const docId = extractIdFromAttachment(doc.attachment);
                    const isDownloading = downloadLoading[docId];
                    const imageUrl = imageUrls[docId];

                    return (
                      <tr key={doc.id} className="hover:bg-gray-50 transition-colors">
                        {/* Checkbox Column */}
                        <td className="px-3 sm:px-6 py-4">
                          <input
                            type="checkbox"
                            checked={selectedDocs.includes(doc.id)}
                            onChange={() => handleSelectDoc(doc.id)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                        </td>

                        {/* Serial Number */}
                        <td className="px-3 sm:px-6 py-4 text-sm font-medium text-gray-900">
                          {index + 1}
                        </td>

                        {/* Transaction Type */}
                        <td className="px-3 sm:px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${
                              getTransactionType(doc.account_id) === "Income"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            
                            <span className="hidden sm:inline">{getTransactionType(doc.account_id)}</span>
                            <span className="sm:hidden">{getTransactionType(doc.account_id).charAt(0)}</span>
                          </span>
                        </td>

                        {/* Category */}
                        <td className="px-3 sm:px-6 py-4">
                          <span className="text-sm font-medium text-gray-900 block truncate max-w-32 sm:max-w-none">
                            {getExpenseType(doc.account_id)}
                          </span>
                        </td>

                        {/* Transaction Date */}
                        <td className="px-3 sm:px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-400 hidden sm:block" />
                            <span className="text-sm text-gray-900">
                              {formatDate(doc.transaction_date)}
                            </span>
                          </div>
                        </td>

                        {/* Document Image - Your original working implementation */}
                        <td className="px-3 sm:px-6 py-4">
                          {doc.attachment ? (
                            imageUrl ? (
                              <img
                                src={imageUrl}
                                alt={getFileName(doc.attachment)}
                                className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg cursor-pointer hover:opacity-75 transition-opacity border border-gray-200"
                                onClick={() =>
                                  handleViewImageModal(
                                    docId,
                                    getFileName(doc.attachment)
                                  )
                                }
                              />
                            ) : (
                              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
                                <span className="text-xs text-gray-500">
                                  <span className="hidden sm:inline">Loading...</span>
                                  <span className="sm:hidden">...</span>
                                </span>
                              </div>
                            )
                          ) : (
                            <span className="text-gray-400 text-sm">
                              <span className="hidden sm:inline">No file</span>
                              <span className="sm:hidden">-</span>
                            </span>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="px-3 sm:px-6 py-4">
                          {doc.attachment && (
                            <button
                              onClick={() =>
                                handleDownload(
                                  doc.attachment,
                                  getFileName(doc.attachment)
                                )
                              }
                              disabled={isDownloading}
                              className="inline-flex items-center gap-1 sm:gap-2 bg-blue-50 text-blue-600 hover:bg-blue-100 hover:scale-105 px-2 sm:px-3 py-1 sm:py-2 rounded-lg transition-all duration-200 cursor-pointer disabled:opacity-50 text-xs font-medium"
                              title="Download document"
                            >
                              {isDownloading ? (
                                <>
                                  <div className="w-3 h-3 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                                  <span className="hidden sm:inline">Downloading</span>
                                </>
                              ) : (
                                <>
                                  <FaDownload className="w-3 h-3" />
                                  <span className="hidden sm:inline">Download</span>
                                </>
                              )}
                            </button>
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

      {/* Image Modal - Your original working modal with enhanced styling */}
      {viewedImage && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Document Preview
                  </h3>
                  <p className="text-sm text-gray-600">
                    {viewedImage.name}
                  </p>
                </div>
              </div>
              <button
                onClick={closeImageModal}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                title="Close preview"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 flex justify-center bg-gray-50">
              <img
                src={viewedImage.url}
                alt={viewedImage.name}
                className="max-h-[70vh] max-w-full object-contain rounded-lg shadow-lg"
                style={{ maxHeight: "70vh" }}
              />
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Use right-click to save the image to your device
                </p>
                <button
                  onClick={closeImageModal}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadedDocuments;












