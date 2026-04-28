import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})

export async function pending_claims_patients() {
    const response = await api.get("/get_all_claims");
    return response;
}

export async function claim_details(claim_id) {
    const response = await api.get(`/get_single_claim${claim_id}`);
    return response.data;   
}

export async function lock_claim(claim_id, user_id) {
    const response = await api.put(`/lock_claim${claim_id}/by${user_id}`);
    return response.data;   
}

export async function unlock_claim(claim_id, user_id) {
    const response = await api.put(`/unlock_claim${claim_id}/by${user_id}`);
    return response.data;
}

export async function change_claim_status(claim_id, status) {
    const response = await api.put(`/change_claim_status${claim_id}/${status}`);
    return response.data;
}