import React, { useState, useContext } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';


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
    >
      <AppBar sx={{ position: 'relative', backgroundColor:'#2B50AA' }}>
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
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
        <List sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: '2%', marginTop: '0' }}>

        </List>
      </div>
    </Dialog>
  );
}