import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register, reset } from './authSlice';
import { TextField, Button, Box, Typography } from '@mui/material';
import { Link} from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(formData));
  };

  useEffect(() => {
    if (isSuccess || user) {
      console.log('Registrazione avvenuta con successo');
    }
    if (isError) {
      console.error(message);
    }
    dispatch(reset());
  }, [user, isSuccess, isError, message, dispatch]);

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5 }}>
      <Typography variant="h5">Registrati</Typography>
      <form onSubmit={handleSubmit}>
        <TextField fullWidth label="Username" name="username" margin="normal" onChange={handleChange} />
        <TextField fullWidth label="Email" name="email" margin="normal" onChange={handleChange} />
        <TextField fullWidth type="password" label="Password" name="password" margin="normal" onChange={handleChange} />
        <Button fullWidth variant="contained" type="submit" disabled={isLoading} sx={{ mt: 2 }}>
          Registrati
        </Button>
      </form>
      <Box sx={{ mt: 2, textAlign: 'center' }}>
       <Typography variant="body2">
        Sei già registrato? <Link to="/login">Login</Link>
       </Typography>
      </Box>
    </Box>
  );
}

export default Register;
