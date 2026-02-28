import axios from "axios";

export const api= axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export const get_servers = async () => {
    const response = await api.get(`/server/all-servers`);
    return response;
};

export const add_server = async (data) => {
    const response = await api.post(`/server/add-server`, data);
    return response;
};