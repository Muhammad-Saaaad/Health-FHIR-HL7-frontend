import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})

// const header = { "content-Type": "application/json" }

export async function get_patients(insurance_id) {
    const response = await api.get(`/get_all_patients/${insurance_id}`);
    return response;
}

export async function get_patient_by_id(patient_id) {
    const response = await api.get(`/get_patient/${patient_id}`);
    return response.data;
}

export async function reg_patients(data, insurance_id) {
    const response = await api.post(`/reg_patient/${insurance_id}`, data);
    return response;
}

export async function expense_breakdown(patient_id, policy_id) {
    const response = await api.get(`/expnse_breakdown/patient_id/${patient_id}/policy_id/${policy_id}`);
    return response.data;
}