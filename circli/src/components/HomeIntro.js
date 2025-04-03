import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../animations/Animation - 1741882337471.json';


function HomeIntro() {
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
        <Lottie options={defaultOptions} height={600} width={600} />
      </div>
      <div id="circliWelcome" className="intro-area">
        <h1 className="home-intro-title">Circli</h1>
        <h2 className="home-intro-subtitle">Your community, just a click away</h2>
      </div>
    </div>
  );
}

export default HomeIntro;