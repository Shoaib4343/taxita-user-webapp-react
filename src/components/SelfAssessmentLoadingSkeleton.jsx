// components/SelfAssessmentLoadingSkeleton.js
import React from "react";

const SelfAssessmentLoadingSkeleton = () => {
  return (
    <div className="min-h-screen bg-white rounded-2xl">
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Header Skeleton */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gray-200 rounded-xl animate-pulse"></div>
              <div className="space-y-2">
                <div className="h-8 bg-gray-200 rounded-lg w-64 animate-pulse"></div>
                <div className="h-5 bg-gray-200 rounded w-48 animate-pulse"></div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-4 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
            </div>
          </div>
          <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
        </div>

        {/* Form Section Skeleton */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Form Header Skeleton */}
          <div className="bg-blue-50 px-6 py-4 rounded-t-2xl">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-200 rounded-lg animate-pulse w-10 h-10"></div>
              <div className="space-y-2">
                <div className="h-6 bg-gray-200 rounded-lg w-80 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-96 animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Form Content Skeleton */}
          <div className="p-6 space-y-6">
            {/* Info Card Skeleton */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200 animate-pulse">
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4 animate-pulse mt-4"></div>
              </div>
            </div>

            {/* Table Header Skeleton */}
            <div className="bg-gray-200 rounded-lg p-4 animate-pulse">
              <div className="grid grid-cols-6 gap-4">
                <div className="col-span-2 h-4 bg-gray-300 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
              </div>
            </div>

            {/* Form Rows Skeleton */}
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className={`grid grid-cols-6 gap-4 p-4 rounded-lg ${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'} animate-pulse`}>
                  <div className="col-span-2 h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-10 bg-gray-200 rounded-lg"></div>
                  <div className="h-10 bg-gray-200 rounded-lg"></div>
                  <div className="h-10 bg-gray-200 rounded-lg"></div>
                </div>
              ))}
            </div>

            {/* Employment Section Skeleton */}
            <div className="space-y-4">
              <div className="h-5 bg-gray-200 rounded w-32 animate-pulse"></div>
              {[1, 2].map((emp) => (
                <div key={emp} className="space-y-3 p-4 bg-gray-50 rounded-lg">
                  {/* Employer Name Row */}
                  <div className="grid grid-cols-6 gap-4">
                    <div className="col-span-2 h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="col-span-4 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                  </div>
                  {/* Employer Ref Row */}
                  <div className="grid grid-cols-6 gap-4">
                    <div className="col-span-2 h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="col-span-4 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                  </div>
                  {/* P60 Details Row */}
                  <div className="grid grid-cols-6 gap-4">
                    <div className="col-span-2 h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                    <div className="h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                    <div className="h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional sections skeleton */}
            <div className="space-y-4">
              <div className="h-5 bg-gray-200 rounded w-24 animate-pulse"></div>
              {[1, 2].map((i) => (
                <div key={i} className={`grid grid-cols-6 gap-4 p-3 rounded-lg ${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                  <div className="col-span-2 h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                  <div className="h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                  <div className="h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                </div>
              ))}
            </div>

            {/* Additional Info Skeleton */}
            <div className="grid grid-cols-6 gap-4">
              <div className="col-span-2 h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="col-span-4 h-24 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>

            {/* Action Buttons Skeleton */}
            <div className="flex gap-4 pt-6">
              <div className="w-40 h-12 bg-gray-200 rounded-lg animate-pulse"></div>
              <div className="w-32 h-12 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>

            {/* Bottom Info Card Skeleton */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200 animate-pulse">
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded w-full animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded w-4/6 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelfAssessmentLoadingSkeleton;