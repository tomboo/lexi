
import React from 'react';
import { Box, Paper, Typography, Avatar } from '@mui/material';
import { keyframes } from '@emotion/react';
import type { Message } from '../types';

interface MessageProps {
    message: Message;
}

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const MessageComponent: React.FC<MessageProps> = ({ message }) => {
    const isUser = message.role === 'user';

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: isUser ? 'flex-end' : 'flex-start',
                mb: 2,
                animation: `${fadeIn} 0.3s ease-out`,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: isUser ? 'row-reverse' : 'row',
                    alignItems: 'flex-start',
                    maxWidth: '80%',
                }}
            >
                <Avatar 
                    sx={{ 
                        bgcolor: isUser ? '#0055ff' : '#e0e0e0', 
                        color: isUser ? 'white' : 'black',
                        mx: 1.5,
                        border: '2px solid white'
                    }}
                >
                    {isUser ? 'U' : 'A'}
                </Avatar>
                <Paper
                    elevation={3}
                    sx={{
                        p: '12px 18px',
                        background: isUser 
                            ? 'linear-gradient(135deg, #0055ff, #0044cc)' 
                            : '#ffffff',
                        color: isUser ? 'white' : 'black',
                        borderRadius: isUser ? '20px 20px 5px 20px' : '20px 20px 20px 5px',
                        boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
                    }}
                >
                    <Typography variant="body1">{message.content}</Typography>
                </Paper>
            </Box>
        </Box>
    );
};

export default MessageComponent;
