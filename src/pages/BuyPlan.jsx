import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle, CreditCard, ShieldCheck, X } from "lucide-react";
import PaymentForm from "../components/PaymentCardForm";

const BuyPlan = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const features = [
    "A copy of the Taxita Accounts",
    "A copy of the HMRC submission receipt (time & date)",
    "HMRC tax computation",
    "A copy of the tax return submitted",
    "Letter detailing HMRC payment deadlines",
  ];

  return (
    <div className="min-h-screen p-8 bg-white rounded-2xl">
      {/* Breadcrumb */}
      <div className="flex items-center justify-end text-sm text-gray-500 mb-6">
        <Link
          to="/dashboard"
          className="hover:underline text-blue-600 font-medium"
        >
          Dashboard
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700 font-semibold">Buy Plan</span>
      </div>

      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          Buy Your <span className="text-blue-600">Plan</span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          With <span className="font-semibold text-blue-600">Taxita</span>, you
          get a complete accountancy service with{" "}
          <span className="font-semibold text-gray-800">no hidden costs</span>.
        </p>
      </div>

      {/* Pricing Section */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Features List */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            What’s included in your plan
          </h3>
          <ul className="space-y-4">
            {features.map((feature, i) => (
              <li
                key={i}
                className="flex items-start gap-3 group hover:translate-x-1 transition"
              >
                <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <span className="text-gray-700 group-hover:text-gray-900">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Payment Box */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-500 text-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 flex flex-col justify-between">
          <div className="text-center mb-8">
            <p className="text-5xl font-extrabold">£2.00</p>
            <p className="text-blue-100">per year</p>
            <span className="inline-block mt-3 text-xs bg-white/20 backdrop-blur-md text-white px-4 py-1 rounded-full">
              Standard 2025-2026
            </span>
          </div>

          {/* Custom Modal Trigger */}
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="w-full flex items-center justify-center gap-2 bg-white text-blue-600 py-3 rounded-xl font-semibold shadow-md hover:bg-blue-50 transition cursor-pointer"
          >
            <CreditCard className="w-5 h-5" />
            Pay with Card
          </button>

          <div className="flex items-center justify-center gap-2 text-sm text-blue-100 mt-6">
            <ShieldCheck className="w-4 h-4" />
            <p>Secure checkout powered by Stripe</p>
          </div>
        </div>
      </div>

      {/* // In your BuyPlan modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 px-4 pt-8">
          <div className="relative w-full max-w-md">
            {/* Floating Image */}
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 z-50">
              <img
                src="https://stripe.com/img/documentation/checkout/marketplace.png"
                alt="Payment"
                className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
              />
            </div>

            {/* Modal Card */}
            <div className="bg-white rounded-2xl shadow-2xl w-full relative overflow-visible pt-16">
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 z-50 cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Payment Form */}
              <PaymentForm onClose={() => setIsModalOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyPlan;
