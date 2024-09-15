import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { Box } from '@mui/material';

const MainLayout: React.FC = () => {
  return (
    <>
      <Header />
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box sx={{ marginLeft: '15%', width: '85%', padding: '2rem' }}>
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export default MainLayout;
