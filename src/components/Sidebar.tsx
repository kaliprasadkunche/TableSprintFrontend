import React from 'react';
import { Box, List, ListItemText, ListItemButton } from '@mui/material';
import { Link } from 'react-router-dom';

const dash = '/dash.png';
const cat = '/cat.png';
const sub = '/sub.png';
const pro = '/pro.png';
const arr = '/arr.png';

const Sidebar: React.FC = () => {
  return (
    <Box 
      sx={{ 
        width: '15%', 
        height: 'calc(100vh - 10vh)',
        backgroundColor: '#f4f4f4', 
        padding: '1rem',
        position: 'fixed', 
        top: '11.5vh', 
        left: 0,
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid #ddd',
      }}
    >
      <List>
        <ListItemButton component={Link} to="/dashboard">
          <img src={dash} alt="Dashboard" style={{ height: '25px', marginRight: '15px' }} />
          <ListItemText primary="Dashboard" />
          <img src={arr} alt="Arrow" style={{ height: '16px', marginLeft: '15px' }} />
        </ListItemButton>
        <ListItemButton component={Link} to="/category">
          <img src={cat} alt="Category" style={{ height: '25px', marginRight: '15px' }} />
          <ListItemText primary="Category" />
          <img src={arr} alt="Arrow" style={{ height: '16px', marginLeft: '15px' }} />
        </ListItemButton>
        <ListItemButton component={Link} to="/subcategory">
          <img src={sub} alt="SubCategory" style={{ height: '25px', marginRight: '15px' }} />
          <ListItemText primary="SubCategory" />
          <img src={arr} alt="Arrow" style={{ height: '16px', marginLeft: '15px' }} />
        </ListItemButton>
        <ListItemButton component={Link} to="/product">
          <img src={pro} alt="Product" style={{ height: '25px', marginRight: '15px' }} />
          <ListItemText primary="Product" />
          <img src={arr} alt="Arrow" style={{ height: '16px', marginLeft: '15px' }} />
        </ListItemButton>
      </List>
    </Box>
  );
};

export default Sidebar;
