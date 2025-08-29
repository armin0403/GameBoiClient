import { Box, Button, Paper, Stack, TextField, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import PasswordIcon from '@mui/icons-material/Password';
import LockClockIcon from '@mui/icons-material/LockClock';
import EmailIcon from '@mui/icons-material/Email';

export default function ProfileSettings () {
    return(
<Box sx={{p:1}}>
    <Box component={Paper} elevation={5} borderRadius={2} sx={{p:4}} justifyItems={"center"}>
        <Typography>        
    <strong>THIS SECTION ALLOWS YOU TO MANAGE THE MOST SENSITIVE PARTS OF YOUR PROFILE—PERSONAL INFORMATION, SECURITY CREDENTIALS, AND ACCOUNT STATUS.</strong>
        </Typography>        
    <Box justifyItems={"center"}>
        <Stack direction="row" spacing={4} alignItems="center" sx={{p:4}}>
            <EmailIcon/>
            <h1><strong>Change your email</strong></h1>
        </Stack>
        <Typography>
    Changing your email address will update where you receive all account-related notifications,
    including password resets, updates, and important announcements. 
    Make sure you have access to the new email before proceeding. After submitting the change, 
    you may be required to verify the new address by clicking a confirmation link we send. For security reasons,
    we’ll notify your previous email about this change as well. If you didn’t initiate this change, 
    please reach out to our support team as soon as possible.
        </Typography>
        <Stack direction="row" spacing={5} sx={{p:4}}>
            <TextField
            label="Email" 
            variant="outlined" 
            margin='normal'
            />
            <TextField
            label="ReType email" 
            variant="outlined" 
            margin='normal'
            />
            <Button
                label="Change email"
                variant="outlined">
                Change your email
            </Button>
        </Stack>        
        </Box>        
        <Box justifyItems={"center"}>
        <Stack direction="row" spacing={4} alignItems="center" sx={{p:4}}>
            <PasswordIcon/>
            <h1><strong>Change your password</strong></h1>
        </Stack>
            <Typography>
    To help keep your account secure, we recommend choosing a strong and unique password
    that you haven't used before. Your new password should include a mix of uppercase and lowercase letters, numbers,
    and symbols to ensure better protection. Once you change your password, you’ll be logged out from other devices
    and required to log in again using the new credentials. If you didn’t request this change, please contact our
    support team immediately.
            </Typography>
            <Stack direction="row" spacing={5} sx={{p:4}}>
                <TextField
                    label="Password"
                    variant="outlined"
                    margin="normal"
                />
                <TextField
                    label="ReType password"
                    variant="outlined"
                    margin="normal"
                />
                <Button
                    label="Change password"
                    variant="outlined">
                Change your password
                </Button>
            </Stack>    
        </Box>
        <Box justifyItems={"center"}>
            <Stack direction="row" spacing={4} alignItems="center" sx={{p:4}}>
                <LockClockIcon/>
                <h1><strong>Got tired of us?</strong></h1>
                <DeleteIcon/>
            </Stack>
            <Typography sx={{whiteSpace:"pre-wrap"}}>
                {`   
You have the option to either deactivate or permanently delete your account.
    -   Deactivation is a temporary step. Your profile, posts, and data will be hidden from other users, but nothing will be lost. You can reactivate your account anytime by simply logging back in.
    -   Deletion is permanent. Once your account is deleted, all your data—including your profile, posts, and activity—will be permanently removed and cannot be recovered.

We recommend choosing deactivation if you’re unsure or just taking a break. Deletion should only be 
used if you’re certain you no longer wish to use this platform.
                `}
            </Typography>
            <Stack direction="row" spacing={5} sx={{p:4}}>
                <Button variant="outlined" color="error" size="large" startIcon={<LockClockIcon/>}>Deactivate your account</Button>
                <Button variant="contained" color="error" size="large" startIcon={<DeleteIcon/>}>Delete your account</Button>
            </Stack>
        </Box>         
    </Box>
</Box>
    )
}