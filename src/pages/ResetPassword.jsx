// // import { useState, useEffect } from "react";
// // import { FaEnvelope, FaLock, FaKey, FaEye, FaEyeSlash } from "react-icons/fa";
// // import { FcGoogle } from "react-icons/fc";
// // import { FaFacebookF } from "react-icons/fa";
// // import {
// //   Link,
// //   useNavigate,
// //   useSearchParams,
// //   useLocation,
// // } from "react-router-dom";
// // import { resetPasswordApi } from "../services/authService";
// // import toast from "react-hot-toast";

// // const ResetPassword = () => {
// //   const [formData, setFormData] = useState({
// //     email: "",
// //     token: "",
// //     password: "",
// //     password_confirmation: "",
// //   });
// //   const [errors, setErrors] = useState({});
// //   const [isSubmitting, setIsSubmitting] = useState(false);
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

// //   const navigate = useNavigate();
// //   const [searchParams] = useSearchParams();
// //   const location = useLocation();

// //   // Get token and email from URL parameters or location state
// //   useEffect(() => {
// //     const token = searchParams.get("token");
// //     const emailFromUrl = searchParams.get("email");
// //     const emailFromState = location.state?.email;

// //     if (token) setFormData((prev) => ({ ...prev, token }));
// //     if (emailFromUrl) setFormData((prev) => ({ ...prev, email: emailFromUrl }));
// //     else if (emailFromState)
// //       setFormData((prev) => ({ ...prev, email: emailFromState }));
// //   }, [searchParams, location.state]);

// //   const validate = () => {
// //     const newErrors = {};

// //     if (!formData.email.trim()) newErrors.email = "Email is required";
// //     else if (!/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/.test(formData.email))
// //       newErrors.email = "Enter a valid email address";

// //     if (!formData.token.trim()) newErrors.token = "Reset token is required";

// //     if (!formData.password.trim()) newErrors.password = "Password is required";
// //     else if (formData.password.length < 8)
// //       newErrors.password = "Password must be at least 8 characters";

// //     if (!formData.password_confirmation.trim())
// //       newErrors.password_confirmation = "Password confirmation is required";
// //     else if (formData.password !== formData.password_confirmation)
// //       newErrors.password_confirmation = "Passwords do not match";

// //     return newErrors;
// //   };

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData((prev) => ({
// //       ...prev,
// //       [name]: value,
// //     }));
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     const newErrors = validate();
// //     setErrors(newErrors);

// //     if (Object.keys(newErrors).length === 0) {
// //       setIsSubmitting(true);

// //       try {
// //         const response = await resetPasswordApi(formData);

// //         // ✅ Handle success
// //         if (response.data?.message) {
// //           toast.success(response.data.message);

// //           setFormData({
// //             email: "",
// //             token: "",
// //             password: "",
// //             password_confirmation: "",
// //           });
// //           setErrors({});

// //            navigate("/login");
// //         }
// //       } catch (error) {
// //         // ✅ Handle error
// //         const backendMessage = error.response?.data?.message;
// //         if (backendMessage) {
// //           toast.error(backendMessage, {
// //             duration: 4000,
// //             position: "top-center",
// //           });
// //           setErrors({ api: backendMessage });
// //         } else {
// //           const fallback = "Something went wrong. Please try again.";
// //           toast.error(fallback, {
// //             duration: 4000,
// //             position: "top-center",
// //           });
// //           setErrors({ api: fallback });
// //         }
// //       } finally {
// //         setIsSubmitting(false);
// //       }
// //     }
// //   };

// //   return (
// //     <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 px-6 py-12 sm:px-8">
// //       <section className="w-full max-w-md bg-white shadow-lg rounded-3xl p-8 border border-gray-200">
// //         <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-4">
// //           Reset Your Password
// //         </h2>
// //         <p className="text-center text-gray-600 mb-8">
// //           Enter your new password below
// //         </p>

// //         {/* API Error Message - Keep for visual feedback too */}
// //         {errors.api && (
// //           <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
// //             <p className="text-red-800 text-sm font-medium text-center">
// //               {errors.api}
// //             </p>
// //           </div>
// //         )}

// //         <form
// //           onSubmit={handleSubmit}
// //           noValidate
// //           className="space-y-6"
// //           aria-label="Reset Password Form"
// //         >
// //           {/* Email */}
// //           <div>
// //             <label
// //               htmlFor="email"
// //               className="block text-sm font-semibold text-gray-700 mb-1"
// //             >
// //               Email Address
// //             </label>
// //             <div
// //               className={`flex items-center rounded-lg border px-4 py-3 transition-colors duration-200 focus-within:ring-2 focus-within:ring-indigo-500 ${
// //                 errors.email ? "border-red-500" : "border-gray-300"
// //               }`}
// //             >
// //               <FaEnvelope className="text-gray-400 mr-3" aria-hidden="true" />
// //               <input
// //                 id="email"
// //                 name="email"
// //                 type="email"
// //                 placeholder="you@example.com"
// //                 value={formData.email}
// //                 onChange={handleChange}
// //                 aria-invalid={errors.email ? "true" : "false"}
// //                 aria-describedby={errors.email ? "email-error" : null}
// //                 required
// //                 className="w-full bg-transparent outline-none text-gray-900 placeholder-gray-400"
// //               />
// //             </div>
// //             {errors.email && (
// //               <p
// //                 id="email-error"
// //                 className="mt-1 text-xs text-red-600"
// //                 role="alert"
// //               >
// //                 {errors.email}
// //               </p>
// //             )}
// //           </div>

// //           {/* Token */}
// //           <div>
// //             <label
// //               htmlFor="token"
// //               className="block text-sm font-semibold text-gray-700 mb-1"
// //             >
// //               Reset Token
// //             </label>
// //             <div
// //               className={`flex items-center rounded-lg border px-4 py-3 transition-colors duration-200 focus-within:ring-2 focus-within:ring-indigo-500 ${
// //                 errors.token ? "border-red-500" : "border-gray-300"
// //               }`}
// //             >
// //               <FaKey className="text-gray-400 mr-3" aria-hidden="true" />
// //               <input
// //                 id="token"
// //                 name="token"
// //                 type="text"
// //                 placeholder="Enter reset token"
// //                 value={formData.token}
// //                 onChange={handleChange}
// //                 aria-invalid={errors.token ? "true" : "false"}
// //                 aria-describedby={errors.token ? "token-error" : null}
// //                 required
// //                 className="w-full bg-transparent outline-none text-gray-900 placeholder-gray-400"
// //               />
// //             </div>
// //             {errors.token && (
// //               <p
// //                 id="token-error"
// //                 className="mt-1 text-xs text-red-600"
// //                 role="alert"
// //               >
// //                 {errors.token}
// //               </p>
// //             )}
// //           </div>

// //           {/* Password */}
// //           <div>
// //             <label
// //               htmlFor="password"
// //               className="block text-sm font-semibold text-gray-700 mb-1"
// //             >
// //               New Password
// //             </label>
// //             <div
// //               className={`flex items-center rounded-lg border px-4 py-3 transition-colors duration-200 focus-within:ring-2 focus-within:ring-indigo-500 ${
// //                 errors.password ? "border-red-500" : "border-gray-300"
// //               }`}
// //             >
// //               <FaLock className="text-gray-400 mr-3" aria-hidden="true" />
// //               <input
// //                 id="password"
// //                 name="password"
// //                 type={showPassword ? "text" : "password"}
// //                 placeholder="Enter new password"
// //                 value={formData.password}
// //                 onChange={handleChange}
// //                 aria-invalid={errors.password ? "true" : "false"}
// //                 aria-describedby={errors.password ? "password-error" : null}
// //                 required
// //                 className="w-full bg-transparent outline-none text-gray-900 placeholder-gray-400"
// //               />
// //               <button
// //                 type="button"
// //                 onClick={() => setShowPassword(!showPassword)}
// //                 className="text-gray-400 hover:text-gray-600 ml-2"
// //                 aria-label={showPassword ? "Hide password" : "Show password"}
// //               >
// //                 {showPassword ? <FaEyeSlash /> : <FaEye />}
// //               </button>
// //             </div>
// //             {errors.password && (
// //               <p
// //                 id="password-error"
// //                 className="mt-1 text-xs text-red-600"
// //                 role="alert"
// //               >
// //                 {errors.password}
// //               </p>
// //             )}
// //           </div>

// //           {/* Confirm Password */}
// //           <div>
// //             <label
// //               htmlFor="password_confirmation"
// //               className="block text-sm font-semibold text-gray-700 mb-1"
// //             >
// //               Confirm New Password
// //             </label>
// //             <div
// //               className={`flex items-center rounded-lg border px-4 py-3 transition-colors duration-200 focus-within:ring-2 focus-within:ring-indigo-500 ${
// //                 errors.password_confirmation
// //                   ? "border-red-500"
// //                   : "border-gray-300"
// //               }`}
// //             >
// //               <FaLock className="text-gray-400 mr-3" aria-hidden="true" />
// //               <input
// //                 id="password_confirmation"
// //                 name="password_confirmation"
// //                 type={showConfirmPassword ? "text" : "password"}
// //                 placeholder="Confirm new password"
// //                 value={formData.password_confirmation}
// //                 onChange={handleChange}
// //                 aria-invalid={errors.password_confirmation ? "true" : "false"}
// //                 aria-describedby={
// //                   errors.password_confirmation
// //                     ? "password-confirmation-error"
// //                     : null
// //                 }
// //                 required
// //                 className="w-full bg-transparent outline-none text-gray-900 placeholder-gray-400"
// //               />
// //               <button
// //                 type="button"
// //                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
// //                 className="text-gray-400 hover:text-gray-600 ml-2"
// //                 aria-label={
// //                   showConfirmPassword ? "Hide password" : "Show password"
// //                 }
// //               >
// //                 {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
// //               </button>
// //             </div>
// //             {errors.password_confirmation && (
// //               <p
// //                 id="password-confirmation-error"
// //                 className="mt-1 text-xs text-red-600"
// //                 role="alert"
// //               >
// //                 {errors.password_confirmation}
// //               </p>
// //             )}
// //           </div>

// //           {/* Submit */}
// //           <button
// //             type="submit"
// //             disabled={isSubmitting}
// //             className={`w-full py-3 rounded-xl font-semibold text-white transition-colors duration-300 ${
// //               isSubmitting
// //                 ? "bg-indigo-400 cursor-not-allowed"
// //                 : "bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300"
// //             } flex items-center justify-center gap-3`}
// //           >
// //             {isSubmitting ? "Resetting Password..." : "Reset Password"}
// //           </button>
// //         </form>

// //         {/* OR divider */}
// //         <div className="flex items-center my-8 gap-4">
// //           <hr className="flex-grow border-gray-300" />
// //           <span className="text-gray-400 font-semibold text-sm">- OR -</span>
// //           <hr className="flex-grow border-gray-300" />
// //         </div>

// //         {/* Social buttons */}
// //         <div className="grid grid-cols-2 gap-4 mb-6">
// //           <button
// //             aria-label="Google"
// //             className="flex items-center justify-center gap-3 border border-gray-300 rounded-xl py-3 hover:bg-gray-50 transition-colors duration-200"
// //           >
// //             <FcGoogle size={22} />
// //             <span className="text-gray-700 font-semibold">Google</span>
// //           </button>
// //           <button
// //             aria-label="Facebook"
// //             className="flex items-center justify-center gap-3 rounded-xl py-3 bg-blue-700 text-white hover:bg-blue-800 transition-colors duration-200"
// //           >
// //             <FaFacebookF size={18} />
// //             <span className="font-semibold">Facebook</span>
// //           </button>
// //         </div>

// //         {/* Login link */}
// //         <p className="text-center text-gray-600 font-medium">
// //           Remember your password?{" "}
// //           <Link
// //             to="/login"
// //             className="text-indigo-600 hover:text-indigo-800 font-semibold transition-colors duration-200"
// //           >
// //             Login
// //           </Link>
// //         </p>
// //       </section>
// //     </main>
// //   );
// // };

// // export default ResetPassword;





























// import { useState, useEffect } from "react";
// import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
// import { Link, useNavigate, useSearchParams } from "react-router-dom";
// import { resetPasswordApi } from "../services/authService";
// import toast from 'react-hot-toast';

// const ResetPassword = () => {
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
  
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();
  
//   // Get token and email from URL parameters
//   const token = searchParams.get('token');
//   const email = searchParams.get('email');

//   // Redirect if token or email is missing
//   useEffect(() => {
//     if (!token || !email) {
//       toast.error("Invalid reset link. Please try again.", {
//         duration: 4000,
//         position: 'top-center',
//       });
//       navigate("/forgot-password");
//     }
//   }, [token, email, navigate]);

//   const validate = () => {
//     const newErrors = {};
    
//     if (!password.trim()) {
//       newErrors.password = "Password is required";
//     } else if (password.length < 8) {
//       newErrors.password = "Password must be at least 8 characters";
//     }

//     if (!confirmPassword.trim()) {
//       newErrors.confirmPassword = "Confirm password is required";
//     } else if (password !== confirmPassword) {
//       newErrors.confirmPassword = "Passwords do not match";
//     }

//     return newErrors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const newErrors = validate();
//     setErrors(newErrors);
    
//     if (Object.keys(newErrors).length === 0) {
//       setIsSubmitting(true);
      
//       try {
//         const response = await resetPasswordApi({
//           token,
//           email,
//           password,
//           password_confirmation: confirmPassword
//         });

//         if (response.data.success) {
//           // Show success toast
//           toast.success(response.data.message || "Password reset successfully!", {
//             duration: 4000,
//             position: 'top-center',
//           });
          
//           // Clear form
//           setPassword("");
//           setConfirmPassword("");
//           setErrors({});
          
//           // Redirect to login page
//           setTimeout(() => {
//             navigate("/login");
//           }, 1500);
//         }
//       } catch (error) {
//         // Handle API errors with toast
//         if (error.response?.data?.message) {
//           toast.error(error.response.data.message, {
//             duration: 4000,
//             position: 'top-center',
//           });
//           setErrors({ api: error.response.data.message });
//         } else if (error.response?.data?.errors) {
//           // Handle validation errors from backend
//           const backendErrors = {};
//           Object.keys(error.response.data.errors).forEach(key => {
//             backendErrors[key] = error.response.data.errors[key][0];
//             // Show toast for each error
//             toast.error(error.response.data.errors[key][0], {
//               duration: 4000,
//               position: 'top-center',
//             });
//           });
//           setErrors(backendErrors);
//         } else {
//           const errorMessage = "Something went wrong. Please try again.";
//           toast.error(errorMessage, {
//             duration: 4000,
//             position: 'top-center',
//           });
//           setErrors({ api: errorMessage });
//         }
//       } finally {
//         setIsSubmitting(false);
//       }
//     }
//   };

//   // Show loading if token/email are being validated
//   if (!token || !email) {
//     return (
//       <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 px-6 py-12 sm:px-8">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Validating reset link...</p>
//         </div>
//       </main>
//     );
//   }

//   return (
//     <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 px-6 py-12 sm:px-8">
//       <section className="w-full max-w-md bg-white shadow-lg rounded-3xl p-8 border border-gray-200">
//         <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-4">
//           Reset Password
//         </h2>
//         <p className="text-center text-gray-600 mb-2">
//           Enter your new password for
//         </p>
//         <p className="text-center text-indigo-600 font-medium mb-8">
//           {email}
//         </p>

//         {/* API Error Message */}
//         {errors.api && (
//           <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
//             <p className="text-red-800 text-sm font-medium text-center">
//               {errors.api}
//             </p>
//           </div>
//         )}

//         <form onSubmit={handleSubmit} noValidate className="space-y-6" aria-label="Reset Password Form">
//           {/* Password */}
//           <div>
//             <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1">
//               New Password
//             </label>
//             <div
//               className={`flex items-center rounded-lg border px-4 py-3 transition-colors duration-200 focus-within:ring-2 focus-within:ring-indigo-500 ${
//                 errors.password ? "border-red-500" : "border-gray-300"
//               }`}
//             >
//               <FaLock className="text-gray-400 mr-3" aria-hidden="true" />
//               <input
//                 id="password"
//                 name="password"
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Enter new password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 aria-invalid={errors.password ? "true" : "false"}
//                 aria-describedby={errors.password ? "password-error" : null}
//                 required
//                 className="w-full bg-transparent outline-none text-gray-900 placeholder-gray-400"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="text-gray-400 hover:text-gray-600 ml-2"
//                 aria-label={showPassword ? "Hide password" : "Show password"}
//               >
//                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//               </button>
//             </div>
//             {errors.password && (
//               <p id="password-error" className="mt-1 text-xs text-red-600" role="alert">
//                 {errors.password}
//               </p>
//             )}
//           </div>

//           {/* Confirm Password */}
//           <div>
//             <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-1">
//               Confirm New Password
//             </label>
//             <div
//               className={`flex items-center rounded-lg border px-4 py-3 transition-colors duration-200 focus-within:ring-2 focus-within:ring-indigo-500 ${
//                 errors.confirmPassword ? "border-red-500" : "border-gray-300"
//               }`}
//             >
//               <FaLock className="text-gray-400 mr-3" aria-hidden="true" />
//               <input
//                 id="confirmPassword"
//                 name="confirmPassword"
//                 type={showConfirmPassword ? "text" : "password"}
//                 placeholder="Confirm new password"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 aria-invalid={errors.confirmPassword ? "true" : "false"}
//                 aria-describedby={errors.confirmPassword ? "confirmPassword-error" : null}
//                 required
//                 className="w-full bg-transparent outline-none text-gray-900 placeholder-gray-400"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                 className="text-gray-400 hover:text-gray-600 ml-2"
//                 aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
//               >
//                 {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
//               </button>
//             </div>
//             {errors.confirmPassword && (
//               <p id="confirmPassword-error" className="mt-1 text-xs text-red-600" role="alert">
//                 {errors.confirmPassword}
//               </p>
//             )}
//           </div>

//           {/* Submit */}
//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className={`w-full py-3 rounded-xl font-semibold text-white transition-colors duration-300 ${
//               isSubmitting
//                 ? "bg-indigo-400 cursor-not-allowed"
//                 : "bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300"
//             } flex items-center justify-center gap-3`}
//           >
//             {isSubmitting ? "Resetting..." : "Reset Password"}
//           </button>
//         </form>

//         {/* Back to Login */}
//         <div className="mt-8 text-center">
//           <p className="text-gray-600 font-medium">
//             Remember your password?{" "}
//             <Link
//               to="/login"
//               className="text-indigo-600 hover:text-indigo-800 font-semibold transition-colors duration-200"
//             >
//               Back to Login
//             </Link>
//           </p>
//         </div>
//       </section>
//     </main>
//   );
// };

// export default ResetPassword;
































import { useState, useEffect } from "react";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { resetPasswordApi } from "../services/authService";
import toast from 'react-hot-toast';

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Get token and email from URL parameters
  const token = searchParams.get('token');
  const email = searchParams.get('email');
  console.log('email : ',email)

  // Redirect if token or email is missing
  useEffect(() => {
    if (!token || !email) {
      toast.error("Invalid reset link. Please try again.", {
        duration: 4000,
        position: 'top-center',
      });
      navigate("/forgot-password");
    }
  }, [token, email, navigate]);

  const validate = () => {
    const newErrors = {};
    
    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      
      try {
        const response = await resetPasswordApi({
          token,
          email,
          password,
          password_confirmation: confirmPassword
        });

        console.log(response)
        if (response.data && response.data.message) {
          // Show success toast
          toast.success(response.data.message || "Password reset successfully!");
          
          // Clear form
          setPassword("");
          setConfirmPassword("");
          setErrors({});
          
          // Redirect to login page
        
            navigate("/login");
        }
      } catch (error) {
        // Handle API errors with toast
        if (error.response?.data?.message) {
          toast.error(error.response.data.message, {
            duration: 4000,
            position: 'top-center',
          });
          setErrors({ api: error.response.data.message });
        } else if (error.response?.data?.errors) {
          // Handle validation errors from backend
          const backendErrors = {};
          Object.keys(error.response.data.errors).forEach(key => {
            backendErrors[key] = error.response.data.errors[key][0];
            // Show toast for each error
            toast.error(error.response.data.errors[key][0], {
              duration: 4000,
              position: 'top-center',
            });
          });
          setErrors(backendErrors);
        } else {
          const errorMessage = "Something went wrong. Please try again.";
          toast.error(errorMessage, {
            duration: 4000,
            position: 'top-center',
          });
          setErrors({ api: errorMessage });
        }
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Show loading if token/email are being validated
  if (!token || !email) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 px-6 py-12 sm:px-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Validating reset link...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 px-6 py-12 sm:px-8">
      <section className="w-full max-w-md bg-white shadow-lg rounded-3xl p-8 border border-gray-200">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-4">
          Reset Password
        </h2>
        <p className="text-center text-gray-600 mb-2">
          Enter your new password for
        </p>
        <p className="text-center text-indigo-600 font-medium mb-8">
          {email}
        </p>

        {/* API Error Message */}
        {/* {errors.api && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 text-sm font-medium text-center">
              {errors.api}
            </p>
          </div>
        )} */}

        <form onSubmit={handleSubmit} noValidate className="space-y-6" aria-label="Reset Password Form">
          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1">
              New Password
            </label>
            <div
              className={`flex items-center rounded-lg border px-4 py-3 transition-colors duration-200 focus-within:ring-2 focus-within:ring-indigo-500 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            >
              <FaLock className="text-gray-400 mr-3" aria-hidden="true" />
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-invalid={errors.password ? "true" : "false"}
                aria-describedby={errors.password ? "password-error" : null}
                required
                className="w-full bg-transparent outline-none text-gray-900 placeholder-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-gray-600 ml-2"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <p id="password-error" className="mt-1 text-xs text-red-600" role="alert">
                {errors.password}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-1">
              Confirm New Password
            </label>
            <div
              className={`flex items-center rounded-lg border px-4 py-3 transition-colors duration-200 focus-within:ring-2 focus-within:ring-indigo-500 ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              }`}
            >
              <FaLock className="text-gray-400 mr-3" aria-hidden="true" />
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                aria-invalid={errors.confirmPassword ? "true" : "false"}
                aria-describedby={errors.confirmPassword ? "confirmPassword-error" : null}
                required
                className="w-full bg-transparent outline-none text-gray-900 placeholder-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="text-gray-400 hover:text-gray-600 ml-2"
                aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p id="confirmPassword-error" className="mt-1 text-xs text-red-600" role="alert">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 rounded-xl font-semibold text-white transition-colors duration-300 ${
              isSubmitting
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300"
            } flex items-center justify-center gap-3`}
          >
            {isSubmitting ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        {/* Back to Login */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 font-medium">
            Remember your password?{" "}
            <Link
              to="/login"
              className="text-indigo-600 hover:text-indigo-800 font-semibold transition-colors duration-200"
            >
              Back to Login
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default ResetPassword;