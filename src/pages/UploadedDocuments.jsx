import React, { useState } from "react";
import { Link } from "react-router-dom";

const UploadedDocuments = () => {
  const [selectAll, setSelectAll] = useState(false);
  const [documents, setDocuments] = useState([]); // Replace with API data

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    // if you have documents with checkboxes, update them here
  };

  return (
    <div className="min-h-screen p-6 bg-white rounded-xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">
            Uploaded Documents
          </h1>
          <p className="text-gray-600">
            Manage, filter and download your uploaded expense documents.
          </p>
        </div>
        <div className="flex items-center text-sm text-gray-500 mt-2 md:mt-0">
          <Link to="/dashboard" className="hover:underline text-blue-600">
            Dashboard
          </Link>
          <span className="mx-2">/</span>
          <span className="text-blue-600">Uploaded Documents</span>
        </div>
      </div>

      {/* Filter Form */}
      <form className="bg-white p-4 rounded-xl shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
          {/* Search (label only) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Search:
            </label>
            <span className="text-gray-500 text-sm">–</span>
          </div>

          {/* Expense Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Expense Type
            </label>
            <select
              name="expType"
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Select</option>
              <option value="Fuel">Fuel</option>
              <option value="Oil">Oil</option>
              <option value="CarTax">Car tax</option>
              <option value="Insurance">Insurance</option>
              <option value="ServicingRepairs">Servicing/repairs</option>
              <option value="Tyres">Tyres</option>
              <option value="VehicleRentalLease">Vehicle rental/lease</option>
              <option value="VehicleLoanInterest">Vehicle loan interest</option>
              <option value="OtherMotorExpenses">Other motor expenses</option>
              <option value="Radio">Radio</option>
              <option value="MobileTelephoneCosts">
                Mobile/telephone costs
              </option>
              <option value="DriverLicencesBadgeMedical">
                Driver/licences/badge/medical
              </option>
              <option value="RepairsRenewalsToEquipment">
                Repairs/renewals to equipment
              </option>
              <option value="LegalAccountancyCosts">
                Legal and accountancy costs
              </option>
              <option value="CarCleaning">Car cleaning/valeting</option>
              <option value="WagesToEmployee">Wages to employee</option>
              <option value="UseHomeOffice">Use of home as office</option>
              <option value="MiscExpenses">Misc/sundry expenses</option>
              <option value="ParkingCharges">Parking/Toll charges</option>
            </select>
          </div>

          {/* From Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              From Date
            </label>
            <input
              type="date"
              name="fromDate"
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* To Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              To Date
            </label>
            <input
              type="date"
              name="toDate"
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Search Button */}
          <div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 text-sm cursor-pointer"
            >
              Search
            </button>
          </div>
        </div>
      </form>

      {/* Select All */}
      <div className="mb-4 flex items-center gap-2">
        <input
          type="checkbox"
          id="checkAll"
          checked={selectAll}
          onChange={handleSelectAll}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor="checkAll" className="text-sm text-gray-700">
          Select All to download selected files in ZIP format.
        </label>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-2 text-left w-16">S.no</th>
              <th className="px-4 py-2 text-left">Expense Type</th>
              <th className="px-4 py-2 text-left">Expense Date</th>
              <th className="px-4 py-2 text-left">Document File</th>
              <th className="px-4 py-2 text-left">Entry Date</th>
            </tr>
          </thead>
          <tbody>
            {documents.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-6 text-center text-gray-500 italic"
                >
                  No records found!
                </td>
              </tr>
            ) : (
              documents.map((doc, index) => (
                <tr
                  key={doc.id}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{doc.expenseType}</td>
                  <td className="px-4 py-2">{doc.expenseDate}</td>
                  <td className="px-4 py-2">{doc.fileName}</td>
                  <td className="px-4 py-2">{doc.entryDate}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UploadedDocuments;
