import { useState } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { loginApi } from "../services/authService";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/.test(formData.email))
      newErrors.email = "Enter a valid email address";

    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      try {
        const response = await loginApi(formData);
        const {user} = response.data;
        login(user.token, user); // store in context + localStorage
        toast.success("Login successful!");
        // localStorage.setItem("token", response.data.access_token);
        // setAuth({ isAuthenticated: true, token: response.data.access_token });
        navigate("/dashboard");
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "Something went wrong. Please try again."
        );
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-6 py-12 sm:px-8">
      <section className="w-full max-w-md bg-white shadow-lg rounded-3xl p-10 sm:p-12 border border-gray-200">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-1 tracking-tight">
          Welcome Back
        </h1>
        <p className="text-center text-gray-500 mb-8 font-medium">
          Log in to your account
        </p>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="space-y-6"
          aria-label="Login Form"
        >
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
                autoComplete="email"
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
                autoComplete="current-password"
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
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
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

          {/* Forgot Password Link */}
          <div className="text-right">
            <Link
              to="/forgot-password"
              className="text-sm font-medium text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
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
            {isSubmitting ? "Logging in..." : "Log In"}
          </button>
        </form>

        {/* Signup */}
        <p className="mt-6 text-center text-gray-600 font-medium">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200 underline"
          >
            Sign up
          </Link>
        </p>

        {/* Referral Partner */}
        <p className="mt-4 text-center text-gray-600 font-medium ">
          Do you want to be our referral partner? <br />
          <Link
            to="/partner-registration"
            className="text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200 underline"
          >
            Become our certified partner
          </Link>
        </p>

        {/* Divider */}
        <div className="flex items-center my-8 gap-4">
          <hr className="flex-grow border-gray-300" />
          <span className="text-gray-400 font-semibold text-sm">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Social Login */}
        <div className="grid grid-cols-2 gap-4">
          <button
            aria-label="Login with Google"
            className="flex items-center justify-center gap-3 border border-gray-300 rounded-xl py-3 hover:bg-gray-50 transition-colors duration-200"
          >
            <FcGoogle size={22} />
            <span className="text-gray-700 font-semibold">Google</span>
          </button>
          <button
            aria-label="Login with Facebook"
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

export default Login;
