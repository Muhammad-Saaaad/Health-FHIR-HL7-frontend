import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})

export const create_visit_note = async (note_data) => {
    const response = await api.post("/visit-note-add", note_data);
    return response.data;
}

export const visit_note_by_doctor_per_patient = async (mpi, doctor_id) => {
    const response = await api.get(`/all-visit-notes${doctor_id}/${mpi}`);
    return response.data;
}

export const specific_visit_note = async (note_id) => {
    const response = await api.get(`/visit-note${note_id}`);
    return response.data;
}

export const specific_lab_reports_for_visit_note = async (note_id) => {
    const response = await api.get(`/lab-reports-by-${note_id}`);
    return response.data;
}

// Lab API

export const getAllLabTests = async(search_name) => {
    const response = await api.get(`/lab_test_search?search_name=${search_name}`);
    return response.data;
}