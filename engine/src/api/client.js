import axios from "axios";

export const api= axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

const pre_path = "/server"

export const get_servers = async () => {
    const response = await api.get(`/server/all-servers`);
    return response;
}

export const add_server = async (data) => {
    const response = await api.post(`/server/add-server`, data);
    return response;
}

export const get_all_channels = async () => {
    const response = await api.get(`/route/all-routes`);
    return response;
}

export const get_mappings = async (channel_id) => {
    const response = await api.get(`/route/mapping_rules/${channel_id}`);
    return response;
}

export const add_endpoint = async (data) => {
    const response = await api.post(`/endpoint/add-endpoint`, data);
    return response;
}

export const add_channel = async (data) => {
    const response = await api.post(`/route/add-route`, data);
    return response;
}