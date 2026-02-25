import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export const get_patients = async () => {
    const response = await api.get(`/patients`);
    return response;
}

export const add_patient = async (data) => {
    const response = await api.post(`/patients`, data);
    return response;
}

export const reg_patient = async ({ name, cnic, phone_no, gender, date_of_birth, user_id }) => {
    const payload = { name, cnic };
    if (phone_no !== undefined) payload.phone_no = phone_no;
    if (gender !== undefined) payload.gender = gender;
    if (date_of_birth !== undefined) payload.date_of_birth = date_of_birth;
    if (user_id !== undefined) payload.user_id = user_id;

    const response = await api.post(`/reg_patient`, payload);
    return response;
}