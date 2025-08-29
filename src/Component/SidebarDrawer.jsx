import { AutoAwesome, MilitaryTech, Newspaper, SportsEsports, Group, Home, Collections } from "@mui/icons-material";
import { Divider, Drawer, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

export default function SidebarDrawer ({open, onClose}){
    const token = sessionStorage.getItem("jwtToken");
    const isLoggedIn = !!token;

    return(
        <Drawer anchor="left" open={open} onClose={onClose}>
            <List sx={{width:250}}>
                <ListItemButton onClick={onClose} component={Link} to="/HomePage">
                    <ListItemIcon><Home/></ListItemIcon>
                    <ListItemText>Home</ListItemText>
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon><Newspaper/></ListItemIcon>
                    <ListItemText>News</ListItemText>
                </ListItemButton>
                <ListItemButton onClick={onClose} component={Link} to="/AllGames">
                    <ListItemIcon><SportsEsports/> </ListItemIcon>
                    <ListItemText>Games</ListItemText>
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon><MilitaryTech/></ListItemIcon>
                    <ListItemText>Challanges</ListItemText>
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon><Group/></ListItemIcon>
                    <ListItemText>Players</ListItemText>
                </ListItemButton>
                 <Divider/>
                {isLoggedIn &&(
                    <>
                <ListItemText sx={{p:2}}><strong>YOUR SECTION</strong></ListItemText>
                <ListItemButton onClick={onClose} component={Link} to="/GameCollection">
                    <ListItemIcon><SportsEsports/> </ListItemIcon>
                    <ListItemText>Collection</ListItemText>
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon><Collections/></ListItemIcon>
                    <ListItemText>Gallery</ListItemText>
                </ListItemButton>
                <ListItemButton onClick={onClose} component={Link} to="/Challanges">
                    <ListItemIcon><MilitaryTech/></ListItemIcon>
                    <ListItemText>Challanges</ListItemText>
                </ListItemButton>
                <ListItemButton onClick={onClose} component={Link} to="/Wishlist">
                    <ListItemIcon><AutoAwesome/> </ListItemIcon>
                    <ListItemText>Wishlist</ListItemText>
                </ListItemButton>                
                    </>
                )}
            </List>
        </Drawer>
    )
}