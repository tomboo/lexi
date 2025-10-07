
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import theme from './theme';
import './firebase';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/chat/:chatId" element={<HomePage />} />
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;
