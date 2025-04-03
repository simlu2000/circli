import React, { useState } from 'react';
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
      }).then(() => {
        console.log('Dati post salvati nel database con successo');
        navigate('/Feed');
      }).catch((error) => {
        console.error('Errore durante salvataggio dati post nel db, ', error);
        setErrorMessage('Errore: ' + error.message);
      });
    } catch (error) {
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
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            New Post
          </Typography>
          <Button autoFocus color="inherit" onClick={() => sendPostToDb(user, postText, postHashtags)}>
            Save
          </Button>
        </Toolbar>
      </AppBar>
      <div style={{ padding: '20px' }}>
        <input
          type="text"
          placeholder="Scrivi il tuo post..."
          value={postText}
          onChange={handleTextChange}
        />
        <input
          type="text"
          placeholder="Hashtags"
          value={postHashtags}
          onChange={handleHashtagsChange}
        />
      </div>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </Dialog>
  );
}
