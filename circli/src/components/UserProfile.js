import React from 'react';

function UserProfile({ user }) {
  
  return (
    <>
      {user ? (
        <div>
          <h1>Hi {user.displayName || user.email}</h1>
          <div
            style={{
              width: 'auto',
              marginLeft: '15%',
              marginRight: '15%',
              borderRadius: '25px',
              backgroundColor: '#DEE5F7',
              height: 'auto',
              display: 'flex',
              alignItems: 'flex-start',
              flexDirection: 'row',
              
            }}
          >
            <input className="user-info" type="text" value={user.displayName} readOnly />
            <input className="user-info" type="email" value={user.email} readOnly />
          </div>
        </div>
      ) : (
        <h1>No user logged</h1>
      )}
    </>
  );
}

export default UserProfile;
