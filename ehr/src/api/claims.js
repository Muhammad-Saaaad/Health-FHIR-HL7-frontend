import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})

export const submit_claim = async (payload) => {
    const response = await api.post('/submit-claims', payload);
    return response.data;
};