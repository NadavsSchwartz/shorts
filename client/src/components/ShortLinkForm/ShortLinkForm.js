import React, { useState } from 'react';
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import PropTypes from 'prop-types';
// import Typography from '@mui/material/Typography';
// import { useTheme } from '@mui/material/styles';
import { Alert, Button, InputBase, Paper } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useDispatch } from 'react-redux';
import { createShortLink } from 'store/actions/shortLinkAcionts';
import { Box } from '@mui/system';
const ShortLinkForm = ({ isLandingPage }) => {
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
      '(.*(?:www.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|www.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|https?://(?:www.|(?!www))[a-zA-Z0-9]+.[^s]{2,}|www.[a-zA-Z0-9]+.[^s]{2,})';

    try {
      const result = await url.match(urlRegex);
      console.log(result);
      if (result !== null) {
        dispatch(createShortLink(url));
      }
      console.log(error);
      SetUrl('');
    } catch (error) {
      SetError(`It looks like an invalid url. Please double check your input
            and try again.`);
      setTimeout(() => {
        SetError('');
      }, 4000);
    }
  };
  return (
    <Box>
      <Paper
        component="form"
        sx={{
          p: '2px 2px 0 4px',
          display: 'flex',
          alignItems: 'center',
          width: isLandingPage
            ? { xs: '350px', sm: '400px', md: '450px' }
            : null,
        }}
        onSubmit={handleSubmitForm}
      >
        {error && <Alert severity="error">{error}</Alert>}
        <InputBase
          autoComplete="on"
          sx={{ ml: 1, flex: 1 }}
          placeholder="Long link to shorten..."
          name="url"
          value={url}
          required
          type="text"
          size="large"
          autoFocus={true}
          onChange={handleUrlChange}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <Button color="primary" sx={{ p: '10px' }} type="submit">
          <SendIcon fontSize="large" />
        </Button>
      </Paper>
    </Box>
  );
};
ShortLinkForm.propTypes = {
  isLandingPage: PropTypes.bool,
};
export default ShortLinkForm;
