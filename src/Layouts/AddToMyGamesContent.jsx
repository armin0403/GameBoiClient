import { Button, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Rating, Select, TextField } from "@mui/material";
import React, { useState } from "react";
import { addMyGame } from "../API calls/MyGameServices";

export default function AddToMyGamesContent({game, onClose}){
    const [status, setStatus] = useState("Wishlist");
    const [review, setReview] = useState("");
    const [trophyCount, setTrophyCount] = useState("");
    const [rating, setRating] = useState("");
    const [platinum, setPlatinum] = useState(false);

    const isCollection = status === "Collection";

    const handleSubmit = async () =>{
        const gameData ={
            IGDB_id: game.id,
            Name: game.name,
            CoverImageUrl: game.url,
            ReleaseDate: game.firstReleaseDate ? new Date(game.firstReleaseDate).toISOString() : null,
            Genres: game.genre,
            Platform: game.platform,
            Status: status,
            Review: isCollection ? review : null,
            TrophyCount: isCollection ? parseInt(trophyCount) : null,
            Platinum: isCollection ? platinum : false,
            Rating: isCollection ? parseFloat(rating) : null
        };
        try{
            const response = await addMyGame(gameData)
            console.log("Game added:", response)
            onClose();            
        }catch(err){
            console.error("Error:", err)
        }
    };
    

    return(
        <div style={{padding:20, minWidth:400}}>
            <img src={game.url} alt={game.name} style={{width:100}}/>
            <TextField
                label="Name"
                value={game.name}
                fullWidth
                margin="normal"
                disabled
            />
            <TextField
                label="Genres"
                value={game.genre}
                fullWidth
                margin="normal"
                disabled
            />
            <TextField
                label="Platforms"
                value={game.platform}
                fullWidth
                margin="normal"
                disabled
            />
            <TextField
                label="Release Date"
                value={game.firstReleaseDate}
                fullWidth
                margin="normal"
                disabled
            />
            <FormControl fullWidth margin="normal">
                <InputLabel>Status</InputLabel>
                <Select value={status} onChange={e => setStatus(e.target.value)}>
                    <MenuItem value="Wishlist">Wishlist</MenuItem>
                    <MenuItem value="Collection">Collection</MenuItem>
                </Select>
            </FormControl>

            {isCollection && (
                <>
                    <TextField
                        label="Review"
                        multiline
                        fullWidth
                        margin="normal"
                        value={review}
                        onChange={e => setReview(e.target.value)}
                    />
                    <TextField
                        label="Trophy Count"
                        type="number"
                        fullWidth
                        margin="normal"
                        value={trophyCount}
                        onChange={e => setTrophyCount(e.target.value)}
                    />
                    <Rating
                        name="rating"
                        value={parseFloat(rating)||0}
                        max={10}
                        onChange={(event, newValue) =>
                            setRating(newValue)
                        } 
                    />
                    <div>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={platinum}
                                onChange={e => setPlatinum(e.target.checked)}
                            />
                        }
                        label="Platinum achieved"
                    />
                    </div>                    
                </>
            )}
            <div style={{marginTop: 20, display: 'flex', justifyContent: 'flex-end'}}>
                <Button onClick={onClose} style={{marginRight: 10}}>Cancel</Button>
                <Button variant="contained" onClick={handleSubmit}>Add</Button>
            </div>
        </div>
    )
};
