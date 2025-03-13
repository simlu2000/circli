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
import ButtonSendPost from './ButtonSendPost';
import Textarea from '@mui/joy/Textarea';
import { ref, set, push} from 'firebase/database';
import { db } from '../firebaseConfig';
import { getAuth } from 'firebase/auth';
import PostField from './PostField';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function DialogNewPost({ open, onClose, user }) {
  const [postText, setPostText] = useState('');
  const [postHashtags, setPostHashtags] = useState('');
  const [displayName, setDisplayName] = useState('');
  const auth = getAuth();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const handleTextChange = (event) => {
    setPostText(event.target.value);
  };

  const handleHashtagsChange = (event) => {
    setPostHashtags(event.target.value);
  };

  const sendPostToDb = (user, text, hashtags) => {
    try {
      console.log('Saving post data to DB for user:', user);
      console.log('user.uid:', user.uid);
      console.log("ref(db, 'posts/' + user.uid):", ref(db, 'posts/' + user.uid));
      console.log("db:", db);
      const postRef = ref(db, `posts/${user.uid}`); //ottengo il riferimento al nodo dei post dell'utente
      push(postRef, { //push per creare una chiave univoca per il nuovo post inserito. Cosi ogni post ha un proprio id
        userId: user.uid, 
        displayName: displayName || user.displayName || null,
        textContent: text,
        hashtagsContent: hashtags,
        createdAt: new Date().toISOString(),
      }).then(() => {
        console.log('Dati post salvati nel database CON SUCCESSO');
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
      {errorMessage && <Typography color="error" sx={{ mb: 2 }}>{errorMessage}</Typography>}

      <Textarea
        placeholder="Insert here the text"
        onChange={handleTextChange}
        style={{
          width: 'auto',
          height: '15%',
          marginLeft: '5%',
          marginRight: '5%',
          fontSize: '1.5rem',
          padding: '10px',
          border: '1px solid #2B50AA',
          boxSizing: 'border-box',
          marginTop: '2%',
          resize: 'vertical',
        }}
      />
      <PostField labelText={"Hashtags"} onChange={handleHashtagsChange}/>
      <ButtonSendPost postText={postText} onClick={() => sendPostToDb(user, postText, postHashtags)} />

    </Dialog>
  );
}