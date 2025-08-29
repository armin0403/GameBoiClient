import axios from "axios";

const API_URL = "http://localhost:5202/api/game";

export const createGame = async (gameData) => {
    console.log("Sending game data:", gameData);
    try{
        const response = await axios.post(API_URL, gameData,{
            headers:{
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error){
        console.error("API PROBLEMI!", error);
        throw error;
    }
};

export const getAllGames = async(pageNumber, pageSize, searchTerm="") =>{
    try{
        const response = await axios.get(API_URL, {
            params: {pageNumber, pageSize, searchTerm}
        });
        console.log(response.data);
        return response.data;
    }catch(error){
        console.error("Error fetching games", error)
        throw error;
    }
};