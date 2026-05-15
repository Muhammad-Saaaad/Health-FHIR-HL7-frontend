import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export const get_patients = async (hospital_id) => {
    const response = await api.get(`/all-patients/${hospital_id}`);
    return response;
}

export const reg_patient = async (payload) => {
    const response = await api.post(`/patients`, payload, { timeout: 10000 });
    return response;
}

export const get_patient_detail = async (mpi) => {
    const response = await api.get(`/patients/${mpi}`);
    return response;
}