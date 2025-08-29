import { Box, Grid, Paper } from '@mui/material'
import React from 'react'

export default function GameCollection (){
    return (
        <div>
    <Box sx={{p:1}}>
        <Grid container spacing={2}>
            <Grid item xs={9}>
                <Paper sx={{p:2}} elevation={5}>
                    table or something with my games/collection
                </Paper>
            </Grid>
            <Grid item xs={3}>
                <Paper sx={{p:2}} elevation={5}>
                    photos, ads, etc.
                </Paper>
            </Grid>
        </Grid>
    </Box>
        </div>
    )
}