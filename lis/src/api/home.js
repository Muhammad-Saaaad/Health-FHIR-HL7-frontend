import axios from "axios";

const header = {"content-Type":"application/json"}

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})

export async function get_patients() {
    const response = await api.get("/get_patients");
    return response    
}

export async function get_patient_waiting_list() {
    const response = await api.get("/patient-waiting-list");
    return response;
}

export async function get_patient_accepted_list() {
    const response = await api.get("/patient-Accepted-list");
    return response;
}

