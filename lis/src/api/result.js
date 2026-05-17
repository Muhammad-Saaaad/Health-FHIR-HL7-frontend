import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export async function get_test_parameters ({nic, test_req_id, test_name}) {
    const response = await api.get(`/requests/take_test_parameters/${nic}/${test_req_id}?test_name=${test_name}`);
    return response;
}

export async function get_test_result(testReqId) {
    const response = await api.get(`/results/test_req_id/${testReqId}`);
    return response;
}

export async function complete_result(payload) {
    const response = await api.post("/results/complete", payload);
    return response;
}