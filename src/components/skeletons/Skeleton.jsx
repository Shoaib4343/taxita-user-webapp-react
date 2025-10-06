import React from 'react';

// Basic Skeleton Component
export const Skeleton = ({ className = "", ...props }) => (
  <div 
    className={`animate-pulse bg-gray-200 rounded ${className}`}
    {...props}
  />
);

// Card Skeleton for Income/Expense cards
export const CardSkeleton = () => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-pulse">
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 min-w-[48px] min-h-[48px] rounded-full bg-gray-200"></div>
      <div className="flex-1">
        <div className="w-32 h-4 bg-gray-200 rounded mb-2"></div>
        <div className="w-24 h-3 bg-gray-200 rounded"></div>
      </div>
    </div>
  </div>
);

// Page Header Skeleton
export const PageHeaderSkeleton = () => (
  <div className="mb-8 animate-pulse">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-10 h-10 bg-gray-200 rounded-xl"></div>
      <div>
        <div className="w-32 h-6 bg-gray-200 rounded mb-2"></div>
        <div className="w-24 h-4 bg-gray-200 rounded"></div>
      </div>
    </div>
    <div className="w-96 h-4 bg-gray-200 rounded"></div>
  </div>
);

// Sidebar Skeleton
export const SidebarSkeleton = () => (
  <div className="w-80 border-r border-gray-200 p-4 animate-pulse">
    <div className="w-40 h-5 bg-gray-200 rounded mb-4"></div>
    <div className="w-full h-12 bg-gray-200 rounded-lg mb-4"></div>
    <div className="space-y-3">
      {[...Array(7)].map((_, i) => (
        <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
          <div className="w-24 h-4 bg-gray-200 rounded"></div>
          <div className="w-16 h-4 bg-gray-200 rounded"></div>
        </div>
      ))}
    </div>
  </div>
);

// Main Content Header Skeleton
export const MainContentHeaderSkeleton = () => (
  <div className="flex justify-between items-center mb-6 animate-pulse">
    <div>
      <div className="w-56 h-7 bg-gray-200 rounded mb-2"></div>
      <div className="w-72 h-4 bg-gray-200 rounded"></div>
    </div>
    <div className="w-40 h-10 bg-gray-200 rounded-xl"></div>
  </div>
);

// Featured Card Skeleton (for total display)
export const FeaturedCardSkeleton = () => (
  <div className="bg-gray-50 rounded-2xl p-6 mb-6 animate-pulse">
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
        <div>
          <div className="w-32 h-5 bg-gray-200 rounded mb-2"></div>
          <div className="w-40 h-4 bg-gray-200 rounded"></div>
        </div>
      </div>
      <div className="text-right">
        <div className="w-20 h-6 bg-gray-200 rounded mb-2"></div>
        <div className="w-16 h-4 bg-gray-200 rounded"></div>
      </div>
    </div>
  </div>
);

// Grid Skeleton for cards
export const CardsGridSkeleton = ({ count = 5, columns = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" }) => (
  <div className={`grid gap-6 ${columns}`}>
    {[...Array(count)].map((_, i) => (
      <CardSkeleton key={i} />
    ))}
  </div>
);

// Section Title Skeleton
export const SectionTitleSkeleton = () => (
  <div className="w-40 h-6 bg-gray-200 rounded animate-pulse mb-4"></div>
);

// Complete Page Skeleton for Income/Expenses pages
export const AccountsPageSkeleton = ({ showTwoSections = false }) => (
  <div className="min-h-screen bg-white rounded-2xl">
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Page Header Skeleton */}
      <PageHeaderSkeleton />

      {/* Layout Skeleton */}
      <div className="flex bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Sidebar Skeleton */}
        <SidebarSkeleton />

        {/* Main Content Skeleton */}
        <div className="flex-1 p-6">
          {/* Header */}
          <MainContentHeaderSkeleton />
          
          {/* Featured Card */}
          <FeaturedCardSkeleton />

          {showTwoSections ? (
            <>
              {/* First Section */}
              <SectionTitleSkeleton />
              <div className="mb-8">
                <CardsGridSkeleton count={9} />
              </div>

              {/* Second Section */}
              <SectionTitleSkeleton />
              <CardsGridSkeleton count={10} />
            </>
          ) : (
            <CardsGridSkeleton count={5} />
          )}
        </div>
      </div>
    </div>
  </div>
);

// Loading State Component with custom message
export const LoadingState = ({ 
  message = "Loading accounts...",
  showSpinner = true,
  className = ""
}) => (
  <div className={`flex items-center justify-center py-8 ${className}`}>
    {showSpinner && (
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></div>
    )}
    <span className="text-gray-600">{message}</span>
  </div>
);

// Error State Component
export const ErrorState = ({ 
  message = "Failed to load accounts",
  onRetry = null,
  className = ""
}) => (
  <div className={`flex flex-col items-center justify-center py-8 ${className}`}>
    <div className="text-red-500 mb-4">
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
    <p className="text-gray-600 text-center mb-4">{message}</p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Try Again
      </button>
    )}
  </div>
);

// Empty State Component
export const EmptyState = ({ 
  title = "No accounts found",
  description = "There are no accounts available at this time.",
  icon = null,
  className = ""
}) => (
  <div className={`flex flex-col items-center justify-center py-12 ${className}`}>
    {icon ? (
      <div className="text-gray-400 mb-4">
        {icon}
      </div>
    ) : (
      <div className="text-gray-400 mb-4">
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
      </div>
    )}
    <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-500 text-center max-w-md">{description}</p>
  </div>
);