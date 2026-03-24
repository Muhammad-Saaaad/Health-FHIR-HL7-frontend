import { api } from './server';

export const get_all_channels = async () => {
    const response = await api.get(`/route/all-routes`);
    return response;
};

export const get_mappings = async (channel_id) => {
    const response = await api.get(`/route/mapping_rules/${channel_id}`);
    return response;
};

export const get_mapping_suggestions = async (srcServerId, destServerId, srcFieldIds, destFieldIds) => {
    const params = new URLSearchParams();
    srcFieldIds?.forEach(element => params.append("src_field_ids", element));
    destFieldIds?.forEach(element => params.append("dest_field_ids", element));

    const response = await api.get(
        `/route/mapping_suggestion/src_server_id/${srcServerId}/dest_server_id/${destServerId}?${params.toString()}`
    );
    return response;
}

export const add_channel = async (data) => {
    const response = await api.post(`/route/add-route`, data);
    return response;
};

export const delete_channel = async (channel_id) => {
    const response = await api.delete(`/route/delete-route/${channel_id}`);
    return response;
}
