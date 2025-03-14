import React from 'react';
import UserField from './UserField';
function UserProfile({ user }) {

  return (
    <>
      {user ? (
        <div >
          {/*<img style={{ width: '40%' }} src="/static/images/avatar/2.jpg" />*/}
          <h1>Hi {user.displayName || user.email}</h1>
          <div
            className="profile"
            style={{
              width: 'auto',
              marginLeft: '15%',
              marginRight: '15%',
              borderRadius: '5px',
              backgroundColor: '#DEE5F7',
              height: 'auto',

            }}
          >
            <UserField
              textValue={user.displayName}
              labelText={"Name"}
              className="user-info"
            />
            <UserField
              textValue={user.email}
              labelText={"E-mail"}
              className="user-info"
            />
          </div>
        </div>
      ) : (
        <h1>No user logged</h1>
      )}
    </>
  );
}

export default UserProfile;
