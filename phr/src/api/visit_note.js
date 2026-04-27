import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})

export const visit_note_by_doctor_per_patient = async (mpi, doctor_id) => {
    const response = await api.get(`/doctor-visit-notes/${mpi}/${doctor_id}`);
    return response.data;
}

export const specific_visit_note = async (note_id) => {
    const response = await api.get(`/visit-note-details/${note_id}`);
    return response.data;
}

export const specific_lab_reports_for_visit_note = async (note_id) => {
    const response = await api.get(`/lab-reports-base/${note_id}`);
    return response.data;
}

// Lab API

export const getLabReport = async (report_id) => {
    const response = await api.get(`/lab-results/${report_id}`);
    return response.data;
}