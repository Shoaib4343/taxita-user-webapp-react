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

// register-trading-year
export const registerTradingYearApi = (data) => {
  return axiosInstance.post("/register-trading-year", data);
};

// /trading-year/activate
export const activateTradingYearApi = (data) => {
  return axiosInstance.post(`/trading-year/activate`, data);
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




// ------------------------------------------ Get  profile image -----------------------------------

// get-profile-image
export const getProfileImage = () =>{
  return axiosInstance.get("/get-profile-image")
}

// {
// 	"success": true,
// 	"data": [
// 		{
// 			"profile_image": "https://taxitaapi.learnify.pk/public/storage//Profile-image.jpg"
// 		}
// 	]
// }




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



// {
// 	"total_income": 3000,
// 	"fuel": 0,
// 	"oil": 654,
// 	"car_tax": 0,
// 	"insurance": 0,
// 	"servicing_repairs": 0,
// 	"tyres": 0,
// 	"vehicle_rental_lease": 0,
// 	"vehicle_loan_interest": 0,
// 	"other_motor_expenses": 0,
// 	"sub_total_motor_expenses": 654,
// 	"radio_rent": 0,
// 	"radio": 0,
// 	"capital_allowances": 0,
// 	"percentage_adj": {
// 		"private_use_adj_car": 4,
// 		"private_use_adj_phone": 3,
// 		"radio_rent_cash": 5,
// 		"radio_rent_card_bank": 5,
// 		"radio_rent_acc_contract": 8,
// 		"radio_rent_sub_contract": 7
// 	},
// 	"total_radio_rent": 3000,
// 	"mobile_telephone_costs": 0,
// 	"driver_licence_badge_medical": 0,
// 	"repair_renewals_equipment": 0,
// 	"legal_accountancy_costs": 0,
// 	"car_cleaning_valeting": 0,
// 	"wages_to_employee": 0,
// 	"use_of_home_as_office": 0,
// 	"misc_sundry_expenses": 0,
// 	"parking_toll_charges": 0,
// 	"sub_total_additional_expenses": 0,
// 	"sub_total_motor_additional_expenses": 3000,
// 	"total_expenses": 3654,
// 	"net_profit_loss": -654,
// 	"add_private_use_adjustment_car": 26.160000000000000142108547152020037174224853515625,
// 	"add_private_use_adjustment_telephone": 0,
// 	"vehicle_disposal": 0,
// 	"total_net_balance": -627.8400000000000318323145620524883270263671875
// }



