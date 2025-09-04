// import { useState } from "react";
// import { FaEnvelope } from "react-icons/fa";
// import { FcGoogle } from "react-icons/fc";
// import { FaFacebookF } from "react-icons/fa";
// import { Link } from "react-router-dom";

// const ForgotPassword = () => {
//   const [email, setEmail] = useState("");
//   const [terms, setTerms] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const validate = () => {
//     const newErrors = {};
//     if (!email.trim()) newErrors.email = "Email is required";
//     else if (!/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/.test(email))
//       newErrors.email = "Enter a valid email address";

//     if (!terms) newErrors.terms = "You must agree to the terms & conditions";

//     return newErrors;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const newErrors = validate();
//     setErrors(newErrors);
//     if (Object.keys(newErrors).length === 0) {
//       setIsSubmitting(true);
//       // Simulate API call here
//       setTimeout(() => {
//         alert(`Password reset link sent to ${email}`);
//         setIsSubmitting(false);
//       }, 1500);
//     }
//   };

//   return (
//     <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 px-6 py-12 sm:px-8">
//       <section className="w-full max-w-md bg-white shadow-lg rounded-3xl p-8 border border-gray-200">
//         <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-4">
//           Forgot your password?
//         </h2>
//         <p className="text-center text-gray-600 mb-8">
//           Enter your registered email address
//         </p>

//         <form onSubmit={handleSubmit} noValidate className="space-y-6" aria-label="Forgot Password Form">
//           {/* Email */}
//           <div>
//             <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
//               Email Address
//             </label>
//             <div
//               className={`flex items-center rounded-lg border px-4 py-3 transition-colors duration-200 focus-within:ring-2 focus-within:ring-indigo-500 ${
//                 errors.email ? "border-red-500" : "border-gray-300"
//               }`}
//             >
//               <FaEnvelope className="text-gray-400 mr-3" aria-hidden="true" />
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 placeholder="you@example.com"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 aria-invalid={errors.email ? "true" : "false"}
//                 aria-describedby={errors.email ? "email-error" : null}
//                 required
//                 className="w-full bg-transparent outline-none text-gray-900 placeholder-gray-400"
//               />
//             </div>
//             {errors.email && (
//               <p id="email-error" className="mt-1 text-xs text-red-600" role="alert">
//                 {errors.email}
//               </p>
//             )}
//           </div>

//           {/* Terms */}
//           <div className="flex items-center">
//             <input
//               id="terms"
//               name="terms"
//               type="checkbox"
//               checked={terms}
//               onChange={(e) => setTerms(e.target.checked)}
//               aria-invalid={errors.terms ? "true" : "false"}
//               aria-describedby={errors.terms ? "terms-error" : null}
//               className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
//               required
//             />
//             <label htmlFor="terms" className="ml-2 block text-sm text-gray-900 select-none">
//               I agree to the{" "}
//               <Link to="/terms" className="text-indigo-600 hover:text-indigo-800 underline">
//                 terms & conditions
//               </Link>
//             </label>
//           </div>
//           {errors.terms && (
//             <p id="terms-error" className="mt-1 text-xs text-red-600" role="alert">
//               {errors.terms}
//             </p>
//           )}

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
//             {isSubmitting ? "Sending..." : "Send Reset Link"}
//           </button>
//         </form>

//         {/* OR divider */}
//         <div className="flex items-center my-8 gap-4">
//           <hr className="flex-grow border-gray-300" />
//           <span className="text-gray-400 font-semibold text-sm">- OR -</span>
//           <hr className="flex-grow border-gray-300" />
//         </div>

//         {/* Social buttons */}
//         <div className="grid grid-cols-2 gap-4 mb-6">
//           <button
//             aria-label="Google"
//             className="flex items-center justify-center gap-3 border border-gray-300 rounded-xl py-3 hover:bg-gray-50 transition-colors duration-200"
//           >
//             <FcGoogle size={22} />
//             <span className="text-gray-700 font-semibold">Google</span>
//           </button>
//           <button
//             aria-label="Facebook"
//             className="flex items-center justify-center gap-3 rounded-xl py-3 bg-blue-700 text-white hover:bg-blue-800 transition-colors duration-200"
//           >
//             <FaFacebookF size={18} />
//             <span className="font-semibold">Facebook</span>
//           </button>
//         </div>

//         {/* Login link */}
//         <p className="text-center text-gray-600 font-medium">
//           I already have a membership?{" "}
//           <Link
//             to="/login"
//             className="text-indigo-600 hover:text-indigo-800 font-semibold transition-colors duration-200"
//           >
//             Login
//           </Link>
//         </p>
//       </section>
//     </main>
//   );
// };

// export default ForgotPassword;



































// import { useState } from "react";
// import { FaEnvelope } from "react-icons/fa";
// import { FcGoogle } from "react-icons/fc";
// import { FaFacebookF } from "react-icons/fa";
// import { Link, useNavigate } from "react-router-dom";
// import { forgotPasswordApi } from "../services/authService";
// import toast from 'react-hot-toast';

// const ForgotPassword = () => {
//   const [email, setEmail] = useState("");
//   const [terms, setTerms] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
  
//   const navigate = useNavigate();

//   const validate = () => {
//     const newErrors = {};
//     if (!email.trim()) newErrors.email = "Email is required";
//     else if (!/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/.test(email))
//       newErrors.email = "Enter a valid email address";

//     if (!terms) newErrors.terms = "You must agree to the terms & conditions";

//     return newErrors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const newErrors = validate();
//     setErrors(newErrors);
    
//     if (Object.keys(newErrors).length === 0) {
//       setIsSubmitting(true);
      
//       try {
//         const response = await forgotPasswordApi({ email });

//         if (response.data.success) {
//           // Show success toast
//           toast.success(response.data.message || "Password reset email sent successfully!", {
//             duration: 4000,
//             position: 'top-center',
//           });
          
//           // Clear form
//           setEmail("");
//           setTerms(false);
//           setErrors({});
          
//           // Redirect to reset password page after a short delay
//           navigate("/reset-password", {
//             state: { email: email, fromForgotPassword: true }
//           });
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

//   return (
//     <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 px-6 py-12 sm:px-8">
//       <section className="w-full max-w-md bg-white shadow-lg rounded-3xl p-8 border border-gray-200">
//         <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-4">
//           Forgot your password?
//         </h2>
//         <p className="text-center text-gray-600 mb-8">
//           Enter your registered email address
//         </p>

//         {/* API Error Message - Keep for visual feedback too */}
//         {errors.api && (
//           <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
//             <p className="text-red-800 text-sm font-medium text-center">
//               {errors.api}
//             </p>
//           </div>
//         )}

//         <form onSubmit={handleSubmit} noValidate className="space-y-6" aria-label="Forgot Password Form">
//           {/* Email */}
//           <div>
//             <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
//               Email Address
//             </label>
//             <div
//               className={`flex items-center rounded-lg border px-4 py-3 transition-colors duration-200 focus-within:ring-2 focus-within:ring-indigo-500 ${
//                 errors.email ? "border-red-500" : "border-gray-300"
//               }`}
//             >
//               <FaEnvelope className="text-gray-400 mr-3" aria-hidden="true" />
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 placeholder="you@example.com"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 aria-invalid={errors.email ? "true" : "false"}
//                 aria-describedby={errors.email ? "email-error" : null}
//                 required
//                 className="w-full bg-transparent outline-none text-gray-900 placeholder-gray-400"
//               />
//             </div>
//             {errors.email && (
//               <p id="email-error" className="mt-1 text-xs text-red-600" role="alert">
//                 {errors.email}
//               </p>
//             )}
//           </div>

//           {/* Terms */}
//           <div className="flex items-center">
//             <input
//               id="terms"
//               name="terms"
//               type="checkbox"
//               checked={terms}
//               onChange={(e) => setTerms(e.target.checked)}
//               aria-invalid={errors.terms ? "true" : "false"}
//               aria-describedby={errors.terms ? "terms-error" : null}
//               className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
//               required
//             />
//             <label htmlFor="terms" className="ml-2 block text-sm text-gray-900 select-none">
//               I agree to the{" "}
//               <Link to="/terms" className="text-indigo-600 hover:text-indigo-800 underline">
//                 terms & conditions
//               </Link>
//             </label>
//           </div>
//           {errors.terms && (
//             <p id="terms-error" className="mt-1 text-xs text-red-600" role="alert">
//               {errors.terms}
//             </p>
//           )}

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
//             {isSubmitting ? "Sending..." : "Send Reset Link"}
//           </button>
//         </form>

//         {/* OR divider */}
//         <div className="flex items-center my-8 gap-4">
//           <hr className="flex-grow border-gray-300" />
//           <span className="text-gray-400 font-semibold text-sm">- OR -</span>
//           <hr className="flex-grow border-gray-300" />
//         </div>

//         {/* Social buttons */}
//         <div className="grid grid-cols-2 gap-4 mb-6">
//           <button
//             aria-label="Google"
//             className="flex items-center justify-center gap-3 border border-gray-300 rounded-xl py-3 hover:bg-gray-50 transition-colors duration-200"
//           >
//             <FcGoogle size={22} />
//             <span className="text-gray-700 font-semibold">Google</span>
//           </button>
//           <button
//             aria-label="Facebook"
//             className="flex items-center justify-center gap-3 rounded-xl py-3 bg-blue-700 text-white hover:bg-blue-800 transition-colors duration-200"
//           >
//             <FaFacebookF size={18} />
//             <span className="font-semibold">Facebook</span>
//           </button>
//         </div>

//         {/* Login link */}
//         <p className="text-center text-gray-600 font-medium">
//           I already have a membership?{" "}
//           <Link
//             to="/login"
//             className="text-indigo-600 hover:text-indigo-800 font-semibold transition-colors duration-200"
//           >
//             Login
//           </Link>
//         </p>
//       </section>
//     </main>
//   );
// };

// export default ForgotPassword;






































import { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { Link } from "react-router-dom";
import { forgotPasswordApi } from "../services/authService";
import toast from 'react-hot-toast';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [terms, setTerms] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/.test(email))
      newErrors.email = "Enter a valid email address";

    if (!terms) newErrors.terms = "You must agree to the terms & conditions";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      
      try {
        const response = await forgotPasswordApi({ email });

        if (response.data.success) {
          // Show success toast with instructions
          toast.success(response.data.message || "Password reset email sent successfully! Please check your email and click the reset link.", {
            duration: 6000,
            position: 'top-center',
          });
          
          // Clear form
          setEmail("");
          setTerms(false);
          setErrors({});
          
          // DON'T NAVIGATE - Let user click the email link instead
          // The email will contain a link like: yoursite.com/reset-password?token=abc&email=user@email.com
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

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 px-6 py-12 sm:px-8">
      <section className="w-full max-w-md bg-white shadow-lg rounded-3xl p-8 border border-gray-200">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-4">
          Forgot your password?
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Enter your registered email address and we'll send you a reset link
        </p>

        {/* API Error Message */}
        {errors.api && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 text-sm font-medium text-center">
              {errors.api}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-6" aria-label="Forgot Password Form">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
              Email Address
            </label>
            <div
              className={`flex items-center rounded-lg border px-4 py-3 transition-colors duration-200 focus-within:ring-2 focus-within:ring-indigo-500 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            >
              <FaEnvelope className="text-gray-400 mr-3" aria-hidden="true" />
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={errors.email ? "true" : "false"}
                aria-describedby={errors.email ? "email-error" : null}
                required
                className="w-full bg-transparent outline-none text-gray-900 placeholder-gray-400"
              />
            </div>
            {errors.email && (
              <p id="email-error" className="mt-1 text-xs text-red-600" role="alert">
                {errors.email}
              </p>
            )}
          </div>

          {/* Terms */}
          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              checked={terms}
              onChange={(e) => setTerms(e.target.checked)}
              aria-invalid={errors.terms ? "true" : "false"}
              aria-describedby={errors.terms ? "terms-error" : null}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              required
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-900 select-none">
              I agree to the{" "}
              <Link to="/terms" className="text-indigo-600 hover:text-indigo-800 underline">
                terms & conditions
              </Link>
            </label>
          </div>
          {errors.terms && (
            <p id="terms-error" className="mt-1 text-xs text-red-600" role="alert">
              {errors.terms}
            </p>
          )}

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
            {isSubmitting ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {/* OR divider */}
        <div className="flex items-center my-8 gap-4">
          <hr className="flex-grow border-gray-300" />
          <span className="text-gray-400 font-semibold text-sm">- OR -</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Social buttons */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            aria-label="Google"
            className="flex items-center justify-center gap-3 border border-gray-300 rounded-xl py-3 hover:bg-gray-50 transition-colors duration-200"
          >
            <FcGoogle size={22} />
            <span className="text-gray-700 font-semibold">Google</span>
          </button>
          <button
            aria-label="Facebook"
            className="flex items-center justify-center gap-3 rounded-xl py-3 bg-blue-700 text-white hover:bg-blue-800 transition-colors duration-200"
          >
            <FaFacebookF size={18} />
            <span className="font-semibold">Facebook</span>
          </button>
        </div>

        {/* Login link */}
        <p className="text-center text-gray-600 font-medium">
          Remember your password?{" "}
          <Link
            to="/login"
            className="text-indigo-600 hover:text-indigo-800 font-semibold transition-colors duration-200"
          >
            Back to Login
          </Link>
        </p>
      </section>
    </main>
  );
};

export default ForgotPassword;