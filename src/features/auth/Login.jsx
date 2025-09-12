import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, reset } from './authSlice';
import { TextField, Button, Box, Typography } from '@mui/material';
import { Link} from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  useEffect(() => {
    if (isSuccess || user) {
      console.log('Login avvenuto con successo');
    }
    if (isError) {
      console.error(message);
    }
    dispatch(reset());
  }, [user, isSuccess, isError, message, dispatch]);

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5 }}>
      <Typography variant="h5">Accedi</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Email"
          name="email"
          margin="normal"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          type="password"
          label="Password"
          name="password"
          margin="normal"
          value={formData.password}
          onChange={handleChange}
        />
        <Button
          fullWidth
          variant="contained"
          type="submit"
          disabled={isLoading}
          sx={{ mt: 2 }}
        >
          Accedi
        </Button>
      </form>
        <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Typography variant="body2">
          Non hai un account? <Link to="/register">Registrati</Link>
        </Typography>
      </Box>
    </Box>
  );
}

export default Login;
