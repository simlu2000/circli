import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function UserField({ textValue, labelText }) {
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { width: '100%' },
        width: '100%',
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-basic"
        label={labelText}
        variant="outlined"
        value={textValue}
        sx={{
          width: '100%',
          height: '60px',
          fontSize: '1.2rem',
        }}
        size="large"
      />
    </Box>
  );
}