import React, { useState } from "react";
import { FiUpload, FiFile, FiTrash2 } from "react-icons/fi";

const IDDocuments = () => {
  const [formData, setFormData] = useState({
    photoID: "Driving License",
    photoIDDoc: null,
    proofOfAddress: null,
    otherDocuments: null,
  });

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.files[0],
    });
  };

  const removeFile = (field) => {
    setFormData({ ...formData, [field]: null });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    // TODO: connect with backend API
  };

  return (
    <div className="p-6 bg-white rounded-2xl">
      {/* Page Intro */}
      <h1 className="text-2xl font-bold mb-2 text-gray-900">ID Documents</h1>
      <p className="text-gray-600 mb-6">
        Please upload your identification and proof of address documents for
        verification.
      </p>

      <form onSubmit={handleSubmit} className="space-y-10">
        {/* Section 1: Photo ID */}
        <div>
          <h2 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
            <FiFile className="text-blue-500" /> Photo ID
          </h2>

          <select
            name="photoID"
            value={formData.photoID}
            onChange={(e) =>
              setFormData({ ...formData, photoID: e.target.value })
            }
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            <option value="">Select...</option>
            <option value="Driving License">Driving License</option>
            <option value="Passport">Passport</option>
          </select>

          {/* Upload */}
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:bg-gray-50 transition cursor-pointer">
            <label className="block cursor-pointer">
              <FiUpload className="mx-auto text-2xl text-blue-500 mb-2" />
              <span className="text-sm text-gray-600">Upload Photo ID</span>
              <input
                type="file"
                name="photoIDDoc"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Preview */}
          {formData.photoIDDoc && (
            <div className="mt-3 flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-200">
              <span className="text-sm text-gray-700">
                {formData.photoIDDoc.name}
              </span>
              <button
                type="button"
                onClick={() => removeFile("photoIDDoc")}
                className="text-red-500 hover:text-red-600"
              >
                <FiTrash2 />
              </button>
            </div>
          )}
        </div>

        {/* Section 2: Proof of Address */}
        <div>
          <h2 className="text-lg font-semibold mb-2 text-gray-800 flex items-center gap-2">
            <FiFile className="text-blue-500" /> Proof of Address{" "}
            <span className="text-sm text-gray-500">
              (Bank Statement / Utility Bill)
            </span>
          </h2>

          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:bg-gray-50 transition cursor-pointer">
            <label className="block cursor-pointer">
              <FiUpload className="mx-auto text-2xl text-blue-500 mb-2" />
              <span className="text-sm text-gray-600">Upload Proof</span>
              <input
                type="file"
                name="proofOfAddress"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>

          {formData.proofOfAddress && (
            <div className="mt-3 flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-200">
              <span className="text-sm text-gray-700">
                {formData.proofOfAddress.name}
              </span>
              <button
                type="button"
                onClick={() => removeFile("proofOfAddress")}
                className="text-red-500 hover:text-red-600"
              >
                <FiTrash2 />
              </button>
            </div>
          )}
        </div>

        {/* Section 3: Other Documents */}
        <div>
          <h2 className="text-lg font-semibold mb-2 text-gray-800 flex items-center gap-2">
            <FiFile className="text-blue-500" /> Other Documents
          </h2>

          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:bg-gray-50 transition cursor-pointer">
            <label className="block cursor-pointer">
              <FiUpload className="mx-auto text-2xl text-blue-500 mb-2" />
              <span className="text-sm text-gray-600">Upload Document</span>
              <input
                type="file"
                name="otherDocuments"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>

          {formData.otherDocuments && (
            <div className="mt-3 flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-200">
              <span className="text-sm text-gray-700">
                {formData.otherDocuments.name}
              </span>
              <button
                type="button"
                onClick={() => removeFile("otherDocuments")}
                className="text-red-500 hover:text-red-600"
              >
                <FiTrash2 />
              </button>
            </div>
          )}
        </div>

        {/* Submit */}
        <div className="text-right">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Submit Documents
          </button>
        </div>
      </form>
    </div>
  );
};

export default IDDocuments;
