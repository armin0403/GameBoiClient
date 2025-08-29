import { Avatar, Box, IconButton, Paper, Stack, Tab, Tabs, Typography } from "@mui/material"
import SettingsIcon from '@mui/icons-material/Settings';
import EditIcon from '@mui/icons-material/Edit';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

export default function ProfileHeader ({profileView, setProfileView}){
    const token = sessionStorage.getItem('jwtToken');
    const isLoggedIn = !!token;


    return(<>
        <Box
        component={Paper} elevation={4}
        sx={{
            marginTop:1,
            position: 'relative',
            height: 275,
            borderRadius: 2,
            mb: 3,
            overflow: 'hidden',
        }}>                     
            <Box
                component={Paper} elevation={4}
                sx={{
                    position: "absolute",
                    width:"100%",
                    height:"100%",
                }}                  
            />
           <Box
                sx={{
                    position:"relative",
                    padding: 2,
                    zIndex: 1
                }}
            >
                <Stack direction="row-reverse" spacing={2} alignItems='end'>
                    <Box>
                        {isLoggedIn &&(
                            <IconButton aria-label="Edit" onClick={() => setProfileView('edit')}>
                            <EditIcon/>
                        </IconButton>
                        )}
                        {isLoggedIn &&(
                        <IconButton aria-label="Settings" onClick={() => setProfileView('settings')}>
                            <SettingsIcon/>
                        </IconButton>
                        )}                                                
                    </Box>
                </Stack>
                <Stack direction="row" spacing={2} alignItems="center" sx={{mb:3}}>
                    <Avatar src="https://t4.ftcdn.net/jpg/03/32/59/65/240_F_332596535_lAdLhf6KzbW6PWXBWeIFTovTii1drkbT.jpg"
                        sx={{ width: 150, height: 150, border: '2px solid white' }}/>
                    <Box>
                        <Typography variant="h5">Ime i prezime</Typography>
                        <Typography variant="body2">Biografija tn tn tn</Typography>
                    </Box>                    
                </Stack>
                <Box sx={{borderTop:`1px solid`,
                            marginLeft: -2,
                            marginRight: -2,
                            paddingLeft: 2,
                            paddingRight: 2,
                        }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Tabs value={profileView} onChange={(e, newValue) => setProfileView(newValue)}>
                        <Tab label="Posts" value="posts"/>
                        <Tab label="Photos" value="photos"/>
                        <Tab label="Challanges" value="challanges"/>
                        <Tab label="Collection" value="collection"/>
                        <Tab label="Wishlist" value="wishlist"/>
                    </Tabs>
                    <Stack direction="row" spacing={2}>
                        {!isLoggedIn &&(
                        <IconButton aria-label="AddFriend">
                            <PersonAddIcon/>
                        </IconButton>
                        )}                        
                    </Stack>
                </Stack>
                </Box> 
                </Box>   
            </Box>            
        </>
    )
}

