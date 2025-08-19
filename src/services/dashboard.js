import axiosInstance from "./axiosInstance";

export const dashboardApi = () => {
  return axiosInstance.get("/dashboard");
};

export const createTransactionApi = (data) => {
  // Detect if it's FormData
  if (data instanceof FormData) {
    return axiosInstance.post("/transactions", data, {
     headers: data instanceof FormData ? {} : { "Content-Type": "application/json" }
    });
  }
  return axiosInstance.post("/transactions", data);
};
