
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
            light: '#bbdefb',
        },
        secondary: {
            main: '#f50057',
            light: '#fce4ec',
        },
        background: {
            default: '#f5f5f5',
        },
    },
    typography: {
        fontFamily: 'Roboto, sans-serif',
    },
});

export default theme;
