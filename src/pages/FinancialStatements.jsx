import React from "react";
import { Link } from "react-router-dom";
import { Download, FileText, Calendar } from "lucide-react";

const FinancialStatements = () => {
  const statements = [
    {
      id: 1,
      title: "Profit & Loss Account for year 2016-2017",
      fileUrl:
        "https://taxita.learnify.pk/base/download.php?act=Web&action=ProfitLossAccount&uid=196&tradingYearID=274",
      entryDate: "11 Aug, 2025",
    },
  ];

  return (
    <div className="min-h-screen p-6 bg-white rounded-xl">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">
            Financial Statements
          </h1>
          <p className="text-gray-600">
            Review and download your financial documents.
          </p>
        </div>
        <div className="flex items-center text-sm text-gray-500 mt-2 md:mt-0">
          <Link to="/dashboard" className="hover:underline text-blue-600">
            Dashboard
          </Link>
          <span className="mx-2">/</span>
          <span className=" text-blue-600 cursor-pointer">
            Financial Statements
          </span>
        </div>
      </div>

      {/* Intro Text */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <p className="text-gray-700">
          Financial Statements content goes here. From this page you can access
          all available yearly reports and download them for your records.
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-3 mb-4">
        <button className="px-4 py-2  rounded-xl text-sm font-medium text-white bg-green-600 hover:bg-green-700 cursor-pointer">
          All
        </button>
        <button className="px-4 py-2 rounded-xl text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 cursor-pointer">
          2016-2017
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-2 text-left w-16">S.no</th>
              <th className="px-4 py-2 text-left">Document Title</th>
              <th className="px-4 py-2 text-center">Document File</th>
              <th className="px-4 py-2 text-center">Entry Date</th>
            </tr>
          </thead>
          <tbody>
            {statements.map((doc, index) => (
              <tr
                key={doc.id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-500" />
                  {doc.title}
                </td>
                <td className="px-4 py-2 text-center">
                  <a
                    href={doc.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-1.5 bg-green-600 text-white rounded-lg text-xs font-medium hover:bg-green-700"
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </a>
                </td>
                <td className="px-4 py-2 text-center">
                  <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700 border">
                    <Calendar className="w-3 h-3" /> {doc.entryDate}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Info */}
      <div className="mt-4 text-sm text-gray-500">
        Showing 1 of {statements.length} entries
      </div>
    </div>
  );
};

export default FinancialStatements;
