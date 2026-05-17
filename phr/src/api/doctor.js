import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})

export const get_doctors_for_patient = async(nic) => {
    const response = await api.get(`/doctor-encountered-by-patient/${nic}`);
    return response;
}

export const get_doctor_for_hospital = async(hospital_id) => {
    const response = await api.get(`/get-doctors/hosptial/${hospital_id}`);
    return response;
}

export const get_doctor_detail = async(doctor_id) => {
    const response = await api.get(`single-doctor/${doctor_id}`);
    return response.data;
}

export const get_all_hospitals = async() => {
    const response = await api.get(`/all_hospitals`);
    return response;
}