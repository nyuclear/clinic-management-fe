import axios from "axios";

//const API_URL = "http://localhost:8000/api";
const API_URL = process.env.REACT_APP_API_BASE_URL;
//const API_URL = getConfig().API_BASE_URL;

const axiosInstance = axios.create({
    baseURL: API_URL,
});

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

export default axiosInstance;