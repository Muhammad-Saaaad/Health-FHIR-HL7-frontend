import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})

export const signup = async (payload) => {
    const response = await api.post('/signup', payload);
    return response;
};
export const login = async (payload) => {
    const response = await api.post('/login', payload);
    return response;
};

export const get_doctor = async (doc_id) => {
    const response = await api.get(`/get-doctor/${doc_id}`);
    return response;
};

export const get_all_hospitals = async () => {
    const response = await api.get(`/all-hospitals`);
    return response.data;
}