import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { ref, push } from 'firebase/database';
import { db } from '../firebaseConfig';
import { TextField, Grid } from '@mui/material';
import PublishIcon from '@mui/icons-material/Publish';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogNewPost({ open, onClose, user }) {
  const [postText, setPostText] = useState('');
  const [postHashtags, setPostHashtags] = useState('');
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const handleTextChange = (event) => setPostText(event.target.value);
  const handleHashtagsChange = (event) => setPostHashtags(event.target.value);


  const sendPostToDb = (user, text, hashtags) => {
    try {
      const postRef = ref(db, `posts/${user.uid}`);
      push(postRef, {
        userId: user.uid,
        displayName: user.displayName || 'Anonymous',
        textContent: text,
        hashtagsContent: hashtags,
        createdAt: new Date().toISOString(),
      })
        .then(() => {
          console.log('Dati post salvati nel database con successo');
          onClose();
          window.location.reload();
        })
        .catch((error) => {
          onClose();
          console.error('Errore durante salvataggio dati post nel db, ', error);
          setErrorMessage('Errore: ' + error.message);
        });
    } catch (error) {
      onClose();
      console.error('Errore nel salvataggio dei dati post nel database: ', error);
      setErrorMessage('Errore: ' + error.message);
    }
  };

  return (
    <Dialog fullScreen open={open} onClose={onClose} TransitionComponent={Transition}>
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1, textAlign: 'center' }} variant="h6" component="div">
            Nuovo Post
          </Typography>
          <Button autoFocus color="inherit" onClick={() => sendPostToDb(user, postText, postHashtags)}>
            <PublishIcon sx={{ mr: 1 }} />
            Pubblica
          </Button>
        </Toolbar>
      </AppBar>
      <Grid container spacing={2} sx={{ padding: '20px' }}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="Scrivi il tuo post..."
            value={postText}
            onChange={handleTextChange}
            label="Post"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            placeholder="Hashtags (separati da virgola)"
            value={postHashtags}
            onChange={handleHashtagsChange}
            label="Hashtags"
          />
        </Grid>
      </Grid>
      {errorMessage && (
        <div style={{ padding: '20px' }}>
          <Typography variant="body2" color="error">
            {errorMessage}
          </Typography>
        </div>
      )}
    </Dialog>
  );
}