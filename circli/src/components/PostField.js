import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function PostField({ labelText,onChange }) {
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { width: '100%' },
        width: '45%',
        marginLeft:'5%',
        marginRight:'0%',
        marginTop:'2%',
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-basic"
        label={labelText}
        variant="outlined"
        onChange={onChange}
        sx={{
          width: '30%',
          height: '60px',
          fontSize: '1.2rem',
        }}
        size="large"
      />
    </Box>
  );
}