import axios from "axios";

const header = {"content-Type":"application/json"}

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})

export async function get_patients() {
    const response = await api.get("/get_patients");
    return response    
}

