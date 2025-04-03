import React from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import UserField from './UserField';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 10% auto;
  max-width: 60%;
`;

const ProfileHeader = styled.h1`
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: #333;
`;

const ProfileInfo = styled.div`
  width: 100%;
  background-color: #fff;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const LogoutButton = styled(LogoutIcon)`
  margin-top: 20px;
  cursor: pointer;
  color: #d32f2f;

  &:hover {
    color: #b71c1c;
  }
`;

function Profile({ user }) {
  const auth = getAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate('/Home');
      })
      .catch((error) => {
        console.error('Error during logout', error);
      });
  };

  return (
    <>
      {user ? (
        <ProfileContainer>
          <ProfileHeader>Hi {user.displayName || user.email}</ProfileHeader>
          <ProfileInfo>
            <UserField textValue={user.displayName} labelText="Name" className="user-info" />
            <UserField textValue={user.email} labelText="E-mail" className="user-info" />
          </ProfileInfo>
          <LogoutButton onClick={handleLogout} />
        </ProfileContainer>
      ) : (
        <h1>No user logged</h1>
      )}
    </>
  );
}

export default Profile;