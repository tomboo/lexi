
import React from 'react';
import { Box, Paper, Typography, Avatar } from '@mui/material';
import type { Message } from '../types';

interface MessageProps {
    message: Message;
}

const MessageComponent: React.FC<MessageProps> = ({ message }) => {
    const isUser = message.role === 'user';

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: isUser ? 'flex-end' : 'flex-start',
                mb: 2,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: isUser ? 'row-reverse' : 'row',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ bgcolor: isUser ? 'primary.main' : 'secondary.main', mx: 1 }}>
                    {isUser ? 'U' : 'A'}
                </Avatar>
                <Paper
                    variant="outlined"
                    sx={{
                        p: 2,
                        backgroundColor: isUser ? 'primary.light' : 'secondary.light',
                        borderRadius: isUser ? '20px 20px 5px 20px' : '20px 20px 20px 5px',
                    }}
                >
                    <Typography variant="body1">{message.content}</Typography>
                </Paper>
            </Box>
        </Box>
    );
};

export default MessageComponent;
