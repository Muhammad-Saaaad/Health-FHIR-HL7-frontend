import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export async function get_patient_detail(nic, lab_id) {
    const response = await api.get(`/patients/${nic}/${lab_id}`);
    return response;
}

export async function get_patient_process(nic, vid, lab_id) {
    const response = await api.get(`/patient-process/${nic}/${vid}?lab_id=${lab_id}`);
    return response;
}

export async function update_report_status(payload) {
    const response = await api.put(`/requests/update_report_status`, payload);
    return response;
}

// export async function lock_test_request(testReqId, userId) {
//     const response = await api.put(`/requests/lock_test/${testReqId}/user_id/${userId}`);
//     return response;
// }

// export async function unlock_test_request(testReqId, userId) {
//     const response = await api.put(`/requests/unlock_test_request/test_req_id/${testReqId}/user_id/${userId}`);
//     return response;
// }
