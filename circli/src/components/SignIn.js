import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Box } from '@mui/material';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();

  const handleEmailPasswordSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/'); //redirect to home after successful login
    } catch (error) {
      console.error('Error signing in with email and password: ', error);
      setErrorMessage('Failed to sign in: ' + error.message); //error message
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch (error) {
      console.error('Error signing in with Google: ', error);
      setErrorMessage('Failed to sign in with Google: ' + error.message);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box display="flex" flexDirection="column" alignItems="center" sx={{ mt: 5 }}>
        <Typography variant="h5" gutterBottom>Sign In</Typography>

        {errorMessage && <Typography color="error" sx={{ mb: 2 }}>{errorMessage}</Typography>}

        <form onSubmit={handleEmailPasswordSignIn} style={{ width: '100%' }}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2, backgroundColor: '#2c54ac' }}>
            Sign In
          </Button>
        </form>

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2, backgroundColor: '#FF2E00' }}
          onClick={handleGoogleSignIn}
        >
          Sign in with Google
        </Button>
      </Box>
    </Container>
  );
};

export default SignIn;
