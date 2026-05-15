import { api } from './server';

export const signup = async (data) => {
    const response = await api.post(`/user/sign-up`, data);
    return response.data;
};

export const login = async (data) => {
    const response = await api.post(`/user/login`, data);
    return response.data;
};