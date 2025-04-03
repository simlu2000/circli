import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';

export default function ButtonNewPost({ onClick }) {
    return (
        <Box sx={{
            position: 'fixed',
            bottom: 100,
            right: 16, 
            transform: 'translateX(-50%)' //imposta l'elemento indietro di metà della sua larghezza
        }}>
            <Fab sx={{ backgroundColor: '#FAC338' }} aria-label="edit" onClick={onClick}>
                <EditIcon />
            </Fab>
        </Box>
    );
}