
import React, { useState, useEffect, useRef } from 'react';
import { Box, Paper, TextField, Button, Grid } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { getFirestore, collection, query, orderBy, onSnapshot, addDoc, serverTimestamp, where } from "firebase/firestore"; 
import type { Message } from '../types';
import MessageComponent from '../components/Message';

interface ChatPageProps {
    chatId: string;
}

// Subtle noise texture using a data URL
const noiseTexture = `url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOCIgLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjbm9pc2UpIiBvcGFjaXR5PSIwLjAyNSIvPjwvc3ZnPg==')`;

const ChatPage = ({ chatId }: ChatPageProps) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef<null | HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (!chatId) return;

        const db = getFirestore();
        const q = query(collection(db, "messages"), where("conversation_id", "==", chatId), orderBy("timestamp"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const newMessages: Message[] = [];
            querySnapshot.forEach((doc) => {
                newMessages.push({ _id: doc.id, ...doc.data() } as Message);
            });
            setMessages(newMessages);
        });

        return () => unsubscribe();
    }, [chatId]);

    const handleSendMessage = async () => {
        if (newMessage.trim() !== '' && chatId) {
            const db = getFirestore();
            await addDoc(collection(db, "messages"), {
                conversation_id: chatId,
                user_id: "user_123", // Placeholder for now
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
        <Box sx={{ 
            height: '100vh', 
            display: 'flex', 
            flexDirection: 'column', 
            bgcolor: '#f0f2f5',
            backgroundImage: noiseTexture,
        }}>
            <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 3 }}>
                {messages.map((msg) => (
                    <MessageComponent key={msg._id} message={msg} />
                ))}
                <div ref={messagesEndRef} />
            </Box>
            <Paper sx={{ 
                p: 2, 
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                borderTop: '1px solid #e0e0e0',
                boxShadow: '0 -5px 15px rgba(0,0,0,0.05)'
            }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid xs>
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Type a message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                            sx={{ 
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '20px',
                                    backgroundColor: 'white',
                                    '& fieldset': {
                                        borderColor: '#e0e0e0',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'primary.main',
                                    },
                                },
                            }}
                        />
                    </Grid>
                    <Grid xs="auto">
                        <Button
                            variant="contained"
                            color="primary"
                            endIcon={<SendIcon />}
                            onClick={handleSendMessage}
                            sx={{ 
                                borderRadius: '20px',
                                height: '56px',
                                boxShadow: '0 4px 10px rgba(0, 85, 255, 0.2)',
                                transition: 'transform 0.2s, box-shadow 0.2s',
                                '&:hover': {
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 6px 15px rgba(0, 85, 255, 0.3)',
                                }
                            }}
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
