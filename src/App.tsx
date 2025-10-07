
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import ChatPage from './pages/ChatPage';
import theme from './theme';
import './firebase';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <ChatPage />
        </ThemeProvider>
    );
}

export default App;
