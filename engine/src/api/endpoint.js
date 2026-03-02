import { api } from './server';

export const add_endpoint = async (data) => {
    const response = await api.post(`/endpoint/add-endpoint`, data);
    return response;
};

export const get_endpoints = async (server_id) => {
    const response =  await api.get(`/endpoint/server-endpoint/${server_id}`);
    return response;
};

export const get_endpointFields = async (endpoint_id) => {
    const response = await api.get(`endpoint/endpoint_field_path/${endpoint_id}`);
    return response;
};