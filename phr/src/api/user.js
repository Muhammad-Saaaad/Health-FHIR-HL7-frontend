import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    // headers: {
    //     "Content-Type": "application/json",
    // }
});

const Headers = {
    "Content-Type": "application/json",
}

// post order should always be like this:
// url, data , configurations

export const login = async (data) => {
    const response = await api.post("/login", data, {headers: Headers});
    return response;
}

export const signup = async (data) => {
    const response = await api.post("/signup", data, {headers: Headers});
    return response;
}