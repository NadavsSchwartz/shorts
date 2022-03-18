import React, { useState } from 'react';
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
// import Typography from '@mui/material/Typography';
// import { useTheme } from '@mui/material/styles';
import { Alert, IconButton, InputBase, Paper } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useDispatch } from 'react-redux';
import { createShortLink } from 'store/actions/shortLinkAcionts';
const Form = () => {
  // const theme = useTheme();
  // const [shortenedLink] = useState([]);
  const dispatch = useDispatch();
  const [url, SetUrl] = useState('');

  const [error, SetError] = useState('');

  const handleUrlChange = (textFieldInput) => {
    SetUrl(textFieldInput.target.value);
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const urlRegex =
      '(https?://(?:www.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|www.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|https?://(?:www.|(?!www))[a-zA-Z0-9]+.[^s]{2,}|www.[a-zA-Z0-9]+.[^s]{2,})';

    try {
      const result = url.match(urlRegex);

      if (result !== null) {
        dispatch(createShortLink(url));
      } else {
        throw Error;
      }
    } catch (error) {
      SetError(`It looks like an invalid url. Please double check your input
            and try again.`);
      setTimeout(() => {
        SetError('');
      }, 4000);
    }
  };
  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 450 }}
      onSubmit={handleSubmitForm}
    >
      {error && <Alert severity="error">{error}</Alert>}
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Long link to shorten..."
        required
        type="url"
        color="primary"
        size="large"
        fullWidth
        autoFocus={true}
        onChange={handleUrlChange}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton color="primary" sx={{ p: '10px' }} type="submit">
        <SendIcon fontSize="large" />
      </IconButton>
    </Paper>
  );
};

export default Form;
