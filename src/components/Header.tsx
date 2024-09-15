import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Menu, IconButton, Button, Typography, Box } from '@mui/material';

const logoPath = '/header_img.png';
const profileIconPath = '/profile_icon.png';
const dan = '/dan.png';

const Header: React.FC = () => {
  const { logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleConfirmLogout = () => {
    logout();
    handleCloseMenu();
  };

  const handleDismissLogout = () => {
    handleCloseMenu();
  };



  return (
    <>
      <header style={{ 
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '0 1rem', 
        backgroundColor: '#662671', 
        borderBottom: '1px solid #dee2e6',
        height: '10vh',
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={logoPath} alt="Logo" style={{ height: '30px' }} />
        </div>
        <div>
          <IconButton onClick={handleProfileClick}>
            <img src={profileIconPath} alt="Profile Icon" style={{ height: '30px' }} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
            PaperProps={{
              style: {
                top: '60px',
                right: 0,
                width: '300px',
              },
            }}
          >
            <Box p={2} textAlign="center">
              <Box display='flex' flexDirection='row' justifyContent='center' margin='10px'>
                <img src={dan} alt="Danger" style={{width: 32, height: 32 }} />
                <Typography sx={{ fontSize: '23px', fontWeight: 'bold', marginLeft: '10px'}} variant="h6">Logout</Typography>
              </Box>
              
              <Typography variant="body2" sx={{ mb: 2 }}>Are you sure you want to logout?</Typography>
              <Box display="flex" justifyContent="space-between" mt={2}>
                <Button
                  onClick={handleDismissLogout}
                  sx={{ height: '40px', width:'100px', border: '1px solid #ddd', color: 'black', borderRadius: '30px', margin: '10px', p: '15px', fontSize: '12px'}}
                >
                  Dismiss
                </Button>
                <Button
                  onClick={handleConfirmLogout}
                  sx={{ height: '40px', width:'100px', border: '1px solid #ddd', backgroundColor: '#5C218B', color: 'white', borderRadius: '30px', margin: '10px', p: '15px', fontSize: '12px'}}
                >
                  Confirm
                </Button>
              </Box>
            </Box>
          </Menu>
        </div>
      </header>
    </>
  );
};

export default Header;
