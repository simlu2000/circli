import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function CtaButton({to}) {
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate('/SignIn');
  };

  return (
    <div>
      <button className="continue" onClick={handleSignInClick} style={{ 
        backgroundColor: '#1976d2', 
        color: 'white', 
        padding: '10px 20px', 
        border: 'none', 
        borderRadius: '4px', 
        cursor: 'pointer' 
      }}>
        {to}
      </button>
    </div>
  );
}