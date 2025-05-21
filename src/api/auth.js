import axios from "axios";

const API_URL = process.env.REACT_APP_API_BASE_URL;

export const login = async (credentials) => {
    console.log("API_URL:");
    console.log(process.env.REACT_APP_API_BASE_URL);
    const response = await axios.post(`${API_URL}/login`, credentials);

    localStorage.setItem("user", JSON.stringify(response.data.user));
    localStorage.setItem("token", response.data.access_token);
    return response;
};

export const logout = () => {
    return axios.post(`${API_URL}/logout`);
};