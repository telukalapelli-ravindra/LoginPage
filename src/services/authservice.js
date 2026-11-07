import apiClient from "../api/apiClient";


const AUTH_URL="/auth";

export const loginUser= async(loginData)=>{
           
    const response= await 
        apiClient.post(`${AUTH_URL}/login`,loginData);

        return response.data;
}

export const dashBoard=async() =>{
    return (await apiClient.get(`${AUTH_URL}/dashboard`)).data;
}

