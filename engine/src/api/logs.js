import axios from 'axios';

export const api= axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export const get_logs = async () => {
    const response = await api.get(`/logs/show-logs`);
    return response.data;
}

export const get_log_detail = async (log_id) => {
    const response = await api.get(`/logs/show-log-msg/${log_id}`);
    return response.data;
}
