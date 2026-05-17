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

export const admin_login = async (payload) => {
    const response = await api.post("/login-admin", payload);
    return response;
}

export const add_lab = async ({ name }) => {
    const response = await api.post(`/add-lab?name=${name}`);
    return response;
}

export const get_all_labs = async () => {
    const response = await api.get(`/all-labs`);
    return response.data;
}