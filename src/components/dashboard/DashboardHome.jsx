// src/pages/DashboardHome.jsx
import React from "react";

import { ActivityGraph } from "./ActivityGraph";
import { UsageRadar } from "./UsageRadar";
import StatCards from "./StatCards";
import { TopBar } from "./TopBar";

const DashboardHome = () => {
  return (
    <div className="bg-white rounded-lg py-4 shadow">
      {/* Top Bar */}
      <TopBar />

      {/* Welcome Message */}
<div className="mx-4 sm:mx-6">
  <div className="relative bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl shadow-lg p-6 sm:p-8 my-4 overflow-hidden">
    {/* Decorative Circle / Accent */}
    <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-200 rounded-full opacity-30"></div>

    <div className="relative z-10">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
       Taxita Dashboard
      </h2>
      <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4">
        Here you have access to various support modules on the left sidebar. You can manage your profile, reset settings, and dynamically control your data with ease.
      </p>

      
    </div>
  </div>
</div>


      <StatCards />
      {/* Side-by-side Graphs */}
      <div className="flex flex-col lg:flex-row gap-4 px-4">
        {/* ActivityGraph takes full width */}
        <div className="flex-1">
          <ActivityGraph />
        </div>
        <UsageRadar />
      </div>
    </div>
  );
};

export default DashboardHome;
