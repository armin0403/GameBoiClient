import { Box, Card, CardContent } from "@mui/material";

const Gamecard = () => {
    return(
        <>
        <Card sx={{display:'flex'}}>
            <Box sx={{display:'flex', flexDirection:'column'}}>
                <CardContent>
                </CardContent>
            </Box>
        </Card>
        </>
    )
}

export default Gamecard;