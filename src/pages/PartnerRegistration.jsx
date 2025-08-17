import { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

const PartnerRegistration = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    insuranceNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreed: false,
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    const errs = {};
    if (!formData.firstName.trim()) errs.firstName = "First name is required";
    if (!formData.lastName.trim()) errs.lastName = "Last name is required";
    if (!formData.companyName.trim())
      errs.companyName = "Company name is required";
    if (!formData.insuranceNumber.trim())
      errs.insuranceNumber = "Insurance Number is required";
    if (!formData.email.trim()) errs.email = "Email is required";
    else if (!/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/.test(formData.email))
      errs.email = "Enter a valid email address";
    if (!formData.password) errs.password = "Password is required";
    else if (formData.password.length < 6)
      errs.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword)
      errs.confirmPassword = "Passwords do not match";
    if (!formData.agreed)
      errs.agreed = "You must agree to the terms & conditions";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      // Simulate API call or submit here
      setTimeout(() => {
        alert("Partner registration submitted successfully!");
        setIsSubmitting(false);
      }, 1500);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6 flex flex-col md:flex-row justify-center items-start gap-10">
      {/* Left text section */}
      <section className="md:w-5/12 max-h-[600px] overflow-y-auto bg-white rounded-3xl shadow-md p-8 border border-gray-200">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-4">
          Taxita - Accountant on your driving seat
        </h1>

        <h2 className="text-xl font-semibold mb-3 border-l-4 border-indigo-600 pl-3">
          How To become a Certified Partner?
        </h2>
        <div className="space-y-4 text-gray-700 leading-relaxed text-sm">
          <p>
            Curabitur accumsan quis sapien convallis egestas. Curabitur finibus
            nunc in bibendum tempus. Sed non blandit est. Praesent mollis
            tincidunt tortor, ac dapibus nulla consectetur quis. Phasellus
            cursus diam id sapien scelerisque lacinia. In hac habitasse platea
            dictumst. Nulla vitae blandit enim, ac posuere turpis.
          </p>
          <p>
            Sed nec congue purus. Mauris consequat consequat dictum. Nam
            hendrerit enim est, eget tristique justo dapibus at. Nullam dictum
            rhoncus accumsan. Nulla at elementum ligula, nec venenatis ante.
            Duis placerat leo nisl, in sagittis magna finibus ac. Mauris ut
            bibendum orci. Vestibulum in risus eu neque pretium scelerisque.
            Vivamus accumsan id ex eu pulvinar.
          </p>
          <p>
            Curabitur maximus lacus dui, non iaculis ipsum varius sed. Nam sed
            finibus metus. Vivamus tempus neque odio, quis eleifend ligula
            semper et. Sed ut arcu at est commodo imperdiet. Nulla facilisi.
          </p>
        </div>
      </section>

      {/* Right form section */}
      <section className="md:w-7/12 bg-white rounded-3xl shadow-md p-8 border border-gray-200">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
          Partner Registration
        </h2>
        <p className="text-center text-gray-600 font-medium mb-6">
          Register a new membership, all fields are mandatory.
        </p>
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          {/* First & Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name */}
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                First Name <span className="text-red-600">*</span>
              </label>
              <div
                className={`flex items-center rounded-lg border px-4 py-3 transition-colors duration-200 focus-within:ring-2 focus-within:ring-indigo-500 ${
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

            {/* Last Name */}
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                Last Name <span className="text-red-600">*</span>
              </label>
              <div
                className={`flex items-center rounded-lg border px-4 py-3 transition-colors duration-200 focus-within:ring-2 focus-within:ring-indigo-500 ${
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

          {/* Company Name (full width) */}
          <div>
            <label
              htmlFor="companyName"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Company Name <span className="text-red-600">*</span>
            </label>
            <input
              id="companyName"
              name="companyName"
              type="text"
              placeholder="Your Company Name"
              value={formData.companyName}
              onChange={handleChange}
              className={`w-full rounded-lg border px-4 py-3 outline-none text-gray-900 placeholder-gray-400 transition-colors duration-200 focus:ring-2 focus:ring-indigo-500 ${
                errors.companyName ? "border-red-500" : "border-gray-300"
              }`}
              aria-invalid={errors.companyName ? "true" : "false"}
              aria-describedby={errors.companyName ? "companyName-error" : null}
              required
            />
            {errors.companyName && (
              <p
                id="companyName-error"
                className="mt-1 text-xs text-red-600"
                role="alert"
              >
                {errors.companyName}
              </p>
            )}
          </div>

          {/* National Insurance Number (full width) */}
          <div>
            <label
              htmlFor="insuranceNumber"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              National Insurance Number <span className="text-red-600">*</span>
            </label>
            <input
              id="insuranceNumber"
              name="insuranceNumber"
              type="text"
              placeholder="Enter your National Insurance Number"
              value={formData.insuranceNumber}
              onChange={handleChange}
              className={`w-full rounded-lg border px-4 py-3 outline-none text-gray-900 placeholder-gray-400 transition-colors duration-200 focus:ring-2 focus:ring-indigo-500 ${
                errors.insuranceNumber ? "border-red-500" : "border-gray-300"
              }`}
              aria-invalid={errors.insuranceNumber ? "true" : "false"}
              aria-describedby={
                errors.insuranceNumber ? "insuranceNumber-error" : null
              }
              required
            />
            {errors.insuranceNumber && (
              <p
                id="insuranceNumber-error"
                className="mt-1 text-xs text-red-600"
                role="alert"
              >
                {errors.insuranceNumber}
              </p>
            )}
          </div>

          {/* Email (full width with icon) */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Email Address <span className="text-red-600">*</span>
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
                placeholder="Email Address"
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

          {/* Password & Confirm Password */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                Password <span className="text-red-600">*</span>
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
                  className="text-gray-400 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded ml-3"
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
                Confirm Password <span className="text-red-600">*</span>
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
                  className="text-gray-400 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded ml-3"
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

          {/* Terms & Conditions */}
          <div className="flex items-center">
            <input
              id="agreed"
              name="agreed"
              type="checkbox"
              checked={formData.agreed}
              onChange={handleChange}
              className="h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500 border-gray-300"
              aria-invalid={errors.agreed ? "true" : "false"}
              aria-describedby={errors.agreed ? "agreed-error" : null}
            />
            <label
              htmlFor="agreed"
              className="ml-2 block text-gray-700 font-medium cursor-pointer"
            >
              I agree to the{" "}
              <a
                href="/terms"
                className="text-indigo-600 hover:text-indigo-800 underline"
              >
                terms & conditions
              </a>
              <span className="text-red-600">*</span>
            </label>
          </div>
          {errors.agreed && (
            <p
              id="agreed-error"
              className="mt-1 text-xs text-red-600"
              role="alert"
            >
              {errors.agreed}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 rounded-xl font-semibold text-white transition-colors duration-300 ${
              isSubmitting
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300"
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
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </form>
      </section>
    </main>
  );
};

export default PartnerRegistration;
