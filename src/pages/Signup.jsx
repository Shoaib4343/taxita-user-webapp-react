import { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { Link } from "react-router-dom";

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
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    tradingYearStart: "2025-04-06", // stored in ISO format
    tradingYearEnd: "2026-04-05",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First Name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last Name is required";

    if (!formData.tradingYearStart)
      newErrors.tradingYearStart = "Trading Year Start Date is required";
    if (!formData.tradingYearEnd)
      newErrors.tradingYearEnd = "Trading Year End Date is required";

    // Optional: check if end date is after start date
    if (
      formData.tradingYearStart &&
      formData.tradingYearEnd &&
      new Date(formData.tradingYearEnd) < new Date(formData.tradingYearStart)
    ) {
      newErrors.tradingYearEnd = "End date cannot be before start date";
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      // Simulate API call or do your actual signup logic here
      setTimeout(() => {
        console.log("Signup Data:", formData);
        setIsSubmitting(false);
      }, 1500);
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
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                First Name
              </label>
              <div
                className={`flex items-center rounded-lg border px-4 py-3 transition-colors duration-200 focus-within:ring-2 focus-within:ring-blue-500 ${
                  errors.firstName ? "border-red-500" : "border-gray-300"
                }`}
              >
                <FaUser className="text-gray-400 mr-3" aria-hidden="true" />
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                  aria-invalid={errors.firstName ? "true" : "false"}
                  aria-describedby={errors.firstName ? "firstName-error" : null}
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent outline-none text-gray-900 placeholder-gray-400"
                />
              </div>
              {errors.firstName && (
                <p
                  id="firstName-error"
                  className="mt-1 text-xs text-red-600"
                  role="alert"
                >
                  {errors.firstName}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                Last Name
              </label>
              <div
                className={`flex items-center rounded-lg border px-4 py-3 transition-colors duration-200 focus-within:ring-2 focus-within:ring-blue-500 ${
                  errors.lastName ? "border-red-500" : "border-gray-300"
                }`}
              >
                <FaUser className="text-gray-400 mr-3" aria-hidden="true" />
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  aria-invalid={errors.lastName ? "true" : "false"}
                  aria-describedby={errors.lastName ? "lastName-error" : null}
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent outline-none text-gray-900 placeholder-gray-400"
                />
              </div>
              {errors.lastName && (
                <p
                  id="lastName-error"
                  className="mt-1 text-xs text-red-600"
                  role="alert"
                >
                  {errors.lastName}
                </p>
              )}
            </div>
          </div>

          {/* Trading Year Start & End */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="tradingYearStart"
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                Trading Year Start Date
              </label>
              <input
                id="tradingYearStart"
                name="tradingYearStart"
                type="text"
                value={formatDate(formData.tradingYearStart)} // shows "6 April 2025"
                readOnly
                onChange={handleChange}
                aria-invalid={errors.tradingYearStart ? "true" : "false"}
                aria-describedby={
                  errors.tradingYearStart ? "tradingYearStart-error" : null
                }
                required
                // className={`w-full rounded-lg border px-4 py-3 outline-none text-gray-900 placeholder-gray-400 transition-colors duration-200 focus:ring-2 focus:ring-blue-500 cursor-not-allowed ${
                //   errors.tradingYearStart ? "border-red-500" : "border-gray-300"
                // }`}
                className={`w-full rounded-lg border px-4 py-3 outline-none text-gray-900 bg-gray-100 placeholder-gray-400 cursor-not-allowed ${
                  errors.tradingYearStart ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.tradingYearStart && (
                <p
                  id="tradingYearStart-error"
                  className="mt-1 text-xs text-red-600"
                  role="alert"
                >
                  {errors.tradingYearStart}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="tradingYearEnd"
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                Trading Year End Date
              </label>
              <input
                id="tradingYearEnd"
                name="tradingYearEnd"
                type="text"
                value={formatDate(formData.tradingYearEnd)}
                readOnly
                onChange={handleChange}
                aria-invalid={errors.tradingYearEnd ? "true" : "false"}
                aria-describedby={
                  errors.tradingYearEnd ? "tradingYearEnd-error" : null
                }
                required
                // className={`w-full rounded-lg border px-4 py-3 outline-none text-gray-900 placeholder-gray-400 transition-colors duration-200 focus:ring-2 focus:ring-blue-500 cursor-not-allowed ${
                //   errors.tradingYearEnd ? "border-red-500" : "border-gray-300"
                // }`}
                className={`w-full rounded-lg border px-4 py-3 outline-none text-gray-900 bg-gray-100 placeholder-gray-400 cursor-not-allowed ${
                  errors.tradingYearStart ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.tradingYearEnd && (
                <p
                  id="tradingYearEnd-error"
                  className="mt-1 text-xs text-red-600"
                  role="alert"
                >
                  {errors.tradingYearEnd}
                </p>
              )}
            </div>
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
                aria-invalid={errors.email ? "true" : "false"}
                aria-describedby={errors.email ? "email-error" : null}
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-transparent outline-none text-gray-900 placeholder-gray-400"
              />
            </div>
            {errors.email && (
              <p
                id="email-error"
                className="mt-1 text-xs text-red-600"
                role="alert"
              >
                {errors.email}
              </p>
            )}
          </div>

          {/* Password and Confirm Password */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                Password
              </label>
              <div
                className={`flex items-center rounded-lg border px-4 py-3 transition-colors duration-200 focus-within:ring-2 focus-within:ring-blue-500 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
              >
                <FaLock className="text-gray-400 mr-3" aria-hidden="true" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  aria-invalid={errors.password ? "true" : "false"}
                  aria-describedby={errors.password ? "password-error" : null}
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent outline-none text-gray-900 placeholder-gray-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="text-gray-400 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded ml-3"
                >
                  {showPassword ? (
                    <FaEyeSlash size={20} />
                  ) : (
                    <FaEye size={20} />
                  )}
                </button>
              </div>
              {errors.password && (
                <p
                  id="password-error"
                  className="mt-1 text-xs text-red-600"
                  role="alert"
                >
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                Confirm Password
              </label>
              <div
                className={`flex items-center rounded-lg border px-4 py-3 transition-colors duration-200 focus-within:ring-2 focus-within:ring-blue-500 ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                }`}
              >
                <FaLock className="text-gray-400 mr-3" aria-hidden="true" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  aria-invalid={errors.confirmPassword ? "true" : "false"}
                  aria-describedby={
                    errors.confirmPassword ? "confirmPassword-error" : null
                  }
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent outline-none text-gray-900 placeholder-gray-400"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                  className="text-gray-400 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded ml-3"
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash size={20} />
                  ) : (
                    <FaEye size={20} />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p
                  id="confirmPassword-error"
                  className="mt-1 text-xs text-red-600"
                  role="alert"
                >
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              checked={formData.terms}
              onChange={handleChange}
              aria-invalid={errors.terms ? "true" : "false"}
              aria-describedby={errors.terms ? "terms-error" : null}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              required
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
            <p
              id="terms-error"
              className="mt-1 text-xs text-red-600"
              role="alert"
            >
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

        {/* Divider */}
        <div className="flex items-center my-8 gap-4">
          <hr className="flex-grow border-gray-300" />
          <span className="text-gray-400 font-semibold text-sm">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Social Buttons */}
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
