import axiosInstance from "./axiosInstance";
// Dashboard api
export const dashboardApi = () => {
  return axiosInstance.get("/dashboard");
};

// Transaction api for income and expense
export const createTransactionApi = (data) => {
  if (data instanceof FormData) {
    // Axios will auto-set multipart boundary
    return axiosInstance.post("/transactions", data);
  }
  return axiosInstance.post("/transactions", data, {
    headers: { "Content-Type": "application/json" },
  });
};

// /transactions/get-transactions post api
export const getTransactionsApi = (data) => {
  return axiosInstance.post("/transactions/get-transactions", data);
};

// /transactions/96 delete api
export const deleteTransactionApi = (id) => {
  return axiosInstance.delete(`/transactions/${id}`);
};

// /transactions/update/107 post api
export const updateTransactionApi = (id, data) => {
  if (data instanceof FormData) {
    // Axios will auto-set multipart boundary
    return axiosInstance.post(`/transactions/update/${id}`, data);
  }
};

// Weekly income api
export const weeklyIncomeApi = () => {
  return axiosInstance.get("/weekly-income");
};




// -------- Income Weeks & Days --------

// Get list of weeks
export const incomeWeeks = () => axiosInstance.get("/income/weeks");

// Get days of a specific week (dynamic)
export const incomeDays = (weekNumber) =>
  axiosInstance.get(`/income-weeks/${weekNumber}/days`);

// Weekly expenses api
export const weeklyExpensesApi = () => {
  return axiosInstance.get("/weekly-expenses");
};





// -------- expense Weeks & Days --------

// expense weeks api
export const expenseWeeksApi = () => axiosInstance.get("/expense/weeks");

// expense days api
export const expenseDaysApi = (weekNumber) => {
  return axiosInstance.get(`/expense-weeks/${weekNumber}/days`);
};

// buy / renewal plains
export const plainsApi = () => axiosInstance.get("/plans");






//-------- Trading Years --------

// previous-trading-years
export const previousTradingYearApi = () =>
  axiosInstance.get("/previous-trading-years");

// Get trading years with detailed info including IDs (for finalize functionality)
export const tradingYearsWithDetailsApi = () =>
  axiosInstance.get("/tradingyears");


// register-trading-year
export const registerTradingYearApi = (data) => {
  return axiosInstance.post("/register-trading-year", data);
};

// /trading-year/activate
export const activateTradingYearApi = (data) => {
  return axiosInstance.post(`/trading-year/activate`, data);
};



// finalize-trading-year
export const finalizeTradingYearApi = (data) => {
  return axiosInstance.post("/trading-year/finalize", data);
};







// --------------------------- /vehicles -------------------------------------------

// /vehicles
export const vehiclesApi = (data) => {
  return axiosInstance.post("/vehicles", data);
};

// /dvla-enquiry
export const dvlaEnquiryApi = (data) => {
  return axiosInstance.post("/dvla-enquiry", data);
};

// vehicles get all
export const vehiclesGetAllApi = () => {
  return axiosInstance.get("/vehicles");
};

// vehicles get single
export const vehiclesGetSingleApi = (id) => {
  return axiosInstance.get(`/vehicles/${id}`);
};

// vehicles delete
export const vehiclesDeleteApi = (id) => {
  return axiosInstance.delete(`/vehicles/${id}`);
};

// vehicles update
export const vehiclesUpdateApi = (id, data) => {
  return axiosInstance.put(`/vehicles/${id}`, data);
};











// --------------------------- Percentage Adjustment -------------------------------------------

//percentage-adjustments Post Api
export const percentageAdjustmentsPostApi = (data) => {
  return axiosInstance.post("/percentage-adjustments", data);
};

// /percentage-adjustments/2 Put Api
export const percentageAdjustmentsPutApi = (id, data) => {
  return axiosInstance.put(`/percentage-adjustments/${id}`, data);
};

// /percentage-adjustments get api  index listing
export const percentageAdjustmentsGetAllApi = () => {
  return axiosInstance.get("/percentage-adjustments");
};










// -----------------------------------  self-assessment-returns -------------------------------------------

// self-assessment-returns Post Api
export const selfAssessmentReturnsPostApi = (data) => {
  return axiosInstance.post("/self-assessment-return", data);
};

// self-assessment-returns get api
export const selfAssessmentReturnsGetAllApi = () => {
  return axiosInstance.get("/self-assessment-return");
};







// ------------------------Documents  ------------------------

// documents
export const documentsApi = () => {
  return axiosInstance.get("/documents");
};

// /documents/81/download
export const documentsDownloadApi = (id, config = {}) => {
  return axiosInstance.get(`/documents/${id}/download`, config);
};








// ------------------------- /id-document-types  ------------------------

// id-document-types
export const idDocumentTypesApi = () => {
  return axiosInstance.get("/id-document-types");
};

// /id-document post
export const idDocumentPostApi = (data) => {
  return axiosInstance.post("/id-document", data);
};

// /id-documents/3 update
export const idDocumentUpdateApi = (id, data) => {
  return axiosInstance.post(`/id-documents/${id}`, data);
};

// /id-documents/2 delete
export const idDocumentDeleteApi = (id) => {
  return axiosInstance.delete(`/id-documents/${id}`);
};

// /id-documents get all
export const idDocumentGetAllApi = () => {
  return axiosInstance.get("/id-documents");
};

export const idDocumentDownloadApi = (id) => {
  return axiosInstance.get(`/id-document/${id}/download`, {
    responseType: "blob", // 👈 Important so browser knows it’s a file
  });
};








// ------------------------- /profile settings  ------------------------
//  /profile-setting get
export const profileSettingGetApi = () => {
  return axiosInstance.get("/profile-setting");
};


//  /profile-setting put
export const profileSettingPutApi = (data) => {
  return axiosInstance.post("/profile-setting", data);
};


// /profile-setting/image
export const profileSettingImageApi = (data) => {
  return axiosInstance.post("/profile-setting/image", data);
};

// /change-password
export const changePasswordApi = (data) => {
  return axiosInstance.post("/change-password", data);
};


// /get-roles
export const getRolesApi = () => {
  return axiosInstance.get("/get-roles");
};



// Get Local Councils API
export const getLocalCouncilsApi = () => {
  return axiosInstance.get("/local-councils");
};


// ------------------------------------------ Get  profile image -----------------------------------

// get-profile-image
export const getProfileImage = () =>{
  return axiosInstance.get("/get-profile-image")
}




// /profile-image-download
export const downloadProfileImageApi = () => {
  return axiosInstance.get(`/profile-image-download`, {
    responseType: 'blob'  // This tells Axios to handle binary data
  });
};



// ------------------------------------------ profile address -----------------------------------

//  index show all /profile-address
export const allProfileAddresses = () => {
  return axiosInstance.get("/profile-address");
};


// /profile-address/2 get single
export const singleProfileAddress = (id) => {
  return axiosInstance.get(`/profile-address/${id}`);
};


// /profile-address post
export const createProfileAddress = (data) => {
  return axiosInstance.post("/profile-address", data);
};


// /profile-address/2 put
export const updateProfileAddress = (id, data) => {
  return axiosInstance.put(`/profile-address/${id}`, data);
};

// /profile-address/2 delete
export const deleteProfileAddress = (id) => {
  return axiosInstance.delete(`/profile-address/${id}`);
};


















// ------------------------------------------ Financial Statements  -----------------------------------



// /get-financials 
export const getFinancialsApi = ()=>{
  return axiosInstance.get("/get-financials")
}



// downloadFinancialApi
export const downloadFinancialApi = (id) => {
  return axiosInstance.get(`/financial/${id}/download`, {
    responseType: 'blob'  // This tells Axios to handle binary data
  });
};



















// ------------------------------------------ Profit and lose  -----------------------------------

// /rolling-profit-and-loss
export const getProfitAndLoss = ()=>{
  return axiosInstance.get("/rolling-profit-and-loss")
}





// ------------------------------------------ NI UTR    -----------------------------------

// utr/apply method Post
export const applyUTRapi = (data)=>{
  return axiosInstance.post(`/utr/apply`,data)
}


// your_name : Muhammad Ishaq
// contact_number :999999999999
// your_message : apply for utr

// {
// 	"success": true,
// 	"message": "Your application has been successfully submitted, stay tuned.",
// 	"data": {
  // 		"user_id": 2,
// 		"your_name": "Muhammad Ishaq",
// 		"contact_number": "999999999999",
// 		"your_message": "apply for utr",
// 		"status": 0,
// 		"updated_at": "2025-09-24T07:44:18.000000Z",
// 		"created_at": "2025-09-24T07:44:18.000000Z",
// 		"id": 3
// 	}
// }










// /utr/store method Post
export const storeUTRapi = (data)=>{
  return axiosInstance.post(`/utr/store`,data)
}

// body
// national_insurance : QQ123456C
// unique_tax_reference : 1234567890


// {
// 	"success": true,
// 	"message": "UTR details saved successfully",
// 	"data": {
// 		"id": 1,
// 		"user_id": 2,
// 		"national_insurance": "QQ123456C",
// 		"unique_tax_reference": "1234567890",
// 		"created_at": "2025-09-24T07:09:58.000000Z",
// 		"updated_at": "2025-09-24T07:09:58.000000Z"
// 	}
// }















// /utr/show
export const showUTRapi = ()=>{
  return axiosInstance.get("/utr/show")
}


// {
// 	"success": true,
// 	"data": {
// 		"id": 1,
// 		"user_id": 2,
// 		"national_insurance": "QQ123456C",
// 		"unique_tax_reference": "1234567890",
// 		"created_at": "2025-09-24T07:09:58.000000Z",
// 		"updated_at": "2025-09-24T07:09:58.000000Z"
// 	}
// }









// --------------------------------------------------/accounts ----------------------------------------




// /accounts
export const getAccountsApi = ()=>{
  return axiosInstance.get("/accounts")
}



// account response real data this is teh real response in the api i just apst it 
// [
// 	{
// 		"id": 1,
// 		"type_id": 1,
// 		"name": "Cash Account",
// 		"short_name": "cash_account",
// 		"category_name": "Income",
// 		"description": "Cash Account",
// 		"created_at": "2021-07-17T23:24:21.000000Z",
// 		"updated_at": "2021-07-18T00:39:11.000000Z"
// 	},
// 	{
// 		"id": 2,
// 		"type_id": 1,
// 		"name": "Card Account",
// 		"short_name": "card_account",
// 		"category_name": "Income",
// 		"description": "Card Account",
// 		"created_at": "2021-07-17T23:24:32.000000Z",
// 		"updated_at": "2021-07-17T23:24:32.000000Z"
// 	},
// 	{
// 		"id": 3,
// 		"type_id": 1,
// 		"name": "Contract Account",
// 		"short_name": "contract_account",
// 		"category_name": "Income",
// 		"description": "Contract Account",
// 		"created_at": "2021-07-17T23:24:50.000000Z",
// 		"updated_at": "2021-07-17T23:24:50.000000Z"
// 	},
// 	{
// 		"id": 4,
// 		"type_id": 1,
// 		"name": "Sub Contract Account",
// 		"short_name": "sub_contract_account",
// 		"category_name": "Income",
// 		"description": "Sub Contract Account",
// 		"created_at": "2021-07-17T23:25:03.000000Z",
// 		"updated_at": "2021-07-17T23:25:03.000000Z"
// 	},
// 	{
// 		"id": 5,
// 		"type_id": 1,
// 		"name": "Rental Income Account",
// 		"short_name": "rental_income_account",
// 		"category_name": "Rental Income",
// 		"description": "Rental Income Account",
// 		"created_at": "2021-07-17T23:25:21.000000Z",
// 		"updated_at": "2021-07-17T23:25:21.000000Z"
// 	},
// 	{
// 		"id": 6,
// 		"type_id": 2,
// 		"name": "Fuel",
// 		"short_name": "fuel",
// 		"category_name": "Motor Expenses",
// 		"description": "Fuel",
// 		"created_at": "2021-07-17T23:26:42.000000Z",
// 		"updated_at": "2021-07-17T23:26:42.000000Z"
// 	},
// 	{
// 		"id": 7,
// 		"type_id": 2,
// 		"name": "Oil",
// 		"short_name": "oil",
// 		"category_name": "Motor Expenses",
// 		"description": "Oil",
// 		"created_at": "2021-07-17T23:26:53.000000Z",
// 		"updated_at": "2021-07-17T23:26:53.000000Z"
// 	},
// 	{
// 		"id": 8,
// 		"type_id": 2,
// 		"name": "Car Tax",
// 		"short_name": "car_tax",
// 		"category_name": "Motor Expenses",
// 		"description": "Car Tax",
// 		"created_at": "2021-07-17T23:27:02.000000Z",
// 		"updated_at": "2021-07-17T23:27:02.000000Z"
// 	},
// 	{
// 		"id": 9,
// 		"type_id": 2,
// 		"name": "Insurance",
// 		"short_name": "insurance",
// 		"category_name": "Motor Expenses",
// 		"description": "Insurance",
// 		"created_at": "2021-07-17T23:27:10.000000Z",
// 		"updated_at": "2021-07-17T23:27:10.000000Z"
// 	},
// 	{
// 		"id": 10,
// 		"type_id": 2,
// 		"name": "Servicing / Repairs",
// 		"short_name": "servicing_repairs",
// 		"category_name": "Motor Expenses",
// 		"description": "Servicing / Repairs",
// 		"created_at": "2021-07-17T23:27:21.000000Z",
// 		"updated_at": "2021-07-17T23:27:21.000000Z"
// 	},
// 	{
// 		"id": 11,
// 		"type_id": 2,
// 		"name": "Tyres",
// 		"short_name": "tyres",
// 		"category_name": "Motor Expenses",
// 		"description": "Tyres",
// 		"created_at": "2021-07-17T23:27:32.000000Z",
// 		"updated_at": "2021-07-17T23:27:32.000000Z"
// 	},
// 	{
// 		"id": 12,
// 		"type_id": 2,
// 		"name": "Vehicle Rental Lease",
// 		"short_name": "vehicle_rental_lease",
// 		"category_name": "Motor Expenses",
// 		"description": "Vehicle Rental Lease",
// 		"created_at": "2021-07-17T23:27:42.000000Z",
// 		"updated_at": "2021-07-17T23:27:42.000000Z"
// 	},
// 	{
// 		"id": 13,
// 		"type_id": 2,
// 		"name": "Vehicle loan interest",
// 		"short_name": "vehicle_loan_interest",
// 		"category_name": "Motor Expenses",
// 		"description": "Vehicle loan interest",
// 		"created_at": "2021-07-17T23:27:55.000000Z",
// 		"updated_at": "2021-07-17T23:27:55.000000Z"
// 	},
// 	{
// 		"id": 14,
// 		"type_id": 2,
// 		"name": "Other motor expenses",
// 		"short_name": "other_motor_expenses",
// 		"category_name": "Motor Expenses",
// 		"description": "Other motor expenses",
// 		"created_at": "2021-07-17T23:28:10.000000Z",
// 		"updated_at": "2021-07-17T23:28:10.000000Z"
// 	},
// 	{
// 		"id": 15,
// 		"type_id": 2,
// 		"name": "Radio Rent / Commission fee / Subscription fee",
// 		"short_name": "radio_rent",
// 		"category_name": "Radio Expenses",
// 		"description": "Radio Rent / Commission fee / Subscription fee",
// 		"created_at": "2021-07-17T23:31:34.000000Z",
// 		"updated_at": "2021-07-17T23:31:34.000000Z"
// 	},
// 	{
// 		"id": 16,
// 		"type_id": 2,
// 		"name": "Mobile / Telephone costs",
// 		"short_name": "mobile_telephone_costs",
// 		"category_name": "Additional Expenses",
// 		"description": "Mobile / Telephone costs",
// 		"created_at": "2021-07-17T23:31:43.000000Z",
// 		"updated_at": "2021-07-17T23:31:43.000000Z"
// 	},
// 	{
// 		"id": 17,
// 		"type_id": 2,
// 		"name": "Driver / Licences / Badge / Medical",
// 		"short_name": "driver_licence_badge_medical",
// 		"category_name": "Additional Expenses",
// 		"description": "Driver / Licences / Badge / Medical",
// 		"created_at": "2021-07-17T23:31:52.000000Z",
// 		"updated_at": "2021-07-17T23:31:52.000000Z"
// 	},
// 	{
// 		"id": 18,
// 		"type_id": 2,
// 		"name": "Repairs / Renewals to equipment",
// 		"short_name": "repair_renewals_equipment",
// 		"category_name": "Additional Expenses",
// 		"description": "Repairs / Renewals to equipment",
// 		"created_at": "2021-07-17T23:32:02.000000Z",
// 		"updated_at": "2021-07-17T23:32:02.000000Z"
// 	},
// 	{
// 		"id": 19,
// 		"type_id": 2,
// 		"name": "Legal and accountancy costs",
// 		"short_name": "legal_accountancy_costs",
// 		"category_name": "Additional Expenses",
// 		"description": "Legal and accountancy costs",
// 		"created_at": "2021-07-17T23:32:11.000000Z",
// 		"updated_at": "2021-07-17T23:32:11.000000Z"
// 	},
// 	{
// 		"id": 20,
// 		"type_id": 2,
// 		"name": "Car cleaning / Valeting",
// 		"short_name": "car_cleaning_valeting",
// 		"category_name": "Additional Expenses",
// 		"description": "Car cleaning / Valeting",
// 		"created_at": "2021-07-17T23:32:20.000000Z",
// 		"updated_at": "2021-07-17T23:32:20.000000Z"
// 	},
// 	{
// 		"id": 21,
// 		"type_id": 2,
// 		"name": "Wages to employee",
// 		"short_name": "wages_to_employee",
// 		"category_name": "Additional Expenses",
// 		"description": "Wages to employee",
// 		"created_at": "2021-07-17T23:32:29.000000Z",
// 		"updated_at": "2021-07-17T23:32:29.000000Z"
// 	},
// 	{
// 		"id": 22,
// 		"type_id": 2,
// 		"name": "Use of home as office",
// 		"short_name": "use_of_home_as_office",
// 		"category_name": "Additional Expenses",
// 		"description": "Use of home as office",
// 		"created_at": "2021-07-17T23:32:40.000000Z",
// 		"updated_at": "2021-07-17T23:32:40.000000Z"
// 	},
// 	{
// 		"id": 23,
// 		"type_id": 2,
// 		"name": "Misc / Sundry expenses",
// 		"short_name": "misc_sundry_expenses",
// 		"category_name": "Additional Expenses",
// 		"description": "Misc / Sundry expenses",
// 		"created_at": "2021-07-17T23:32:48.000000Z",
// 		"updated_at": "2021-07-17T23:32:48.000000Z"
// 	},
// 	{
// 		"id": 24,
// 		"type_id": 2,
// 		"name": "Parking / Toll charges",
// 		"short_name": "parking_toll_charges",
// 		"category_name": "Additional Expenses",
// 		"description": "Parking / Toll charges",
// 		"created_at": "2021-07-17T23:32:58.000000Z",
// 		"updated_at": "2021-07-17T23:32:58.000000Z"
// 	}
// ]