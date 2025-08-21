import axiosInstance from "./axiosInstance";

// Dashboard api 
export const dashboardApi = () => {
  return axiosInstance.get("/dashboard");
};


// Transaction api for icome and expence
export const createTransactionApi = (data) => {
  // Detect if it's FormData
  if (data instanceof FormData) {
    return axiosInstance.post("/transactions", data, {
     headers: data instanceof FormData ? {} : { "Content-Type": "application/json" }
    });
  }
  return axiosInstance.post("/transactions", data);
};


// Weekly expenses api
export const weeklyExpensesApi = () => {
  return axiosInstance.get("/weekly-expenses");
}







// Weekly income api
export const weeklyIncomeApi = () => {
  return axiosInstance.get("/weekly-income");
}


