
import React, { useState } from 'react';
import { Grid, TextField, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

interface UserInputProps {
    onSendMessage: (message: string) => void;
}

const UserInput: React.FC<UserInputProps> = ({ onSendMessage }) => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleSendClick = () => {
        if (inputValue.trim()) {
            onSendMessage(inputValue.trim());
            setInputValue('');
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleSendClick();
        }
    };

    return (
        <Grid container spacing={2}>
            <Grid xs>
                <TextField
                    fullWidth
                    label="Type a message"
                    variant="outlined"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                />
            </Grid>
            <Grid xs="auto">
                <Button
                    variant="contained"
                    color="primary"
                    endIcon={<SendIcon />}
                    onClick={handleSendClick}
                    sx={{ height: '100%' }}
                >
                    Send
                </Button>
            </Grid>
        </Grid>
    );
};

export default UserInput;
