import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useSelfAssessment } from "../context/SelfAssessmentContext";
import PageHeader from "../components/PageHeader";
import { Calculator, Save, FileText, Building, Users, DollarSign, TrendingUp, Briefcase } from "lucide-react";

// Loading Skeleton Component
const LoadingSkeleton = () => {
  return (
    <div className="min-h-screen bg-white rounded-2xl">
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Header Skeleton */}
        <div className="space-y-4">
          <div className="h-8 bg-gray-200 rounded-lg w-1/3 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
        </div>
        
        {/* Info Card Skeleton */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 space-y-4">
          <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
        </div>

        {/* Table Skeleton */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          {/* Table Header Skeleton */}
          <div className="bg-blue-50 p-4">
            <div className="grid grid-cols-6 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-4 bg-blue-200 rounded animate-pulse"></div>
              ))}
            </div>
          </div>
          
          {/* Table Rows Skeleton */}
          <div className="p-6 space-y-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className={`grid grid-cols-6 gap-4 p-4 rounded-lg ${i % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
                <div className="col-span-2 h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="col-span-1 h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="col-span-1 h-8 bg-gray-200 rounded animate-pulse"></div>
                <div className="col-span-1 h-8 bg-gray-200 rounded animate-pulse"></div>
                <div className="col-span-1 h-8 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Employment Section Skeleton */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-6">
          <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse"></div>
          {[...Array(2)].map((_, i) => (
            <div key={i} className="space-y-4 p-4 border border-gray-100 rounded-lg">
              {[...Array(4)].map((_, j) => (
                <div key={j} className="grid grid-cols-6 gap-4">
                  <div className="col-span-2 h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="col-span-4 h-8 bg-gray-200 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Save Button Skeleton */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <div className="h-5 bg-gray-200 rounded w-32 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-48 animate-pulse"></div>
            </div>
            <div className="h-12 w-40 bg-gray-200 rounded-xl animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SelfAssessmentPage = () => {
  // ---- Context ----
  const {
    selfAssessmentData,
    hasExistingData,
    isLoading,
    isSaving,
    fetchSelfAssessmentData,
    saveSelfAssessmentData
  } = useSelfAssessment();

  // ---- Default Data ----
  const defaultBankInterest = [
    {
      description: "Bank and building society interest *",
      sub: "Net Interest Received Banks / Societies",
      gross: "",
      net: "",
      tax: "",
    },
  ];
  const defaultDividends = [
    {
      description: "Dividends *",
      sub: "Net Dividends",
      gross: "",
      net: "",
      tax: "",
    },
  ];
  const defaultTaxableBenefits = [
    { description: "Taxable benefits *", sub: "Amount Received", gross: "" },
  ];
  const defaultEmployments = [
    {
      employerName: "",
      employerRef: "",
      payrollNumber: "",
      p60Gross: "",
      p60Net: "",
      p60Tax: "",
    },
    {
      employerName: "",
      employerRef: "",
      payrollNumber: "",
      p60Gross: "",
      p60Net: "",
      p60Tax: "",
    },
  ];
  const defaultPensions = [
    {
      description: "Pension *",
      sub: "Gross pension",
      gross: "",
      net: "",
      tax: "",
    },
    {
      description: "State retirement pension *",
      sub: "Gross pension",
      gross: "",
      net: "",
      tax: "",
    },
  ];
  const defaultOtherSelfEmployment = [
    { description: "Other self employment *", sub: "Profit", gross: "" },
    { description: "", sub: "Loss", gross: "" },
  ];
  const defaultLandProperty = [
    { description: "Land and property income *", sub: "Profit", gross: "" },
    { description: "", sub: "Loss", gross: "" },
  ];
  const defaultCapitalGains = [
    { description: "Capital gains *", sub: "Total Gains", gross: "" },
    { description: "", sub: "Losses", gross: "" },
  ];
  const defaultTrustIncome = [
    { description: "Trust income *", sub: "Amount", gross: "" },
  ];

  // ---- States ----
  const [bankInterest, setBankInterest] = useState(defaultBankInterest);
  const [dividends, setDividends] = useState(defaultDividends);
  const [taxableBenefits, setTaxableBenefits] = useState(defaultTaxableBenefits);
  const [employments, setEmployments] = useState(defaultEmployments);
  const [pensions, setPensions] = useState(defaultPensions);
  const [otherSelfEmployment, setOtherSelfEmployment] = useState(defaultOtherSelfEmployment);
  const [landProperty, setLandProperty] = useState(defaultLandProperty);
  const [capitalGains, setCapitalGains] = useState(defaultCapitalGains);
  const [trustIncome, setTrustIncome] = useState(defaultTrustIncome);
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [errors, setErrors] = useState({});

  // ---- Effects ----
  useEffect(() => {
    // Populate form when selfAssessmentData changes
    if (selfAssessmentData) {
      populateFormWithData(selfAssessmentData);
    }
  }, [selfAssessmentData]);

  const populateFormWithData = (data) => {
    // Bank Interest
    setBankInterest([{
      ...defaultBankInterest[0],
      gross: data.gross_interest_received || "",
      net: data.net_interest_received || "",
      tax: data.tax_interest_received || "",
    }]);

    // Dividends
    setDividends([{
      ...defaultDividends[0],
      gross: data.gross_dividends || "",
      net: data.net_dividends || "",
      tax: data.tax_dividends || "",
    }]);

    // Taxable Benefits
    setTaxableBenefits([{
      ...defaultTaxableBenefits[0],
      gross: data.taxable_benefits_received || "",
    }]);

    // Employments
    setEmployments([
      {
        employerName: data.name_of_employer || "",
        employerRef: data.employer_refno || "",
        payrollNumber: data.payroll_number || "",
        p60Gross: data.p60_gross || "",
        p60Net: data.p60_net || "",
        p60Tax: data.p60_tax || "",
      },
      {
        employerName: data.name_of_employer2 || "",
        employerRef: data.employer_refno2 || "",
        payrollNumber: data.payroll_number2 || "",
        p60Gross: data.p60_gross2 || "",
        p60Net: data.p60_net2 || "",
        p60Tax: data.p60_tax2 || "",
      },
    ]);

    // Pensions
    setPensions([
      {
        ...defaultPensions[0],
        gross: data.pension_gross || "",
        net: data.pension_net || "",
        tax: data.pension_tax || "",
      },
      {
        ...defaultPensions[1],
        gross: data.state_ret_pension_gross || "",
        net: data.state_ret_pension_net || "",
        tax: data.state_ret_pension_tax || "",
      },
    ]);

    // Other Self Employment
    setOtherSelfEmployment([
      {
        ...defaultOtherSelfEmployment[0],
        gross: data.other_se_profit || "",
      },
      {
        ...defaultOtherSelfEmployment[1],
        gross: data.other_se_loss || "",
      },
    ]);

    // Land Property
    setLandProperty([
      {
        ...defaultLandProperty[0],
        gross: data.land_prop_income || "",
      },
      {
        ...defaultLandProperty[1],
        gross: data.land_prop_loss || "",
      },
    ]);

    // Capital Gains
    setCapitalGains([
      {
        ...defaultCapitalGains[0],
        gross: data.total_capital_gains || "",
      },
      {
        ...defaultCapitalGains[1],
        gross: data.total_capital_losses || "",
      },
    ]);

    // Trust Income
    setTrustIncome([{
      ...defaultTrustIncome[0],
      gross: data.total_income_amount || "",
    }]);

    // Additional Info
    setAdditionalInfo(data.additional_info || "");
  };

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
        } px-2 py-1 rounded-lg hover:bg-gray-100 transition`}
      >
        <div className="col-span-2 font-medium text-gray-700">
          {row[keys[0]]}
        </div>
        <div className="col-span-1 text-gray-500">{row.sub || ""}</div>
        <div className="col-span-1 flex flex-col">
          <input
            type="number"
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
                type="number"
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
                type="number"
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

  // ---- Prepare API Data ----
  const prepareApiData = () => {
    return {
      // Bank Interest (first entry)
      gross_interest_received: parseFloat(bankInterest[0]?.gross) || 0,
      net_interest_received: parseFloat(bankInterest[0]?.net) || 0,
      tax_interest_received: parseFloat(bankInterest[0]?.tax) || 0,
      
      // Dividends (first entry)
      gross_dividends: parseFloat(dividends[0]?.gross) || 0,
      net_dividends: parseFloat(dividends[0]?.net) || 0,
      tax_dividends: parseFloat(dividends[0]?.tax) || 0,
      
      // Taxable Benefits (first entry)
      taxable_benefits_received: parseFloat(taxableBenefits[0]?.gross) || 0,
      
      // Employment 1 (first employer)
      name_of_employer: employments[0]?.employerName || "",
      employer_refno: employments[0]?.employerRef || "",
      payroll_number: employments[0]?.payrollNumber || "",
      p60_gross: parseFloat(employments[0]?.p60Gross) || 0,
      p60_net: parseFloat(employments[0]?.p60Net) || 0,
      p60_tax: parseFloat(employments[0]?.p60Tax) || 0,
      
      // Employment 2 (second employer)
      name_of_employer2: employments[1]?.employerName || "",
      employer_refno2: employments[1]?.employerRef || "",
      payroll_number2: employments[1]?.payrollNumber || "",
      p60_gross2: parseFloat(employments[1]?.p60Gross) || 0,
      p60_net2: parseFloat(employments[1]?.p60Net) || 0,
      p60_tax2: parseFloat(employments[1]?.p60Tax) || 0,
      
      // Pensions
      pension_gross: parseFloat(pensions[0]?.gross) || 0,
      pension_net: parseFloat(pensions[0]?.net) || 0,
      pension_tax: parseFloat(pensions[0]?.tax) || 0,
      state_ret_pension_gross: parseFloat(pensions[1]?.gross) || 0,
      state_ret_pension_net: parseFloat(pensions[1]?.net) || 0,
      state_ret_pension_tax: parseFloat(pensions[1]?.tax) || 0,
      
      // Other Self Employment
      other_se_profit: parseFloat(otherSelfEmployment[0]?.gross) || 0,
      other_se_loss: parseFloat(otherSelfEmployment[1]?.gross) || 0,
      
      // Land Property
      land_prop_income: parseFloat(landProperty[0]?.gross) || 0,
      land_prop_loss: parseFloat(landProperty[1]?.gross) || 0,
      
      // Capital Gains
      total_capital_gains: parseFloat(capitalGains[0]?.gross) || 0,
      total_capital_losses: parseFloat(capitalGains[1]?.gross) || 0,
      
      // Trust Income
      total_income_amount: parseFloat(trustIncome[0]?.gross) || 0,
      
      // Additional Info
      additional_info: additionalInfo || ""
    };
  };

  // ---- Handle Save ----
  const handleSave = async () => {
    if (!validateForm()) {
      toast.error("Please fill all required fields correctly!");
      return;
    }

    const apiData = prepareApiData();
    console.log("👉 Sending to API:", apiData);

    const success = await saveSelfAssessmentData(apiData);
    if (success) {
      // The context will handle the success message and state updates
      console.log("✅ Self Assessment data saved successfully");
    }
  };

  // ---- Handle Clear Form ----
  const handleClearForm = () => {
    setBankInterest(defaultBankInterest);
    setDividends(defaultDividends);
    setTaxableBenefits(defaultTaxableBenefits);
    setEmployments(defaultEmployments);
    setPensions(defaultPensions);
    setOtherSelfEmployment(defaultOtherSelfEmployment);
    setLandProperty(defaultLandProperty);
    setCapitalGains(defaultCapitalGains);
    setTrustIncome(defaultTrustIncome);
    setAdditionalInfo("");
    setErrors({});
    toast.success("Form cleared successfully!");
  };

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="min-h-screen bg-white rounded-2xl">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <PageHeader
          icon={<FileText />}
          title="Self Assessment Returns"
          currentPage="Self Assessment Returns"
          showTradingYear={false}
          subtitle="Record additional income information for your self assessment return."
        />

        {/* Information Card */}
        <div className="mb-8 bg-blue-50 rounded-2xl p-6 border border-blue-100">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-600 rounded-xl">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Self Assessment Additional Return Information
              </h3>
              <div className="space-y-3 text-gray-800">
                <p className="font-medium">
                  If you receive other income whether this is other employment, pensions or investments 
                  for example this will need to be included on your self assessment return. This information 
                  will not be submitted until you agree with the final return information so it can be 
                  recorded whenever you want to make entries and can be changed by you if appropriate.
                </p>
                <p className="text-sm bg-blue-200/50 p-3 rounded-lg border-l-4 border-blue-500">
                  <strong>Note:</strong> If your only income is from your taxi business then you will 
                  probably not need to complete anything on this page.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Financial Data Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8">
          {/* Header row */}
          <div className="bg-blue-50 text-gray-800">
            <div className="grid grid-cols-6 gap-2 px-6 py-4 font-semibold">
              <div className="col-span-2 flex items-center gap-2">
                Description
              </div>
              <div className="col-span-1">Sub Description</div>
              <div className="col-span-1">Gross</div>
              <div className="col-span-1">Net</div>
              <div className="col-span-1">Tax</div>
            </div>
          </div>

          <div className="p-6">
            {/* Financial Sections */}
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

            <div className="mt-8 mb-4">
              <div className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                <Users className="w-5 h-5 text-blue-600" />
                Pension Information
              </div>
            </div>
            {renderFinancialRows(
              pensions,
              setPensions,
              ["description", "gross", "net", "tax"],
              "pensions"
            )}
            
            <div className="mt-6">
              {renderFinancialRows(
                otherSelfEmployment,
                setOtherSelfEmployment,
                ["description", "gross", "net", "tax"],
                "otherSelfEmployment",
                false
              )}
            </div>

            <div className="mt-6">
              {renderFinancialRows(
                landProperty,
                setLandProperty,
                ["description", "gross", "net", "tax"],
                "landProperty",
                false
              )}
            </div>

            <div className="mt-6">
              {renderFinancialRows(
                capitalGains,
                setCapitalGains,
                ["description", "gross", "net", "tax"],
                "capitalGains",
                false
              )}
            </div>

            <div className="mt-6">
              {renderFinancialRows(
                trustIncome,
                setTrustIncome,
                ["description", "gross", "net", "tax"],
                "trustIncome",
                false
              )}
            </div>
          </div>
        </div>

        {/* Employment Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8">
          <div className="bg-green-50 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/80 rounded-lg">
                <Briefcase className="w-6 h-6 text-green-700" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-green-900">Employment Information</h2>
                <p className="text-green-700 text-sm mt-1">Details for up to two employers</p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-8">
            {employments.map((emp, idx) => (
              <div key={idx} className="bg-gray-50 rounded-xl p-6 space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                  Employer {idx + 1}
                </h3>
                
                {/* Employer Name */}
                <div className="grid grid-cols-6 gap-4 items-center">
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
                      className={`border rounded-lg px-4 py-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${
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
                <div className="grid grid-cols-6 gap-4 items-center">
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
                      className={`border rounded-lg px-4 py-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${
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
                
                {/* Payroll Number */}
                <div className="grid grid-cols-6 gap-4 items-center">
                  <div className="col-span-2 font-medium text-gray-700">
                    Payroll Number ({idx + 1})
                  </div>
                  <div className="col-span-4 flex flex-col">
                    <input
                      type="text"
                      value={emp.payrollNumber}
                      onChange={(e) =>
                        handleChange(
                          "employments",
                          idx,
                          "payrollNumber",
                          e.target.value,
                          setEmployments
                        )
                      }
                      className={`border rounded-lg px-4 py-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${
                        errors.employments?.[idx]?.payrollNumber
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="Payroll number"
                    />
                    {errors.employments?.[idx]?.payrollNumber && (
                      <span className="text-red-500 text-xs mt-1">
                        {errors.employments[idx].payrollNumber}
                      </span>
                    )}
                  </div>
                </div>
                
                {/* P60/P45 */}
                <div className="grid grid-cols-6 gap-4 items-center">
                  <div className="col-span-2 font-medium text-gray-700">
                    P60 details or P45 *
                  </div>
                  <div className="col-span-1 text-gray-500 text-sm">Gross pay</div>
                  <div className="col-span-1 flex flex-col">
                    <input
                      type="number"
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
                      placeholder="Gross"
                    />
                    {errors.employments?.[idx]?.p60Gross && (
                      <span className="text-red-500 text-xs mt-1">
                        {errors.employments[idx].p60Gross}
                      </span>
                    )}
                  </div>
                  <div className="col-span-1 flex flex-col">
                    <input
                      type="number"
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
                      placeholder="Net"
                    />
                    {errors.employments?.[idx]?.p60Net && (
                      <span className="text-red-500 text-xs mt-1">
                        {errors.employments[idx].p60Net}
                      </span>
                    )}
                  </div>
                  <div className="col-span-1 flex flex-col">
                    <input
                      type="number"
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
                      placeholder="Tax"
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
        </div>

        {/* Additional Information Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8">
          <div className="bg-purple-50 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/80 rounded-lg">
                <FileText className="w-6 h-6 text-purple-700" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-purple-900">Additional Information</h2>
                <p className="text-purple-700 text-sm mt-1">Any other relevant details for your assessment</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <textarea
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              className="w-full border border-gray-300 rounded-xl p-4 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition resize-none"
              rows={6}
              placeholder="Enter any additional information relevant to your self assessment return..."
            />
          </div>
        </div>

        {/* Save Button Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="text-center sm:text-left">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                Ready to Save Your Information?
              </h3>
              <p className="text-gray-600 text-sm mt-1">
                This information will be used to prepare your self assessment return
              </p>
            </div>

            <button
              onClick={handleSave}
              disabled={isSaving}
              className={`flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-200 transform ${
                isSaving
                  ? "bg-gray-400 cursor-not-allowed scale-95"
                  : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 hover:scale-105 shadow-lg hover:shadow-xl"
              }`}
            >
              {isSaving ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  {hasExistingData ? "Updating..." : "Saving..."}
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  {hasExistingData ? "Update Information" : "Save Information"}
                </>
              )}
            </button>
          </div>
        </div>

        {/* Info Footer Card */}
        <div className="mt-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-gray-600 rounded-xl">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Important Information</h3>
              <div className="space-y-2 text-gray-700 text-sm">
                <p>
                  This is information that will be needed to complete your self assessment return.
                </p>
                <p>
                  Please ensure that you have this information available as soon after 05 Apr 2026 as possible, 
                  in preparation for your Self Assessment return. You may fill in any relevant information in the 
                  boxes provided and SAVE accordingly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelfAssessmentPage;