import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export const signup = async (payload) => {
    const response = await api.post("/SignUp", payload);
    return response;
}

export const login = async (payload) => {
    const response = await api.post("/Login", payload);
    return response;
}