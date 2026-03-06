import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export const get_patients = async () => {
    const response = await api.get(`/patients`);
    return response;
}

export const reg_patient = async (payload) => {
    const response = await api.post(`/patients`, payload);
    return response;
}