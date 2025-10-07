import { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';

export default function NewChat() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [chatName, setChatName] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setChatName('');
    };

    const createNewChat = async () => {
        if (chatName.trim() !== '') {
            const docRef = await addDoc(collection(db, 'chats'), {
                title: chatName,
                created_at: serverTimestamp(),
                user_id: 'user_123' // Placeholder
            });
            navigate(`/chat/${docRef.id}`);
            handleClose();
        }
    };

    return (
        <>
            <Button 
                onClick={handleClickOpen} 
                variant="contained" 
                fullWidth
                startIcon={<AddCircleOutlineIcon />}
                sx={{
                    borderRadius: '12px',
                    boxShadow: '0 4px 10px rgba(0, 85, 255, 0.2)',
                    padding: '10px 0',
                }}
            >
                New Chat
            </Button>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
                <DialogTitle>
                    Create a new chat
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Chat Name"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={chatName}
                        onChange={(e) => setChatName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions sx={{ p: '16px 24px' }}>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={createNewChat} variant="contained">Create</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}