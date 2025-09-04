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
}
// -------- expense Weeks & Days --------

// expense weeks api
export const expenseWeeksApi = () => axiosInstance.get("/expense/weeks");

// expense days api
export const expenseDaysApi = (weekNumber) =>{
  return axiosInstance.get(`/expense-weeks/${weekNumber}/days`);
}



// buy / renewal plains
export const plainsApi = () => axiosInstance.get("/plans");


//-------- Trading Years --------

// previous-trading-years
export const previousTradingYearApi = ()=> axiosInstance.get("/previous-trading-years");

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




// --------------------------- Percentage Adjustment -------------------------------------------

//percentage-adjustments Post Api
export const percentageAdjustmentsPostApi = (data)=>{
  return axiosInstance.post("/percentage-adjustments", data); 
};


// /percentage-adjustments/2 Get Api
export const percentageAdjustmentsGetApi = (id)=>{
  return axiosInstance.get(`/percentage-adjustments/${id}`); 
};



// /percentage-adjustments/2 Put Api
export const percentageAdjustmentsPutApi = (id, data)=>{
  return axiosInstance.put(`/percentage-adjustments/${id}`, data);
};



// /percentage-adjustments get api all index listing
export const percentageAdjustmentsGetAllApi = ()=>{
  return axiosInstance.get("/percentage-adjustments");
};


