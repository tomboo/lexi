
import React, { useState, useEffect } from 'react';
import { Box, Paper, TextField, Button, Grid } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { getFirestore, collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from "firebase/firestore"; 
import type { Message } from '../types';
import MessageComponent from '../components/Message';

const ChatPage = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        const db = getFirestore();
        const q = query(collection(db, "messages"), orderBy("timestamp"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const newMessages: Message[] = [];
            querySnapshot.forEach((doc) => {
                newMessages.push({ _id: doc.id, ...doc.data() } as Message);
            });
            setMessages(newMessages);
        });

        return () => unsubscribe();
    }, []);

    const handleSendMessage = async () => {
        if (newMessage.trim() !== '') {
            const db = getFirestore();
            await addDoc(collection(db, "messages"), {
                conversation_id: "conv_X5Y6Z",
                user_id: "user_101",
                role: 'user',
                content: newMessage,
                timestamp: serverTimestamp(),
                llm_model_id: "",
                tokens_used: 0,
                embedding: [],
                prompt_message_id: ""
            });
            setNewMessage('');
        }
    };

    return (
        <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', bgcolor: '#f5f5f5', width: '100vw' }}>
            <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2 }}>
                {messages.map((msg) => (
                    <MessageComponent key={msg._id} message={msg} />
                ))}
            </Box>
            <Paper sx={{ p: 2, backgroundColor: 'white' }}>
                <Grid container spacing={2}>
                    <Grid xs>
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Type a message"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        />
                    </Grid>
                    <Grid xs="auto">
                        <Button
                            variant="contained"
                            color="primary"
                            endIcon={<SendIcon />}
                            onClick={handleSendMessage}
                            sx={{ height: '100%' }}
                        >
                            Send
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default ChatPage;
