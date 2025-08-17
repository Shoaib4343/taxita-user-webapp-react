// import axios from "axios";

// const axiosInstance  = axios.create({
//     baseURL: "https://api.escuelajs.co/api/v1",
//     headers: {
//         "Content-Type": "application/json"
//     }
// });

// export default axiosInstance;




















// src/services/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://taxitaapi.learnify.pk/public/api",
  headers: { "Content-Type": "application/json" }
});

// Automatically attach token if it exists
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
