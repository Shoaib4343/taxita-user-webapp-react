// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';
// import { FiUser, FiPhone, FiMessageSquare, FiX, FiFileText } from 'react-icons/fi';
// import PageHeader from '../../components/PageHeader';
// import { useTradingYear } from '../../context/TradingYearContext';

// const UTR = () => {
//   const navigate = useNavigate();
//   const { activeTradingYear } = useTradingYear();
  
//   // Form states
//   const [formData, setFormData] = useState({
//     utr: '',
//     ni: ''
//   });
  
//   // Modal states
//   const [showApplyModal, setShowApplyModal] = useState(false);
//   const [applyForm, setApplyForm] = useState({
//     name: '',
//     contactNumber: '',
//     message: ''
//   });
  
//   // Loading states
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isApplying, setIsApplying] = useState(false);
//   const [errors, setErrors] = useState({});

//   const handleInputChange = (field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value
//     }));
    
//     // Clear errors when user types
//     if (errors[field]) {
//       setErrors(prev => ({
//         ...prev,
//         [field]: null
//       }));
//     }
//   };

//   const handleApplyFormChange = (field, value) => {
//     setApplyForm(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const validateForm = () => {
//     const newErrors = {};
    
//     if (!formData.utr.trim()) {
//       newErrors.utr = 'UTR (Unique Tax Reference) is required';
//     } else if (formData.utr.trim().length !== 10) {
//       newErrors.utr = 'UTR must be exactly 10 digits';
//     } else if (!/^\d+$/.test(formData.utr.trim())) {
//       newErrors.utr = 'UTR must contain only numbers';
//     }
    
//     if (!formData.ni.trim()) {
//       newErrors.ni = 'NI# (National Insurance) is required';
//     } else if (!/^[A-Z]{2}[0-9]{6}[A-Z]$/.test(formData.ni.trim().toUpperCase())) {
//       newErrors.ni = 'NI# format should be like QQ123456C';
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const validateApplyForm = () => {
//     if (!applyForm.name.trim()) {
//       toast.error('Name is required');
//       return false;
//     }
//     if (!applyForm.contactNumber.trim()) {
//       toast.error('Contact number is required');
//       return false;
//     }
//     if (!applyForm.message.trim()) {
//       toast.error('Message is required');
//       return false;
//     }
//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateForm()) {
//       return;
//     }
    
//     setIsSubmitting(true);
    
//     try {
//       // Simulate API call - replace with actual API
//       await new Promise(resolve => setTimeout(resolve, 1000));
      
//       toast.success('Tax account details saved successfully!');
      
//       // Reset form or navigate as needed
//       // navigate('/dashboard');
      
//     } catch (error) {
//       console.error('Error saving tax accounts:', error);
//       toast.error('Failed to save tax account details');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleApplySubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateApplyForm()) {
//       return;
//     }
    
//     setIsApplying(true);
    
//     try {
//       // Simulate API call - replace with actual API
//       await new Promise(resolve => setTimeout(resolve, 1000));
      
//       toast.success('UTR application submitted successfully! We will contact you soon.');
//       setShowApplyModal(false);
//       setApplyForm({ name: '', contactNumber: '', message: '' });
      
//     } catch (error) {
//       console.error('Error submitting UTR application:', error);
//       toast.error('Failed to submit UTR application');
//     } finally {
//       setIsApplying(false);
//     }
//   };

//   const closeModal = () => {
//     if (isApplying) return;
//     setShowApplyModal(false);
//     setApplyForm({ name: '', contactNumber: '', message: '' });
//   };

//   return (
//     <div className="min-h-screen bg-white rounded-2xl">
//       <div className="max-w-5xl mx-auto px-4 py-8">
//         <PageHeader
//           icon={<FiFileText />}
//           title="Tax Accounts"
//           currentPage="Tax Accounts"
//           showTradingYear={false}
//           description="Fill your Unique Tax Reference and National Insurance. If you don't have UTR or NI number, please put '1234567890' in UTR and 'QQ123456C' in NI#."
//           infoCard="Please click on APPLY FOR UTR & NI# if you don't have it yet."
//         />

//         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
//           {/* Header with Apply Button */}
//           <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
//             <h2 className="text-lg font-semibold text-gray-900">Tax Account Details</h2>
//             <button
//               onClick={() => setShowApplyModal(true)}
//               className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition-colors"
//             >
//               Do not have UTR? CLICK HERE TO APPLY
//             </button>
//           </div>

//           {/* Form */}
//           <div className="p-6">
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* UTR Field */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     UTR (Unique Tax Reference) <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     value={formData.utr}
//                     onChange={(e) => handleInputChange('utr', e.target.value)}
//                     placeholder="1234567890"
//                     maxLength={10}
//                     className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
//                       errors.utr 
//                         ? 'border-red-500 focus:ring-red-500' 
//                         : 'border-gray-300'
//                     }`}
//                   />
//                   {errors.utr && (
//                     <p className="mt-1 text-sm text-red-600">{errors.utr}</p>
//                   )}
//                 </div>

//                 {/* NI# Field */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     NI# (National Insurance) <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     value={formData.ni}
//                     onChange={(e) => handleInputChange('ni', e.target.value.toUpperCase())}
//                     placeholder="QQ123456C"
//                     maxLength={9}
//                     className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
//                       errors.ni 
//                         ? 'border-red-500 focus:ring-red-500' 
//                         : 'border-gray-300'
//                     }`}
//                   />
//                   {errors.ni && (
//                     <p className="mt-1 text-sm text-red-600">{errors.ni}</p>
//                   )}
//                 </div>
//               </div>

//               {/* Submit Button */}
//               <div className="flex justify-end pt-4">
//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                       Saving...
//                     </>
//                   ) : (
//                     'Submit'
//                   )}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>

//       {/* Apply for UTR Modal */}
//       {/* Apply for UTR Modal - Compact & Responsive */}
// {showApplyModal && (
//   <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-3 sm:p-4">
//     <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] shadow-2xl overflow-hidden">
//       {/* Modal Header - Compact */}
//       <div className="flex items-center justify-between px-4 py-3 sm:px-5 sm:py-4 border-b border-gray-200">
//         <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Apply for UTR</h3>
//         <button
//           onClick={closeModal}
//           disabled={isApplying}
//           className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50 p-1 rounded-full hover:bg-gray-100"
//         >
//           <FiX className="w-5 h-5" />
//         </button>
//       </div>

//       {/* Modal Body - Scrollable & Compact */}
//       <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
//         <div className="px-4 py-4 sm:px-5 sm:py-5">
//           <div className="mb-4">
//             <p className="text-gray-600 text-sm mb-2">
//               If you do not have UTR number, don't worry! We are here to help you with your UTR number.
//             </p>
//             <p className="text-gray-600 text-sm">
//               Fill the form as all fields are required and press the apply button.
//             </p>
//           </div>

//           <form onSubmit={handleApplySubmit} className="space-y-4">
//             {/* Name and Contact Number - Responsive Grid */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
//               {/* Name Field */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                   Your Name <span className="text-red-500">*</span>
//                 </label>
//                 <div className="relative">
//                   <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                   <input
//                     type="text"
//                     value={applyForm.name}
//                     onChange={(e) => handleApplyFormChange('name', e.target.value)}
//                     placeholder="Mr Muhammad Asaf Account"
//                     className="w-full pl-10 pr-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
//                     required
//                   />
//                 </div>
//               </div>

//               {/* Contact Number Field */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                   Contact Number <span className="text-red-500">*</span>
//                 </label>
//                 <div className="relative">
//                   <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                   <input
//                     type="tel"
//                     value={applyForm.contactNumber}
//                     onChange={(e) => handleApplyFormChange('contactNumber', e.target.value)}
//                     placeholder="22424242424"
//                     className="w-full pl-10 pr-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
//                     required
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Message Field - Full Width & Compact */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                 Your Message <span className="text-red-500">*</span>
//               </label>
//               <div className="relative">
//                 <FiMessageSquare className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
//                 <textarea
//                   value={applyForm.message}
//                   onChange={(e) => handleApplyFormChange('message', e.target.value)}
//                   placeholder="Please type your message here"
//                   rows={4}
//                   className="w-full pl-10 pr-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-colors"
//                   required
//                 />
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>

//       {/* Modal Footer - Compact */}
//       <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 px-4 py-3 sm:px-5 sm:py-4 border-t border-gray-200 bg-gray-50">
//         <button
//           type="button"
//           onClick={closeModal}
//           disabled={isApplying}
//           className="w-full sm:w-auto px-4 py-2.5 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
//         >
//           Close
//         </button>
//         <button
//           type="submit"
//           onClick={handleApplySubmit}
//           disabled={isApplying}
//           className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//         >
//           {isApplying ? (
//             <>
//               <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//               Applying...
//             </>
//           ) : (
//             'Apply'
//           )}
//         </button>
//       </div>
//     </div>
//   </div>
// )}
//     </div>
//   );
// };

// export default UTR;



































// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';
// import { FiUser, FiPhone, FiMessageSquare, FiX, FiFileText } from 'react-icons/fi';
// import PageHeader from '../../components/PageHeader';
// import { useTradingYear } from '../../context/TradingYearContext';
// import { applyUTRapi, storeUTRapi, showUTRapi } from '../../services/dashboard'; // Adjust path as needed

// const UTR = () => {
//   const navigate = useNavigate();
//   const { activeTradingYear } = useTradingYear();
  
//   // Form states
//   const [formData, setFormData] = useState({
//     unique_tax_reference: '',
//     national_insurance: ''
//   });
  
//   // Modal states
//   const [showApplyModal, setShowApplyModal] = useState(false);
//   const [applyForm, setApplyForm] = useState({
//     your_name: '',
//     contact_number: '',
//     your_message: ''
//   });
  
//   // Loading states
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isApplying, setIsApplying] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [errors, setErrors] = useState({});

//   // Fetch existing UTR data on component mount
//   useEffect(() => {
//     fetchUTRData();
//   }, []);

//   const fetchUTRData = async () => {
//     try {
//       setIsLoading(true);
//       const response = await showUTRapi();
      
//       if (response.data.success && response.data.data) {
//         const utrData = response.data.data;
//         setFormData({
//           unique_tax_reference: utrData.unique_tax_reference || '',
//           national_insurance: utrData.national_insurance || ''
//         });
//       }
//     } catch (error) {
//       console.error('Error fetching UTR data:', error);
//       // Don't show error toast on initial load if no data exists
//       if (error.response?.status !== 404) {
//         toast.error('Failed to load existing UTR data');
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleInputChange = (field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value
//     }));
    
//     // Clear errors when user types
//     if (errors[field]) {
//       setErrors(prev => ({
//         ...prev,
//         [field]: null
//       }));
//     }
//   };

//   const handleApplyFormChange = (field, value) => {
//     setApplyForm(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const validateForm = () => {
//     const newErrors = {};
    
//     if (!formData.unique_tax_reference.trim()) {
//       newErrors.unique_tax_reference = 'UTR (Unique Tax Reference) is required';
//     } else if (formData.unique_tax_reference.trim().length !== 10) {
//       newErrors.unique_tax_reference = 'UTR must be exactly 10 digits';
//     } else if (!/^\d+$/.test(formData.unique_tax_reference.trim())) {
//       newErrors.unique_tax_reference = 'UTR must contain only numbers';
//     }
    
//     if (!formData.national_insurance.trim()) {
//       newErrors.national_insurance = 'NI# (National Insurance) is required';
//     } else if (!/^[A-Z]{2}[0-9]{6}[A-Z]$/.test(formData.national_insurance.trim().toUpperCase())) {
//       newErrors.national_insurance = 'NI# format should be like QQ123456C';
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const validateApplyForm = () => {
//     if (!applyForm.your_name.trim()) {
//       toast.error('Name is required');
//       return false;
//     }
//     if (!applyForm.contact_number.trim()) {
//       toast.error('Contact number is required');
//       return false;
//     }
//     if (!applyForm.your_message.trim()) {
//       toast.error('Message is required');
//       return false;
//     }
//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateForm()) {
//       return;
//     }
    
//     setIsSubmitting(true);
    
//     try {
//       const response = await storeUTRapi({
//         unique_tax_reference: formData.unique_tax_reference.trim(),
//         national_insurance: formData.national_insurance.trim().toUpperCase()
//       });
      
//       if (response.data.success) {
//         toast.success(response.data.message || 'Tax account details saved successfully!');
//         // Optionally refetch data to ensure UI is in sync
//         await fetchUTRData();
//       } else {
//         toast.error(response.data.message || 'Failed to save tax account details');
//       }
      
//     } catch (error) {
//       console.error('Error saving tax accounts:', error);
      
//       // Handle validation errors from API
//       if (error.response?.data?.errors) {
//         setErrors(error.response.data.errors);
//         toast.error('Please fix the validation errors');
//       } else {
//         toast.error(error.response?.data?.message || 'Failed to save tax account details');
//       }
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleApplySubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateApplyForm()) {
//       return;
//     }
    
//     setIsApplying(true);
    
//     try {
//       const response = await applyUTRapi({
//         your_name: applyForm.your_name.trim(),
//         contact_number: applyForm.contact_number.trim(),
//         your_message: applyForm.your_message.trim()
//       });
      
//       if (response.data.success) {
//         toast.success(response.data.message || 'UTR application submitted successfully! We will contact you soon.');
//         setShowApplyModal(false);
//         setApplyForm({ your_name: '', contact_number: '', your_message: '' });
//       } else {
//         toast.error(response.data.message || 'Failed to submit UTR application');
//       }
      
//     } catch (error) {
//       console.error('Error submitting UTR application:', error);
//       toast.error(error.response?.data?.message || 'Failed to submit UTR application');
//     } finally {
//       setIsApplying(false);
//     }
//   };

//   const closeModal = () => {
//     if (isApplying) return;
//     setShowApplyModal(false);
//     setApplyForm({ your_name: '', contact_number: '', your_message: '' });
//   };

//   // Show loading skeleton while fetching data
//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-white rounded-2xl">
//         <div className="max-w-5xl mx-auto px-4 py-8">
//           <div className="animate-pulse">
//             <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
//             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
//               <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
//                 <div className="h-6 bg-gray-200 rounded w-1/4"></div>
//               </div>
//               <div className="p-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div className="space-y-2">
//                     <div className="h-4 bg-gray-200 rounded w-1/3"></div>
//                     <div className="h-12 bg-gray-200 rounded"></div>
//                   </div>
//                   <div className="space-y-2">
//                     <div className="h-4 bg-gray-200 rounded w-1/3"></div>
//                     <div className="h-12 bg-gray-200 rounded"></div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-white rounded-2xl">
//       <div className="max-w-5xl mx-auto px-4 py-8">
//         <PageHeader
//           icon={<FiFileText />}
//           title="Tax Accounts"
//           currentPage="Tax Accounts"
//           showTradingYear={false}
//           description="Fill your Unique Tax Reference and National Insurance. If you don't have UTR or NI number, please put '1234567890' in UTR and 'QQ123456C' in NI#."
//           infoCard="Please click on APPLY FOR UTR & NI# if you don't have it yet."
//         />

//         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
//           {/* Header with Apply Button */}
//           <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
//             <h2 className="text-lg font-semibold text-gray-900">Tax Account Details</h2>
//             <button
//               onClick={() => setShowApplyModal(true)}
//               className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition-colors"
//             >
//               Do not have UTR? CLICK HERE TO APPLY
//             </button>
//           </div>

//           {/* Form */}
//           <div className="p-6">
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* UTR Field */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     UTR (Unique Tax Reference) <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     value={formData.unique_tax_reference}
//                     onChange={(e) => handleInputChange('unique_tax_reference', e.target.value)}
//                     placeholder="1234567890"
//                     maxLength={10}
//                     className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
//                       errors.unique_tax_reference 
//                         ? 'border-red-500 focus:ring-red-500' 
//                         : 'border-gray-300'
//                     }`}
//                   />
//                   {errors.unique_tax_reference && (
//                     <p className="mt-1 text-sm text-red-600">{errors.unique_tax_reference}</p>
//                   )}
//                 </div>

//                 {/* NI# Field */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     NI# (National Insurance) <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     value={formData.national_insurance}
//                     onChange={(e) => handleInputChange('national_insurance', e.target.value.toUpperCase())}
//                     placeholder="QQ123456C"
//                     maxLength={9}
//                     className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
//                       errors.national_insurance 
//                         ? 'border-red-500 focus:ring-red-500' 
//                         : 'border-gray-300'
//                     }`}
//                   />
//                   {errors.national_insurance && (
//                     <p className="mt-1 text-sm text-red-600">{errors.national_insurance}</p>
//                   )}
//                 </div>
//               </div>

//               {/* Submit Button */}
//               <div className="flex justify-end pt-4">
//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                       Saving...
//                     </>
//                   ) : (
//                     'Submit'
//                   )}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>

//       {/* Apply for UTR Modal */}
//       {showApplyModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-3 sm:p-4">
//           <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] shadow-2xl overflow-hidden">
//             {/* Modal Header - Compact */}
//             <div className="flex items-center justify-between px-4 py-3 sm:px-5 sm:py-4 border-b border-gray-200">
//               <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Apply for UTR</h3>
//               <button
//                 onClick={closeModal}
//                 disabled={isApplying}
//                 className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50 p-1 rounded-full hover:bg-gray-100"
//               >
//                 <FiX className="w-5 h-5" />
//               </button>
//             </div>

//             {/* Modal Body - Scrollable & Compact */}
//             <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
//               <div className="px-4 py-4 sm:px-5 sm:py-5">
//                 <div className="mb-4">
//                   <p className="text-gray-600 text-sm mb-2">
//                     If you do not have UTR number, don't worry! We are here to help you with your UTR number.
//                   </p>
//                   <p className="text-gray-600 text-sm">
//                     Fill the form as all fields are required and press the apply button.
//                   </p>
//                 </div>

//                 <form onSubmit={handleApplySubmit} className="space-y-4">
//                   {/* Name and Contact Number - Responsive Grid */}
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
//                     {/* Name Field */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                         Your Name <span className="text-red-500">*</span>
//                       </label>
//                       <div className="relative">
//                         <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                         <input
//                           type="text"
//                           value={applyForm.your_name}
//                           onChange={(e) => handleApplyFormChange('your_name', e.target.value)}
//                           placeholder="Mr Muhammad Asaf Account"
//                           className="w-full pl-10 pr-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
//                           required
//                         />
//                       </div>
//                     </div>

//                     {/* Contact Number Field */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                         Contact Number <span className="text-red-500">*</span>
//                       </label>
//                       <div className="relative">
//                         <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                         <input
//                           type="tel"
//                           value={applyForm.contact_number}
//                           onChange={(e) => handleApplyFormChange('contact_number', e.target.value)}
//                           placeholder="22424242424"
//                           className="w-full pl-10 pr-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
//                           required
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   {/* Message Field - Full Width & Compact */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                       Your Message <span className="text-red-500">*</span>
//                     </label>
//                     <div className="relative">
//                       <FiMessageSquare className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
//                       <textarea
//                         value={applyForm.your_message}
//                         onChange={(e) => handleApplyFormChange('your_message', e.target.value)}
//                         placeholder="Please type your message here"
//                         rows={4}
//                         className="w-full pl-10 pr-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-colors"
//                         required
//                       />
//                     </div>
//                   </div>
//                 </form>
//               </div>
//             </div>

//             {/* Modal Footer - Compact */}
//             <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 px-4 py-3 sm:px-5 sm:py-4 border-t border-gray-200 bg-gray-50">
//               <button
//                 type="button"
//                 onClick={closeModal}
//                 disabled={isApplying}
//                 className="w-full sm:w-auto px-4 py-2.5 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
//               >
//                 Close
//               </button>
//               <button
//                 type="submit"
//                 onClick={handleApplySubmit}
//                 disabled={isApplying}
//                 className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//               >
//                 {isApplying ? (
//                   <>
//                     <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                     Applying...
//                   </>
//                 ) : (
//                   'Apply'
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UTR;




















// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';
// import { FiUser, FiPhone, FiMessageSquare, FiX, FiFileText } from 'react-icons/fi';
// import PageHeader from '../../components/PageHeader';
// import { useTradingYear } from '../../context/TradingYearContext';
// import { applyUTRapi, storeUTRapi, showUTRapi } from '../../services/dashboard'; // Adjust path as needed

// const UTR = () => {
//   const navigate = useNavigate();
//   const { activeTradingYear } = useTradingYear();
  
//   // Form states
//   const [formData, setFormData] = useState({
//     unique_tax_reference: '',
//     national_insurance: ''
//   });
  
//   // Modal states
//   const [showApplyModal, setShowApplyModal] = useState(false);
//   const [applyForm, setApplyForm] = useState({
//     your_name: '',
//     contact_number: '',
//     your_message: ''
//   });
  
//   // Loading states
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isApplying, setIsApplying] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [errors, setErrors] = useState({});

//   // Fetch existing UTR data on component mount
//   useEffect(() => {
//     fetchUTRData();
//   }, []);

//   const fetchUTRData = async () => {
//     try {
//       setIsLoading(true);
//       const response = await showUTRapi();
      
//       if (response.data.success && response.data.data) {
//         const utrData = response.data.data;
//         setFormData({
//           unique_tax_reference: utrData.unique_tax_reference || '',
//           national_insurance: utrData.national_insurance || ''
//         });
//       }
//     } catch (error) {
//       console.error('Error fetching UTR data:', error);
//       // Don't show error toast on initial load if no data exists - user can start fresh
//       if (error.response?.status !== 404) {
//         console.log('No existing UTR data found, starting with empty form');
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleInputChange = (field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value
//     }));
    
//     // Clear errors when user types
//     if (errors[field]) {
//       setErrors(prev => ({
//         ...prev,
//         [field]: null
//       }));
//     }
//   };

//   const handleApplyFormChange = (field, value) => {
//     setApplyForm(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const validateForm = () => {
//     const newErrors = {};
    
//     if (!formData.unique_tax_reference.trim()) {
//       newErrors.unique_tax_reference = 'UTR (Unique Tax Reference) is required';
//     } else if (formData.unique_tax_reference.trim().length !== 10) {
//       newErrors.unique_tax_reference = 'UTR must be exactly 10 digits';
//     } else if (!/^\d+$/.test(formData.unique_tax_reference.trim())) {
//       newErrors.unique_tax_reference = 'UTR must contain only numbers';
//     }
    
//     if (!formData.national_insurance.trim()) {
//       newErrors.national_insurance = 'NI# (National Insurance) is required';
//     } else if (!/^[A-Z]{2}[0-9]{6}[A-Z]$/.test(formData.national_insurance.trim().toUpperCase())) {
//       newErrors.national_insurance = 'NI# format should be like QQ123456C';
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const validateApplyForm = () => {
//     if (!applyForm.your_name.trim()) {
//       toast.error('Name is required');
//       return false;
//     }
//     if (!applyForm.contact_number.trim()) {
//       toast.error('Contact number is required');
//       return false;
//     }
//     if (!applyForm.your_message.trim()) {
//       toast.error('Message is required');
//       return false;
//     }
//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateForm()) {
//       return;
//     }
    
//     setIsSubmitting(true);
    
//     try {
//       const response = await storeUTRapi({
//         unique_tax_reference: formData.unique_tax_reference.trim(),
//         national_insurance: formData.national_insurance.trim().toUpperCase()
//       });
      
//       if (response.data.success) {
//         toast.success(response.data.message || 'Tax account details saved successfully!');
//         // Optionally refetch data to ensure UI is in sync
//         await fetchUTRData();
//       } else {
//         toast.error(response.data.message || 'Failed to save tax account details');
//       }
      
//     } catch (error) {
//       console.error('Error saving tax accounts:', error);
      
//       // Handle validation errors from API
//       if (error.response?.data?.errors) {
//         setErrors(error.response.data.errors);
//         toast.error('Please fix the validation errors');
//       } else {
//         toast.error(error.response?.data?.message || 'Failed to save tax account details');
//       }
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleApplySubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateApplyForm()) {
//       return;
//     }
    
//     setIsApplying(true);
    
//     try {
//       const response = await applyUTRapi({
//         your_name: applyForm.your_name.trim(),
//         contact_number: applyForm.contact_number.trim(),
//         your_message: applyForm.your_message.trim()
//       });
      
//       if (response.data.success) {
//         toast.success(response.data.message || 'UTR application submitted successfully! We will contact you soon.');
//         setShowApplyModal(false);
//         setApplyForm({ your_name: '', contact_number: '', your_message: '' });
        
//         // Note: After applying, user should manually fill the form with placeholder values
//         // or wait for admin approval and then fill actual values
//         toast.info('You can now fill the form with placeholder values (1234567890 for UTR, QQ123456C for NI) or wait for approval.');
//       } else {
//         toast.error(response.data.message || 'Failed to submit UTR application');
//       }
      
//     } catch (error) {
//       console.error('Error submitting UTR application:', error);
//       toast.error(error.response?.data?.message || 'Failed to submit UTR application');
//     } finally {
//       setIsApplying(false);
//     }
//   };

//   const closeModal = () => {
//     if (isApplying) return;
//     setShowApplyModal(false);
//     setApplyForm({ your_name: '', contact_number: '', your_message: '' });
//   };

//   // Show loading skeleton while fetching data
//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-white rounded-2xl">
//         <div className="max-w-5xl mx-auto px-4 py-8">
//           <div className="animate-pulse">
//             <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
//             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
//               <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
//                 <div className="h-6 bg-gray-200 rounded w-1/4"></div>
//               </div>
//               <div className="p-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div className="space-y-2">
//                     <div className="h-4 bg-gray-200 rounded w-1/3"></div>
//                     <div className="h-12 bg-gray-200 rounded"></div>
//                   </div>
//                   <div className="space-y-2">
//                     <div className="h-4 bg-gray-200 rounded w-1/3"></div>
//                     <div className="h-12 bg-gray-200 rounded"></div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-white rounded-2xl">
//       <div className="max-w-5xl mx-auto px-4 py-8">
//         <PageHeader
//           icon={<FiFileText />}
//           title="Tax Accounts"
//           currentPage="Tax Accounts"
//           showTradingYear={false}
//           description="Fill your Unique Tax Reference and National Insurance. If you don't have UTR or NI number, please put '1234567890' in UTR and 'QQ123456C' in NI#."
//           infoCard="Please click on APPLY FOR UTR & NI# if you don't have it yet."
//         />

//         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
//           {/* Header with Apply Button */}
//           <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
//             <h2 className="text-lg font-semibold text-gray-900">Tax Account Details</h2>
//             <button
//               onClick={() => setShowApplyModal(true)}
//               className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition-colors"
//             >
//               Do not have UTR? CLICK HERE TO APPLY
//             </button>
//           </div>

//           {/* Form */}
//           <div className="p-6">
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* UTR Field */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     UTR (Unique Tax Reference) <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     value={formData.unique_tax_reference}
//                     onChange={(e) => handleInputChange('unique_tax_reference', e.target.value)}
//                     placeholder="1234567890"
//                     maxLength={10}
//                     className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
//                       errors.unique_tax_reference 
//                         ? 'border-red-500 focus:ring-red-500' 
//                         : 'border-gray-300'
//                     }`}
//                   />
//                   {errors.unique_tax_reference && (
//                     <p className="mt-1 text-sm text-red-600">{errors.unique_tax_reference}</p>
//                   )}
//                 </div>

//                 {/* NI# Field */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     NI# (National Insurance) <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     value={formData.national_insurance}
//                     onChange={(e) => handleInputChange('national_insurance', e.target.value.toUpperCase())}
//                     placeholder="QQ123456C"
//                     maxLength={9}
//                     className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
//                       errors.national_insurance 
//                         ? 'border-red-500 focus:ring-red-500' 
//                         : 'border-gray-300'
//                     }`}
//                   />
//                   {errors.national_insurance && (
//                     <p className="mt-1 text-sm text-red-600">{errors.national_insurance}</p>
//                   )}
//                 </div>
//               </div>

//               {/* Submit Button */}
//               <div className="flex justify-end pt-4">
//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                       Saving...
//                     </>
//                   ) : (
//                     'Submit'
//                   )}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>

//       {/* Apply for UTR Modal */}
//       {showApplyModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-3 sm:p-4">
//           <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] shadow-2xl overflow-hidden">
//             {/* Modal Header - Compact */}
//             <div className="flex items-center justify-between px-4 py-3 sm:px-5 sm:py-4 border-b border-gray-200">
//               <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Apply for UTR</h3>
//               <button
//                 onClick={closeModal}
//                 disabled={isApplying}
//                 className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50 p-1 rounded-full hover:bg-gray-100"
//               >
//                 <FiX className="w-5 h-5" />
//               </button>
//             </div>

//             {/* Modal Body - Scrollable & Compact */}
//             <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
//               <div className="px-4 py-4 sm:px-5 sm:py-5">
//                 <div className="mb-4">
//                   <p className="text-gray-600 text-sm mb-2">
//                     If you do not have UTR number, don't worry! We are here to help you with your UTR number.
//                   </p>
//                   <p className="text-gray-600 text-sm">
//                     Fill the form as all fields are required and press the apply button.
//                   </p>
//                 </div>

//                 <form onSubmit={handleApplySubmit} className="space-y-4">
//                   {/* Name and Contact Number - Responsive Grid */}
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
//                     {/* Name Field */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                         Your Name <span className="text-red-500">*</span>
//                       </label>
//                       <div className="relative">
//                         <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                         <input
//                           type="text"
//                           value={applyForm.your_name}
//                           onChange={(e) => handleApplyFormChange('your_name', e.target.value)}
//                           placeholder="Mr Muhammad Asaf Account"
//                           className="w-full pl-10 pr-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
//                           required
//                         />
//                       </div>
//                     </div>

//                     {/* Contact Number Field */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                         Contact Number <span className="text-red-500">*</span>
//                       </label>
//                       <div className="relative">
//                         <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                         <input
//                           type="tel"
//                           value={applyForm.contact_number}
//                           onChange={(e) => handleApplyFormChange('contact_number', e.target.value)}
//                           placeholder="22424242424"
//                           className="w-full pl-10 pr-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
//                           required
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   {/* Message Field - Full Width & Compact */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                       Your Message <span className="text-red-500">*</span>
//                     </label>
//                     <div className="relative">
//                       <FiMessageSquare className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
//                       <textarea
//                         value={applyForm.your_message}
//                         onChange={(e) => handleApplyFormChange('your_message', e.target.value)}
//                         placeholder="Please type your message here"
//                         rows={4}
//                         className="w-full pl-10 pr-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-colors"
//                         required
//                       />
//                     </div>
//                   </div>
//                 </form>
//               </div>
//             </div>

//             {/* Modal Footer - Compact */}
//             <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 px-4 py-3 sm:px-5 sm:py-4 border-t border-gray-200 bg-gray-50">
//               <button
//                 type="button"
//                 onClick={closeModal}
//                 disabled={isApplying}
//                 className="w-full sm:w-auto px-4 py-2.5 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
//               >
//                 Close
//               </button>
//               <button
//                 type="submit"
//                 onClick={handleApplySubmit}
//                 disabled={isApplying}
//                 className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//               >
//                 {isApplying ? (
//                   <>
//                     <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                     Applying...
//                   </>
//                 ) : (
//                   'Apply'
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UTR;



















// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';
// import { FiUser, FiPhone, FiMessageSquare, FiX, FiFileText } from 'react-icons/fi';
// import PageHeader from '../../components/PageHeader';
// import { useTradingYear } from '../../context/TradingYearContext';
// import { applyUTRapi, storeUTRapi, showUTRapi } from '../../services/dashboard'; // Adjust path as needed

// const UTR = () => {
//   const navigate = useNavigate();
//   const { activeTradingYear } = useTradingYear();
  
//   // Form states
//   const [formData, setFormData] = useState({
//     unique_tax_reference: '',
//     national_insurance: ''
//   });
  
//   // Track if user has existing UTR data
//   const [hasExistingData, setHasExistingData] = useState(false);
  
//   // Modal states
//   const [showApplyModal, setShowApplyModal] = useState(false);
//   const [applyForm, setApplyForm] = useState({
//     your_name: '',
//     contact_number: '',
//     your_message: ''
//   });
  
//   // Loading states
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isApplying, setIsApplying] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [errors, setErrors] = useState({});

//   // Fetch existing UTR data on component mount
//   useEffect(() => {
//     fetchUTRData();
//   }, []);

//   const fetchUTRData = async () => {
//     try {
//       setIsLoading(true);
//       const response = await showUTRapi();
      
//       if (response.data.success && response.data.data) {
//         const utrData = response.data.data;
//         setFormData({
//           unique_tax_reference: utrData.unique_tax_reference || '',
//           national_insurance: utrData.national_insurance || ''
//         });
//         setHasExistingData(true);
//       } else {
//         setHasExistingData(false);
//       }
//     } catch (error) {
//       console.error('Error fetching UTR data:', error);
//       setHasExistingData(false);
//       // Don't show error toast on initial load if no data exists - user can start fresh
//       if (error.response?.status !== 404) {
//         console.log('No existing UTR data found, starting with empty form');
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleInputChange = (field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value
//     }));
    
//     // Clear errors when user types
//     if (errors[field]) {
//       setErrors(prev => ({
//         ...prev,
//         [field]: null
//       }));
//     }
//   };

//   const handleApplyFormChange = (field, value) => {
//     setApplyForm(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const validateForm = () => {
//     const newErrors = {};
    
//     if (!formData.unique_tax_reference.trim()) {
//       newErrors.unique_tax_reference = 'UTR (Unique Tax Reference) is required';
//     } else if (formData.unique_tax_reference.trim().length !== 10) {
//       newErrors.unique_tax_reference = 'UTR must be exactly 10 digits';
//     } else if (!/^\d+$/.test(formData.unique_tax_reference.trim())) {
//       newErrors.unique_tax_reference = 'UTR must contain only numbers';
//     }
    
//     if (!formData.national_insurance.trim()) {
//       newErrors.national_insurance = 'NI# (National Insurance) is required';
//     } else if (!/^[A-Z]{2}[0-9]{6}[A-Z]$/.test(formData.national_insurance.trim().toUpperCase())) {
//       newErrors.national_insurance = 'NI# format should be like QQ123456C';
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const validateApplyForm = () => {
//     if (!applyForm.your_name.trim()) {
//       toast.error('Name is required');
//       return false;
//     }
//     if (!applyForm.contact_number.trim()) {
//       toast.error('Contact number is required');
//       return false;
//     }
//     if (!applyForm.your_message.trim()) {
//       toast.error('Message is required');
//       return false;
//     }
//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateForm()) {
//       return;
//     }
    
//     setIsSubmitting(true);
    
//     try {
//       const response = await storeUTRapi({
//         unique_tax_reference: formData.unique_tax_reference.trim(),
//         national_insurance: formData.national_insurance.trim().toUpperCase()
//       });
      
//       if (response.data.success) {
//         toast.success(response.data.message || 'Tax account details saved successfully!');
//         // Refetch data to ensure UI is in sync and update hasExistingData flag
//         await fetchUTRData();
//       } else {
//         toast.error(response.data.message || 'Failed to save tax account details');
//       }
      
//     } catch (error) {
//       console.error('Error saving tax accounts:', error);
      
//       // Handle validation errors from API
//       if (error.response?.data?.errors) {
//         setErrors(error.response.data.errors);
//         toast.error('Please fix the validation errors');
//       } else {
//         toast.error(error.response?.data?.message || 'Failed to save tax account details');
//       }
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleApplySubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateApplyForm()) {
//       return;
//     }
    
//     setIsApplying(true);
    
//     try {
//       const response = await applyUTRapi({
//         your_name: applyForm.your_name.trim(),
//         contact_number: applyForm.contact_number.trim(),
//         your_message: applyForm.your_message.trim()
//       });
      
//       if (response.data.success) {
//         toast.success(response.data.message || 'UTR application submitted successfully! We will contact you soon.');
//         setShowApplyModal(false);
//         setApplyForm({ your_name: '', contact_number: '', your_message: '' });
        
//         // Check if user already has UTR data
//         if (hasExistingData) {
//           // If user already has data, just show success message - don't suggest placeholder values
//           toast.info('Your application has been submitted. Your existing UTR details remain unchanged.');
//         } else {
//           // Only suggest placeholder values if user doesn't have existing data
//           toast.info('You can now fill the form with placeholder values (1234567890 for UTR, QQ123456C for NI) or wait for approval.');
//         }
//       } else {
//         toast.error(response.data.message || 'Failed to submit UTR application');
//       }
      
//     } catch (error) {
//       console.error('Error submitting UTR application:', error);
//       toast.error(error.response?.data?.message || 'Failed to submit UTR application');
//     } finally {
//       setIsApplying(false);
//     }
//   };

//   const closeModal = () => {
//     if (isApplying) return;
//     setShowApplyModal(false);
//     setApplyForm({ your_name: '', contact_number: '', your_message: '' });
//   };

//   // Show loading skeleton while fetching data
//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-white rounded-2xl">
//         <div className="max-w-7xl mx-auto p-6">
//           <div className="animate-pulse">
//             {/* PageHeader Skeleton */}
//             <div className="mb-8">
//               <div className="flex items-center justify-between mb-4">
//                 <div className="flex items-center gap-4">
//                   <div className="w-14 h-14 bg-blue-100 rounded-xl animate-pulse"></div>
//                   <div className="space-y-2">
//                     <div className="h-8 bg-gray-200 rounded w-64 animate-pulse"></div>
//                     <div className="h-5 bg-gray-200 rounded w-48 animate-pulse"></div>
//                   </div>
//                 </div>
//               </div>
//               <div className="h-4 bg-gray-200 rounded w-96 animate-pulse"></div>
//             </div>
            
//             <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
//               <div className="bg-blue-50 px-6 py-4">
//                 <div className="h-6 bg-blue-200 rounded w-1/4 animate-pulse"></div>
//               </div>
//               <div className="p-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div className="space-y-2">
//                     <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse"></div>
//                     <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
//                   </div>
//                   <div className="space-y-2">
//                     <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse"></div>
//                     <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
//                   </div>
//                 </div>
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
//         <PageHeader
//           icon={<FiFileText />}
//           title="Tax Accounts"
//           currentPage="Tax Accounts"
//           showTradingYear={false}
//           subtitle={
//             hasExistingData 
//               ? "Your UTR and National Insurance details are saved. You can update them if needed." 
//               : "Fill your Unique Tax Reference and National Insurance. If you don't have UTR or NI number, please put '1234567890' in UTR and 'QQ123456C' in NI#."
//           }
//         />

//         <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
//           {/* Header with Apply Button */}
//           <div className="bg-blue-50 px-6 py-4 rounded-t-2xl">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <div className="p-2 bg-white/80 rounded-lg">
//                   <FiFileText className="w-6 h-6 text-blue-700" />
//                 </div>
//                 <div>
//                   <h2 className="text-xl font-semibold text-blue-900">
//                     Tax Account Details
//                     {hasExistingData && <span className="ml-2 text-sm text-green-600 font-normal">(Saved)</span>}
//                   </h2>
//                   <p className="text-blue-700 text-sm mt-1">
//                     {hasExistingData 
//                       ? "Your UTR details are saved. You can update them or apply for new request."
//                       : "Fill your UTR and National Insurance details or apply if you don't have them yet."
//                     }
//                   </p>
//                 </div>
//               </div>
//               <button
//                 onClick={() => setShowApplyModal(true)}
//                 className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-lg cursor-pointer hover:bg-red-600 transition-colors shadow-sm"
//               >
//                 {/* {hasExistingData ? 'APPLY FOR NEW UTR' : 'Do not have UTR? APPLY HERE'} */}
//                 Do not have UTR? APPLY HERE
//               </button>
//             </div>
//           </div>

//           {/* Form */}
//           <div className="p-6">
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* UTR Field */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     UTR (Unique Tax Reference) <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     value={formData.unique_tax_reference}
//                     onChange={(e) => handleInputChange('unique_tax_reference', e.target.value)}
//                     placeholder="1234567890"
//                     maxLength={10}
//                     className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
//                       errors.unique_tax_reference 
//                         ? 'border-red-500 focus:ring-red-500' 
//                         : 'border-gray-300'
//                     }`}
//                   />
//                   {errors.unique_tax_reference && (
//                     <p className="mt-1 text-sm text-red-600">{errors.unique_tax_reference}</p>
//                   )}
//                 </div>

//                 {/* NI# Field */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     NI# (National Insurance) <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     value={formData.national_insurance}
//                     onChange={(e) => handleInputChange('national_insurance', e.target.value.toUpperCase())}
//                     placeholder="QQ123456C"
//                     maxLength={9}
//                     className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
//                       errors.national_insurance 
//                         ? 'border-red-500 focus:ring-red-500' 
//                         : 'border-gray-300'
//                     }`}
//                   />
//                   {errors.national_insurance && (
//                     <p className="mt-1 text-sm text-red-600">{errors.national_insurance}</p>
//                   )}
//                 </div>
//               </div>

//               {/* Submit Button */}
//               <div className="flex justify-end pt-4">
//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="px-8 cursor-pointer py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                       {hasExistingData ? 'Updating...' : 'Saving...'}
//                     </>
//                   ) : (
//                     hasExistingData ? 'Update' : 'Submit'
//                   )}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>

//       {/* Apply for UTR Modal */}
//       {showApplyModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-3 sm:p-4">
//           <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] shadow-2xl overflow-hidden">
//             {/* Modal Header - Compact */}
//             <div className="flex items-center justify-between px-4 py-3 sm:px-5 sm:py-4 border-b border-gray-200">
//               <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
//                 {hasExistingData ? 'Apply for New UTR Request' : 'Apply for UTR'}
//               </h3>
//               <button
//                 onClick={closeModal}
//                 disabled={isApplying}
//                 className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50 p-1 rounded-full hover:bg-gray-100"
//               >
//                 <FiX className="w-5 h-5" />
//               </button>
//             </div>

//             {/* Modal Body - Scrollable & Compact */}
//             <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
//               <div className="px-4 py-4 sm:px-5 sm:py-5">
//                 <div className="mb-4">
//                   {hasExistingData ? (
//                     <>
//                       <p className="text-gray-600 text-sm mb-2">
//                         You already have UTR details saved. This form is to submit a new application or request.
//                       </p>
//                       <p className="text-gray-600 text-sm">
//                         Fill the form below to submit your new request.
//                       </p>
//                     </>
//                   ) : (
//                     <>
//                       <p className="text-gray-600 text-sm mb-2">
//                         If you do not have UTR number, don't worry! We are here to help you with your UTR number.
//                       </p>
//                       <p className="text-gray-600 text-sm">
//                         Fill the form as all fields are required and press the apply button.
//                       </p>
//                     </>
//                   )}
//                 </div>

//                 <form onSubmit={handleApplySubmit} className="space-y-4">
//                   {/* Name and Contact Number - Responsive Grid */}
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
//                     {/* Name Field */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                         Your Name <span className="text-red-500">*</span>
//                       </label>
//                       <div className="relative">
//                         <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                         <input
//                           type="text"
//                           value={applyForm.your_name}
//                           onChange={(e) => handleApplyFormChange('your_name', e.target.value)}
//                           placeholder="Mr Muhammad Asaf Account"
//                           className="w-full pl-10 pr-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
//                           required
//                         />
//                       </div>
//                     </div>

//                     {/* Contact Number Field */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                         Contact Number <span className="text-red-500">*</span>
//                       </label>
//                       <div className="relative">
//                         <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                         <input
//                           type="tel"
//                           value={applyForm.contact_number}
//                           onChange={(e) => handleApplyFormChange('contact_number', e.target.value)}
//                           placeholder="22424242424"
//                           className="w-full pl-10 pr-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
//                           required
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   {/* Message Field - Full Width & Compact */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                       Your Message <span className="text-red-500">*</span>
//                     </label>
//                     <div className="relative">
//                       <FiMessageSquare className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
//                       <textarea
//                         value={applyForm.your_message}
//                         onChange={(e) => handleApplyFormChange('your_message', e.target.value)}
//                         placeholder="Please type your message here"
//                         rows={4}
//                         className="w-full pl-10 pr-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-colors"
//                         required
//                       />
//                     </div>
//                   </div>
//                 </form>
//               </div>
//             </div>

//             {/* Modal Footer - Compact */}
//             <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 px-4 py-3 sm:px-5 sm:py-4 border-t border-gray-200 bg-gray-50">
//               <button
//                 type="button"
//                 onClick={closeModal}
//                 disabled={isApplying}
//                 className="w-full sm:w-auto px-4 py-2.5 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
//               >
//                 Close
//               </button>
//               <button
//                 type="submit"
//                 onClick={handleApplySubmit}
//                 disabled={isApplying}
//                 className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//               >
//                 {isApplying ? (
//                   <>
//                     <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                     Applying...
//                   </>
//                 ) : (
//                   'Apply'
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UTR;





















// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';
// import { FiUser, FiPhone, FiMessageSquare, FiX, FiFileText } from 'react-icons/fi';
// import PageHeader from '../../components/PageHeader';
// import { useTradingYear } from '../../context/TradingYearContext';
// import { applyUTRapi, storeUTRapi, showUTRapi } from '../../services/dashboard'; // Adjust path as needed

// const UTR = () => {
//   const navigate = useNavigate();
//   const { activeTradingYear } = useTradingYear();
  
//   // Form states
//   const [formData, setFormData] = useState({
//     unique_tax_reference: '',
//     national_insurance: ''
//   });
  
//   // Track if user has existing UTR data
//   const [hasExistingData, setHasExistingData] = useState(false);
  
//   // Modal states
//   const [showApplyModal, setShowApplyModal] = useState(false);
//   const [applyForm, setApplyForm] = useState({
//     your_name: '',
//     contact_number: '',
//     your_message: ''
//   });
  
//   // Loading states
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isApplying, setIsApplying] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [errors, setErrors] = useState({});
  
//   // Apply form errors (separate from main form errors)
//   const [applyErrors, setApplyErrors] = useState({});
  
//   // Track if this is the first time submitting the apply form
//   const [isFirstApplySubmission, setIsFirstApplySubmission] = useState(true);

//   // Fetch existing UTR data on component mount
//   useEffect(() => {
//     fetchUTRData();
//   }, []);

//   const fetchUTRData = async () => {
//     try {
//       setIsLoading(true);
//       const response = await showUTRapi();
      
//       if (response.data.success && response.data.data) {
//         const utrData = response.data.data;
//         setFormData({
//           unique_tax_reference: utrData.unique_tax_reference || '',
//           national_insurance: utrData.national_insurance || ''
//         });
//         setHasExistingData(true);
//       } else {
//         setHasExistingData(false);
//       }
//     } catch (error) {
//       console.error('Error fetching UTR data:', error);
//       setHasExistingData(false);
//       // Don't show error toast on initial load if no data exists - user can start fresh
//       if (error.response?.status !== 404) {
//         console.log('No existing UTR data found, starting with empty form');
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleInputChange = (field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value
//     }));
    
//     // Clear errors when user types
//     if (errors[field]) {
//       setErrors(prev => ({
//         ...prev,
//         [field]: null
//       }));
//     }
//   };

//   const handleApplyFormChange = (field, value) => {
//     setApplyForm(prev => ({
//       ...prev,
//       [field]: value
//     }));
    
//     // Clear apply form errors when user types
//     if (applyErrors[field]) {
//       setApplyErrors(prev => ({
//         ...prev,
//         [field]: null
//       }));
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};
    
//     if (!formData.unique_tax_reference.trim()) {
//       newErrors.unique_tax_reference = 'UTR (Unique Tax Reference) is required';
//     } else if (formData.unique_tax_reference.trim().length !== 10) {
//       newErrors.unique_tax_reference = 'UTR must be exactly 10 digits';
//     } else if (!/^\d+$/.test(formData.unique_tax_reference.trim())) {
//       newErrors.unique_tax_reference = 'UTR must contain only numbers';
//     }
    
//     if (!formData.national_insurance.trim()) {
//       newErrors.national_insurance = 'NI# (National Insurance) is required';
//     } else if (!/^[A-Z]{2}[0-9]{6}[A-Z]$/.test(formData.national_insurance.trim().toUpperCase())) {
//       newErrors.national_insurance = 'NI# format should be like QQ123456C';
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const validateApplyForm = () => {
//     const newApplyErrors = {};
    
//     if (!applyForm.your_name.trim()) {
//       newApplyErrors.your_name = 'Name is required';
//     }
    
//     if (!applyForm.contact_number.trim()) {
//       newApplyErrors.contact_number = 'Contact number is required';
//     }
    
//     if (!applyForm.your_message.trim()) {
//       newApplyErrors.your_message = 'Message is required';
//     }
    
//     setApplyErrors(newApplyErrors);
//     return Object.keys(newApplyErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateForm()) {
//       return;
//     }
    
//     setIsSubmitting(true);
    
//     try {
//       const response = await storeUTRapi({
//         unique_tax_reference: formData.unique_tax_reference.trim(),
//         national_insurance: formData.national_insurance.trim().toUpperCase()
//       });
      
//       if (response.data.success) {
//         toast.success(response.data.message || 'Tax account details saved successfully!');
//         // Refetch data to ensure UI is in sync and update hasExistingData flag
//         await fetchUTRData();
//       } else {
//         toast.error(response.data.message || 'Failed to save tax account details');
//       }
      
//     } catch (error) {
//       console.error('Error saving tax accounts:', error);
      
//       // Handle validation errors from API
//       if (error.response?.data?.errors) {
//         setErrors(error.response.data.errors);
//         toast.error('Please fix the validation errors');
//       } else {
//         toast.error(error.response?.data?.message || 'Failed to save tax account details');
//       }
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleApplySubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateApplyForm()) {
//       return;
//     }
    
//     setIsApplying(true);
    
//     try {
//       const response = await applyUTRapi({
//         your_name: applyForm.your_name.trim(),
//         contact_number: applyForm.contact_number.trim(),
//         your_message: applyForm.your_message.trim()
//       });
      
//       console.log('UTR Apply API Response:', response);
      
//       if (response.data.success) {
//         // Only show toast on first successful submission
//         if (isFirstApplySubmission) {
//           toast.success(response.data.message || 'UTR application submitted successfully! We will contact you soon.');
//           setIsFirstApplySubmission(false);
//         }
        
//         setShowApplyModal(false);
//         setApplyForm({ your_name: '', contact_number: '', your_message: '' });
//         setApplyErrors({}); // Clear apply form errors
        
//         // Check if user already has UTR data
//         if (hasExistingData) {
//           // If user already has data, just show success message - don't suggest placeholder values
//           if (isFirstApplySubmission) {
//             toast.info('Your application has been submitted. Your existing UTR details remain unchanged.');
//           }
//         } else {
//           // Only suggest placeholder values if user doesn't have existing data
//           if (isFirstApplySubmission) {
//             toast.info('You can now fill the form with placeholder values (1234567890 for UTR, QQ123456C for NI) or wait for approval.');
//           }
//         }
//       } else {
//         console.log('UTR Apply API Error Response:', response);
//         // toast.error(response.data.message || 'Failed to submit UTR application');
//       }
      
//     } catch (error) {
//       console.error('Error submitting UTR application:', error);
//       console.log('UTR Apply API Error Details:', error.response?.data);
      
//       // Only show toast error on first submission, otherwise just log
//       if (isFirstApplySubmission) {
//         toast.error(error.response?.data?.message || 'Failed to submit UTR application');
//       }
//     } finally {
//       setIsApplying(false);
//     }
//   };

//   const closeModal = () => {
//     if (isApplying) return;
//     setShowApplyModal(false);
//     setApplyForm({ your_name: '', contact_number: '', your_message: '' });
//     setApplyErrors({}); // Clear apply form errors when closing modal
//   };

//   // Show loading skeleton while fetching data
//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-white rounded-2xl">
//         <div className="max-w-7xl mx-auto p-6">
//           <div className="animate-pulse">
//             {/* PageHeader Skeleton */}
//             <div className="mb-8">
//               <div className="flex items-center justify-between mb-4">
//                 <div className="flex items-center gap-4">
//                   <div className="w-14 h-14 bg-blue-100 rounded-xl animate-pulse"></div>
//                   <div className="space-y-2">
//                     <div className="h-8 bg-gray-200 rounded w-64 animate-pulse"></div>
//                     <div className="h-5 bg-gray-200 rounded w-48 animate-pulse"></div>
//                   </div>
//                 </div>
//               </div>
//               <div className="h-4 bg-gray-200 rounded w-96 animate-pulse"></div>
//             </div>
            
//             <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
//               <div className="bg-blue-50 px-6 py-4">
//                 <div className="h-6 bg-blue-200 rounded w-1/4 animate-pulse"></div>
//               </div>
//               <div className="p-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div className="space-y-2">
//                     <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse"></div>
//                     <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
//                   </div>
//                   <div className="space-y-2">
//                     <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse"></div>
//                     <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
//                   </div>
//                 </div>
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
//         <PageHeader
//           icon={<FiFileText />}
//           title="Tax Accounts"
//           currentPage="Tax Accounts"
//           showTradingYear={false}
//           subtitle={
//             hasExistingData 
//               ? "Your UTR and National Insurance details are saved. You can update them if needed." 
//               : "Fill your Unique Tax Reference and National Insurance. If you don't have UTR or NI number, please put '1234567890' in UTR and 'QQ123456C' in NI#."
//           }
//         />

//         <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
//           {/* Header with Apply Button */}
//           <div className="bg-blue-50 px-6 py-4 rounded-t-2xl">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <div className="p-2 bg-white/80 rounded-lg">
//                   <FiFileText className="w-6 h-6 text-blue-700" />
//                 </div>
//                 <div>
//                   <h2 className="text-xl font-semibold text-blue-900">
//                     Tax Account Details
//                     {hasExistingData && <span className="ml-2 text-sm text-green-600 font-normal">(Saved)</span>}
//                   </h2>
//                   <p className="text-blue-700 text-sm mt-1">
//                     {hasExistingData 
//                       ? "Your UTR details are saved. You can update them or apply for new request."
//                       : "Fill your UTR and National Insurance details or apply if you don't have them yet."
//                     }
//                   </p>
//                 </div>
//               </div>
//               <button
//                 onClick={() => setShowApplyModal(true)}
//                 className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-lg cursor-pointer hover:bg-red-600 transition-colors shadow-sm"
//               >
//                 Do not have UTR? APPLY HERE
//               </button>
//             </div>
//           </div>

//           {/* Form */}
//           <div className="p-6">
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* UTR Field */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     UTR (Unique Tax Reference) <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     value={formData.unique_tax_reference}
//                     onChange={(e) => handleInputChange('unique_tax_reference', e.target.value)}
//                     placeholder="1234567890"
//                     maxLength={10}
//                     className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
//                       errors.unique_tax_reference 
//                         ? 'border-red-500 focus:ring-red-500' 
//                         : 'border-gray-300'
//                     }`}
//                   />
//                   {errors.unique_tax_reference && (
//                     <p className="mt-1 text-sm text-red-600">{errors.unique_tax_reference}</p>
//                   )}
//                 </div>

//                 {/* NI# Field */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     NI# (National Insurance) <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     value={formData.national_insurance}
//                     onChange={(e) => handleInputChange('national_insurance', e.target.value.toUpperCase())}
//                     placeholder="QQ123456C"
//                     maxLength={9}
//                     className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
//                       errors.national_insurance 
//                         ? 'border-red-500 focus:ring-red-500' 
//                         : 'border-gray-300'
//                     }`}
//                   />
//                   {errors.national_insurance && (
//                     <p className="mt-1 text-sm text-red-600">{errors.national_insurance}</p>
//                   )}
//                 </div>
//               </div>

//               {/* Submit Button */}
//               <div className="flex justify-end pt-4">
//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="px-8 cursor-pointer py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                       {hasExistingData ? 'Updating...' : 'Saving...'}
//                     </>
//                   ) : (
//                     hasExistingData ? 'Update' : 'Submit'
//                   )}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>

//       {/* Apply for UTR Modal */}
//       {showApplyModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-3 sm:p-4">
//           <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] shadow-2xl overflow-hidden">
//             {/* Modal Header - Compact */}
//             <div className="flex items-center justify-between px-4 py-3 sm:px-5 sm:py-4 border-b border-gray-200">
//               <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
//                 {hasExistingData ? 'Apply for New UTR Request' : 'Apply for UTR'}
//               </h3>
//               <button
//                 onClick={closeModal}
//                 disabled={isApplying}
//                 className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50 p-1 rounded-full hover:bg-gray-100 cursor-pointer"
//               >
//                 <FiX className="w-5 h-5" />
//               </button>
//             </div>

//             {/* Modal Body - Scrollable & Compact */}
//             <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
//               <div className="px-4 py-4 sm:px-5 sm:py-5">
//                 <div className="mb-4">
//                   {hasExistingData ? (
//                     <>
//                       <p className="text-gray-600 text-sm mb-2">
//                         You already have UTR details saved. This form is to submit a new application or request.
//                       </p>
//                       <p className="text-gray-600 text-sm">
//                         Fill the form below to submit your new request.
//                       </p>
//                     </>
//                   ) : (
//                     <>
//                       <p className="text-gray-600 text-sm mb-2">
//                         If you do not have UTR number, don't worry! We are here to help you with your UTR number.
//                       </p>
//                       <p className="text-gray-600 text-sm">
//                         Fill the form as all fields are required and press the apply button.
//                       </p>
//                     </>
//                   )}
//                 </div>

//                 <form onSubmit={handleApplySubmit} className="space-y-4">
//                   {/* Name and Contact Number - Responsive Grid */}
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
//                     {/* Name Field */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                         Your Name <span className="text-red-500">*</span>
//                       </label>
//                       <div className="relative">
//                         <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                         <input
//                           type="text"
//                           value={applyForm.your_name}
//                           onChange={(e) => handleApplyFormChange('your_name', e.target.value)}
//                           placeholder="Mr Muhammad Asaf Account"
//                           className={`w-full pl-10 pr-3 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
//                             applyErrors.your_name 
//                               ? 'border-red-500 focus:ring-red-500' 
//                               : 'border-gray-300'
//                           }`}
//                           required
//                         />
//                       </div>
//                       {applyErrors.your_name && (
//                         <p className="mt-1 text-sm text-red-600">{applyErrors.your_name}</p>
//                       )}
//                     </div>

//                     {/* Contact Number Field */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                         Contact Number <span className="text-red-500">*</span>
//                       </label>
//                       <div className="relative">
//                         <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                         <input
//                           type="tel"
//                           value={applyForm.contact_number}
//                           onChange={(e) => handleApplyFormChange('contact_number', e.target.value)}
//                           placeholder="22424242424"
//                           className={`w-full pl-10 pr-3 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
//                             applyErrors.contact_number 
//                               ? 'border-red-500 focus:ring-red-500' 
//                               : 'border-gray-300'
//                           }`}
//                           required
//                         />
//                       </div>
//                       {applyErrors.contact_number && (
//                         <p className="mt-1 text-sm text-red-600">{applyErrors.contact_number}</p>
//                       )}
//                     </div>
//                   </div>

//                   {/* Message Field - Full Width & Compact */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                       Your Message <span className="text-red-500">*</span>
//                     </label>
//                     <div className="relative">
//                       <FiMessageSquare className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
//                       <textarea
//                         value={applyForm.your_message}
//                         onChange={(e) => handleApplyFormChange('your_message', e.target.value)}
//                         placeholder="Please type your message here"
//                         rows={4}
//                         className={`w-full pl-10 pr-3 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-colors ${
//                           applyErrors.your_message 
//                             ? 'border-red-500 focus:ring-red-500' 
//                             : 'border-gray-300'
//                         }`}
//                         required
//                       />
//                     </div>
//                     {applyErrors.your_message && (
//                       <p className="mt-1 text-sm text-red-600">{applyErrors.your_message}</p>
//                     )}
//                   </div>
//                 </form>
//               </div>
//             </div>

//             {/* Modal Footer - Compact */}
//             <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 px-4 py-3 sm:px-5 sm:py-4 border-t border-gray-200 bg-gray-50">
//               <button
//                 type="button"
//                 onClick={closeModal}
//                 disabled={isApplying}
//                 className="w-full sm:w-auto px-4 py-2.5 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 cursor-pointer"
//               >
//                 Close
//               </button>
//               <button
//                 type="submit"
//                 onClick={handleApplySubmit}
//                 disabled={isApplying}
//                 className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
//               >
//                 {isApplying ? (
//                   <>
//                     <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                     Applying...
//                   </>
//                 ) : (
//                   'Apply'
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UTR;











import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiUser, FiPhone, FiMessageSquare, FiX, FiFileText, FiCheck } from 'react-icons/fi';
import PageHeader from '../../components/PageHeader';
import { useTradingYear } from '../../context/TradingYearContext';
import { applyUTRapi, storeUTRapi, showUTRapi } from '../../services/dashboard'; // Adjust path as needed

const UTR = () => {
  const navigate = useNavigate();
  const { activeTradingYear } = useTradingYear();
  
  // Form states
  const [formData, setFormData] = useState({
    unique_tax_reference: '',
    national_insurance: ''
  });
  
  // Track if user has existing UTR data
  const [hasExistingData, setHasExistingData] = useState(false);
  
  // Track if user has applied (simple boolean)
  const [hasAppliedBefore, setHasAppliedBefore] = useState(false);
  
  // Modal states
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [applyForm, setApplyForm] = useState({
    your_name: '',
    contact_number: '',
    your_message: ''
  });
  
  // Loading states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState({});
  
  // Apply form errors (separate from main form errors)
  const [applyErrors, setApplyErrors] = useState({});

  // Fetch existing UTR data on component mount
  useEffect(() => {
    fetchUTRData();
  }, []);

  const fetchUTRData = async () => {
    try {
      setIsLoading(true);
      const response = await showUTRapi();
      
      if (response.data.success && response.data.data) {
        const utrData = response.data.data;
        setFormData({
          unique_tax_reference: utrData.unique_tax_reference || '',
          national_insurance: utrData.national_insurance || ''
        });
        setHasExistingData(true);
      } else {
        setHasExistingData(false);
      }
    } catch (error) {
      console.error('Error fetching UTR data:', error);
      setHasExistingData(false);
      if (error.response?.status !== 404) {
        console.log('No existing UTR data found, starting with empty form');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Check localStorage to see if user has applied before
  useEffect(() => {
    const appliedBefore = localStorage.getItem('utr_applied');
    if (appliedBefore === 'true') {
      setHasAppliedBefore(true);
    }
  }, []);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear errors when user types
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  const handleApplyFormChange = (field, value) => {
    setApplyForm(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear apply form errors when user types
    if (applyErrors[field]) {
      setApplyErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.unique_tax_reference.trim()) {
      newErrors.unique_tax_reference = 'UTR (Unique Tax Reference) is required';
    } else if (formData.unique_tax_reference.trim().length !== 10) {
      newErrors.unique_tax_reference = 'UTR must be exactly 10 digits';
    } else if (!/^\d+$/.test(formData.unique_tax_reference.trim())) {
      newErrors.unique_tax_reference = 'UTR must contain only numbers';
    }
    
    if (!formData.national_insurance.trim()) {
      newErrors.national_insurance = 'NI# (National Insurance) is required';
    } else if (!/^[A-Z]{2}[0-9]{6}[A-Z]$/.test(formData.national_insurance.trim().toUpperCase())) {
      newErrors.national_insurance = 'NI# format should be like QQ123456C';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateApplyForm = () => {
    const newApplyErrors = {};
    
    if (!applyForm.your_name.trim()) {
      newApplyErrors.your_name = 'Name is required';
    }
    
    if (!applyForm.contact_number.trim()) {
      newApplyErrors.contact_number = 'Contact number is required';
    }
    
    if (!applyForm.your_message.trim()) {
      newApplyErrors.your_message = 'Message is required';
    }
    
    setApplyErrors(newApplyErrors);
    return Object.keys(newApplyErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await storeUTRapi({
        unique_tax_reference: formData.unique_tax_reference.trim(),
        national_insurance: formData.national_insurance.trim().toUpperCase()
      });
      
      if (response.data.success) {
        toast.success(response.data.message || 'Tax account details saved successfully!');
        // Refetch data to ensure UI is in sync and update hasExistingData flag
        await fetchUTRData();
      } else {
        toast.error(response.data.message || 'Failed to save tax account details');
      }
      
    } catch (error) {
      console.error('Error saving tax accounts:', error);
      
      // Handle validation errors from API
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
        toast.error('Please fix the validation errors');
      } else {
        toast.error(error.response?.data?.message || 'Failed to save tax account details');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleApplySubmit = async (e) => {
    e.preventDefault();
    
    if (!validateApplyForm()) {
      return;
    }
    
    setIsApplying(true);
    
    try {
      const response = await applyUTRapi({
        your_name: applyForm.your_name.trim(),
        contact_number: applyForm.contact_number.trim(),
        your_message: applyForm.your_message.trim()
      });
      
      console.log('UTR Apply API Response:', response);
      
      if (response.data.success) {
        // Show success message only for first time application
        if (!hasAppliedBefore) {
          toast.success(response.data.message || 'UTR application submitted successfully! We will contact you soon.');
          
          // Mark as applied in localStorage
          localStorage.setItem('utr_applied', 'true');
          setHasAppliedBefore(true);
          
          // Additional info for users without existing data
          if (!hasExistingData) {
            setTimeout(() => {
              toast.info('You can now fill the form with placeholder values (1234567890 for UTR, QQ123456C for NI) or wait for approval.');
            }, 1000);
          }
        }
        
        setShowApplyModal(false);
        setApplyForm({ your_name: '', contact_number: '', your_message: '' });
        setApplyErrors({});
        
      } else {
        console.log('UTR Apply API Error Response:', response);
        toast.error(response.data.message || 'Failed to submit UTR application');
      }
      
    } catch (error) {
      console.error('Error submitting UTR application:', error);
      console.log('UTR Apply API Error Details:', error.response?.data);
      
      // Check if error is because user already applied
      if (error.response?.status === 409 || error.response?.data?.message?.includes('already applied')) {
        toast.error('You have already submitted a UTR application. Please wait for approval.');
        // Mark as applied in localStorage
        localStorage.setItem('utr_applied', 'true');
        setHasAppliedBefore(true);
      } else {
        // Only show error toast for new applications
        if (!hasAppliedBefore) {
          toast.error(error.response?.data?.message || 'Failed to submit UTR application');
        }
      }
    } finally {
      setIsApplying(false);
    }
  };

  const closeModal = () => {
    if (isApplying) return;
    setShowApplyModal(false);
    setApplyForm({ your_name: '', contact_number: '', your_message: '' });
    setApplyErrors({});
  };

  const getApplicationStatusText = () => {
    if (!hasAppliedBefore) return null;
    return 'Applied';
  };

  const getApplicationStatusColor = () => {
    return 'text-green-600 bg-green-50';
  };

  // Show loading skeleton while fetching data
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white rounded-2xl">
        <div className="max-w-7xl mx-auto p-6">
          <div className="animate-pulse">
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
            
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-blue-50 px-6 py-4">
                <div className="h-6 bg-blue-200 rounded w-1/4 animate-pulse"></div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse"></div>
                    <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse"></div>
                    <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white rounded-2xl">
      <div className="max-w-7xl mx-auto p-6">
        <PageHeader
          icon={<FiFileText />}
          title="Tax Accounts"
          currentPage="Tax Accounts"
          showTradingYear={false}
          subtitle={
            hasExistingData 
              ? "Your UTR and National Insurance details are saved. You can update them if needed." 
              : "Fill your Unique Tax Reference and National Insurance. If you don't have UTR or NI number, please put '1234567890' in UTR and 'QQ123456C' in NI#."
          }
        />

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Header with Apply Button */}
          <div className="bg-blue-50 px-6 py-4 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/80 rounded-lg">
                  <FiFileText className="w-6 h-6 text-blue-700" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-blue-900">
                    Tax Account Details
                    {hasExistingData && <span className="ml-2 text-sm text-green-600 font-normal">(Saved)</span>}
                  </h2>
                  <p className="text-blue-700 text-sm mt-1">
                    {hasExistingData 
                      ? "Your UTR details are saved. You can update them or apply for new request."
                      : "Fill your UTR and National Insurance details or apply if you don't have them yet."
                    }
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                {/* Application Status Badge */}
                {hasAppliedBefore && (
                  <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${getApplicationStatusColor()}`}>
                    <FiCheck className="w-4 h-4" />
                    <span>{getApplicationStatusText()}</span>
                  </div>
                )}
                
                {/* Apply Button */}
                <button
                  onClick={() => setShowApplyModal(true)}
                  disabled={hasAppliedBefore}
                  className={`px-4 py-2 text-white text-sm font-medium rounded-lg transition-colors shadow-sm ${
                    hasAppliedBefore
                      ? 'bg-gray-400 cursor-not-allowed opacity-60'
                      : 'bg-red-500 hover:bg-red-600 cursor-pointer'
                  }`}
                  title={hasAppliedBefore ? 'You have already applied for UTR' : 'Apply for UTR if you don\'t have one'}
                >
                  {hasAppliedBefore ? (
                    <div className="flex items-center gap-2">
                      <FiCheck className="w-4 h-4" />
                      Applied
                    </div>
                  ) : (
                    'Do not have UTR? APPLY HERE'
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* UTR Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    UTR (Unique Tax Reference) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.unique_tax_reference}
                    onChange={(e) => handleInputChange('unique_tax_reference', e.target.value)}
                    placeholder="1234567890"
                    maxLength={10}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      errors.unique_tax_reference 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-gray-300'
                    }`}
                  />
                  {errors.unique_tax_reference && (
                    <p className="mt-1 text-sm text-red-600">{errors.unique_tax_reference}</p>
                  )}
                </div>

                {/* NI# Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    NI# (National Insurance) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.national_insurance}
                    onChange={(e) => handleInputChange('national_insurance', e.target.value.toUpperCase())}
                    placeholder="QQ123456C"
                    maxLength={9}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      errors.national_insurance 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-gray-300'
                    }`}
                  />
                  {errors.national_insurance && (
                    <p className="mt-1 text-sm text-red-600">{errors.national_insurance}</p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 cursor-pointer py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      {hasExistingData ? 'Updating...' : 'Saving...'}
                    </>
                  ) : (
                    hasExistingData ? 'Update' : 'Submit'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Apply for UTR Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-3 sm:p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-4 py-3 sm:px-5 sm:py-4 border-b border-gray-200">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                Apply for UTR
              </h3>
              <button
                onClick={closeModal}
                disabled={isApplying}
                className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50 p-1 rounded-full hover:bg-gray-100 cursor-pointer"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="px-4 py-4 sm:px-5 sm:py-5">
                <div className="mb-4">
                  <p className="text-gray-600 text-sm mb-2">
                    If you do not have UTR number, don't worry! We are here to help you with your UTR number.
                  </p>
                  <p className="text-gray-600 text-sm">
                    Fill the form as all fields are required and press the apply button.
                  </p>
                </div>

                <form onSubmit={handleApplySubmit} className="space-y-4">
                  {/* Name and Contact Number */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {/* Name Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          type="text"
                          value={applyForm.your_name}
                          onChange={(e) => handleApplyFormChange('your_name', e.target.value)}
                          placeholder="Mr Muhammad Asaf Account"
                          className={`w-full pl-10 pr-3 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                            applyErrors.your_name 
                              ? 'border-red-500 focus:ring-red-500' 
                              : 'border-gray-300'
                          }`}
                          required
                        />
                      </div>
                      {applyErrors.your_name && (
                        <p className="mt-1 text-sm text-red-600">{applyErrors.your_name}</p>
                      )}
                    </div>

                    {/* Contact Number Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Contact Number <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          type="tel"
                          value={applyForm.contact_number}
                          onChange={(e) => handleApplyFormChange('contact_number', e.target.value)}
                          placeholder="22424242424"
                          className={`w-full pl-10 pr-3 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                            applyErrors.contact_number 
                              ? 'border-red-500 focus:ring-red-500' 
                              : 'border-gray-300'
                          }`}
                          required
                        />
                      </div>
                      {applyErrors.contact_number && (
                        <p className="mt-1 text-sm text-red-600">{applyErrors.contact_number}</p>
                      )}
                    </div>
                  </div>

                  {/* Message Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Your Message <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FiMessageSquare className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                      <textarea
                        value={applyForm.your_message}
                        onChange={(e) => handleApplyFormChange('your_message', e.target.value)}
                        placeholder="Please type your message here"
                        rows={4}
                        className={`w-full pl-10 pr-3 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-colors ${
                          applyErrors.your_message 
                            ? 'border-red-500 focus:ring-red-500' 
                            : 'border-gray-300'
                        }`}
                        required
                      />
                    </div>
                    {applyErrors.your_message && (
                      <p className="mt-1 text-sm text-red-600">{applyErrors.your_message}</p>
                    )}
                  </div>
                </form>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 px-4 py-3 sm:px-5 sm:py-4 border-t border-gray-200 bg-gray-50">
              <button
                type="button"
                onClick={closeModal}
                disabled={isApplying}
                className="w-full sm:w-auto px-4 py-2.5 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 cursor-pointer"
              >
                Close
              </button>
              <button
                type="submit"
                onClick={handleApplySubmit}
                disabled={isApplying}
                className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
              >
                {isApplying ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Applying...
                  </>
                ) : (
                  'Apply'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UTR;