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
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="r-1cvl2hr r-4qtqp9 r-yyyyoo r-16y2uox r-8kz0gk r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-lrsllp"
          >
            <g>
              <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
            </g>
          </svg>
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
