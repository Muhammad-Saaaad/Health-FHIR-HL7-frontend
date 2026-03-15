import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})

export const get_doctors = async() => {
    const response = await api.get("/all_doctors");
    return response;
}