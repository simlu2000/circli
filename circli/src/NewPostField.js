import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function NewPostField() {
  return (
    <Box
      component="form"
      sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="filled-textarea"
          label="Insert here the text"
          placeholder="Placeholder"
          multiline
          variant="filled"
        />
      </div>
    </Box>
  );
}
