import * as React from 'react';
import { Alert, Snackbar } from "@mui/material";

export default function Toaster(){
    return(
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
                onClose={handleClose}
                severity="success"
                variant="filled"
                sx={{ width: '100%' }}
            >
            This is a success Alert inside a Snackbar!
            </Alert>
        </Snackbar>
    )
}

