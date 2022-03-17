import React, { Suspense, useEffect } from 'react';
import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Main from 'layouts/Main';
import Container from 'components/Container';
import { GetStarted, Features, Services, Hero, QuickStart } from './components';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const Landing = () => {
  const theme = useTheme();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, user } = userDetails;
  const navigate = useNavigate();
  useEffect(() => {
    if (!loading && user && user.email) navigate('/home');
  }, []);
  return (
    <Suspense fallback={<div>Loading</div>}>
      <Box sx={{ overflowX: 'hidden' }}>
        <Main>
          <div id="short">
            <Hero />
          </div>
          <Container>
            <Services />
          </Container>
          <Box
            sx={{
              backgroundImage: `linear-gradient(to bottom, ${alpha(
                theme.palette.background.paper,
                0,
              )}, ${alpha(theme.palette.alternate.main, 1)} 100%)`,
              backgroundRepeat: 'repeat-x',
              position: 'relative',
            }}
          >
            <Container>
              <Features />
            </Container>
            <Container>
              <QuickStart />
            </Container>
            <Box
              component={'svg'}
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 1920 100.1"
              sx={{
                width: '100%',
                marginBottom: theme.spacing(-1),
              }}
            >
              <path
                fill={theme.palette.background.paper}
                d="M0,0c0,0,934.4,93.4,1920,0v100.1H0L0,0z"
              ></path>
            </Box>
          </Box>
          <Container>
            <GetStarted />
          </Container>
        </Main>
      </Box>
    </Suspense>
  );
};

export default Landing;
