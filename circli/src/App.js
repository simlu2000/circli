import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import HomeIntro from './components/HomeIntro';
import Feed from './components/Feed';
import SignIn from './components/SignIn';
import { Typography } from '@mui/material';
import UserProfile from './components/UserProfile';
import { fetchAllPosts } from './components/postsService';
import { ref, set } from 'firebase/database';
import { db } from './firebaseConfig';
import { light } from '@mui/material/styles/createPalette';

const AppContent = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Utente loggato
        setUser(user);
        if (location.pathname === '/SignIn') {
          navigate('/'); // Se l'utente è già loggato, reindirizzalo alla home o altra pagina
        }
      } else {
        // Non loggato
        setUser(null);
        if (location.pathname !== '/SignIn') {
          navigate('/SignIn'); // Reindirizza a SignIn solo se non ci si trova già lì
        }
      }
    });
    return () => unsubscribe();
  }, [navigate, location]);

  const addLike = async (userId, postId, likerId) => {
    try {
      const likeRef = ref(db, `posts/${userId}/${postId}/likes/${likerId}`);
      await update(likeRef, { likedAt: new Date().toISOString() });
      console.log('Like aggiunto con successo');
    } catch (error) {
      console.error('Errore durante aggiunta del like: ', error);
    }
  };

  const addComment = async (userId, postId, commenterId, commentText) => {
    try {
      const commentRef = ref(db, `posts/${userId}/${postId}/comments`);
      await push(commentRef, {
        commenterId,
        displayName: commenterId, // Puoi usare il nome utente reale se disponibile
        text: commentText,
        createdAt: new Date().toISOString(),
      });
      console.log('Commento aggiunto con successo');
    } catch (error) {
      console.error('Errore durante aggiunta del commento: ', error);
    }
  };
  return (
    <>
      {errorMessage && <Typography color="error" sx={{ mb: 2 }}>{errorMessage}</Typography>}
      <NavBar user={user} />
      <div className="App">
        <Routes>
          <Route path="/" element={<HomeIntro />} />
          <Route path="/Feed" element={<Feed user={user} getAllPosts={fetchAllPosts} addComment={addComment} addLike={addLike} />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/UserProfile" element={<UserProfile user={user} />} />
        </Routes>
      </div>
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
