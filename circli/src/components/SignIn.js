import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Box } from '@mui/material';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { db } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState(''); 
  const [isRegistering, setIsRegistering] = useState(false); //stato per determinare se siamo in modalità registrazione
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();

  const writeUserData = async (user, displayName) => {
    try {
      console.log('Saving user data to DB:', user);
      console.log('user.uid:', user.uid);
      console.log("ref(db, 'users/' + user.uid):", ref(db, 'users/' + user.uid));
      console.log("db:", db);
      await set(ref(db, 'users/' + user.uid), {
        displayName: displayName || user.displayName || null,
        email: user.email,
        createdAt: new Date().toISOString(),
      }).then(() => {
        console.log('Dati utente salvati nel database CON SUCCESSO');
      }).catch((error) => {
        console.error('Errore durante salvataggio dati nel db, ', error);
        console.log("error:", error);
      });
    } catch (error) {
      console.error('Errore nel salvataggio dei dati nel database: ', error);
      console.log("error:", error);
    }
  };

  const handleEmailPasswordSignIn = async (e) => {
    e.preventDefault();
    try {
      if (isRegistering) {
        //registrazione
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        //scrivo i dati dell'utente nel database
        await writeUserData(user, displayName); 
      } else {
        //login
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate('/Feed'); //redirect dopo la registrazione o login
    } catch (error) {
      console.error('Errore durante la registrazione/login: ', error);
      setErrorMessage('Errore: ' + error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      //scrivo i dati dell'utente nel database
      await writeUserData(user, user.displayName);
      navigate('/Feed'); //redirect dopo il login
    } catch (error) {
      console.error('Errore durante il login con Google: ', error);
      setErrorMessage('Errore durante il login con Google: ' + error.message);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box display="flex" flexDirection="column" alignItems="center" sx={{ mt: 5 }}>
        <Typography variant="h5" gutterBottom>
          {isRegistering ? 'Register' : 'Sign In'}
        </Typography>

        {errorMessage && <Typography color="error" sx={{ mb: 2 }}>{errorMessage}</Typography>}

        <form onSubmit={handleEmailPasswordSignIn} style={{ width: '100%' }}>
          {isRegistering && (
            <TextField
              label="Display Name"
              fullWidth
              required
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              margin="normal"
            />
          )}
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
            {isRegistering ? 'Register' : 'Sign In'}
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

        <Typography
          variant="body2"
          sx={{ mt: 2, cursor: 'pointer', color: '#2c54ac' }}
          onClick={() => setIsRegistering(!isRegistering)}
        >
          {isRegistering ? 'Already have an account? Sign In' : 'Don\'t have an account? Register'}
        </Typography>
      </Box>
    </Container>
  );
};

export default SignIn;