import axios from "axios";

const GAME_API_URL = "https://localhost:7258/api/game"

export const addMyGame = async (gameData) => {
    try{
        const token = sessionStorage.getItem("jwtToken");

        const response = await axios.post(`${GAME_API_URL}/add-my-game`, gameData, {
            headers:{
                "Authorization" : `Bearer ${token}`,
                "Content-Type" : "application/json"
            }
        });
        console.log(response);
        return response.data;
    } catch (err){
        console.error("API PROBLEM (add-my-game):", err);
        throw err;
    }
};