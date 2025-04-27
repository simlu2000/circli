import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Lottie from 'react-lottie';
import animationData from '../animations/Animation - 1741882337471.json';
import CtaButton from './CtaButton';

function HomeIntro() {
  const [user, setUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [auth]);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div className="home-intro-container">
      <div className="intro-area">
        <Lottie options={defaultOptions} className="lottie-responsive" />
      </div>
      <div id="circliWelcome" className="intro-area">
        <h1 className="home-intro-title">Circli</h1>
        <h2 className="home-intro-subtitle">Your community, just a click away</h2>
        {!user ? ( 
          <CtaButton to="Sign in" />
        ) : (
          <CtaButton to="Feed" />
        )}
      </div>
    </div>
  );
}

export default HomeIntro;
