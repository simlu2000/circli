import React from 'react';
import Textarea from '@mui/joy/Textarea';

export default function NewPostField({ style }) {
  return (
    <Textarea
      placeholder="Insert here the text"
      style={{
        width: '100%',
        fontSize: '1.5rem',
        padding: '10px',
        border: '5px solid green',
        boxSizing: 'border-box',
        resize: 'vertical',
        ...style,
      }}
    />
  );
}