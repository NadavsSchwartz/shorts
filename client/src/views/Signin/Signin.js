import React, { Suspense, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import useMediaQuery from '@mui/material/useMediaQuery';
import Main from 'layouts/Main';
import Container from 'components/Container';
import { Form } from './components';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, user } = userDetails;

  useEffect(() => {
    if (!loading && user && user.email) navigate('/home');
  }, []);

  return (
    <Main>
      <Suspense fallback={<div>Loading</div>}>
        <Box
          position={'relative'}
          minHeight={'calc(100vh - 247px)'}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
          height={1}
        >
          <Container>
            <Grid container spacing={6}>
              {isMd ? (
                <Grid item container justifyContent={'center'} xs={12} md={6}>
                  <Box height={1} width={1} maxWidth={500}>
                    <Box
                      component={'img'}
                      src={
                        'https://assets.maccarianagency.com/svg/illustrations/drawkit-illustration2.svg'
                      }
                      width={1}
                      height={1}
                      sx={{
                        filter:
                          theme.palette.mode === 'dark'
                            ? 'brightness(0.8)'
                            : 'none',
                      }}
                    />
                  </Box>
                </Grid>
              ) : null}

              <Grid
                item
                container
                alignItems={'center'}
                justifyContent={'center'}
                xs={12}
                md={6}
              >
                <Form />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Suspense>
    </Main>
  );
};

export default Signin;
