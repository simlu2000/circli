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
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', 
        width:'100vw',
      }}
    >
            <Lottie options={defaultOptions} height={400} width={400} /> 
      <h1 style={{ fontSize: '5rem',lineHeight:'10px' }}>Circli</h1>
      <h2 style={{ fontSize: '2rem' }}>Share your life</h2>
    </div>
  );
}

export default HomeIntro;