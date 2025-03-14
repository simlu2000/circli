import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';

export default function ButtonNewPost({ onClick }) {
    return (
        <Box sx={{
            position: 'fixed',
            bottom: 16,
            left: '50%', 
            transform: 'translateX(-50%)' // Sposta l'elemento indietro di metà della sua larghezza
        }}>
            <Fab sx={{ backgroundColor: '#FAC338' }} aria-label="edit" onClick={onClick}>
                <EditIcon />
            </Fab>
        </Box>
    );
}