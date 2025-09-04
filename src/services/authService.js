import axiosInstance from "./axiosInstance"


// login api
export const loginApi = (data)=>{
    return axiosInstance.post("/login", data);
}


// logout api
export const logoutApi  = ()=>{
    return axiosInstance.post("/logout");
}

// register api
export const registerApi = (data) => {
    return axiosInstance.post("/register", data);
}


// forgot password
export const forgotPasswordApi = (data) => {
    return axiosInstance.post("/forgot-password", data);
}


// reset password
export const resetPasswordApi = (data) => {
    return axiosInstance.post("/reset-password", data);
}