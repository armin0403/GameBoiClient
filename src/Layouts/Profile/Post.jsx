import { ThumbUpAlt } from "@mui/icons-material";
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
import { Avatar, Box, IconButton, Paper, Stack, Typography } from "@mui/material";

export default function Post(){
    return(
    <Box sx={{p:1}}>
        <Box 
        component={Paper} elevation={6}
        sx={{
            borderRadius:2,
        }}>
            <Box 
            sx={{
                borderBottom: `1px solid`,
                padding:2,
            }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" >
                <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar src="https://t4.ftcdn.net/jpg/03/32/59/65/240_F_332596535_lAdLhf6KzbW6PWXBWeIFTovTii1drkbT.jpg"
                        sx={{ width: 50, height: 50, border: '2px solid white' }}/>
                    <Box>
                        <Typography variant="h5">Ime i prezime</Typography>
                    </Box>
                </Stack>
                <Stack direction="row">
                    <Typography>12.04.2025 14:55</Typography>
                </Stack>
                </Stack>
            </Box>
            <Box sx={{padding:2}}>
                <Typography sx={{
                    whiteSpace:"pre-wrap",
                    variant:"body1"
                }}>
                {`Platinum #66: Chernobylite

This was an interesting experience. I went in knowing nothing, and it turned out to be a pretty solid game.
The platinum is straightforward, and I really enjoyed my time with it — it didn’t overstay its welcome.`}
                </Typography>
            </Box>
            <Box sx={{
                borderTop: `1px solid`,
                padding:1
            }}> 
            <Stack direction="row" alignItems="center" spacing={2}>
                <IconButton>
                    <ThumbUpAlt/>
                </IconButton>
                <Typography>6</Typography>
                <IconButton>
                    <CommentIcon/>
                </IconButton>
                <Typography>2</Typography>
                <IconButton>
                    <ShareIcon/>
                </IconButton>
            </Stack>
            </Box>
        </Box>
    </Box>
    )
}