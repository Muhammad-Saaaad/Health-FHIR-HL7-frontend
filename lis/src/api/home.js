import axios from "axios";

const header = {"content-Type":"application/json"}

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})

export async function get_patients(lab_id) {
    const response = await api.get(`/get_patients/${lab_id}`);
    return response    
}

export async function get_patient_waiting_list(lab_id) {
    const response = await api.get(`/patient-waiting-list/${lab_id}`);
    return response;
}

export async function get_patient_accepted_list(lab_id) {
    const response = await api.get(`/patient-Accepted-list/${lab_id}`);
    return response;    
}

