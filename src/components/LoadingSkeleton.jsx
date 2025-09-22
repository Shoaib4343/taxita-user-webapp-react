// src/components/LoadingSkeleton.jsx
import React from "react";

const LoadingSkeleton = ({ type = "default" }) => {
  // Base skeleton component
  const SkeletonLine = ({ width = "100%", height = "16px", className = "" }) => (
    <div
      className={`bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-size-200 animate-pulse rounded-lg ${className}`}
      style={{
        width,
        height,
        backgroundSize: "200% 100%",
        animation: "shimmer 1.5s ease-in-out infinite",
      }}
    />
  );

  // Header skeleton
  const HeaderSkeleton = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gray-200 rounded-xl animate-pulse">
            <div className="w-8 h-8 bg-gray-300 rounded"></div>
          </div>
          <div className="space-y-2">
            <SkeletonLine width="300px" height="32px" />
            <SkeletonLine width="200px" height="20px" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <SkeletonLine width="80px" height="16px" />
          <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
          <SkeletonLine width="120px" height="16px" />
        </div>
      </div>
      
      <div className="bg-gray-100 border-l-4 border-gray-300 p-4 rounded-r-lg animate-pulse">
        <SkeletonLine width="90%" height="16px" className="mb-2" />
        <SkeletonLine width="75%" height="16px" />
      </div>
    </div>
  );

  // Form section skeleton
  const FormSectionSkeleton = () => (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden animate-pulse">
      <div className="bg-gray-100 px-6 py-4 rounded-t-2xl">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gray-200 rounded-lg">
            <div className="w-6 h-6 bg-gray-300 rounded"></div>
          </div>
          <div className="space-y-2">
            <SkeletonLine width="180px" height="20px" />
            <SkeletonLine width="220px" height="14px" />
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} className="space-y-3">
              <SkeletonLine width="120px" height="16px" />
              <div className="w-full h-12 bg-gray-200 rounded-xl animate-pulse"></div>
              <SkeletonLine width="160px" height="12px" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Submit section skeleton
  const SubmitSkeleton = () => (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 animate-pulse">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="text-center sm:text-left space-y-2">
          <SkeletonLine width="150px" height="18px" />
          <SkeletonLine width="220px" height="14px" />
        </div>
        <div className="w-40 h-12 bg-gray-200 rounded-xl animate-pulse"></div>
      </div>
    </div>
  );

  // Complete page skeleton for percentage adjustment
  const PercentageAdjustmentSkeleton = () => (
    <div className="min-h-screen bg-white rounded-2xl">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <HeaderSkeleton />
        <div className="space-y-8">
          <FormSectionSkeleton />
          <FormSectionSkeleton />
          <SubmitSkeleton />
        </div>
      </div>
    </div>
  );

  // Generic card skeleton
  const CardSkeleton = () => (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 animate-pulse">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
          <SkeletonLine width="200px" height="20px" />
        </div>
        <SkeletonLine width="100%" height="16px" />
        <SkeletonLine width="80%" height="16px" />
        <SkeletonLine width="60%" height="16px" />
      </div>
    </div>
  );

  // Table skeleton
  const TableSkeleton = () => (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="p-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex justify-between items-center">
            <SkeletonLine width="200px" height="24px" />
            <div className="w-32 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
          
          {/* Table header */}
          <div className="grid grid-cols-4 gap-4 py-3 border-b border-gray-200">
            {Array.from({ length: 4 }, (_, i) => (
              <SkeletonLine key={i} width="80px" height="16px" />
            ))}
          </div>
          
          {/* Table rows */}
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} className="grid grid-cols-4 gap-4 py-3">
              {Array.from({ length: 4 }, (_, j) => (
                <SkeletonLine key={j} width="100px" height="16px" />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Return appropriate skeleton based on type
  switch (type) {
    case "header":
      return <HeaderSkeleton />;
    case "form-section":
      return <FormSectionSkeleton />;
    case "card":
      return <CardSkeleton />;
    case "table":
      return <TableSkeleton />;
    case "percentage-adjustment":
      return <PercentageAdjustmentSkeleton />;
    default:
      return (
        <div className="space-y-4">
          <HeaderSkeleton />
          <CardSkeleton />
        </div>
      );
  }
};

// Add the shimmer animation styles
const shimmerStyles = `
@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.animate-shimmer {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}
`;

// You can add these styles to your CSS file or use Tailwind's arbitrary properties
export { shimmerStyles };
export default LoadingSkeleton;