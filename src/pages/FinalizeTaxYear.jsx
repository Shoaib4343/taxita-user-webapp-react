import React, { useState, useEffect } from "react";
import { CheckCircle, CreditCard, ShieldCheck, X, Calendar } from "lucide-react";
import PaymentForm from "../components/PaymentCardForm";
import { useTradingYear } from "../context/TradingYearContext";
import PageHeader from "../components/PageHeader";

const FinalizeTaxYear = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const { activeTradingYear, apiRefreshTrigger, activeYearInfo } = useTradingYear();

  // Simulate loading for consistency with other pages
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [apiRefreshTrigger]);

  const features = [
    "A copy of the Taxita Accounts",
    "A copy of the HMRC submission receipt showing the time and date the Self Assessment return was submitted to HMRC",
    "A copy of the HMRC tax computation",
    "A copy of the tax return submitted",
    "A letter detailing what has to be paid to HMRC and when",
  ];

  // Enhanced Loading Skeleton Component
  const LoadingSkeleton = () => (
    <div className="min-h-screen bg-white rounded-2xl">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
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
        
        {/* Main Content Skeleton */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
            <div className="flex items-start">
              <div className="w-6 h-6 bg-blue-200 rounded animate-pulse mr-3"></div>
              <div className="space-y-2">
                <div className="h-4 bg-blue-200 rounded w-48 animate-pulse"></div>
                <div className="h-3 bg-blue-200 rounded w-96 animate-pulse"></div>
              </div>
            </div>
          </div>
          
          <div className="p-6 space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Features Skeleton */}
              <div className="space-y-6">
                <div className="h-6 bg-gray-200 rounded w-40 animate-pulse"></div>
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-green-200 rounded-full animate-pulse mt-1"></div>
                      <div className="h-4 bg-gray-200 rounded flex-1 animate-pulse"></div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Payment Box Skeleton */}
              <div className="bg-gradient-to-br from-blue-600 to-blue-500 rounded-2xl p-8">
                <div className="text-center mb-8 space-y-4">
                  <div className="h-12 bg-blue-300 rounded w-40 mx-auto animate-pulse"></div>
                  <div className="h-4 bg-blue-300 rounded w-24 mx-auto animate-pulse"></div>
                  <div className="h-6 bg-blue-300 rounded w-48 mx-auto animate-pulse"></div>
                </div>
                <div className="h-12 bg-white rounded-xl animate-pulse mb-6"></div>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 bg-blue-300 rounded animate-pulse"></div>
                  <div className="h-4 bg-blue-300 rounded w-48 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Show loading state
  if (loading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="min-h-screen bg-white rounded-2xl">
      <div className="max-w-7xl mx-auto p-6">
        {/* PageHeader */}
        <PageHeader
          icon={<Calendar />}
          title="Finalize Tax Year"
          currentPage="Finalize Tax Year"
          showTradingYear={true}
          activeTradingYear={activeTradingYear}
          subtitle="Complete your tax year submission with"
        />

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-200 p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/80 rounded-lg">
                <Calendar className="w-6 h-6 text-blue-700" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-blue-900">HERE IS WHAT YOU GET!</h2>
                <p className="text-blue-700 text-sm mt-1">With Taxita you get a full accountancy service with no further costs.</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Features List */}
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">What's included</h3>
                <ul className="space-y-4">
                  {features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 group hover:translate-x-1 transition-transform duration-200">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                      <span className="text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Payment Box */}
              <div className="bg-gradient-to-br from-blue-600 to-blue-500 text-white rounded-2xl p-8 flex flex-col justify-between shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className="text-center mb-8">
                  <div className="mb-3">
                    <h3 className="text-xl font-bold text-blue-100">
                      Finalization Service
                    </h3>
                  </div>
                  
                  <p className="text-5xl font-extrabold mb-2">£2.00</p>
                  <p className="text-blue-100 mb-4">annually</p>
                  
                  {/* Trading Year Badge - Dynamic */}
                  <span className="inline-block text-xs bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full border border-white/20">
                    Standard for {activeYearInfo?.tradingYear || "2025-2026"}
                  </span>
                </div>

                <button
                  type="button"
                  // onClick={() => setIsModalOpen(true)}
                  className="w-full flex items-center justify-center gap-2 bg-white text-blue-600 py-3 rounded-xl font-semibold shadow-md hover:bg-blue-50 transition-all duration-200 transform hover:scale-105"
                >
                  <CreditCard className="w-5 h-5" />
                  Buy Plan with Taxita
                </button>

                <div className="flex items-center justify-center gap-2 text-sm text-blue-100 mt-6">
                  <ShieldCheck className="w-4 h-4" />
                  <p>Secure checkout powered by Stripe</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 px-4 pt-8">
          <div className="relative w-full max-w-md">
            {/* Floating Image */}
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 z-50">
              <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <Calendar className="w-12 h-12 text-white" />
              </div>
            </div>

            {/* Modal Card */}
            <div className="bg-white rounded-2xl shadow-2xl w-full relative overflow-visible pt-16">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 z-50 cursor-pointer transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <PaymentForm onClose={() => setIsModalOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinalizeTaxYear;