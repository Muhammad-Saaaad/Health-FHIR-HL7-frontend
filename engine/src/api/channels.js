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

export const rule_validation = {
    mpi: {"dest": ["mpi"], "type": "copy", "config": {} },

    gender: {"dest": ["gender"], "type": "map", "config": {"Male": "M", "Female": "F"}},

    "birth date": {"dest": ["birth date"], "type": "format", "config": {"from": "%Y-%m-%d", "to": "%Y%m%d"}},

    fullname: {"dest": ["family name", "given name"], "type": "split", "config": {delimiter: " "}},

    "phone number": {"dest": ["phone number"], "type": "copy", "config": {}},

    "address": {"dest": ["address"], "type": "copy", "config": {}},

    "policy number": {"dest": ["policy number"], "type": "copy", "config": {}},

    "plan type": {"dest": ["plan type"], "type": "copy", "config": {}},
}