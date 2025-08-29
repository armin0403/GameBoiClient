import { Box, Grid, Paper } from '@mui/material'
import React from 'react'

export default function Challanges () {
    return(
        <div>
            <Box sx={{p:1}}>
                <Grid  container spacing={2}>
                    <Grid item xs={10}>
                        <Paper sx={{p:2}} elevation={5}>Active challanges</Paper>
                    </Grid>
                    <Grid item xs={10}>
                        <Paper sx={{p:2}} elevation={5}>Finished Challanges</Paper>
                    </Grid>
                    <Grid item xs={10}>
                        <Paper sx={{p:2}} elevation={5}>New Challanges</Paper>
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}