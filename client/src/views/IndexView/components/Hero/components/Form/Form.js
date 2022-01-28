import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

const Form = () => {
  const theme = useTheme();
  const [shortenedLink] = useState([]);

  return (
    <Box
      padding={{ xs: 3, sm: 5 }}
      margin={{ md: 6 }}
      width={1}
      component={Card}
      boxShadow={1}
    >
      <form noValidate autoComplete="off">
        <Box display="flex" flexDirection={'column'}>
          <Box marginBottom={4}>
            <TextField
              sx={{ height: 54 }}
              label="Link to shorten..."
              type="url"
              variant="outlined"
              color="primary"
              size="large"
              fullWidth
            />
          </Box>
          <Box>
            <Button
              sx={{ height: 54, fontWeight: 'bold' }}
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              type="submit"
            >
              Submit
            </Button>
          </Box>
          {shortenedLink.length !== 0 && (
            <>
              <Box marginTop={4}>
                <TextField
                  sx={{ height: 54 }}
                  label="Shortened link"
                  type="url"
                  variant="outlined"
                  color="primary"
                  size="medium"
                  fullWidth
                />
              </Box>

              <Box marginY={4} marginX={{ xs: -3, sm: -6 }}>
                <Divider />
              </Box>

              <Box>
                <Typography component="p" variant="body2" align="left">
                  Psst!, Would you like to keep track of your links?{' '}
                  <Box
                    component="a"
                    href="/signup"
                    color={theme.palette.text.primary}
                    fontWeight={'700'}
                  >
                    Create a free account
                  </Box>
                </Typography>
              </Box>
            </>
          )}
        </Box>
      </form>
    </Box>
  );
};

export default Form;
