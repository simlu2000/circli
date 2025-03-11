import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import HomeIntro from './components/HomeIntro';
import Feed from './components/Feed';
import SignIn from './components/SignIn';
import UserProfile from './components/UserProfile';

const AppContent = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        //utente loggato
        setUser(user);
      } else {
        //non loggato
        setUser(null);
        navigate('/SignIn');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  return (
    <>
      <NavBar />
      <div className="App">
        <Routes>
          <Route path="/" element={<HomeIntro />} />
          <Route path="/Feed" element={<Feed />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/UserProfile" element={<UserProfile user={user}/>} />
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
