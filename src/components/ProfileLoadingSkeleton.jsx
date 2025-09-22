// components/ProfileLoadingSkeleton.js
import React from "react";

const ProfileLoadingSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Profile Card Skeleton */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Header Section Skeleton */}
          <div className="px-8 py-6 bg-gradient-to-r from-blue-50 to-blue-50 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gray-200 rounded-lg shadow-sm animate-pulse w-12 h-12"></div>
              <div className="space-y-2">
                <div className="h-7 bg-gray-200 rounded-lg w-48 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-64 animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Profile Content Skeleton */}
          <div className="p-8">
            <div className="flex flex-col lg:flex-row items-center gap-8 mb-8">
              {/* Profile Image Skeleton */}
              <div className="relative group">
                <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse border-4 border-blue-100 shadow-lg"></div>
                <div className="absolute -bottom-2 -right-2 bg-gray-200 p-3 rounded-xl shadow-lg animate-pulse w-12 h-12"></div>
              </div>

              {/* Profile Info Skeleton */}
              <div className="flex-1 text-center lg:text-left space-y-4">
                <div className="space-y-3">
                  <div className="h-8 bg-gray-200 rounded-lg w-48 mx-auto lg:mx-0 animate-pulse"></div>
                  
                  <div className="flex flex-col lg:flex-row gap-4 justify-center lg:justify-start">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-gray-200 rounded-lg animate-pulse w-7 h-7"></div>
                      <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-gray-200 rounded-lg animate-pulse w-7 h-7"></div>
                      <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                    </div>
                  </div>
                </div>

                {/* Info Cards Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-xl border border-gray-200 animate-pulse">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-3 bg-gray-200 rounded w-16 animate-pulse"></div>
                    </div>
                    <div className="h-5 bg-gray-200 rounded w-24 animate-pulse"></div>
                  </div>
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-xl border border-gray-200 animate-pulse">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-3 bg-gray-200 rounded w-16 animate-pulse"></div>
                    </div>
                    <div className="h-5 bg-gray-200 rounded w-32 animate-pulse"></div>
                  </div>
                </div>
              </div>

              {/* Edit Button Skeleton */}
              <div className="flex flex-col gap-3">
                <div className="w-32 h-14 bg-gray-200 rounded-xl animate-pulse shadow-lg"></div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-gray-200 rounded-full animate-pulse"></div>
                    <div className="h-3 bg-gray-200 rounded w-24 animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Address Section Skeleton */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Header Section Skeleton */}
          <div className="px-8 py-6 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gray-200 rounded-lg shadow-sm animate-pulse w-12 h-12"></div>
                <div className="space-y-2">
                  <div className="h-7 bg-gray-200 rounded-lg w-44 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-56 animate-pulse"></div>
                </div>
              </div>
              <div className="w-44 h-14 bg-gray-200 rounded-xl animate-pulse shadow-lg"></div>
            </div>
          </div>

          {/* Content Skeleton */}
          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
              </div>
            </div>

            {/* Address Cards Skeleton */}
            <div className="space-y-6">
              {[1, 2].map((i) => (
                <div key={i} className="border border-gray-200 rounded-xl p-6 bg-gradient-to-br from-white to-gray-50">
                  <div className="flex justify-between items-start">
                    <div className="flex-1 space-y-4">
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-gray-200 rounded-lg animate-pulse w-8 h-8"></div>
                        <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-gray-200 rounded-full mt-2 animate-pulse"></div>
                          <div className="h-5 bg-gray-200 rounded w-64 animate-pulse"></div>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-gray-200 rounded-full mt-2 animate-pulse"></div>
                          <div className="h-4 bg-gray-200 rounded w-48 animate-pulse"></div>
                        </div>
                        <div className="flex items-center gap-2 mt-3 pt-2">
                          <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                          <div className="h-4 bg-gray-200 rounded w-40 animate-pulse"></div>
                        </div>
                        <div className="inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg mt-2">
                          <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                          <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2 ml-4">
                      <div className="w-16 h-11 bg-gray-200 rounded-xl animate-pulse"></div>
                      <div className="w-20 h-11 bg-gray-200 rounded-xl animate-pulse"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Password Section Skeleton */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Header Section Skeleton */}
          <div className="px-8 py-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gray-200 rounded-lg shadow-sm animate-pulse w-12 h-12"></div>
                <div className="space-y-2">
                  <div className="h-7 bg-gray-200 rounded-lg w-40 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-60 animate-pulse"></div>
                </div>
              </div>
              <div className="w-40 h-14 bg-gray-200 rounded-xl animate-pulse shadow-lg"></div>
            </div>
          </div>

          {/* Content Skeleton */}
          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 animate-pulse">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-5 bg-gray-200 rounded w-32 animate-pulse"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-40 animate-pulse"></div>
                  <div className="h-3 bg-gray-200 rounded w-48 animate-pulse"></div>
                  <div className="h-3 bg-gray-200 rounded w-44 animate-pulse"></div>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 animate-pulse">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-5 bg-gray-200 rounded w-28 animate-pulse"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-36 animate-pulse"></div>
                  <div className="h-3 bg-gray-200 rounded w-52 animate-pulse"></div>
                  <div className="h-3 bg-gray-200 rounded w-40 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileLoadingSkeleton;