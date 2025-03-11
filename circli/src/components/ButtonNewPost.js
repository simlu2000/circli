import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NavigationIcon from '@mui/icons-material/Navigation';

export default function ButtonNewPost({onClick}) {
  return (
    <Box sx={{ position: 'fixed', bottom: 16, right: 16 }}>
      
      <Fab sx={{backgroundColor:'#FAC338'}}aria-label="edit" onClick={onClick}>
        <EditIcon />
      </Fab>
      
    </Box>
  );
}
