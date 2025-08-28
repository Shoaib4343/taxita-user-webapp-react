// src/pages/NotFoundPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { FiHome, FiArrowLeft, FiAlertTriangle, FiMail } from "react-icons/fi";

export default function NotFoundPage() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/dashboard");
  };

  const handleGoBack = () => {
    navigate(-1); // Go back to previous page
  };

  const handleContactSupport = () => {
    // Replace with your support email or contact method
    // window.location.href = "mailto:support@taxita.com?subject=404 Error Report";
    alert("Contact support at support@taxita.com");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
     

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg w-full text-center">
          {/* Error Icon */}
          <div className="mb-8">
            <div className="mx-auto w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
              <FiAlertTriangle className="w-12 h-12 text-red-600" />
            </div>
          </div>

          {/* Error Code */}
          <h1 className="text-8xl font-bold text-gray-900 mb-4">404</h1>

          {/* Error Message */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Page Not Found
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Sorry, we couldn't find the page you're looking for. The page may have been moved, 
              deleted, or the URL might be incorrect.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
            <button
              onClick={handleGoHome}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
            >
              <FiHome size={18} />
              Go to Dashboard
            </button>
            
            <button
              onClick={handleGoBack}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200"
            >
              <FiArrowLeft size={18} />
              Go Back
            </button>
          </div>

          {/* Help Section */}
          <div className="bg-gray-100 rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-3">
              Need Help?
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              If you believe this is an error or need assistance, please contact our support team.
            </p>
            <button
              onClick={handleContactSupport}
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors duration-200"
            >
              <FiMail size={16} />
              Contact Support
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
     
    </div>
  );
}