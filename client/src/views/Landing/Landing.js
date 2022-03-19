import React, { useEffect, useState } from 'react';
import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Main from 'layouts/Main';
import Container from 'components/Container';
import { GetStarted, Features, Services, Hero, QuickStart } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Alert,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from '@mui/material';
import { SocialShare } from 'views/Home/components/SocialShare';
import { format } from 'timeago.js';

const Landing = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [showAlert, SetShowAlert] = useState(false);
  const userDetails = useSelector((state) => state.userDetails);
  const { loading: userLoading, user } = userDetails;
  const userStats = useSelector((state) => state.userStats);
  const { loading, error, stats } = userStats;
  const navigate = useNavigate();
  useEffect(() => {
    if (!userLoading && user && user.email) navigate('/home');
    if (!loading && error !== null) {
      SetShowAlert(true);
      setTimeout(() => {
        SetShowAlert(false);
        dispatch({ type: 'RESET_ERROR_MESSAGE' });
      }, 5000);
    }
  }, [error]);
  return (
    <Box sx={{ overflowX: 'hidden' }}>
      <Main>
        {showAlert && <Alert severity="error">{error}</Alert>}
        {loading && (
          <CircularProgress
            sx={{
              margin: 'auto',
              left: '0',
              right: '0',
              top: '0',
              bottom: '0',
              position: 'fixed',
            }}
          />
        )}

        <Hero />
        {stats && Object.keys(stats).length !== 0 ? (
          <Grid
            container
            spacing={4}
            alignItems="center"
            justifyContent="center"
            sx={{
              position: 'relative',
              mt: -12,
              ml: 0,
              width: '100%',
              zIndex: 1,
            }}
          >
            <Card
              sx={{
                height: 'auto',
                width: '85%',
                maxWidth: '700px',
              }}
            >
              <CardContent>
                <Grid container sx={{ justifyContent: 'space-between' }}>
                  <Grid item>
                    <Typography noWrap color="textPrimary" variant="body4">
                      {stats && stats.longUrl}
                    </Typography>
                    <Grid
                      item
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        width: '250px',
                      }}
                    >
                      <a
                        href={stats && stats.shortUrl}
                        style={{ textDecoration: 'none' }}
                      >
                        <Typography color="textPrimary" variant="body4">
                          <Box component="span" fontWeight="800">
                            {stats &&
                              stats.shortUrl.substring(
                                7,
                                stats.shortUrl.length,
                              )}
                          </Box>
                        </Typography>
                      </a>
                    </Grid>
                  </Grid>

                  <Grid item sx={{ display: { xs: 'none', sm: 'block' } }}>
                    Created: {format(stats.createdAt)}
                  </Grid>
                </Grid>

                <Grid container sx={{ justifyContent: 'center' }}>
                  <Grid item>
                    <Grid item sx={{ pt: 3 }}>
                      <SocialShare data={stats && stats} />
                    </Grid>

                    <Grid item>
                      <Typography
                        color="textPrimary"
                        variant="h6"
                        fontWeight={700}
                      >
                        Get the most out of your links
                      </Typography>
                    </Grid>
                    <Grid item sx={{ textAlign: 'center' }}>
                      <Typography color="textPrimary" variant="subtitle2">
                        Track all your links in one place
                      </Typography>
                    </Grid>
                    <Grid item textAlign="center">
                      <Button
                        sx={{ mt: 2 }}
                        component={'a'}
                        href={'/signup'}
                        variant="contained"
                        color="primary"
                        size="large"
                        fullWidth={false}
                      >
                        Sign up free
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ) : (
          ''
        )}

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
  );
};

export default Landing;
