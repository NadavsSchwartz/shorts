import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
// import Grid from '@mui/material/Grid';

import Button from '@mui/material/Button';
import CardContent from '@mui/material/Card';

import { useState } from 'react';
import { Alert } from '@mui/material';
import { Error } from '@mui/icons-material';
import { createShortLink } from 'store/actions/shortLinkAcionts';
import { useDispatch } from 'react-redux';

const Form = (props) => {
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
      console.log(result);
      if (result !== null) {
        dispatch(createShortLink(url));
      } else {
        throw Error;
      }
    } catch (error) {
      SetError(`We detected an invalid url. Please double check the long URL
            and try again.`);
      setTimeout(() => {
        SetError('');
      }, 4000);
    }
  };

  return (
    <Card {...props}>
      <CardContent>
        {error && <Alert severity="error">{error}</Alert>}
        {/* {loading ? (
          <CircularProgress
            style={{
              margin: 'auto',
              left: '0',
              right: '0',
              top: '0',
              bottom: '0',
              position: 'fixed',
            }}
          />
        ) : ( */}
        <>
          <form autoComplete="on" onSubmit={handleSubmitForm}>
            <Box margin={2}>
              <TextField
                InputLabelProps={{ required: false }}
                label="Long link to shorten..."
                type="text"
                variant="standard"
                onChange={handleUrlChange}
                fullWidth
                required
              />
            </Box>
            <Box margin={1}>
              <Button
                sx={{ fontWeight: 'bold', marginTop: '20px' }}
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                type="submit"
              >
                Shorten A Long URL
              </Button>
            </Box>
          </form>
        </>
      </CardContent>
    </Card>
  );
};

export default Form;
