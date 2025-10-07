
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, Box, Paper, IconButton } from '@mui/material';
import { collection, getDocs, writeBatch } from 'firebase/firestore';
import { db } from '../firebase';
import CloseIcon from '@mui/icons-material/Close';

export default function AdminPanel() {
    const [deleteOpen, setDeleteOpen] = useState(false);
    const navigate = useNavigate();

    const handleDeleteOpen = () => {
        setDeleteOpen(true);
    };

    const handleDeleteClose = () => {
        setDeleteOpen(false);
    };

    const handleClearDatabase = async () => {
        handleDeleteClose();

        try {
            const chatsRef = collection(db, 'chats');
            const messagesRef = collection(db, 'messages');

            const chatsSnapshot = await getDocs(chatsRef);
            const messagesSnapshot = await getDocs(messagesRef);

            const batch = writeBatch(db);

            chatsSnapshot.forEach(doc => {
                batch.delete(doc.ref);
            });

            messagesSnapshot.forEach(doc => {
                batch.delete(doc.ref);
            });

            await batch.commit();

            alert('Database cleared successfully!');
        } catch (error) {
            console.error("Error clearing database: ", error);
            alert('Error clearing database. See console for details.');
        }
    };

    return (
        <Box sx={{ p: 3, position: 'relative', bgcolor: 'background.paper', height: '100vh' }}>
             <IconButton
                aria-label="close"
                onClick={() => navigate('/')}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                }}
            >
                <CloseIcon />
            </IconButton>
            <Typography variant="h4" gutterBottom>Admin Panel</Typography>
            <Paper sx={{ p: 2 }}>
                <Typography variant="h6">Database Management</Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                    This action will permanently delete all chats and messages from the database.
                </Typography>
                <Button variant="contained" color="error" onClick={handleDeleteOpen}>
                    Clear Database
                </Button>
            </Paper>

            <Dialog open={deleteOpen} onClose={handleDeleteClose} fullWidth maxWidth="xs">
                <DialogTitle>Clear Entire Database?</DialogTitle>
                <DialogContent>
                    <Typography>This will delete all chats and messages. This action is irreversible.</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteClose}>Cancel</Button>
                    <Button onClick={handleClearDatabase} variant="contained" color="error">Clear Database</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
