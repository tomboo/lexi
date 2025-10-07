
import { Box, CssBaseline, Drawer, Toolbar, Divider, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useParams, Link } from 'react-router-dom';
import ChatPage from './ChatPage';
import NewChat from '../components/NewChat';
import ChatList from '../components/ChatList';
import SettingsIcon from '@mui/icons-material/Settings';

const drawerWidth = 280;

export default function HomePage() {
  const { chatId } = useParams<{ chatId: string }>();

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#f8f9fa',
            borderRight: '1px solid #e0e0e0',
            overflowX: 'hidden'
          },
        }}
      >
        <Toolbar />
        <Box sx={{ p: 2 }}>
          <NewChat />
        </Box>
        <Divider />
        <Box>
          <ChatList />
        </Box>
        <Divider />
        <List>
            <ListItem disablePadding>
                <ListItemButton component={Link} to="/admin">
                    <ListItemIcon>
                        <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Admin Panel" />
                </ListItemButton>
            </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, height: '100vh', display: 'flex', flexDirection: 'column' }}>
        {chatId ? (
          <ChatPage chatId={chatId} />
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <Typography variant="h6" color="text.secondary">
              Select a chat or start a new one
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}