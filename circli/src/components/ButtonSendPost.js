import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import SendIcon from '@mui/icons-material/Send';

export default function ButtonSendPost({onClick}) {
  return (
    <Box sx={{ position: 'fixed', bottom: 16, right: 16 }}>
      <Fab sx={{backgroundColor:'#FAC338'}}aria-label="edit" onClick={onClick}>
        <SendIcon />
      </Fab>
      
    </Box>
  );
}
