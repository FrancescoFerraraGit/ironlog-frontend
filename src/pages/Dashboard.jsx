import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout, reset } from '../features/auth/authSlice.js';
import { Box, Typography, Button } from '@mui/material';

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/login');
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 5, p: 3, border: '1px solid #ccc', borderRadius: '8px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Benvenuto, {user && user.username}!
      </Typography>
      <Typography variant="body1" align="center" sx={{ mb: 3 }}>
        Questa è la tua area personale protetta.
      </Typography>
      <Box sx={{ textAlign: 'center' }}>
        <Button variant="contained" color="error" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
    </Box>
  );
}

export default Dashboard;