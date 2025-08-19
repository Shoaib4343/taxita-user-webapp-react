import React, { useState } from "react";
import { FiEdit2 } from "react-icons/fi";

const ProfilePage = () => {
  const [profileImage, setProfileImage] = useState(
    "https://i.pravatar.cc/150?img=32"
  );

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setProfileImage(URL.createObjectURL(file));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r shadow-sm p-6 flex flex-col justify-between">
        <nav className="space-y-4">
          <button className="block w-full text-left font-medium text-indigo-600">
            My Profile
          </button>
          <button className="block w-full text-left text-gray-600 hover:text-indigo-600">
            Security
          </button>
          <button className="block w-full text-left text-gray-600 hover:text-indigo-600">
            Teams
          </button>
          <button className="block w-full text-left text-gray-600 hover:text-indigo-600">
            Team Members
          </button>
          <button className="block w-full text-left text-gray-600 hover:text-indigo-600">
            Notifications
          </button>
          <button className="block w-full text-left text-gray-600 hover:text-indigo-600">
            Billing
          </button>
          <button className="block w-full text-left text-gray-600 hover:text-indigo-600">
            Data Export
          </button>
          <button className="block w-full text-left text-red-500 hover:text-red-600">
            Delete Account
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <h1 className="text-2xl font-semibold text-gray-800 mb-8">
          Account Settings
        </h1>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover border-4 border-gray-100 shadow-sm"
                />
                <label className="absolute bottom-1 right-1 bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full cursor-pointer shadow">
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                  <FiEdit2 size={14} />
                </label>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Rafiqur Rahman
                </h2>
                <p className="text-sm text-gray-500">Team Manager</p>
                <p className="text-sm text-gray-400">
                  Leeds, United Kingdom
                </p>
              </div>
            </div>
            <button className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium">
              <FiEdit2 /> Edit
            </button>
          </div>
        </div>

        {/* Personal Info */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-800">
              Personal Information
            </h3>
            <button className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium">
              <FiEdit2 /> Edit
            </button>
          </div>
          <div className="grid md:grid-cols-2 gap-y-4 gap-x-8 text-gray-600">
            <div>
              <p className="text-sm text-gray-400">First Name</p>
              <p className="font-medium">Rafiqur</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Last Name</p>
              <p className="font-medium">Rahman</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Email address</p>
              <p className="font-medium">rafiqurrahman51@gmail.com</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Phone</p>
              <p className="font-medium">+09 345 346 46</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm text-gray-400">Bio</p>
              <p className="font-medium">Team Manager</p>
            </div>
          </div>
        </div>

        {/* Address Info */}
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Address</h3>
            <button className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium">
              <FiEdit2 /> Edit
            </button>
          </div>
          <div className="grid md:grid-cols-2 gap-y-4 gap-x-8 text-gray-600">
            <div>
              <p className="text-sm text-gray-400">Country</p>
              <p className="font-medium">United Kingdom</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">City/State</p>
              <p className="font-medium">Leeds, East London</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Postal Code</p>
              <p className="font-medium">ERT 2534</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">TAX ID</p>
              <p className="font-medium">AS54645756</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
