// import React from "react";
// import { Link } from "react-router-dom";
// import { Download, FileText, Calendar } from "lucide-react";

// const FinancialStatements = () => {
//   const statements = [
//     {
//       id: 1,
//       title: "Profit & Loss Account for year 2016-2017",
//       fileUrl:
//         "https://taxita.learnify.pk/base/download.php?act=Web&action=ProfitLossAccount&uid=196&tradingYearID=274",
//       entryDate: "11 Aug, 2025",
//     },
//   ];

//   return (
//     <div className="min-h-screen p-6 bg-white rounded-xl">
//       {/* Top Section */}
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-800 mb-1">
//             Financial Statements
//           </h1>
//           <p className="text-gray-600">
//             Review and download your financial documents.
//           </p>
//         </div>
//         <div className="flex items-center text-sm text-gray-500 mt-2 md:mt-0">
//           <Link to="/dashboard" className="hover:underline text-blue-600">
//             Dashboard
//           </Link>
//           <span className="mx-2">/</span>
//           <span className=" text-blue-600 cursor-pointer">
//             Financial Statements
//           </span>
//         </div>
//       </div>

//       {/* Intro Text */}
//       <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
//         <p className="text-gray-700">
//           Financial Statements content goes here. From this page you can access
//           all available yearly reports and download them for your records.
//         </p>
//       </div>

//       {/* Filter Buttons */}
//       <div className="flex gap-3 mb-4">
//         <button className="px-4 py-2  rounded-xl text-sm font-medium text-white bg-green-600 hover:bg-green-700 cursor-pointer">
//           All
//         </button>
//         <button className="px-4 py-2 rounded-xl text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 cursor-pointer">
//           2016-2017
//         </button>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto">
//         <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
//           <thead className="bg-blue-600 text-white">
//             <tr>
//               <th className="px-4 py-2 text-left w-16">S.no</th>
//               <th className="px-4 py-2 text-left">Document Title</th>
//               <th className="px-4 py-2 text-center">Document File</th>
//               <th className="px-4 py-2 text-center">Entry Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {statements.map((doc, index) => (
//               <tr
//                 key={doc.id}
//                 className="border-b border-gray-200 hover:bg-gray-50"
//               >
//                 <td className="px-4 py-2">{index + 1}</td>
//                 <td className="px-4 py-2 flex items-center gap-2">
//                   <FileText className="w-4 h-4 text-blue-500" />
//                   {doc.title}
//                 </td>
//                 <td className="px-4 py-2 text-center">
//                   <a
//                     href={doc.fileUrl}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="inline-flex items-center px-3 py-1.5 bg-green-600 text-white rounded-lg text-xs font-medium hover:bg-green-700"
//                   >
//                     <Download className="w-4 h-4 mr-1" />
//                     Download
//                   </a>
//                 </td>
//                 <td className="px-4 py-2 text-center">
//                   <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700 border">
//                     <Calendar className="w-3 h-3" /> {doc.entryDate}
//                   </span>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Footer Info */}
//       <div className="mt-4 text-sm text-gray-500">
//         Showing 1 of {statements.length} entries
//       </div>
//     </div>
//   );
// };

// export default FinancialStatements;






















// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { Download, FileText, Calendar, Loader2 } from "lucide-react";
// import toast from "react-hot-toast";
// import { getFinancialsApi, downloadFinancialApi } from "../services/dashboard"; // Adjust path as needed

// const FinancialStatements = () => {
//   const [statements, setStatements] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [downloadingId, setDownloadingId] = useState(null);

//   // Fetch financial statements on component mount
//   useEffect(() => {
//     fetchFinancialStatements();
//   }, []);

//   const fetchFinancialStatements = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const response = await getFinancialsApi();
      
//       if (response.data.success) {
//         setStatements(response.data.data);
//       } else {
//         setError("Failed to fetch financial statements");
//       }
//     } catch (err) {
//       console.error("Error fetching financial statements:", err);
//       setError("Failed to load financial statements. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDownload = async (id, fileName) => {
//     try {
//       setDownloadingId(id);
//       const response = await downloadFinancialApi(id);
      
//       // Create blob and download
//       const blob = new Blob([response.data], { type: 'application/pdf' });
//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement('a');
//       link.href = url;
//       link.download = fileName;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       window.URL.revokeObjectURL(url);
      
//       // Success toast
//       toast.success(`${fileName} downloaded successfully!`);
//     } catch (err) {
//       console.error("Error downloading file:", err);
//       // Error toast
//       toast.error("Failed to download file. Please try again.");
//     } finally {
//       setDownloadingId(null);
//     }
//   };

//   // Loading state
//   if (loading) {
//     return (
//       <div className="min-h-screen p-6 bg-white rounded-xl">
//         <div className="flex items-center justify-center h-64">
//           <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
//           <span className="ml-2 text-gray-600">Loading financial statements...</span>
//         </div>
//       </div>
//     );
//   }

//   // Error state
//   if (error) {
//     return (
//       <div className="min-h-screen p-6 bg-white rounded-xl">
//         <div className="flex flex-col items-center justify-center h-64">
//           <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
//             <p className="text-red-700 mb-4">{error}</p>
//             <button
//               onClick={fetchFinancialStatements}
//               className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
//             >
//               Retry
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen p-6 bg-white rounded-xl">
//       {/* Top Section */}
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-800 mb-1">
//             Financial Statements
//           </h1>
//           <p className="text-gray-600">
//             Review and download your financial documents.
//           </p>
//         </div>
//         <div className="flex items-center text-sm text-gray-500 mt-2 md:mt-0">
//           <Link to="/dashboard" className="hover:underline text-blue-600">
//             Dashboard
//           </Link>
//           <span className="mx-2">/</span>
//           <span className="text-blue-600 cursor-pointer">
//             Financial Statements
//           </span>
//         </div>
//       </div>

//       {/* Intro Text */}
//       <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
//         <p className="text-gray-700">
//           Financial Statements content goes here. From this page you can access
//           all available yearly reports and download them for your records.
//         </p>
//       </div>

//       {/* Filter Buttons - You can implement filtering logic here */}
//       <div className="flex gap-3 mb-4">
//         <button className="px-4 py-2 rounded-xl text-sm font-medium text-white bg-green-600 hover:bg-green-700 cursor-pointer">
//           All
//         </button>
//         {/* Add more filter buttons based on your requirements */}
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto">
//         <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
//           <thead className="bg-blue-600 text-white">
//             <tr>
//               <th className="px-4 py-2 text-left w-16">S.no</th>
//               <th className="px-4 py-2 text-left">Document Title</th>
//               <th className="px-4 py-2 text-center">Document File</th>
//               <th className="px-4 py-2 text-center">Entry Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {statements.length === 0 ? (
//               <tr>
//                 <td colSpan="4" className="px-4 py-8 text-center text-gray-500">
//                   No financial statements found
//                 </td>
//               </tr>
//             ) : (
//               statements.map((doc, index) => (
//                 <tr
//                   key={doc.id}
//                   className="border-b border-gray-200 hover:bg-gray-50"
//                 >
//                   <td className="px-4 py-2">{index + 1}</td>
//                   <td className="px-4 py-2 flex items-center gap-2">
//                     <FileText className="w-4 h-4 text-blue-500" />
//                     {doc.file_name}
//                   </td>
//                   <td className="px-4 py-2 text-center">
//                     <button
//                       onClick={() => handleDownload(doc.id, doc.file_name)}
//                       disabled={downloadingId === doc.id}
//                       className="inline-flex items-center px-3 py-1.5 bg-green-600 text-white rounded-lg text-xs font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       {downloadingId === doc.id ? (
//                         <>
//                           <Loader2 className="w-4 h-4 mr-1 animate-spin" />
//                           Downloading...
//                         </>
//                       ) : (
//                         <>
//                           <Download className="w-4 h-4 mr-1" />
//                           Download
//                         </>
//                       )}
//                     </button>
//                   </td>
//                   <td className="px-4 py-2 text-center">
//                     <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700 border">
//                       <Calendar className="w-3 h-3" /> {doc.entry_date}
//                     </span>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Footer Info */}
//       <div className="mt-4 text-sm text-gray-500">
//         Showing {statements.length} of {statements.length} entries
//       </div>

//       {/* Refresh Button */}
//       <div className="mt-4">
//         <button
//           onClick={fetchFinancialStatements}
//           className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
//         >
//           Refresh Data
//         </button>
//       </div>
//     </div>
//   );
// };

// export default FinancialStatements;
























// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { Download, FileText, Calendar, Loader2, Home, ChevronRight, Search } from "lucide-react";
// import toast from "react-hot-toast";
// import { getFinancialsApi, downloadFinancialApi } from "../services/dashboard";

// const FinancialStatements = () => {
//   const [statements, setStatements] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [downloadingId, setDownloadingId] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     fetchFinancialStatements();
//   }, []);

//   const fetchFinancialStatements = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const response = await getFinancialsApi();
      
//       if (response.data.success) {
//         setStatements(response.data.data);
//       } else {
//         setError("Failed to fetch financial statements");
//       }
//     } catch (err) {
//       console.error("Error fetching financial statements:", err);
//       setError("Failed to load financial statements. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDownload = async (id, fileName) => {
//     try {
//       setDownloadingId(id);
//       toast.loading("Preparing download...", { id: `download-${id}` });
      
//       const response = await downloadFinancialApi(id);
//       const blob = new Blob([response.data], { type: 'application/pdf' });
//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement('a');
//       link.href = url;
//       link.download = fileName;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       window.URL.revokeObjectURL(url);
      
//       toast.success(`${fileName} downloaded successfully!`, { id: `download-${id}` });
//     } catch (err) {
//       console.error("Error downloading file:", err);
//       toast.error("Failed to download file. Please try again.", { id: `download-${id}` });
//     } finally {
//       setDownloadingId(null);
//     }
//   };

//   const filteredStatements = statements.filter(doc =>
//     doc.file_name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Skeleton Loading Component
//   const SkeletonRow = () => (
//     <tr className="animate-pulse">
//       <td className="px-6 py-4">
//         <div className="w-8 h-4 bg-gray-200 rounded"></div>
//       </td>
//       <td className="px-6 py-4">
//         <div className="flex items-center">
//           <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
//           <div className="ml-4 space-y-2">
//             <div className="w-32 h-4 bg-gray-200 rounded"></div>
//             <div className="w-20 h-3 bg-gray-200 rounded"></div>
//           </div>
//         </div>
//       </td>
//       <td className="px-6 py-4 text-center">
//         <div className="w-24 h-8 bg-gray-200 rounded-lg mx-auto"></div>
//       </td>
//       <td className="px-6 py-4 text-center">
//         <div className="w-20 h-6 bg-gray-200 rounded-full mx-auto"></div>
//       </td>
//     </tr>
//   );

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
//         <div className="max-w-7xl mx-auto p-6">
//           <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
//             <div className="flex items-center justify-center h-96">
//               <div className="text-center">
//                 <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <FileText className="w-8 h-8 text-red-600" />
//                 </div>
//                 <h3 className="text-xl font-semibold text-gray-800 mb-2">Unable to Load Documents</h3>
//                 <p className="text-red-600 mb-6">{error}</p>
//                 <button
//                   onClick={fetchFinancialStatements}
//                   className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-medium"
//                 >
//                   Try Again
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-white rounded-2xl">
//       <div className="max-w-7xl mx-auto p-6">
//         {/* Header */}
//         <div className="mb-8">
//           <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
//             <Link to="/dashboard" className="flex items-center hover:text-blue-600 transition-colors">
//               <Home className="w-4 h-4 mr-1" />
//               Dashboard
//             </Link>
//             <ChevronRight className="w-4 h-4" />
//             <span className="text-blue-600 font-medium">Financial Statements</span>
//           </nav>

//           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
//             <div>
//               <h1 className="text-4xl font-bold text-gray-900 mb-2">Financial Statements</h1>
//               <p className="text-lg text-gray-600">Access and download your comprehensive financial documents.</p>
//             </div>
            
//             {/* Search moved to header right */}
//             <div className="mt-6 lg:mt-0 relative max-w-md">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search documents..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
//           <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 p-6">
//             <div className="flex items-start">
//               <FileText className="w-6 h-6 text-blue-600 mr-3" />
//               <div>
//                 <h3 className="text-sm font-medium text-blue-800">Financial Documentation Center</h3>
//                 <p className="text-sm text-blue-700 mt-1">All your financial statements are securely stored here. Download any document for your records.</p>
//               </div>
//             </div>
//           </div>

//           <div className="overflow-x-auto">
//             {loading ? (
//               <table className="min-w-full">
//                 <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
//                   <tr>
//                     <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">#</th>
//                     <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Document Details</th>
//                     <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase">Actions</th>
//                     <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase">Date Added</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-100">
//                   {[...Array(5)].map((_, i) => <SkeletonRow key={i} />)}
//                 </tbody>
//               </table>
//             ) : filteredStatements.length === 0 ? (
//               <div className="text-center py-16">
//                 <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <FileText className="w-8 h-8 text-gray-400" />
//                 </div>
//                 <h3 className="text-lg font-medium text-gray-900 mb-2">
//                   {searchTerm ? 'No matching documents found' : 'No financial statements available'}
//                 </h3>
//                 <p className="text-gray-500">
//                   {searchTerm ? `Try adjusting your search term "${searchTerm}"` : 'Your financial documents will appear here once uploaded.'}
//                 </p>
//               </div>
//             ) : (
//               <table className="min-w-full">
//                 <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
//                   <tr>
//                     <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">#</th>
//                     <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Document Details</th>
//                     <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase">Actions</th>
//                     <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase">Date Added</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-100">
//                   {filteredStatements.map((doc, index) => (
//                     <tr key={doc.id} className="hover:bg-gray-50 transition-colors">
//                       <td className="px-6 py-4 text-sm font-medium text-gray-500">{index + 1}</td>
//                       <td className="px-6 py-4">
//                         <div className="flex items-center">
//                           <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
//                             <FileText className="w-5 h-5 text-red-600" />
//                           </div>
//                           <div className="ml-4">
//                             <div className="text-sm font-medium text-gray-900">{doc.file_name}</div>
//                             <div className="text-sm text-gray-500">PDF Document</div>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 text-center">
//                         <button
//                           onClick={() => handleDownload(doc.id, doc.file_name)}
//                           disabled={downloadingId === doc.id}
//                           className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg text-sm font-medium hover:from-green-700 hover:to-green-800 disabled:opacity-50 transition-all"
//                         >
//                           {downloadingId === doc.id ? (
//                             <>
//                               <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                               Downloading...
//                             </>
//                           ) : (
//                             <>
//                               <Download className="w-4 h-4 mr-2" />
//                               Download
//                             </>
//                           )}
//                         </button>
//                       </td>
//                       <td className="px-6 py-4 text-center">
//                         <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
//                           <Calendar className="w-3 h-3 mr-1" />
//                           {doc.entry_date}
//                         </span>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             )}
//           </div>

//           {filteredStatements.length > 0 && (
//             <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
//               <div className="text-sm text-gray-600">
//                 Showing <span className="font-medium text-gray-900">{filteredStatements.length}</span> of{' '}
//                 <span className="font-medium text-gray-900">{statements.length}</span> documents
//                 {searchTerm && <span className="ml-2 text-blue-600">(filtered by "{searchTerm}")</span>}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FinancialStatements;

















































































// import React, { useState } from "react";
// import { Download, FileText, Calendar, Loader2, Home, ChevronRight, Search } from "lucide-react";
// import { useFinancialStatements } from "../context/FinancialStatementsContext";
// import PageHeader from "../components/PageHeader";

// const FinancialStatements = () => {
//   const {
//     statements,
//     isLoading,
//     fetchError,
//     downloadFinancialDocument,
//     isDownloading
//   } = useFinancialStatements();

//   const [searchTerm, setSearchTerm] = useState("");

//   const filteredStatements = statements.filter(doc =>
//     doc.file_name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleDownload = async (id, fileName) => {
//     await downloadFinancialDocument(id, fileName);
//   };

//   // Loading Skeleton Component
//   const LoadingSkeleton = () => (
//     <div className="min-h-screen bg-white rounded-2xl">
//       <div className="max-w-7xl mx-auto p-6 space-y-8">
//         {/* Header Skeleton */}
//         <div className="space-y-4">
//           <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
//           <div className="h-10 bg-gray-200 rounded w-1/2 animate-pulse"></div>
//           <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
//         </div>
        
//         {/* Search and Content Skeleton */}
//         <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
//           <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
//             <div className="flex items-start">
//               <div className="w-6 h-6 bg-blue-200 rounded animate-pulse mr-3"></div>
//               <div className="space-y-2">
//                 <div className="h-4 bg-blue-200 rounded w-32 animate-pulse"></div>
//                 <div className="h-3 bg-blue-200 rounded w-64 animate-pulse"></div>
//               </div>
//             </div>
//           </div>
          
//           <div className="overflow-x-auto">
//             <table className="min-w-full">
//               <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
//                 <tr>
//                   <th className="px-6 py-4 text-left">
//                     <div className="h-4 bg-gray-200 rounded w-4 animate-pulse"></div>
//                   </th>
//                   <th className="px-6 py-4 text-left">
//                     <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
//                   </th>
//                   <th className="px-6 py-4 text-center">
//                     <div className="h-4 bg-gray-200 rounded w-16 mx-auto animate-pulse"></div>
//                   </th>
//                   <th className="px-6 py-4 text-center">
//                     <div className="h-4 bg-gray-200 rounded w-20 mx-auto animate-pulse"></div>
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-100">
//                 {[...Array(5)].map((_, i) => (
//                   <tr key={i} className="animate-pulse">
//                     <td className="px-6 py-4">
//                       <div className="w-8 h-4 bg-gray-200 rounded"></div>
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="flex items-center">
//                         <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
//                         <div className="ml-4 space-y-2">
//                           <div className="w-32 h-4 bg-gray-200 rounded"></div>
//                           <div className="w-20 h-3 bg-gray-200 rounded"></div>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 text-center">
//                       <div className="w-24 h-8 bg-gray-200 rounded-lg mx-auto"></div>
//                     </td>
//                     <td className="px-6 py-4 text-center">
//                       <div className="w-20 h-6 bg-gray-200 rounded-full mx-auto"></div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   if (fetchError) {
//     return (
//       <div className="min-h-screen bg-white rounded-2xl">
//         <div className="max-w-7xl mx-auto p-6">
//           <PageHeader
//             icon={<FileText />}
//             title="Financial Statements"
//             currentPage="Financial Statements"
//             showTradingYear={false}
//             subtitle="Access and download your comprehensive financial documents."
//           />
          
//           <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
//             <div className="flex items-center justify-center h-96">
//               <div className="text-center">
//                 <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <FileText className="w-8 h-8 text-red-600" />
//                 </div>
//                 <h3 className="text-xl font-semibold text-gray-800 mb-2">Unable to Load Documents</h3>
//                 <p className="text-red-600 mb-6">{fetchError}</p>
//                 <button
//                   onClick={() => window.location.reload()}
//                   className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-medium"
//                 >
//                   Try Again
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (isLoading) {
//     return <LoadingSkeleton />;
//   }

//   return (
//     <div className="min-h-screen bg-white rounded-2xl">
//       <div className="max-w-7xl mx-auto p-6">
//         {/* Header */}
//         <div className="mb-8">
//           <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
//             <div className="flex items-center hover:text-blue-600 transition-colors cursor-pointer">
//               <Home className="w-4 h-4 mr-1" />
//               Dashboard
//             </div>
//             <ChevronRight className="w-4 h-4" />
//             <span className="text-blue-600 font-medium">Financial Statements</span>
//           </nav>

//           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
//             <div>
//               <h1 className="text-4xl font-bold text-gray-900 mb-2">Financial Statements</h1>
//               <p className="text-lg text-gray-600">Access and download your comprehensive financial documents.</p>
//             </div>
            
//             {/* Search moved to header right */}
//             <div className="mt-6 lg:mt-0 relative max-w-md">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search documents..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
//           <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 p-6">
//             <div className="flex items-start">
//               <FileText className="w-6 h-6 text-blue-600 mr-3" />
//               <div>
//                 <h3 className="text-sm font-medium text-blue-800">Financial Documentation Center</h3>
//                 <p className="text-sm text-blue-700 mt-1">All your financial statements are securely stored here. Download any document for your records.</p>
//               </div>
//             </div>
//           </div>

//           <div className="overflow-x-auto">
//             {filteredStatements.length === 0 ? (
//               <div className="text-center py-16">
//                 <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <FileText className="w-8 h-8 text-gray-400" />
//                 </div>
//                 <h3 className="text-lg font-medium text-gray-900 mb-2">
//                   {searchTerm ? 'No matching documents found' : 'No financial statements available'}
//                 </h3>
//                 <p className="text-gray-500">
//                   {searchTerm ? `Try adjusting your search term "${searchTerm}"` : 'Your financial documents will appear here once uploaded.'}
//                 </p>
//               </div>
//             ) : (
//               <table className="min-w-full">
//                 <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
//                   <tr>
//                     <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">#</th>
//                     <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Document Details</th>
//                     <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase">Actions</th>
//                     <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase">Date Added</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-100">
//                   {filteredStatements.map((doc, index) => (
//                     <tr key={doc.id} className="hover:bg-gray-50 transition-colors">
//                       <td className="px-6 py-4 text-sm font-medium text-gray-500">{index + 1}</td>
//                       <td className="px-6 py-4">
//                         <div className="flex items-center">
//                           <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
//                             <FileText className="w-5 h-5 text-red-600" />
//                           </div>
//                           <div className="ml-4">
//                             <div className="text-sm font-medium text-gray-900">{doc.file_name}</div>
//                             <div className="text-sm text-gray-500">PDF Document</div>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 text-center">
//                         <button
//                           onClick={() => handleDownload(doc.id, doc.file_name)}
//                           disabled={isDownloading(doc.id)}
//                           className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg text-sm font-medium hover:from-green-700 hover:to-green-800 disabled:opacity-50 transition-all"
//                         >
//                           {isDownloading(doc.id) ? (
//                             <>
//                               <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                               Downloading...
//                             </>
//                           ) : (
//                             <>
//                               <Download className="w-4 h-4 mr-2" />
//                               Download
//                             </>
//                           )}
//                         </button>
//                       </td>
//                       <td className="px-6 py-4 text-center">
//                         <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
//                           <Calendar className="w-3 h-3 mr-1" />
//                           {doc.entry_date}
//                         </span>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             )}
//           </div>

//           {filteredStatements.length > 0 && (
//             <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
//               <div className="text-sm text-gray-600">
//                 Showing <span className="font-medium text-gray-900">{filteredStatements.length}</span> of{' '}
//                 <span className="font-medium text-gray-900">{statements.length}</span> documents
//                 {searchTerm && <span className="ml-2 text-blue-600">(filtered by "{searchTerm}")</span>}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FinancialStatements;










import React, { useState } from "react";
import { Download, FileText, Calendar, Loader2, Search, X } from "lucide-react";
import { useFinancialStatements } from "../context/FinancialStatementsContext";
import PageHeader from "../components/PageHeader";

const FinancialStatements = () => {
  const {
    statements,
    isLoading,
    fetchError,
    downloadFinancialDocument,
    isDownloading
  } = useFinancialStatements();

  const [searchTerm, setSearchTerm] = useState("");

  const filteredStatements = statements.filter(doc =>
    doc.file_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDownload = async (id, fileName) => {
    await downloadFinancialDocument(id, fileName);
  };

  // Enhanced Loading Skeleton Component
  const LoadingSkeleton = () => (
    <div className="min-h-screen bg-white rounded-2xl">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
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
        
        {/* Search Bar Skeleton */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex-1 w-full sm:max-w-md">
              <div className="h-12 bg-gray-200 rounded-xl animate-pulse"></div>
            </div>
            <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
          </div>
        </div>
        
        {/* Main Content Skeleton */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
            <div className="flex items-start">
              <div className="w-6 h-6 bg-blue-200 rounded animate-pulse mr-3"></div>
              <div className="space-y-2">
                <div className="h-4 bg-blue-200 rounded w-48 animate-pulse"></div>
                <div className="h-3 bg-blue-200 rounded w-96 animate-pulse"></div>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  {["#", "Document Details", "Actions", "Date Added"].map((header, i) => (
                    <th key={i} className="px-6 py-4 text-left">
                      <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[...Array(5)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-6 py-4">
                      <div className="w-8 h-4 bg-gray-200 rounded"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-red-100 rounded-lg animate-pulse"></div>
                        <div className="ml-4 space-y-2">
                          <div className="w-32 h-4 bg-gray-200 rounded"></div>
                          <div className="w-20 h-3 bg-gray-200 rounded"></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="w-24 h-10 bg-gray-200 rounded-lg mx-auto"></div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="w-20 h-6 bg-gray-200 rounded-full mx-auto"></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  if (fetchError) {
    return (
      <div className="min-h-screen bg-white ">
        <div className="max-w-7xl mx-auto p-6">
          <PageHeader
            icon={<FileText />}
            title="Financial Statements"
            currentPage="Financial Statements"
            showTradingYear={false}
            subtitle="Access and download your comprehensive financial documents."
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

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="min-h-screen bg-white rounded-2xl">
      <div className="max-w-7xl mx-auto p-6">
        {/* PageHeader */}
        <PageHeader
          icon={<FileText />}
          title="Financial Statements"
          currentPage="Financial Statements"
          showTradingYear={false}
          subtitle="Access and download your comprehensive financial documents."
        />

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-blue-50 px-6 py-4 rounded-t-2xl">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/80 rounded-lg">
                <FileText className="w-6 h-6 text-blue-700" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-blue-900">Financial Documentation Center</h2>
                <p className="text-blue-700 text-sm mt-1">All your financial statements are securely stored here. Download any document for your records.</p>
              </div>
            </div>
          </div>

          {/* Search Section - Inside the main content card */}
          <div className="bg-gray-50 border-b border-gray-100 p-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex-1 w-full sm:max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search documents..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white focus:bg-white shadow-sm"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
              <div className="text-sm text-gray-600 whitespace-nowrap">
                {searchTerm ? (
                  <span>
                    <span className="font-medium text-gray-900">{filteredStatements.length}</span> of{' '}
                    <span className="font-medium text-gray-900">{statements.length}</span> documents
                  </span>
                ) : (
                  <span>
                    <span className="font-medium text-gray-900">{statements.length}</span> total documents
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            {filteredStatements.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {searchTerm ? 'No matching documents found' : 'No financial statements available'}
                </h3>
                <p className="text-gray-500 mb-4">
                  {searchTerm ? `No documents match your search "${searchTerm}"` : 'Your financial documents will appear here once uploaded.'}
                </p>
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    Clear Search
                  </button>
                )}
              </div>
            ) : (
              <table className="min-w-full">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">#</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Document Details</th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase">Actions</th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase">Date Added</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredStatements.map((doc, index) => (
                    <tr key={doc.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-gray-500">{index + 1}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <FileText className="w-6 h-6 text-red-600" />
                          </div>
                          <div className="ml-4 min-w-0 flex-1">
                            <div className="text-sm font-medium text-gray-900 truncate">{doc.file_name}</div>
                            <div className="text-sm text-gray-500">PDF Document</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => handleDownload(doc.id, doc.file_name)}
                          disabled={isDownloading(doc.id)}
                          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg text-sm font-medium hover:from-green-700 hover:to-green-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md"
                        >
                          {isDownloading(doc.id) ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Downloading...
                            </>
                          ) : (
                            <>
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </>
                          )}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                          <Calendar className="w-3 h-3 mr-1" />
                          {doc.entry_date}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {filteredStatements.length > 0 && (
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
              <div className="text-sm text-gray-600">
                Showing <span className="font-medium text-gray-900">{filteredStatements.length}</span> of{' '}
                <span className="font-medium text-gray-900">{statements.length}</span> documents
                {searchTerm && <span className="ml-2 text-blue-600">(filtered by "{searchTerm}")</span>}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FinancialStatements;