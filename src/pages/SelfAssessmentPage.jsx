import React, { useState } from "react";
import toast from "react-hot-toast";

const SelfAssessmentPage = () => {
  // ---- Default Data ----
  const defaultBankInterest = [
    {
      description: "Bank and building society interest *",
      sub: "Net Interest Received Banks / Societies",
      gross: 45,
      net: 45,
      tax: 45,
    },
  ];
  const defaultDividends = [
    {
      description: "Dividends *",
      sub: "Net Dividends",
      gross: 45,
      net: 45,
      tax: 45,
    },
  ];
  const defaultTaxableBenefits = [
    { description: "Taxable benefits *", sub: "Amount Received", gross: 45 },
  ];
  const defaultEmployments = [
    {
      employerName: "",
      employerRef: "",
      payrollNumber: "",
      p60Gross: 45,
      p60Net: 45,
      p60Tax: 45,
    },
    {
      employerName: "Example Employer",
      employerRef: 123,
      payrollNumber: 45,
      p60Gross: 5,
      p60Net: 6,
      p60Tax: 6,
    },
  ];
  const defaultPensions = [
    {
      description: "Pension *",
      sub: "Gross pension",
      gross: 6,
      net: 6,
      tax: 6,
    },
    {
      description: "State retirement pension *",
      sub: "Gross pension",
      gross: 6,
      net: 6,
      tax: 6,
    },
  ];
  const defaultOtherSelfEmployment = [
    { description: "Other self employment *", sub: "Profit", gross: 6 },
    { description: "", sub: "Loss", gross: 66 },
  ];
  const defaultLandProperty = [
    { description: "Land and property income *", sub: "Profit", gross: 6 },
    { description: "", sub: "Loss", gross: 0 },
  ];
  const defaultCapitalGains = [
    { description: "Capital gains *", sub: "Total Gains", gross: 6 },
    { description: "", sub: "Losses", gross: 6 },
  ];
  const defaultTrustIncome = [
    { description: "Trust income *", sub: "Amount", gross: 6 },
  ];

  // ---- States ----
  const [bankInterest, setBankInterest] = useState(defaultBankInterest);
  const [dividends, setDividends] = useState(defaultDividends);
  const [taxableBenefits, setTaxableBenefits] = useState(
    defaultTaxableBenefits
  );
  const [employments, setEmployments] = useState(defaultEmployments);
  const [pensions, setPensions] = useState(defaultPensions);
  const [otherSelfEmployment, setOtherSelfEmployment] = useState(
    defaultOtherSelfEmployment
  );
  const [landProperty, setLandProperty] = useState(defaultLandProperty);
  const [capitalGains, setCapitalGains] = useState(defaultCapitalGains);
  const [trustIncome, setTrustIncome] = useState(defaultTrustIncome);
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [errors, setErrors] = useState({}); // <-- For inline errors

  // ---- Handle Change with error reset ----
  const handleChange = (sectionKey, index, field, value, setter) => {
    const newData = [
      ...(setter === setEmployments
        ? employments
        : setter === setBankInterest
        ? bankInterest
        : setter === setDividends
        ? dividends
        : setter === setPensions
        ? pensions
        : setter === setTaxableBenefits
        ? taxableBenefits
        : setter === setOtherSelfEmployment
        ? otherSelfEmployment
        : setter === setLandProperty
        ? landProperty
        : setter === setCapitalGains
        ? capitalGains
        : trustIncome),
    ];
    newData[index][field] = value;
    setter(newData);

    // Clear error for this field
    setErrors((prev) => {
      const newErr = { ...prev };
      if (newErr[sectionKey]?.[index]?.[field]) {
        delete newErr[sectionKey][index][field];
        if (Object.keys(newErr[sectionKey][index]).length === 0)
          delete newErr[sectionKey][index];
        if (Object.keys(newErr[sectionKey]).length === 0)
          delete newErr[sectionKey];
      }
      return newErr;
    });
  };

  // ---- Render Financial Rows with inline errors ----
  const renderFinancialRows = (
    data,
    setter,
    keys,
    sectionKey,
    showNetTax = true
  ) => {
    return data.map((row, idx) => (
      <div
        key={idx}
        className={`grid grid-cols-6 gap-2 items-center mb-2 ${
          idx % 2 === 0 ? "bg-gray-50" : "bg-white"
        } px-2 py-1 rounded hover:bg-gray-100 transition`}
      >
        <div className="col-span-2 font-medium text-gray-700">
          {row[keys[0]]}
        </div>
        <div className="col-span-1 text-gray-500">{row.sub || ""}</div>
        <div className="col-span-1 flex flex-col">
          <input
            type="text"
            value={row[keys[1]] || ""}
            onChange={(e) =>
              handleChange(sectionKey, idx, keys[1], e.target.value, setter)
            }
            className={`border rounded-lg px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${
              errors[sectionKey]?.[idx]?.[keys[1]]
                ? "border-red-500"
                : "border-gray-300"
            }`}
            placeholder="Gross"
          />
          {errors[sectionKey]?.[idx]?.[keys[1]] && (
            <span className="text-red-500 text-xs mt-1">
              {errors[sectionKey][idx][keys[1]]}
            </span>
          )}
        </div>
        {showNetTax && (
          <>
            <div className="col-span-1 flex flex-col">
              <input
                type="text"
                value={row[keys[2]] || ""}
                onChange={(e) =>
                  handleChange(sectionKey, idx, keys[2], e.target.value, setter)
                }
                className={`border rounded-lg px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${
                  errors[sectionKey]?.[idx]?.[keys[2]]
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                placeholder="Net"
              />
              {errors[sectionKey]?.[idx]?.[keys[2]] && (
                <span className="text-red-500 text-xs mt-1">
                  {errors[sectionKey][idx][keys[2]]}
                </span>
              )}
            </div>
            <div className="col-span-1 flex flex-col">
              <input
                type="text"
                value={row[keys[3]] || ""}
                onChange={(e) =>
                  handleChange(sectionKey, idx, keys[3], e.target.value, setter)
                }
                className={`border rounded-lg px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${
                  errors[sectionKey]?.[idx]?.[keys[3]]
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                placeholder="Tax"
              />
              {errors[sectionKey]?.[idx]?.[keys[3]] && (
                <span className="text-red-500 text-xs mt-1">
                  {errors[sectionKey][idx][keys[3]]}
                </span>
              )}
            </div>
          </>
        )}
      </div>
    ));
  };

  // ---- Validate Form ----
  const validateForm = () => {
    const newErrors = {};

    const checkSection = (data, sectionKey, fields) => {
      data.forEach((row, idx) => {
        fields.forEach((field) => {
          if (!row[field] || row[field].toString().trim() === "") {
            if (!newErrors[sectionKey]) newErrors[sectionKey] = {};
            if (!newErrors[sectionKey][idx]) newErrors[sectionKey][idx] = {};
            newErrors[sectionKey][idx][field] = "This field is required";
          }
        });
      });
    };

    checkSection(bankInterest, "bankInterest", ["gross", "net", "tax"]);
    checkSection(dividends, "dividends", ["gross", "net", "tax"]);
    checkSection(taxableBenefits, "taxableBenefits", ["gross"]);
    checkSection(pensions, "pensions", ["gross", "net", "tax"]);
    checkSection(employments, "employments", [
      "employerName",
      "employerRef",
      "p60Gross",
      "p60Net",
      "p60Tax",
    ]);

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ---- Handle Save ----
  const handleSave = () => {
    if (!validateForm()) {
      toast.error("Please fill all required fields correctly!");
      return;
    }
    toast.success("Information saved successfully!");
    // ... You can send data to backend here

    // --- Clear all input fields ---
    setBankInterest(
      defaultBankInterest.map((row) => ({
        ...row,
        gross: "",
        net: "",
        tax: "",
      }))
    );
    setDividends(
      defaultDividends.map((row) => ({ ...row, gross: "", net: "", tax: "" }))
    );
    setTaxableBenefits(
      defaultTaxableBenefits.map((row) => ({ ...row, gross: "" }))
    );
    setEmployments(
      defaultEmployments.map((row) => ({
        ...row,
        employerName: "",
        employerRef: "",
        payrollNumber: "",
        p60Gross: "",
        p60Net: "",
        p60Tax: "",
      }))
    );
    setPensions(
      defaultPensions.map((row) => ({ ...row, gross: "", net: "", tax: "" }))
    );
    setOtherSelfEmployment(
      defaultOtherSelfEmployment.map((row) => ({ ...row, gross: "" }))
    );
    setLandProperty(defaultLandProperty.map((row) => ({ ...row, gross: "" })));
    setCapitalGains(defaultCapitalGains.map((row) => ({ ...row, gross: "" })));
    setTrustIncome(defaultTrustIncome.map((row) => ({ ...row, gross: "" })));
    setAdditionalInfo("");

    // --- Clear errors after reset ---
    setErrors({});
  };

  return (
    <div className="space-y-6 px-6 py-6 bg-white rounded-xl shadow-md relative">
      <div className="font-bold text-xl">SELF ASSESSMENT RETURNS</div>

      <div className="bg-white rounded-lg shadow-md p-6 space-y-4 border-t-4 border-gray-600">
        <h2 className="text-lg font-semibold">
          SELF ASSESSMENT ADDITIONAL RETURN INFORMATION
        </h2>

        <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-gray-600 mb-14">
          <p className="text-gray-700 font-semibold">
            If you receive other income whether this is other employment,
            pensions or investments for example this will need to be included on
            your self assessment return. This information will not be submitted
            until you agree with the final return information so it can be
            recorded whenever you want to make entries and can be changed by you
            if appropriate.
          </p>
          <p className="text-gray-700 mt-2 text-sm">
            -If your only income is from your taxi business then you will
            probably not need to complete anything on this page.
          </p>
        </div>

        {/* Header row */}
        <div className="grid grid-cols-6 gap-2 mb-2 bg-blue-600 text-white font-semibold px-2 py-2 rounded">
          <div className="col-span-2">Description</div>
          <div className="col-span-1">Sub Description</div>
          <div className="col-span-1">Gross</div>
          <div className="col-span-1">Net</div>
          <div className="col-span-1">Tax</div>
        </div>

        {/* Sections */}
        {renderFinancialRows(
          bankInterest,
          setBankInterest,
          ["description", "gross", "net", "tax"],
          "bankInterest"
        )}
        {renderFinancialRows(
          dividends,
          setDividends,
          ["description", "gross", "net", "tax"],
          "dividends"
        )}
        {renderFinancialRows(
          taxableBenefits,
          setTaxableBenefits,
          ["description", "gross", "net", "tax"],
          "taxableBenefits",
          false
        )}

        {/* Employment */}
        <div className="mt-6 space-y-4">
          <div className="font-semibold text-gray-700">Employment</div>
          {employments.map((emp, idx) => (
            <div key={idx} className="space-y-2">
              {/* Employer Name */}
              <div className="grid grid-cols-6 gap-2 items-center">
                <div className="col-span-2 font-medium text-gray-700">
                  Name of employer ({idx + 1}) *
                </div>
                <div className="col-span-4 flex flex-col">
                  <input
                    type="text"
                    value={emp.employerName}
                    onChange={(e) =>
                      handleChange(
                        "employments",
                        idx,
                        "employerName",
                        e.target.value,
                        setEmployments
                      )
                    }
                    className={`border rounded-lg px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${
                      errors.employments?.[idx]?.employerName
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="Enter employer name"
                  />
                  {errors.employments?.[idx]?.employerName && (
                    <span className="text-red-500 text-xs mt-1">
                      {errors.employments[idx].employerName}
                    </span>
                  )}
                </div>
              </div>
              {/* Employer Ref */}
              <div className="grid grid-cols-6 gap-2 items-center">
                <div className="col-span-2 font-medium text-gray-700">
                  Employer reference number ({idx + 1})
                </div>
                <div className="col-span-4 flex flex-col">
                  <input
                    type="text"
                    value={emp.employerRef}
                    onChange={(e) =>
                      handleChange(
                        "employments",
                        idx,
                        "employerRef",
                        e.target.value,
                        setEmployments
                      )
                    }
                    className={`border rounded-lg px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${
                      errors.employments?.[idx]?.employerRef
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="Reference number"
                  />
                  {errors.employments?.[idx]?.employerRef && (
                    <span className="text-red-500 text-xs mt-1">
                      {errors.employments[idx].employerRef}
                    </span>
                  )}
                </div>
              </div>
              {/* P60/P45 */}
              <div className="grid grid-cols-6 gap-2 items-center">
                <div className="col-span-2 font-medium text-gray-700">
                  P60 details or P45 *
                </div>
                <div className="col-span-1 text-gray-500">Gross pay</div>
                <div className="col-span-1 flex flex-col">
                  <input
                    type="text"
                    value={emp.p60Gross}
                    onChange={(e) =>
                      handleChange(
                        "employments",
                        idx,
                        "p60Gross",
                        e.target.value,
                        setEmployments
                      )
                    }
                    className={`border rounded-lg px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${
                      errors.employments?.[idx]?.p60Gross
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {errors.employments?.[idx]?.p60Gross && (
                    <span className="text-red-500 text-xs mt-1">
                      {errors.employments[idx].p60Gross}
                    </span>
                  )}
                </div>
                <div className="col-span-1 flex flex-col">
                  <input
                    type="text"
                    value={emp.p60Net}
                    onChange={(e) =>
                      handleChange(
                        "employments",
                        idx,
                        "p60Net",
                        e.target.value,
                        setEmployments
                      )
                    }
                    className={`border rounded-lg px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${
                      errors.employments?.[idx]?.p60Net
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {errors.employments?.[idx]?.p60Net && (
                    <span className="text-red-500 text-xs mt-1">
                      {errors.employments[idx].p60Net}
                    </span>
                  )}
                </div>
                <div className="col-span-1 flex flex-col">
                  <input
                    type="text"
                    value={emp.p60Tax}
                    onChange={(e) =>
                      handleChange(
                        "employments",
                        idx,
                        "p60Tax",
                        e.target.value,
                        setEmployments
                      )
                    }
                    className={`border rounded-lg px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${
                      errors.employments?.[idx]?.p60Tax
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {errors.employments?.[idx]?.p60Tax && (
                    <span className="text-red-500 text-xs mt-1">
                      {errors.employments[idx].p60Tax}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Other sections */}
        <div className="mt-6 space-y-2">
          <div className="font-semibold text-gray-700">Pension</div>
          {renderFinancialRows(
            pensions,
            setPensions,
            ["description", "gross", "net", "tax"],
            "pensions"
          )}
        </div>
        {renderFinancialRows(
          otherSelfEmployment,
          setOtherSelfEmployment,
          ["description", "gross", "net", "tax"],
          "otherSelfEmployment",
          false
        )}
        {renderFinancialRows(
          landProperty,
          setLandProperty,
          ["description", "gross", "net", "tax"],
          "landProperty",
          false
        )}
        {renderFinancialRows(
          capitalGains,
          setCapitalGains,
          ["description", "gross", "net", "tax"],
          "capitalGains",
          false
        )}
        {renderFinancialRows(
          trustIncome,
          setTrustIncome,
          ["description", "gross", "net", "tax"],
          "trustIncome",
          false
        )}

        {/* Additional Info */}
        <div className="grid grid-cols-6 gap-2 items-start mb-2">
          <div className="col-span-2 font-medium text-gray-700">
            Additional Information
          </div>
          <div className="col-span-4">
            <textarea
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
              rows={4}
              placeholder="Enter additional information here"
            />
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition mt-4"
        >
          Save Information
        </button>

        {/* Info Card after save button */}
        <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-gray-600 mt-4">
          <p className="text-gray-500 text-sm">
            This is information that will be needed to complete your self
            assessment return.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Please ensure that you have this information available as soon after
            05 Apr 2026 as possible, in preparation for your Self Assessment
            return. You may fill in any relevant information in the boxes
            provided and SAVE accordingly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SelfAssessmentPage;
