import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, TextField, Button, Typography, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('https://tablesprintbackend.onrender.com/register', { email, password });
      console.log(response.data);
      navigate('/login');
    } catch (error) {
      setErrorMessage('Error during registration. Try again.');
      console.error(error);
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div style={{ 
        display: 'flex', 
      justifyContent: 'start', 
      alignItems: 'center', 
      height: '95vh', 
      backgroundImage: 'url(./login_bg.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      marginLeft: '200px',
    }}>
      <Card sx={{ width: 400, padding: 3, borderRadius: 2, border: "0.1px solid black" }}>
        <CardContent>
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <img src="./logo.png" alt="Logo" style={{ width: 250, height: 90, marginBottom: 10 }} />
            <Typography variant="h6" gutterBottom sx={{ color: '#868686' }}>
              Register to TableSprint Admin
            </Typography>
          </div>
          <TextField
            fullWidth
            label="Email ID"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            sx={{
              borderRadius: '8px',
              '& .MuiInputBase-root': {
                height: '40px',
                borderRadius: '8px',
              },
              '& .MuiInputLabel-root': {
                top: '-7px',
                left: '3px',
                '&.MuiInputLabel-shrink': {
                  top: '-1px',
                  left: '-1px'
                },
              },
            }}
          />
          <TextField
            fullWidth
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePassword}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              borderRadius: '8px',
              '& .MuiInputBase-root': {
                height: '40px',
                borderRadius: '8px',
              },
              '& .MuiInputLabel-root': {
                top: '-7px',
                left: '3px',
                '&.MuiInputLabel-shrink': {
                  top: '-1px',
                  left: '-1px'
                },
              },
            }}
          />
          <TextField
            fullWidth
            label="Confirm Password"
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            margin="normal"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleToggleConfirmPassword}>
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              borderRadius: '8px',
              '& .MuiInputBase-root': {
                height: '40px',
                borderRadius: '8px',
              },
              '& .MuiInputLabel-root': {
                top: '-7px',
                left: '3px',
                '&.MuiInputLabel-shrink': {
                 top: '-1px',
                  left: '-1px'
                },
              },
            }}
          />
          <div style={{ marginTop: 10, marginBottom: 10 }}>
            <Button variant="contained" color="primary" sx={{ backgroundColor: '#5C218B' }} fullWidth onClick={handleRegister}>
              Register
            </Button>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Typography variant="body2" gutterBottom>
              Already have an account? <a href="/login">Login</a>
            </Typography>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
