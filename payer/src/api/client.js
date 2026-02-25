import axios from "axios";

const API_URL = "http://192.168.18.99:8003"
const header = { "content-Type": "application/json" }

export async function get_patients() {
    const response = await axios.get(API_URL + "/get_all_patients");
    return response;
}

export async function reg_patients(data) {
    const response = await axios.post(API_URL + "/reg_patient", data, { headers: header });
    return response;
}