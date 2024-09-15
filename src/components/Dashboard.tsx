import React from 'react';
import { Box, Typography } from '@mui/material';

const logo = '/logo.png';

const Dashboard: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '65vh',
        backgroundColor: 'white',
        padding: '2rem',
      }}
    >
      <img src={logo} alt="Dashboard"  style={{ maxWidth: '60%', height: '60%', borderRadius: '10px' }} />
     
      <Typography
          variant="body1"
          sx={{
            marginTop: '1.5rem',
            color: 'black',
            fontSize: '25px'
          }}
        >
          Welcome to TableSprint Admin
        </Typography>
    </Box>
  );
};

export default Dashboard;
