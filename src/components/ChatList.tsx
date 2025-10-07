import { useEffect, useState } from 'react';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { NavLink } from 'react-router-dom';
import type { Conversation } from '../types';

export default function ChatList() {
    const [chats, setChats] = useState<Conversation[]>([]);

    useEffect(() => {
        const q = query(collection(db, 'chats'), orderBy('created_at', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const chatData: Conversation[] = [];
            snapshot.forEach(doc => {
                chatData.push({ _id: doc.id, ...doc.data() as Omit<Conversation, '_id'> });
            });
            setChats(chatData);
        });

        return () => unsubscribe();
    }, []);

    return (
        <List sx={{ p: 1 }}>
            {chats.map(chat => (
                <ListItem key={chat._id} disablePadding>
                    <ListItemButton 
                        component={NavLink} 
                        to={`/chat/${chat._id}`}
                        sx={{
                            borderRadius: '8px',
                            '&.active': {
                                backgroundColor: 'rgba(0, 85, 255, 0.1)',
                                color: 'primary.main',
                                fontWeight: 'bold',
                            }
                        }}
                    >
                        <ListItemIcon sx={{ minWidth: '40px' }}>
                            <ChatBubbleOutlineIcon />
                        </ListItemIcon>
                        <ListItemText primary={chat.title} />
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    );
}