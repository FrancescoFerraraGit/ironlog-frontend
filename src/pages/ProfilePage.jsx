import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserProfile, resetProfile } from '../features/user/userSlice.js';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';

function ProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { profile, isLoading, isError, message } = useSelector((state) => state.user);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      dispatch(getUserProfile());
    }
  }, [user, navigate, dispatch]);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ mt: 5 }}>
        <Alert severity="error">{message}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 5, p: 3, border: '1px solid #ccc', borderRadius: '8px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Dettagli Profilo
      </Typography>
      {profile && (
        <>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Username: {profile.username}
          </Typography>
          <Typography variant="h6" sx={{ mt: 1 }}>
            Email: {profile.email}
          </Typography>
        </>
      )}
    </Box>
  );
}

export default ProfilePage;