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
import Textarea from '@mui/joy/Textarea';

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
      <Textarea
        placeholder="Insert here the text"
        style={{
          width: 'auto',
          marginLeft:'5%',
          marginRight:'5%',
          fontSize: '1.5rem',
          padding: '10px',
          border: '1px solid #2B50AA',
          boxSizing: 'border-box',
          marginTop:'2%',
          resize: 'vertical',

        }}
      />
      <ButtonSendPost />
    </Dialog>
  );
}