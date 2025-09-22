import { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { registerApi } from "../services/authService";
import toast from "react-hot-toast";



const Signup = () => {
  // Function to format date into "D Month YYYY"
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });
  };

  // State management for form data and validation
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    year_start: "2025-04-06",
    year_end: "2026-04-05",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
    user_type: "",
  });


  // Password visibility toggling
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();


// Form field change handler
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.first_name.trim())
      newErrors.first_name = "First Name is required";
    if (!formData.last_name.trim())
      newErrors.last_name = "Last Name is required";
    if (!formData.user_type)
      newErrors.user_type = "Please select an account type";

    if (!formData.year_start)
      newErrors.year_start = "Trading Year Start Date is required";
    if (!formData.year_end)
      newErrors.year_end = "Trading Year End Date is required";
    if (
      formData.year_start &&
      formData.year_end &&
      new Date(formData.year_end) < new Date(formData.year_start)
    ) {
      newErrors.year_end = "End date cannot be before start date";
    }
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/.test(formData.email))
      newErrors.email = "Enter a valid email address";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Please confirm your password";
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!formData.terms)
      newErrors.terms = "You must agree to the terms & conditions";
    return newErrors;
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    setErrors(newErrors);

    
    if (Object.keys(newErrors).length === 0) {
      if (isSubmitting) return;
      setIsSubmitting(true);
      try {
        const response = await registerApi(formData);
        if (response.data.success) {
          toast.success(response.data.message || "Signup successful!");
          console.log(formData)
          setFormData({
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            confirmPassword: "",
            terms: false,
            user_type: "personal",
            year_start: formData.year_start,
            year_end: formData.year_end,
          });
          navigate("/login");
        } else {
          const apiErrors = response.data.errors || {};
          setErrors(apiErrors);
          toast.error("Please fix the highlighted errors.");
        }
      } catch (error) {
        console.error("Signup Failed:", error);
        toast.error(error.response?.data?.message || "Signup failed!");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-6 py-12 sm:px-8">
      <section className="w-full max-w-2xl bg-white shadow-lg rounded-3xl p-10 sm:p-12 border border-gray-200">
        <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-2 tracking-tight">
          Create Your Account
        </h2>
        <p className="text-center text-gray-500 mb-8 font-medium">
          Register a new membership, all fields are mandatory.
        </p>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="space-y-6"
          aria-label="Signup Form"
        >
          {/* First & Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {["first_name", "last_name"].map((field, idx) => (
              <div key={field}>
                <label
                  htmlFor={field}
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  {field.replace("_", " ").toUpperCase()}
                </label>
                <div
                  className={`flex items-center rounded-lg border px-4 py-3 transition-colors duration-200 focus-within:ring-2 focus-within:ring-blue-500 ${
                    errors[field] ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <FaUser className="text-gray-400 mr-3" aria-hidden="true" />
                  <input
                    id={field}
                    name={field}
                    type="text"
                    placeholder={
                      field === "first_name" ? "First Name" : "Last Name"
                    }
                    value={formData[field]}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent outline-none text-gray-900 placeholder-gray-400"
                  />
                </div>
                {errors[field] && (
                  <p className="mt-1 text-xs text-red-600" role="alert">
                    {errors[field]}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* User Type */}
          <div>
            <label
              htmlFor="user_type"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Account Type
            </label>
            <div
              className={`flex items-center rounded-lg border px-4 py-3 transition-colors duration-200 focus-within:ring-2 focus-within:ring-blue-500 ${
                errors.user_type ? "border-red-500" : "border-gray-300"
              }`}
            >
              <FaUser className="text-gray-400 mr-3" aria-hidden="true" />
              <select
                id="user_type"
                name="user_type"
                value={formData.user_type}
                onChange={handleChange}
                className="w-full bg-transparent outline-none text-gray-900 cursor-pointer"
              >
                <option value="">Select Account Type</option>{" "}
                {/* Placeholder */}
                <option value="personal">Personal</option>
                <option value="business">Business</option>
              </select>
            </div>
            {errors.user_type && (
              <p className="mt-1 text-xs text-red-600" role="alert">
                {errors.user_type}
              </p>
            )}
          </div>

          {/* Trading Year Start & End */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {["year_start", "year_end"].map((field) => (
              <div key={field}>
                <label
                  htmlFor={field}
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  {field === "year_start"
                    ? "Trading Year Start Date"
                    : "Trading Year End Date"}
                </label>
                <input
                  id={field}
                  name={field}
                  type="text"
                  value={formatDate(formData[field])}
                  readOnly
                  className={`w-full rounded-lg border px-4 py-3 outline-none text-gray-900 bg-gray-100 placeholder-gray-400 cursor-not-allowed ${
                    errors[field] ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors[field] && (
                  <p className="mt-1 text-xs text-red-600" role="alert">
                    {errors[field]}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Email Address
            </label>
            <div
              className={`flex items-center rounded-lg border px-4 py-3 transition-colors duration-200 focus-within:ring-2 focus-within:ring-blue-500 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            >
              <FaEnvelope className="text-gray-400 mr-3" aria-hidden="true" />
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-transparent outline-none text-gray-900 placeholder-gray-400"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-xs text-red-600" role="alert">
                {errors.email}
              </p>
            )}
          </div>

          {/* Password & Confirm Password */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {["password", "confirmPassword"].map((field) => (
              <div key={field}>
                <label
                  htmlFor={field}
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  {field === "password" ? "Password" : "Confirm Password"}
                </label>
                <div
                  className={`flex items-center rounded-lg border px-4 py-3 transition-colors duration-200 focus-within:ring-2 focus-within:ring-blue-500 ${
                    errors[field] ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <FaLock className="text-gray-400 mr-3" aria-hidden="true" />
                  <input
                    id={field}
                    name={field}
                    type={
                      field === "password"
                        ? showPassword
                          ? "text"
                          : "password"
                        : showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="••••••••"
                    value={formData[field]}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent outline-none text-gray-900 placeholder-gray-400"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      field === "password"
                        ? setShowPassword(!showPassword)
                        : setShowConfirmPassword(!showConfirmPassword)
                    }
                    aria-label={
                      field === "password"
                        ? showPassword
                          ? "Hide password"
                          : "Show password"
                        : showConfirmPassword
                        ? "Hide password"
                        : "Show password"
                    }
                    className="text-gray-400 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded ml-3"
                  >
                    {field === "password" ? (
                      showPassword ? (
                        <FaEyeSlash size={20} />
                      ) : (
                        <FaEye size={20} />
                      )
                    ) : showConfirmPassword ? (
                      <FaEyeSlash size={20} />
                    ) : (
                      <FaEye size={20} />
                    )}
                  </button>
                </div>
                {errors[field] && (
                  <p className="mt-1 text-xs text-red-600" role="alert">
                    {errors[field]}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Terms */}
          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              checked={formData.terms}
              onChange={handleChange}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label
              htmlFor="terms"
              className="ml-2 block text-sm text-gray-900 select-none"
            >
              I agree to the{" "}
              <Link
                to="/terms"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                terms & conditions
              </Link>
            </label>
          </div>
          {errors.terms && (
            <p className="mt-1 text-xs text-red-600" role="alert">
              {errors.terms}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 rounded-xl font-semibold text-white transition-colors duration-300 cursor-pointer ${
              isSubmitting
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
            } flex items-center justify-center gap-3`}
          >
            {isSubmitting && (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            )}
            {isSubmitting ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        {/* Login link */}
        <p className="mt-6 text-center text-gray-600 font-medium">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200"
          >
            Login
          </Link>
        </p>

        {/* Social Buttons */}
        <div className="flex items-center my-8 gap-4">
          <hr className="flex-grow border-gray-300" />
          <span className="text-gray-400 font-semibold text-sm">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <button
            aria-label="Sign up with Google"
            className="flex items-center justify-center gap-3 border border-gray-300 rounded-xl py-3 hover:bg-gray-50 transition-colors duration-200"
          >
            <FcGoogle size={22} />
            <span className="text-gray-700 font-semibold">Google</span>
          </button>
          <button
            aria-label="Sign up with Facebook"
            className="flex items-center justify-center gap-3 rounded-xl py-3 bg-blue-700 text-white hover:bg-blue-800 transition-colors duration-200"
          >
            <FaFacebookF size={18} />
            <span className="font-semibold">Facebook</span>
          </button>
        </div>
      </section>
    </main>
  );
};

export default Signup;
