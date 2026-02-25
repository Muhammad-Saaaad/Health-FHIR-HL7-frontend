import axios from "axios";

const API_URL = "http://192.168.18.99:8002"
const header = {"content-Type":"application/json"}

export async function get_patients() {
    try{
        const response = await axios.get(API_URL+"/get_patients");
        return response    
    }
    catch (error){
        throw new Error("Server error");
            
    }
    
}

