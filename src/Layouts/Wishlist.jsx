import { Card, CardActions, CardContent, CardHeader, CardMedia, FormControl, Grid, InputLabel, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Select, TextField, Box, Pagination, Typography, Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { getAllGames } from '../API calls/GameServices';
import { useModal } from '../Contexts/ModalContext';
import AddGameToWishlistContent from '../Contents/AddGameToWishlistContent';

export default function Wishlist (){
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pageCount, setPageCount] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(6);
    const [searchTerm, setSearchTerm] = useState("");
    const [error, setError] = useState(null);
    
    useEffect(() =>{
        const fetchGames = async () => {
            try{
                const data = await getAllGames(pageNumber, pageSize, searchTerm);
                setGames(data.items);
                setTotalCount(data.totalCount);
                setPageCount(data.pageCount);
                console.log(data);
                setLoading(false);
        }catch(err){
            console.error("Failed to load games!", err);
            setError("Error loading games. Please try again later.");
            setLoading(false);
        }
    };
    fetchGames();
    },[pageNumber, pageSize, searchTerm]);

    const {openModal, closeModal} = useModal();

    return(
<div>
    <Box sx={{p:1}}>
        <Grid container spacing={2}>            
        <Grid item xs={8}>
            <Card component={Paper} elevation={5}>
                <CardHeader title="MY WISHLIST" align="center"/>                
                <CardContent>
                <Box
                sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                marginBottom: 2,
                }}
                >
                    <TextField 
                     placeholder='Name of the game'
                     label="Search"
                     value={searchTerm} 
                     onChange={(s) => setSearchTerm(s.target.value)}>
                    </TextField>
                    <FormControl 
                    sx={{minWidth: 100}}>
                        <InputLabel>Page size</InputLabel>
                        <Select 
                         labelId="page-size-selector-label"
                         id="page-size-selector"
                         label="Page size"
                         value={pageSize}
                         onChange={(e) => setPageSize(e.target.value)}>
                            <MenuItem value={3}>Three</MenuItem>
                            <MenuItem value={6}>Six</MenuItem>
                            <MenuItem value={9}>Nine</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                    {loading ? (<p>Loading...</p>) : error ? (<p>{error}</p>) : (
                        <TableContainer component={Paper} elevation={8}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name of the game</TableCell>
                                <TableCell align="right">Platform</TableCell>
                                <TableCell align="right">Rating</TableCell>
                                <TableCell align="right">Trophies</TableCell>
                                <TableCell align="right">Comment</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {games.map((game, index) => (
                                <TableRow key={game.id || game.name}>
                                <TableCell>{game.name}</TableCell>
                                <TableCell align="right">{game.platform}</TableCell>
                                <TableCell align="right">{game.rating}</TableCell>
                                <TableCell align="right">{game.trophies}</TableCell>
                                <TableCell align="right">{game.comment}</TableCell>
                            </TableRow>        
                            ))}                            
                        </TableBody>
                        </Table>
                        </TableContainer>
                    )}           
                </CardContent>                
            </Card>
            <Box 
            sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: 2 }}>
                <Typography>
                    Showing {(pageNumber - 1) * pageSize + 1}–
                    {Math.min(pageNumber * pageSize, totalCount)} of {totalCount} games
                </Typography>
                <Pagination
                count={pageCount}
                page={pageNumber}
                onChange={(event, value) => setPageNumber(value)}
                color="primary"
                />
            </Box>
        </Grid>
        <Grid item xs={4}>
            <Card component={Paper} elevation={5}>
                <CardHeader title="STATISTICS" align="center"/>
            <CardContent>
                <CardMedia
                    component="img"
                    height="160"
                    image="playstationLogo.png"
                    alt="playstationLogo"
                    sx={{
                        objectFit: 'contain',  
                        width: '100%',        
                        maxHeight: '140px',   
                    }}
                    />
                <h2 align="center">I LOVE GAMING</h2>
                <p align="justify">So here are some of the games I'd love to own and end up playing. Platinum them, review them! wanted to ma this text a bit wider so i can test justfy thing haha.</p>
            </CardContent>
            <CardActions sx={{justifyContent: "center", marginBottom: 2}}>
                <Button startIcon={<AddCircleIcon/>} onClick={() => openModal("Add game to your wishlist!", <AddGameToWishlistContent onClose={closeModal}/>)}>Add game to wishlist</Button>
            </CardActions>
            </Card>     
        </Grid>
        </Grid>
    </Box>
</div>
    );  
}

