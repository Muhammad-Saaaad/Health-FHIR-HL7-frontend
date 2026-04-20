import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})

export const getAllLabTests = async(search_name) => {
    const response = await api.get(`/lab_test_search?search_name=${search_name}`);
    return response.data;
}