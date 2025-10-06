// // src/services/axiosInstance.js
// import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: "https://taxitaapi.learnify.pk/public/api",
//   // headers: { "Content-Type": "application/json" }
// });

// // Automatically attach token if it exists
// axiosInstance.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });




// // Handle 401 globally
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem("token");
//       localStorage.removeItem("user");
//       window.location.href = "/login"; // redirect
//     }
//     return Promise.reject(error);
//   }
// )




// export default axiosInstance;










// src/services/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://taxitaapi.learnify.pk/public/api",
  timeout: 10000, // 10 seconds timeout
});

// Flag to prevent multiple logout calls
let isLoggingOut = false;

// Automatically attach token if it exists
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle 401 globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized errors
    if (error.response?.status === 401 && !isLoggingOut) {
      isLoggingOut = true;
      
      // Clear storage immediately
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      
      // Only redirect if we're not already on the login page
      if (window.location.pathname !== "/login") {
        // Use replace to avoid adding to browser history
        window.location.replace("/login");
      }
      
      // Reset flag after a delay
      setTimeout(() => {
        isLoggingOut = false;
      }, 1000);
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;