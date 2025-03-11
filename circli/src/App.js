import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import HomeIntro from './components/HomeIntro';
import Feed from './components/Feed';
import SignIn from './components/SignIn';
import UserProfile from './components/UserProfile';

const AppContent = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

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

  return (
    <>
      <NavBar user={user} />
      <div className="App">
        <Routes>
          <Route path="/" element={<HomeIntro />} />
          <Route path="/Feed" element={<Feed />} />
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
