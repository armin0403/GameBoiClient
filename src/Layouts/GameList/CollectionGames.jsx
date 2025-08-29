import { Box, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";

export default function CollectionGames (collectionGames){
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
                        <TableCell align="left">Review</TableCell>
                        <TableCell align="center">Rating</TableCell>
                        <TableCell align="center">Trophies</TableCell>
                        <TableCell align="center">Platinum</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                 {games.map((game, index) => (
                    <TableRow key={index}>
                        <TableCell> <img src={game.url} alt={game.name} style={{width:"60px", borderRadius:2}} /></TableCell>  
                        <TableCell align="left">{game.name}</TableCell>
                        <TableCell align="left">{game.genre}</TableCell> 
                        <TableCell align="left">{game.platform}</TableCell>
                        <TableCell align="center">{game.firstReleaseDate}</TableCell>
                        <TableCell align="left">{game.review}</TableCell>
                        <TableCell align="center">{game.rating}</TableCell>    
                        <TableCell align="center">{game.trophyCount}</TableCell>               
                        <TableCell align="center">{game.platinum}</TableCell>
                    </TableRow>        
                 ))}                            
                </TableBody>
            </Table>
        </TableContainer>
    </Grid>
</Box>
)};