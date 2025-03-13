import React, { useState, useContext } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import NewPostField from '../NewPostField';
import ButtonSendPost from './ButtonSendPost';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogNewPost({ open, onClose, user }) {
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      sx={{ height: '100vh' }}
    >
      <AppBar sx={{ position: 'relative', backgroundColor: '#2B50AA' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={onClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {user?.displayName || 'Anonymous'}
          </Typography>
          <Button autoFocus color="inherit" onClick={onClose}>
            close
          </Button>
        </Toolbar>
      </AppBar>
      <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 64px)', width: '100%' }}>
        <NewPostField style={{ flex: 1 }} />
        <ButtonSendPost />
      </div>
    </Dialog>
  );
}