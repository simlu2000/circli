import React from 'react';
import { AppBar, Box, Toolbar, Typography, Container, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import logo from '../../src/logo.png';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const pages = [
  { name: 'Feed', icon: <HomeIcon sx={{ fontSize: '2rem', borderRadius: '50px' }} /> },
];

function NavBar({ user }) {
  return (
    <AppBar
      position="fixed"
      style={{
        backgroundColor: 'rgb(255, 255, 255)',
        width: '100%',
        bottom: 0,
        top: 'auto',
      }}
    >
      <Container disableGutters className="navbar-container">
        <Toolbar disableGutters className="navbar-toolbar" sx={{ display: 'flex', alignItems: 'center' }}>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img src={logo} alt="Circli Logo" style={{ height: '50px', borderRadius: '25px' }} />
          </Box>

          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            {pages.map((page) => (
              <MenuItem key={page.name} style={{ padding: '0 10px' }}>
                <Typography sx={{ textAlign: 'center' }}>
                  <Link to={`/${page.name}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {page.icon}
                  </Link>
                </Typography>
              </MenuItem>
            ))}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Link to="/Profile" style={{ textDecoration: 'none', color: 'inherit' }}>
              <AccountCircleIcon sx={{ fontSize: '2rem', borderRadius: '50px' }} />
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

const MenuItem = ({ children, style }) => (
  <Paper elevation={0} style={{ padding: '8px', ...style }}>
    {children}
  </Paper>
);

export default NavBar;
