import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';

export default function ButtonNewPost({ onClick }) {
    return (
        <Box
            sx={{
                position: 'fixed',
                bottom: {xs: 100, sm:24},
                right: { xs: '10%', sm: 24 }, // 50% mobile
                transform: { xs: 'translateX(50%)', sm: 'none' }, // centra su mobile
                zIndex: 1000,
            }}
        >
            <Fab 
                sx={{
                    backgroundColor: '#74ebd5',
                    color: '#fff',
                    '&:hover': {
                        backgroundColor: '#4ac4b5',
                    }
                }}
                aria-label="new post"
                onClick={onClick}
            >
                <EditIcon />
            </Fab>
        </Box>
    );
}
