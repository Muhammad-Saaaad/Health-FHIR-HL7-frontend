import axios from 'axios';

const client = axios.create({
    baseURL: "http://192.168.18.99:8004/",
});

const Headers = {
    "Content-Type": "application/json",
}

// post order should always be like this:
// url, data , configurations

export const login = async (data) => {
    const response = await client.post("/login", data, {headers: Headers});
    return response;
}

export const signup = async (data) => {
    const response = await client.post("/signup", data, {headers: Headers});
    return response;
}

export const get_doctors = async() => {
    const response = await client.get("/all_doctors");
    return response;
}
