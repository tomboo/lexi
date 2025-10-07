
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IconButton, Menu, MenuItem, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { doc, updateDoc, deleteDoc, collection, query, where, getDocs, writeBatch } from 'firebase/firestore';
import { db } from '../firebase';

interface ChatMenuProps {
    chatId: string;
    chatTitle: string;
}

export default function ChatMenu({ chatId, chatTitle }: ChatMenuProps) {
    const { chatId: activeChatId } = useParams<{ chatId: string }>();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [renameOpen, setRenameOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [newTitle, setNewTitle] = useState(chatTitle);

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = (event?: React.MouseEvent) => {
        if(event) event.stopPropagation();
        setAnchorEl(null);
    };

    const handleRenameOpen = (event: React.MouseEvent) => {
        event.stopPropagation();
        setRenameOpen(true);
        setNewTitle(chatTitle);
        handleMenuClose();
    };

    const handleRenameClose = () => {
        setRenameOpen(false);
    };

    const handleRename = async () => {
        if (newTitle.trim() !== '' && newTitle.trim() !== chatTitle) {
            const chatRef = doc(db, 'chats', chatId);
            await updateDoc(chatRef, {
                title: newTitle.trim()
            });
        }
        handleRenameClose();
    };

    const handleDeleteOpen = (event: React.MouseEvent) => {
        event.stopPropagation();
        setDeleteOpen(true);
        handleMenuClose();
    };

    const handleDeleteClose = () => {
        setDeleteOpen(false);
    };

    const handleDelete = async () => {
        handleDeleteClose();

        // Query the top-level 'messages' collection for all messages in this chat
        const messagesRef = collection(db, 'messages');
        const q = query(messagesRef, where("conversation_id", "==", chatId));
        const snapshot = await getDocs(q);

        // Delete all the messages in a batch
        if (!snapshot.empty) {
            const batch = writeBatch(db);
            snapshot.forEach(doc => {
                batch.delete(doc.ref);
            });
            await batch.commit();
        }

        // Delete the chat itself
        await deleteDoc(doc(db, 'chats', chatId));

        // If the active chat is the one being deleted, navigate to the home page
        if (activeChatId === chatId) {
            navigate('/');
        }
    };

    return (
        <>
            <IconButton
                aria-label="more"
                onClick={handleMenuClick}
                sx={{
                    position: 'absolute',
                    right: 4,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 1
                }}
                size="small"
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={(e: React.MouseEvent) => handleMenuClose(e)}
                onClick={(e) => e.stopPropagation()}
            >
                <MenuItem onClick={handleRenameOpen}>Rename</MenuItem>
                <MenuItem onClick={handleDeleteOpen}>Delete</MenuItem>
            </Menu>

            <Dialog open={renameOpen} onClose={handleRenameClose} fullWidth maxWidth="xs">
                <DialogTitle>Rename Chat</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Chat Name"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleRenameClose}>Cancel</Button>
                    <Button onClick={handleRename} variant="contained">Rename</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={deleteOpen} onClose={handleDeleteClose} fullWidth maxWidth="xs">
                <DialogTitle>Delete Chat?</DialogTitle>
                <DialogContent>
                    <Typography>This will delete the chat "{chatTitle}" and all its messages.</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteClose}>Cancel</Button>
                    <Button onClick={handleDelete} variant="contained" color="error">Delete</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
