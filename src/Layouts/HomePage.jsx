import { Box, Grid, Paper } from "@mui/material";
import React from "react";

export default function HomePage (){
    return(
        <div>
            <Box sx={{p:2}}>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <Paper sx={{p:2}} elevation={5}>
                            This is for posts // make component for showing posts
                        </Paper> 
                    </Grid>
                    <Grid item xs={4}>
                        <Paper sx={{p:2}} elevation={5}>
                            This is for latest games/news etc make component that shows table with info
                        </Paper>
                    </Grid>
                </Grid>
            </Box>            
        </div>
    )
}