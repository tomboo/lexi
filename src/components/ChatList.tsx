import { useEffect, useState } from 'react';
import { List, ListItem, ListItemButton, ListItemText, Typography, Box } from '@mui/material';
import { collection, query, onSnapshot, orderBy, Timestamp } from 'firebase/firestore';
import { Link, useParams } from 'react-router-dom';
import { db } from '../firebase';
import ChatMenu from './ChatMenu'; // Import the new component

interface Chat {
    id: string;
    title: string;
    created_at: Timestamp;
}

export default function ChatList() {
    const { chatId } = useParams<{ chatId: string }>();
    const [chats, setChats] = useState<Chat[]>([]);

    useEffect(() => {
        const q = query(collection(db, "chats"), orderBy("created_at", "desc"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const chatsData: Chat[] = [];
            querySnapshot.forEach((doc) => {
                chatsData.push({ id: doc.id, ...doc.data() } as Chat);
            });
            setChats(chatsData);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const formatDate = (timestamp: Timestamp | null | undefined) => {
        if (!timestamp) {
            return "Just now";
        }
        return new Date(timestamp.seconds * 1000).toLocaleString();
    };

    return (
        <List dense>
            {chats.map((chat) => (
                <ListItem key={chat.id} disablePadding sx={{ position: 'relative' }}>
                    <ListItemButton component={Link} to={`/chat/${chat.id}`} selected={chatId === chat.id}>
                        <ListItemText 
                            primary={chat.title} 
                            secondary={
                                <Typography variant="caption" color="text.secondary">
                                    {formatDate(chat.created_at)}
                                </Typography>
                            }
                        />
                    </ListItemButton>
                    <ChatMenu chatId={chat.id} chatTitle={chat.title} />
                </ListItem>
            ))}
             {chats.length === 0 && (
                <Box sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                        No chats yet. Create one! 
                    </Typography>
                </Box>
            )}
        </List>
    );
}