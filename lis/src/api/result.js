import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export async function get_test_result(testReqId) {
    try {
        const response = await api.get(`/results/test_req_id/${testReqId}`);
        return response;
    } catch (error) {
        if (error?.response?.status === 404) {
            return null;
        }

        throw error;
    }
}

export async function complete_result(payload) {
    const response = await api.post("/results/complete", payload);
    return response;
}