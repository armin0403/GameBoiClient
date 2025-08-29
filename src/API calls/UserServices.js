import axios from "axios";

const API_URL = "https://localhost:7258/api/user/register";

export const registerUser = async (formattedData) =>{
    try{
        const response = await axios.post(API_URL, formattedData,{
            headers:{
                "Content-type" : "application/json",
            },
        });
        return response.data;
    }catch(err){
        console.error("API PROBLEM", err);
        throw err;
    }
};

export const loginUser = async (userData) =>{
    try{
        console.log(userData);
        const response = await axios.post("https://localhost:7258/api/user/login", userData,{
            headers:{
                "Content-Type": "application/json"
            },
        });
        return response.data;
    }catch(err){
        console.error("API PROBLEM:", err);
        throw err;
    }
};

export async function getCurrentUser (){
    const token = sessionStorage.getItem("jwtToken");
    const response = await axios.get("https://localhost:7258/api/user/getCurrentUser", {
    headers: {
        Authorization: `Bearer ${token}`
    },
});
    return response;
}

export async function updateUser (){}