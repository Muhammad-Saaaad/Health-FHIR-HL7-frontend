import { api } from './server';

export const get_all_channels = async () => {
    const response = await api.get(`/route/all-routes`);
    return response;
};

export const get_mappings = async (channel_id) => {
    const response = await api.get(`/route/mapping_rules/${channel_id}`);
    return response;
};


export const add_channel = async (data) => {
    const response = await api.post(`/route/add-route`, data);
    return response;
};