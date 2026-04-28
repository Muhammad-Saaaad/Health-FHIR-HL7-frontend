import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})

// const header = { "content-Type": "application/json" }

export async function get_patients() {
    const response = await api.get("/get_all_patients");
    return response;
}

export async function get_patient_by_id(patient_id) {
    const response = await api.get(`/get_patient/${patient_id}`);
    return response.data;
}

export async function reg_patients(data) {
    const response = await api.post("/reg_patient", data);
    return response;
}

export async function expense_breakdown(patient_id, policy_id) {
    const response = await api.get(`/expnse_breakdown/patient_id/${patient_id}/policy_id/${policy_id}`);
    return response.data;
}