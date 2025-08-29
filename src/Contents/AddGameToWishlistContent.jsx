import { useState } from "react";
import {createGame} from "../API calls/GameServices";
import {Button, CardContent, CardActions, TextField, Rating, Typography} from "@mui/material";

export default function AddGameToWishlistContent(onClose)
{
    const [game, setGame] = useState({
        name: "",
        platform: "",
        description: "",
        rating: "",
        trophyCount: "",
        comment: "",
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setGame({...game, [e.target.name]: e.target.value});
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Game data being sent:", game);
        try{
            await createGame(game);
            setMessage("Game was added successfully!");
            setGame({name:"", platform:"", description:"", rating:"", trophyCount:"", comment:""});
        }catch(error){
            console.error("Error response:", error.response?.data);
            setMessage("Error accured!")
        }
    };

    return(
    <>
        <CardContent>
            <TextField fullWidth variant="outlined" margin="normal" type="text" name="name" label="Name" value={game.name} onChange={handleChange} required />
            <TextField fullWidth variant="outlined" margin="normal" type="text" name="platform" label="Platform" value={game.platform} onChange={handleChange} required />
            <TextField fullWidth variant="outlined" margin="normal" type="text" name="description" label="Description" value={game.description} onChange={handleChange} required />
            <TextField fullWidth variant="outlined" margin="normal" type="number" name="trophyCount" label="Trophy count" value={game.trophyCount} onChange={handleChange} required />
            <TextField fullWidth variant="outlined" margin="normal" type="text" name="comment" label="Comment" value={game.comment} onChange={handleChange} required />
            <Typography sx={{marginTop: 2}} component="legend">Rate this game 1/10:</Typography>
            <Rating
            defaultValue={1} max={10}
            fullWidth variant="outlined" margin="normal" type="number" name="rating" label="Rating" value={game.rating} onChange={handleChange} required />
        </CardContent>                        
        <CardActions sx={{ display: "flex", justifyContent: "space-between", width: '100%', gap: 1 }}>
            <Button color="error" variant="contained" onClick={onClose}>Close window</Button>
            <Button color="primary" variant="contained" onClick={handleSubmit}>Add new game</Button>
        </CardActions>               
    </>
    );
};

