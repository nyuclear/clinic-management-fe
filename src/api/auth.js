import axios from "axios";

const API_URL = "http://localhost:8000/api";

export const login = async (credentials) => {
    const response = await axios.post(`${API_URL}/login`, credentials);

    localStorage.setItem("user", JSON.stringify(response.data.user));
    localStorage.setItem("token", response.data.access_token);
    return response;
};

export const logout = () => {
    return axios.post(`${API_URL}/logout`);
};