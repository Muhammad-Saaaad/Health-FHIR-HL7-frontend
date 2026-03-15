import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})

// const header = { "content-Type": "application/json" }

export async function get_patients() {
    console.log("start getting patients");
    const response = await api.get("/get_all_patients");
    console.log("get patient reponse: ", response);
    return response;
}

export async function reg_patients(data) {
    const response = await api.post("/reg_patient", data);
    return response;
}