import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import {Box, Paper, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Grid, TextField, IconButton } from '@mui/material';
import AddToMyGamesContent from './AddToMyGamesContent';
import { useModal } from '../Contexts/ModalContext';

export default function AllGames(){
    const [games, setGames] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const {openModal, closeModal} = useModal();

    const fetchGames = (term = '') =>{
        const url = `https://localhost:7258/api/IGDBGameController/search-games?searchTerm=${encodeURIComponent(term)}`;
    
        setIsLoading(true)
        fetch(url)
        .then(res => res.json()
        .then(data =>{
            setGames(data)
            setIsLoading(false)
        })
    .catch(err => console.error()));
};

useEffect(() =>{
    fetchGames();
},[]);

const handleSearch = () =>{
    fetchGames(searchTerm.trim());
}
    
return (
<Box sx={{p:1}}>
    <Grid
    sx={{margin: 5, mt: 5}}>
    <Box component={Paper} elevation={5}>
        <TextField 
        fullWidth 
        id="searchAllGames" 
        label="Search for a specifc game..." 
        variant="outlined" 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} 
        onKeyDown={(e) => {
             if(e.key === 'Enter') handleSearch();
        }}
    />
    </Box>
    </Grid>

    <Grid
    sx={{margin: 5, mt: 5 }}>
    <TableContainer 
    component={Paper}
    elevation={5}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell align="left">Name</TableCell>
                    <TableCell align="left">Genre</TableCell>
                    <TableCell align="left">Platform</TableCell>
                    <TableCell align="center">Release date</TableCell>
                    <TableCell align="right">Click to add</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {isLoading && <h1>Loading...</h1>}
            {!isLoading && games.map((game, index) => (
                <TableRow key={index}>
                    <TableCell> <img src={game.coverImageUrl} alt={game.name} style={{width:"60px", borderRadius:2}} /></TableCell>  
                    <TableCell align="left">{game.name}</TableCell>
                    <TableCell align="left">{game.genres}</TableCell> 
                    <TableCell align="left">{game.platform}</TableCell>
                    <TableCell align="center">{game.releaseDate}</TableCell>
                    <TableCell align="right">
                        <IconButton onClick={() => {openModal("ADDING GAME TO YOUR LIST", 
                                                    <AddToMyGamesContent game={game} onClose={closeModal}/>)}}>
                            <AddIcon/>
                        </IconButton>
                    </TableCell>
                </TableRow>        
            ))}                            
            </TableBody>
        </Table>
    </TableContainer>
    </Grid>
</Box>);    
}
