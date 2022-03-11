/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';

const SocialLogin = () => {
  const googleLogin = () => {
    window.open('http://localhost:4000/auth/google', '_self');
  };
  const twitterLogin = () => {
    window.open('http://localhost:4000/auth/twitter', '_self');
  };
  const githubLogin = () => {
    window.open('http://localhost:4000/auth/github', '_self');
  };
  return (
    <Box>
      <Box marginBottom={4}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
          }}
        >
          Welcome back
        </Typography>
      </Box>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <Typography
          sx={{
            textTransform: 'uppercase',
            fontWeight: 'medium',
          }}
          gutterBottom
          color={'text.secondary'}
        >
          Log in with:
        </Typography>
      </div>
      <div onClick={googleLogin} style={{ margin: '10px 0 20px 0' }}>
        <Button
          variant="contained"
          color="primary"
          target="blank"
          size="large"
          fullWidth
        >
          <img
            width={20}
            height={18}
            style={{ marginRight: '10px' }}
            src="//d1ayxb9ooonjts.cloudfront.net/518ec586a1814c0216f44b4844b86f5e.svg"
            alt="Google Logo"
          />
          {'  '}
          <span style={{ marginTop: '1px' }}>Google</span>
        </Button>
      </div>
      <Divider>OR</Divider>
      <div onClick={twitterLogin} style={{ margin: '10px 0 20px 0' }}>
        <Button
          variant="contained"
          color="primary"
          target="blank"
          size="large"
          fullWidth
        >
          <img
            width={20}
            height={18}
            style={{ marginRight: '10px' }}
            src="//d1ayxb9ooonjts.cloudfront.net/518ec586a1814c0216f44b4844b86f5e.svg"
            alt="Twitter Logo"
          />
          {'  '}
          <span style={{ marginTop: '1px' }}>Twitter</span>
        </Button>
      </div>
      <Divider>OR</Divider>
      <div onClick={githubLogin} style={{ margin: '10px 0 20px 0' }}>
        <Button
          variant="contained"
          color="primary"
          target="blank"
          size="large"
          fullWidth
        >
          <img
            width={20}
            height={18}
            style={{ marginRight: '10px' }}
            src="//d1ayxb9ooonjts.cloudfront.net/518ec586a1814c0216f44b4844b86f5e.svg"
            alt="Github Logo"
          />
          {'  '}
          <span style={{ marginTop: '1px' }}>Github</span>
        </Button>
      </div>
    </Box>
  );
};

export default SocialLogin;
