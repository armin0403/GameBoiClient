import { Box, Modal, Typography, Paper } from "@mui/material";
import { useModal } from "../Contexts/ModalContext";

export default function SharedModal (){
    const {modalOpen, modalContent, closeModal} = useModal();
       
    return(
        <Modal open={modalOpen} onClose={closeModal}>
            <Paper sx={{
                elevation: 16,
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 800,
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 4,
                borderRadius: 2,
                }}>
                <Typography variant="h6" gutterBottom align="center">
                    {modalContent.title}
                </Typography>
                <Box>
                    {modalContent.content}
                </Box>
            </Paper>
        </Modal>
    );
}

