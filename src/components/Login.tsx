import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, CardContent, TextField, Button, Typography, IconButton, 
  InputAdornment, Dialog, DialogTitle, DialogContent, DialogActions 
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://tablesprintbackend.onrender.com/login', { email, password });
      const { token } = response.data;
      localStorage.setItem('token', token); // Save token to localStorage
      console.log('Token received:', token);
      navigate('/dashboard'); // Redirect to dashboard on successful login
    } catch (error) {
      setErrorMessage('Invalid username or password');
      console.error(error);
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleForgotPasswordClick = () => {
    setForgotPasswordOpen(true);
  };

  const handleForgotPasswordClose = () => {
    setForgotPasswordOpen(false);
  };

  const handleSendResetLink = async () => {
    try {
      await axios.post('https://tablesprintbackend.onrender.com/forgot-password', { email: forgotPasswordEmail });
      alert('Reset password link sent to your email.');
      handleForgotPasswordClose();
    } catch (error) {
      console.error('Error sending reset password link:', error);
    }
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
              Welcome to TableSprint Admin
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
                  left: '-1px',
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
                  left: '-1px',
                },
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePassword}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <div style={{ marginTop: 10, marginBottom: 10 }}>
            <Button variant="contained" color="primary" sx={{ backgroundColor: '#5C218B' }} fullWidth onClick={handleLogin}>
              Login
            </Button>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Typography sx={{ color: '#5C218B' }} variant="body2" gutterBottom>
              New user? <a href="/register">Register</a>
            </Typography>
            <Typography sx={{ color: '#5C218B' }} variant="body2">
              <a href="#" onClick={handleForgotPasswordClick}>Forgot Password?</a>
            </Typography>
          </div>
        </CardContent>
      </Card>

      {/* Forgot Password Dialog */}
      <Dialog open={forgotPasswordOpen} onClose={handleForgotPasswordClose}>
        {/* <DialogTitle sx={{color: '#5C218B'}}>Did you forgot your password ?</DialogTitle> */}
        <DialogContent>
          <Typography sx={{textAlign: 'center', color: '#5C218B', fontWeight: 'bold', fontSize: '20px', margin: '25px'}}>Did you forgot your password ?</Typography>
          <Typography sx={{textAlign: 'center', color: '#8F8F8F', fontSize: '15px'}}>Enter your email address and we’ll send you a link to restore password</Typography>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={forgotPasswordEmail}
            onChange={(e) => setForgotPasswordEmail(e.target.value)}
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
                  left: '-1px',
                },
              },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSendResetLink} variant="contained" color="primary" sx={{ height: '40px', width:'150px', border: '1px solid #ddd', backgroundColor: '#5C218B', color: 'white', borderRadius: '30px', margin: '10px', p: '15px', fontSize: '12px'}}>
            Send Reset Link
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Login;
