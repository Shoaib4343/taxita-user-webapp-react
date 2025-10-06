// import React, { useState, useEffect } from "react";
// import { FaTimes, FaTrash, FaFileInvoice, FaEdit, FaSave, FaWallet, FaCreditCard, FaFileInvoiceDollar, FaCar } from "react-icons/fa";
// import toast from "react-hot-toast";
// import { getTransactionsApi, deleteTransactionApi, updateTransactionApi } from "../services/dashboard";
// import { showDeleteConfirmation, showSuccessAlert, showErrorAlert } from "../components/SweetAlert2Confirmation";
// import CustomDropdown from "./CustomDropdown";
// import { PoundSterlingIcon } from "lucide-react";

// // Static list of income accounts/cards
// const incomeData = [
//   { id: 1, title: "Cash Account", icon: FaWallet, color: "bg-emerald-500" },
//   { id: 2, title: "Card Account", icon: FaCreditCard, color: "bg-blue-500" },
//   {
//     id: 3,
//     title: "Contract Account",
//     icon: PoundSterlingIcon,
//     color: "bg-purple-500",
//   },
//   {
//     id: 4,
//     title: "Sub Contract Account",
//     icon: FaFileInvoice,
//     color: "bg-yellow-500",
//   },
//   { id: 5, title: "Vehicle rental income", icon: FaCar, color: "bg-red-500" },
// ];

// const IncomeTransactionsModal = ({ open, onClose, selectedDay, onTransactionDeleted }) => {
//   const [visible, setVisible] = useState(false);
//   const [transactions, setTransactions] = useState([]);
//   const [deleteLoading, setDeleteLoading] = useState({});
//   const [updateLoading, setUpdateLoading] = useState({});
//   const [editingTransaction, setEditingTransaction] = useState(null);
//   const [editForm, setEditForm] = useState({
//     account_id: '',
//     amount: '',
//     transaction_type: 'credit',
//     transaction_date: '',
//     description: '',
//     attachment: null
//   });

//   useEffect(() => {
//     if (open) {
//       setVisible(true);
//       if (selectedDay) {
//         fetchTransactions();
//       }
//     } else {
//       const timer = setTimeout(() => setVisible(false), 300);
//       return () => clearTimeout(timer);
//     }
//   }, [open, selectedDay]);

//   const formatDateForApi = (dateString) => {
//     // Convert from YYYY-MM-DD to YYYY-M-D format as required by your API
//     const date = new Date(dateString);
//     const year = date.getFullYear();
//     const month = date.getMonth() + 1; // No zero padding
//     const day = date.getDate(); // No zero padding
//     return `${year}-${month}-${day}`;
//   };

//   const fetchTransactions = async () => {
//     if (!selectedDay?.date) return;

//     try {
//       const apiFormattedDate = formatDateForApi(selectedDay.date);
      
//       const response = await getTransactionsApi({
//         transaction_date: apiFormattedDate,
//         transaction_type: "credit"
//       });

//       console.log("API Response:", response.data);

//       if (response.data && response.data.success) {
//         setTransactions(response.data.data || []);
//       } else {
//         setTransactions([]);
//       }
//     } catch (error) {
//       console.error("Error fetching transactions:", error);
//       toast.error(error.response?.data?.message || "No transactions found for the selected date");
//       setTransactions([]);
//     }
//   };

//   const handleDeleteTransaction = async (transactionId) => {
//     if (deleteLoading[transactionId]) return;

//     try {
//       const result = await showDeleteConfirmation(
//         "Delete Transaction",
//         "Are you sure you want to delete this income transaction? This action cannot be undone."
//       );

//       if (!result.isConfirmed) return;

//       setDeleteLoading(prev => ({ ...prev, [transactionId]: true }));

//       const response = await deleteTransactionApi(transactionId);
      
//       if (response.data && response.data.success) {
//         setTransactions(prev => prev.filter(t => t.id !== transactionId));
//         if (onTransactionDeleted) {
//           onTransactionDeleted();
//         }
//         await showSuccessAlert("Deleted!", "Transaction has been deleted successfully.");
//       } else {
//         throw new Error(response.data?.message || "Failed to delete transaction");
//       }
//     } catch (error) {
//       console.error("Error deleting transaction:", error);
//       await showErrorAlert(
//         "Delete Failed",
//         error.response?.data?.message || error.message || "Failed to delete transaction"
//       );
//     } finally {
//       setDeleteLoading(prev => ({ ...prev, [transactionId]: false }));
//     }
//   };

//   const handleEditTransaction = (transaction) => {
//     setEditingTransaction(transaction.id);
//     setEditForm({
//       account_id: transaction.account_id || '',
//       amount: transaction.credit || transaction.amount || '',
//       transaction_type: 'credit',
//       transaction_date: transaction.transaction_date || '',
//       description: transaction.description || '',
//       attachment: null
//     });
//   };

//   const handleCancelEdit = () => {
//     setEditingTransaction(null);
//     setEditForm({
//       account_id: '',
//       amount: '',
//       transaction_type: 'credit',
//       transaction_date: '',
//       description: '',
//       attachment: null
//     });
//   };

//   const handleUpdateTransaction = async (transactionId) => {
//     if (updateLoading[transactionId]) return;

//     try {
//       if (!editForm.account_id || !editForm.amount) {
//         toast.error("Please fill in all required fields");
//         return;
//       }

//       if (parseFloat(editForm.amount) <= 0) {
//         toast.error("Amount must be greater than 0");
//         return;
//       }

//       setUpdateLoading(prev => ({ ...prev, [transactionId]: true }));

//       const formattedDate = editForm.transaction_date ? 
//         new Date(editForm.transaction_date).toISOString().split('T')[0] : 
//         new Date().toISOString().split('T')[0];

//       const formData = new FormData();
//       formData.append('account_id', editForm.account_id);
//       formData.append('amount', parseFloat(editForm.amount).toFixed(2));
//       formData.append('transaction_type', editForm.transaction_type);
//       formData.append('transaction_date', formattedDate);
//       formData.append('description', editForm.description || '');
      
//       if (editForm.attachment) {
//         formData.append('attachment', editForm.attachment);
//       }

//       const response = await updateTransactionApi(transactionId, formData);
      
//       if (response.data && response.data.success) {
//         await fetchTransactions();
//         handleCancelEdit();
//         if (onTransactionDeleted) {
//           onTransactionDeleted();
//         }
//         // Show success alert after all operations are complete and loading is cleared
//         await showSuccessAlert("Updated!", "Transaction has been updated successfully.");
//       } else {
//         throw new Error(response.data?.message || "Failed to update transaction");
//       }
//     } catch (error) {
//       console.error("Error updating transaction:", error);
      
//       let errorMessage = "Failed to update transaction";
      
//       if (error.response?.status === 500) {
//         errorMessage = "Server error occurred. Please contact support.";
//       } else if (error.response?.status === 422) {
//         errorMessage = "Invalid data provided. Please check your inputs.";
//       } else if (error.response?.status === 404) {
//         errorMessage = "Transaction not found.";
//       } else if (error.response?.data?.message) {
//         errorMessage = error.response.data.message;
//       } else if (error.message) {
//         errorMessage = error.message;
//       }
      
//       await showErrorAlert("Update Failed", errorMessage);
//     } finally {
//       setUpdateLoading(prev => ({ ...prev, [transactionId]: false }));
//     }
//   };

//   const formatDate = (dateString) => {
//     try {
//       return new Date(dateString).toLocaleDateString('en-GB', {
//         day: '2-digit',
//         month: 'short',
//         year: 'numeric'
//       });
//     } catch {
//       return dateString;
//     }
//   };

//   const getIncomeTypeDisplay = (accountId, accountType) => {
//     const accountMap = {
//       1: "Cash Account",
//       2: "Card Account", 
//       3: "Contract Account",
//       4: "Sub Contract Account",
//       5: "Vehicle rental income"
//     };
//     return accountMap[accountId] || accountType || "Unknown";
//   };

//   const handleFormChange = (field, value) => {
//     setEditForm(prev => ({ ...prev, [field]: value }));
//   };

//   if (!visible) return null;

//   return (
//     <div
//       className={`fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
//         open ? "opacity-100" : "opacity-0"
//       }`}
//     >
//       <div
//         className={`bg-white rounded-2xl w-full max-w-5xl h-[85vh] flex flex-col relative shadow-2xl transform transition-all duration-300 mx-4 ${
//           open ? "scale-100 translate-y-0" : "scale-95 translate-y-6"
//         }`}
//       >
//         {/* Header */}
//         <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-2xl flex-shrink-0">
//           <div>
//             <h2 className="text-xl font-semibold text-gray-900">
//               Income Transactions
//             </h2>
//             <p className="text-sm text-gray-600 mt-1">
//               Showing income added on {selectedDay ? formatDate(selectedDay.date) : ''}
//             </p>
//           </div>
//           <button
//             className="text-gray-400 hover:text-gray-700 transition-colors p-2 rounded-full hover:bg-gray-100"
//             onClick={onClose}
//           >
//             <FaTimes size={18} />
//           </button>
//         </div>

//         {/* Content - Fixed Height Container */}
//         <div className="flex-1 overflow-hidden flex flex-col min-h-0">
//           {/* Table Header - Always Visible */}
//           <div className="bg-blue-100 text-blue-600 border-blue-200 flex-shrink-0">
//             <div className="grid grid-cols-12 gap-3 px-6 py-4 text-sm font-medium">
//               <div className="col-span-1">S.No</div>
//               <div className="col-span-3">Income Type</div>
//               <div className="col-span-2">Amount</div>
//               <div className="col-span-4">Description</div>
//               <div className="col-span-2">Actions</div>
//             </div>
//           </div>

//           {/* Table Body - Scrollable with Fixed Height */}
//           <div className="flex-1 overflow-y-auto min-h-0">
//             {transactions.length > 0 ? (
//               <div className="divide-y divide-gray-100">
//                 {transactions.map((transaction, index) => (
//                   <div key={transaction.id} className="hover:bg-gray-50/50 transition-colors">
//                     {editingTransaction === transaction.id ? (
//                       // Edit Row
//                       <div className="grid grid-cols-12 gap-3 px-6 py-4 bg-blue-50/50 border-l-4 border-blue-500">
//                         <div className="col-span-1 flex items-center text-gray-900 font-medium">
//                           {index + 1}
//                         </div>
                        
//                         {/* Account Type Dropdown */}
//                         <div className="col-span-3 flex items-center">
//                           <CustomDropdown
//                             name="account_id"
//                             value={editForm.account_id}
//                             onChange={(e) => handleFormChange('account_id', e.target.value)}
//                             options={incomeData.map(account => account.id)}
//                             placeholder="Select Account"
//                             displayFormatter={(id) => {
//                               const account = incomeData.find(acc => acc.id === id);
//                               return account ? account.title : 'Unknown';
//                             }}
//                             className="text-sm z-[60]"
//                             containerClassName="z-[60]"
//                             dropdownClassName="z-[70]"
//                             maxHeight="200px"
//                             showSearch={false}
//                           />
//                         </div>
                        
//                         {/* Amount Input */}
//                         <div className="col-span-2 flex items-center">
//                           <div className="relative w-full">
//                             <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">£</span>
//                             <input
//                               type="number"
//                               step="0.01"
//                               value={editForm.amount}
//                               onChange={(e) => handleFormChange('amount', e.target.value)}
//                               className="w-full pl-8 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                               placeholder="0.00"
//                               required
//                             />
//                           </div>
//                         </div>
                        
//                         {/* Description Input */}
//                         <div className="col-span-4 flex items-center">
//                           <input
//                             type="text"
//                             value={editForm.description}
//                             onChange={(e) => handleFormChange('description', e.target.value)}
//                             className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                             placeholder="Enter description..."
//                           />
//                         </div>
                        
//                         {/* Action Buttons */}
//                         <div className="col-span-2 flex items-center gap-2">
//                           <button
//                             onClick={() => handleUpdateTransaction(transaction.id)}
//                             disabled={updateLoading[transaction.id]}
//                             className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                           >
//                             {updateLoading[transaction.id] ? (
//                               <>
//                                 <div className="animate-spin rounded-full h-3 w-3 border border-white border-t-transparent"></div>
//                                 <span>Saving...</span>
//                               </>
//                             ) : (
//                               <>
//                                 <FaSave className="w-3 h-3" />
//                                 <span>Save</span>
//                               </>
//                             )}
//                           </button>
                          
//                           <button
//                             onClick={handleCancelEdit}
//                             className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
//                           >
//                             <FaTimes className="w-3 h-3" />
//                             <span>Cancel</span>
//                           </button>
//                         </div>
//                       </div>
//                     ) : (
//                       // Display Row
//                       <div className="grid grid-cols-12 gap-3 px-6 py-4 text-sm">
//                         <div className="col-span-1 flex items-center text-gray-900 font-medium">
//                           {index + 1}
//                         </div>
//                         <div className="col-span-3 flex items-center text-gray-900">
//                           <div className="flex items-center gap-2">
//                             {(() => {
//                               const account = incomeData.find(acc => acc.id === transaction.account_id);
//                               const IconComponent = account?.icon;
//                               return (
//                                 <>
//                                   {IconComponent && (
//                                     <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs ${account.color}`}>
//                                       <IconComponent className="w-3 h-3" />
//                                     </div>
//                                   )}
//                                   <span>{getIncomeTypeDisplay(transaction.account_id, transaction.account_type)}</span>
//                                 </>
//                               );
//                             })()}
//                           </div>
//                         </div>
//                         <div className="col-span-2 flex items-center text-gray-900 font-semibold">
//                           £{Number(transaction.credit || transaction.amount || 0).toFixed(2)}
//                         </div>
//                         <div className="col-span-4 flex items-center text-gray-600">
//                           <span className="truncate">{transaction.description || 'No description'}</span>
//                         </div>
//                         <div className="col-span-2 flex items-center gap-2">
//                           <button
//                             onClick={() => handleEditTransaction(transaction)}
//                             className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-green-600 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
//                             title="Edit transaction"
//                           >
//                             <FaEdit className="w-3 h-3" />
//                             <span>Edit</span>
//                           </button>
                          
//                           <button
//                             onClick={() => handleDeleteTransaction(transaction.id)}
//                             disabled={deleteLoading[transaction.id]}
//                             className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                             title="Delete transaction"
//                           >
//                             {deleteLoading[transaction.id] ? (
//                               <>
//                                 <div className="animate-spin rounded-full h-3 w-3 border border-red-600 border-t-transparent"></div>
//                                 <span>Deleting...</span>
//                               </>
//                             ) : (
//                               <>
//                                 <FaTrash className="w-3 h-3" />
//                                 <span>Delete</span>
//                               </>
//                             )}
//                           </button>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               // Empty State - Takes Full Available Space
//               <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
//                 <div className="bg-gray-100 rounded-full p-6 mb-4 mt-4">
//                   <FaFileInvoice className="w-12 h-12 text-gray-400" />
//                 </div>
//                 <h3 className="text-lg font-medium text-gray-900 mb-2 ">No Income Found</h3>
//                 <p className="text-gray-500">No income transactions were posted on this date.</p>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Footer - Always Visible */}
//         <div className="p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl flex justify-between items-center flex-shrink-0">
//           <div className="text-sm text-gray-600">
//             {transactions.length > 0 && (
//               <span>Total: {transactions.length} transaction{transactions.length !== 1 ? 's' : ''}</span>
//             )}
//           </div>
//           <button
//             onClick={onClose}
//             className="px-6 py-2.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default IncomeTransactionsModal;







































































































































import React, { useState, useEffect } from "react";
import { FaTimes, FaTrash, FaFileInvoice, FaEdit, FaSave, FaWallet, FaCreditCard, FaFileInvoiceDollar, FaCar } from "react-icons/fa";
import { PoundSterlingIcon } from "lucide-react";
import toast from "react-hot-toast";
import { getTransactionsApi, deleteTransactionApi, updateTransactionApi } from "../services/dashboard";
import { showDeleteConfirmation, showSuccessAlert, showErrorAlert } from "../components/SweetAlert2Confirmation";
import CustomDropdown from "./CustomDropdown";
import { useAccounts } from "../context/AccountsContext";
import { LoadingState, ErrorState } from "../components/skeletons/Skeleton";

// Icon components mapping
const iconComponents = {
  FaWallet,
  FaCreditCard,
  FaFileInvoice,
  FaCar,
  PoundSterlingIcon,
};

const IncomeTransactionsModal = ({ 
  open, 
  onClose, 
  selectedDay, 
  onTransactionDeleted,
  refreshTrigger,
  apiRefreshTrigger 
}) => {
  const [visible, setVisible] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [deleteLoading, setDeleteLoading] = useState({});
  const [updateLoading, setUpdateLoading] = useState({});
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editForm, setEditForm] = useState({
    account_id: '',
    amount: '',
    transaction_type: 'credit',
    transaction_date: '',
    description: '',
    attachment: null
  });

  // Get income accounts from context
  const { incomeAccounts, loading: accountsLoading } = useAccounts();

  useEffect(() => {
    if (open) {
      setVisible(true);
      if (selectedDay) {
        fetchTransactions();
      }
    } else {
      const timer = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [open, selectedDay]);

  // Refetch transactions when refresh triggers change
  useEffect(() => {
    if (open && selectedDay && (refreshTrigger > 0 || apiRefreshTrigger > 0)) {
      fetchTransactions();
    }
  }, [refreshTrigger, apiRefreshTrigger]);

  const formatDateForApi = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month}-${day}`;
  };

  const fetchTransactions = async () => {
    if (!selectedDay?.date) return;

    try {
      setLoading(true);
      const apiFormattedDate = formatDateForApi(selectedDay.date);
      
      const response = await getTransactionsApi({
        transaction_date: apiFormattedDate,
        transaction_type: "credit"
      });

      console.log("API Response:", response.data);

      if (response.data && response.data.success) {
        setTransactions(response.data.data || []);
      } else {
        setTransactions([]);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
      toast.error(error.response?.data?.message || "No transactions found for the selected date");
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTransaction = async (transactionId) => {
    if (deleteLoading[transactionId]) return;

    try {
      const result = await showDeleteConfirmation(
        "Delete Transaction",
        "Are you sure you want to delete this income transaction? This action cannot be undone."
      );

      if (!result.isConfirmed) return;

      setDeleteLoading(prev => ({ ...prev, [transactionId]: true }));

      const response = await deleteTransactionApi(transactionId);
      
      if (response.data && response.data.success) {
        setTransactions(prev => prev.filter(t => t.id !== transactionId));
        if (onTransactionDeleted) {
          onTransactionDeleted();
        }
        await showSuccessAlert("Deleted!", "Transaction has been deleted successfully.");
      } else {
        throw new Error(response.data?.message || "Failed to delete transaction");
      }
    } catch (error) {
      console.error("Error deleting transaction:", error);
      await showErrorAlert(
        "Delete Failed",
        error.response?.data?.message || error.message || "Failed to delete transaction"
      );
    } finally {
      setDeleteLoading(prev => ({ ...prev, [transactionId]: false }));
    }
  };

  const handleEditTransaction = (transaction) => {
    setEditingTransaction(transaction.id);
    setEditForm({
      account_id: transaction.account_id || '',
      amount: transaction.credit || transaction.amount || '',
      transaction_type: 'credit',
      transaction_date: transaction.transaction_date || '',
      description: transaction.description || '',
      attachment: null
    });
  };

  const handleCancelEdit = () => {
    setEditingTransaction(null);
    setEditForm({
      account_id: '',
      amount: '',
      transaction_type: 'credit',
      transaction_date: '',
      description: '',
      attachment: null
    });
  };

  const handleUpdateTransaction = async (transactionId) => {
    if (updateLoading[transactionId]) return;

    try {
      if (!editForm.account_id || !editForm.amount) {
        toast.error("Please fill in all required fields");
        return;
      }

      if (parseFloat(editForm.amount) <= 0) {
        toast.error("Amount must be greater than 0");
        return;
      }

      setUpdateLoading(prev => ({ ...prev, [transactionId]: true }));

      const formattedDate = editForm.transaction_date ? 
        new Date(editForm.transaction_date).toISOString().split('T')[0] : 
        new Date().toISOString().split('T')[0];

      const formData = new FormData();
      formData.append('account_id', editForm.account_id);
      formData.append('amount', parseFloat(editForm.amount).toFixed(2));
      formData.append('transaction_type', editForm.transaction_type);
      formData.append('transaction_date', formattedDate);
      formData.append('description', editForm.description || '');
      
      if (editForm.attachment) {
        formData.append('attachment', editForm.attachment);
      }

      const response = await updateTransactionApi(transactionId, formData);
      
      if (response.data && response.data.success) {
        await fetchTransactions();
        handleCancelEdit();
        if (onTransactionDeleted) {
          onTransactionDeleted();
        }
        await showSuccessAlert("Updated!", "Transaction has been updated successfully.");
      } else {
        throw new Error(response.data?.message || "Failed to update transaction");
      }
    } catch (error) {
      console.error("Error updating transaction:", error);
      
      let errorMessage = "Failed to update transaction";
      
      if (error.response?.status === 500) {
        errorMessage = "Server error occurred. Please contact support.";
      } else if (error.response?.status === 422) {
        errorMessage = "Invalid data provided. Please check your inputs.";
      } else if (error.response?.status === 404) {
        errorMessage = "Transaction not found.";
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      await showErrorAlert("Update Failed", errorMessage);
    } finally {
      setUpdateLoading(prev => ({ ...prev, [transactionId]: false }));
    }
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const getIncomeAccount = (accountId) => {
    return incomeAccounts.find(account => account.id === parseInt(accountId));
  };

  const getIncomeTypeDisplay = (accountId, accountType) => {
    const account = getIncomeAccount(accountId);
    return account ? account.title : (accountType || "Unknown Account");
  };

  const handleFormChange = (field, value) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
  };

  const handleRetry = () => {
    fetchTransactions();
  };

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
        open ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`bg-white rounded-2xl w-full max-w-5xl h-[85vh] flex flex-col relative shadow-2xl transform transition-all duration-300 mx-4 ${
          open ? "scale-100 translate-y-0" : "scale-95 translate-y-6"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-2xl flex-shrink-0">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Income Transactions
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Showing income added on {selectedDay ? formatDate(selectedDay.date) : ''}
            </p>
          </div>
          <button
            className="text-gray-400 hover:text-gray-700 transition-colors p-2 rounded-full hover:bg-gray-100 cursor-pointer"
            onClick={onClose}
          >
            <FaTimes size={18} />
          </button>
        </div>

        {/* Content - Fixed Height Container */}
        <div className="flex-1 overflow-hidden flex flex-col min-h-0">
          {/* Table Header - Always Visible */}
          <div className="bg-blue-100 text-blue-600 border-blue-200 flex-shrink-0">
            <div className="grid grid-cols-12 gap-3 px-6 py-4 text-sm font-medium">
              <div className="col-span-1">S.No</div>
              <div className="col-span-3">Income Type</div>
              <div className="col-span-2">Amount</div>
              <div className="col-span-4">Description</div>
              <div className="col-span-2">Actions</div>
            </div>
          </div>

          {/* Table Body - Scrollable with Fixed Height */}
          <div className="flex-1 overflow-y-auto min-h-0">
            {loading ? (
              // Skeleton Loading State
              <div className="divide-y divide-gray-100">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="grid grid-cols-12 gap-3 px-6 py-4 animate-pulse">
                    <div className="col-span-1 flex items-center">
                      <div className="w-6 h-4 bg-gray-200 rounded"></div>
                    </div>
                    <div className="col-span-3 flex items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                        <div className="w-24 h-4 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                    <div className="col-span-2 flex items-center">
                      <div className="w-16 h-4 bg-gray-200 rounded"></div>
                    </div>
                    <div className="col-span-4 flex items-center">
                      <div className="w-32 h-4 bg-gray-200 rounded"></div>
                    </div>
                    <div className="col-span-2 flex items-center gap-2">
                      <div className="w-12 h-6 bg-gray-200 rounded"></div>
                      <div className="w-14 h-6 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : transactions.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {transactions.map((transaction, index) => (
                  <div key={transaction.id} className="hover:bg-gray-50/50 transition-colors">
                    {editingTransaction === transaction.id ? (
                      // Edit Row
                      <div className="grid grid-cols-12 gap-3 px-6 py-4 bg-blue-50/50 border-l-4 border-blue-500">
                        <div className="col-span-1 flex items-center text-gray-900 font-medium">
                          {index + 1}
                        </div>
                        
                        {/* Account Type Dropdown */}
                        <div className="col-span-3 flex items-center">
                          <CustomDropdown
                            name="account_id"
                            value={editForm.account_id}
                            onChange={(e) => handleFormChange('account_id', e.target.value)}
                            options={incomeAccounts.map(account => account.id)}
                            placeholder="Select Account"
                            displayFormatter={(id) => {
                              const account = incomeAccounts.find(acc => acc.id === id);
                              return account ? account.title : 'Unknown';
                            }}
                            className="text-sm z-[60]"
                            containerClassName="z-[60]"
                            dropdownClassName="z-[70]"
                            maxHeight="200px"
                            showSearch={false}
                          />
                        </div>
                        
                        {/* Amount Input */}
                        <div className="col-span-2 flex items-center">
                          <div className="relative w-full">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">£</span>
                            <input
                              type="number"
                              step="0.01"
                              value={editForm.amount}
                              onChange={(e) => handleFormChange('amount', e.target.value)}
                              className="w-full pl-8 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="0.00"
                              required
                            />
                          </div>
                        </div>
                        
                        {/* Description Input */}
                        <div className="col-span-4 flex items-center">
                          <input
                            type="text"
                            value={editForm.description}
                            onChange={(e) => handleFormChange('description', e.target.value)}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter description..."
                          />
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="col-span-2 flex items-center gap-2">
                          <button
                            onClick={() => handleUpdateTransaction(transaction.id)}
                            disabled={updateLoading[transaction.id]}
                            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                          >
                            {updateLoading[transaction.id] ? (
                              <>
                                <div className="animate-spin rounded-full h-3 w-3 border border-white border-t-transparent"></div>
                                <span>Saving...</span>
                              </>
                            ) : (
                              <>
                                <FaSave className="w-3 h-3" />
                                <span>Save</span>
                              </>
                            )}
                          </button>
                          
                          <button
                            onClick={handleCancelEdit}
                            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
                          >
                            <FaTimes className="w-3 h-3" />
                            <span>Cancel</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      // Display Row
                      <div className="grid grid-cols-12 gap-3 px-6 py-4 text-sm">
                        <div className="col-span-1 flex items-center text-gray-900 font-medium">
                          {index + 1}
                        </div>
                        <div className="col-span-3 flex items-center text-gray-900">
                          <div className="flex items-center gap-2">
                            {(() => {
                              const account = getIncomeAccount(transaction.account_id);
                              if (account) {
                                const IconComponent = iconComponents[account.iconName];
                                return (
                                  <>
                                    {IconComponent && (
                                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs ${account.color}`}>
                                        <IconComponent className="w-3 h-3" />
                                      </div>
                                    )}
                                    <span>{account.title}</span>
                                  </>
                                );
                              }
                              return <span>{getIncomeTypeDisplay(transaction.account_id, transaction.account_type)}</span>;
                            })()}
                          </div>
                        </div>
                        <div className="col-span-2 flex items-center text-gray-900 font-semibold">
                          £{Number(transaction.credit || transaction.amount || 0).toFixed(2)}
                        </div>
                        <div className="col-span-4 flex items-center text-gray-600">
                          <span className="truncate">{transaction.description || 'No description'}</span>
                        </div>
                        <div className="col-span-2 flex items-center gap-2">
                          <button
                            onClick={() => handleEditTransaction(transaction)}
                            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-green-600 bg-green-50 rounded-lg hover:bg-green-100 transition-colors cursor-pointer"
                            title="Edit transaction"
                          >
                            <FaEdit className="w-3 h-3" />
                            <span>Edit</span>
                          </button>
                          
                          <button
                            onClick={() => handleDeleteTransaction(transaction.id)}
                            disabled={deleteLoading[transaction.id]}
                            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                            title="Delete transaction"
                          >
                            {deleteLoading[transaction.id] ? (
                              <>
                                <div className="animate-spin rounded-full h-3 w-3 border border-red-600 border-t-transparent"></div>
                                <span>Deleting...</span>
                              </>
                            ) : (
                              <>
                                <FaTrash className="w-3 h-3" />
                                <span>Delete</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              // Empty State - Takes Full Available Space
              <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
                <div className="bg-gray-100 rounded-full p-6 mb-4 mt-4">
                  <FaFileInvoice className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Income Added Yet</h3>
                <p className="text-gray-500">No income transactions have been added for this date.</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer - Always Visible */}
        <div className="p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl flex justify-between items-center flex-shrink-0">
          <div className="text-sm text-gray-600">
            {transactions.length > 0 && (
              <span>Total: {transactions.length} transaction{transactions.length !== 1 ? 's' : ''}</span>
            )}
          </div>
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncomeTransactionsModal;