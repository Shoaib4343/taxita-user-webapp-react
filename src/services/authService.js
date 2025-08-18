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