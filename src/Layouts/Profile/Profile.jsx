import { Box } from "@mui/material";
import ProfileContainer from "./ProfileContainer";
import ProfileHeader from "./ProfileHeader";
import React from "react";

export default function Profile (){
    const [profileView, setProfileView] = React.useState('posts');
    
    return(
        <>
        <Box sx={{p:1, marginBottom:-3}}>
            <ProfileHeader profileView={profileView} setProfileView={setProfileView}/>
        </Box>
        <Box>
            <ProfileContainer profileView={profileView}/>
        </Box>
        </>
    )
}