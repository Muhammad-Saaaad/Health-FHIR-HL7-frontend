import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})

export const get_doctors_for_patient = async(mpi) => {
    const response = await api.get(`/doctor-encountered-by-patient/${mpi}`);
    return response;
}

export const get_doctor_detail = async(doctor_id) => {
    const response = await api.get(`single-doctor/${doctor_id}`);
    return response.data;
}