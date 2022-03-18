import {
  Alert,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import Box from '@mui/material/Box';
import { Main } from 'layouts';
import React, { useEffect, useState } from 'react';
import { LinksCard, ClicksCard, LatestLinkCard } from './components/Cards';
import { LinkTable } from './components/LinksTable';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as NoLinks } from '../../assets/noLinks.svg';
// import { getUserStats } from '../../store/actions/userActions';
const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading: userLoadingData, user } = userDetails;
  const userStats = useSelector((state) => state.userStats);
  const { loading, stats, error } = userStats;
  const [showAlert, SetShowAlert] = useState(false);
  useEffect(() => {
    if (!userLoadingData && !user.email) navigate('/signin');
    if (!loading && error !== null) {
      SetShowAlert(true);
      setTimeout(() => {
        SetShowAlert(false);
        dispatch({ type: 'RESET_ERROR_MESSAGE' });
      }, 5000);
    }
  }, [error]);
  const Analytics = stats && stats.Analytics ? stats.Analytics : [];

  const LatestLink = Analytics && Analytics.slice(-1);
  return (
    <Main>
      <Box
        sx={{
          minHeight: '100vh',
          maxWidth: '1300px',
          margin: 'auto',
        }}
      >
        {showAlert && <Alert severity="error">{error}</Alert>}
        {loading ? (
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
        ) : (
          <>
            <Box
              display={'flex'}
              sx={{
                py: 6,
              }}
            >
              <Container maxWidth={true}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={4} md={3} lg={3.5}>
                    <LinksCard
                      TotalLinks={stats && stats.TotalLinks}
                      loading={loading && loading ? true : null}
                      theme={theme}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} md={3} lg={3.5}>
                    <ClicksCard
                      TotalClicks={stats && stats.TotalClicks}
                      loading={loading && loading ? true : null}
                      theme={theme}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4} md={6} lg={5}>
                    <LatestLinkCard
                      LatestLink={stats && LatestLink}
                      loading={loading && loading ? true : null}
                    />
                  </Grid>
                </Grid>
              </Container>
            </Box>

            <Box component="main">
              <Container maxWidth={false}>
                <Grid container spacing={3} alignItems="stretch">
                  <Grid item xs={12}>
                    {Analytics && Analytics.length !== 0 ? (
                      <LinkTable
                        AllShortLinks={Analytics && Analytics}
                        sx={{ height: '100%' }}
                      />
                    ) : (
                      <Box sx={{ margin: 'auto', width: '350px' }}>
                        <Box>
                          <NoLinks />
                          {/* <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="260"
                            viewBox="0 0 240 160"
                            width="340"
                            className="injected-svg SpotIllustration--md"
                            data-src="https://dashboard-cdn.rebrandly.com/styleguide-assets/spot-illustrations/ill-spot-analytics-empty.svg"
                            xlink="http://www.w3.org/1999/xlink"
                            fill="#212732"
                          >
                            <g fillRule="evenodd" transform="">
                              <g>
                                <g>
                                  <circle
                                    cx="84.666667"
                                    cy="62"
                                    opacity=".02"
                                    r="62"
                                    fill="#2281c2"
                                  ></circle>
                                  <circle
                                    cx="194.666667"
                                    cy="64"
                                    opacity=".06"
                                    r="24"
                                    fill="#2281c2"
                                  ></circle>
                                  <circle
                                    cx="112.666667"
                                    cy="148"
                                    opacity=".08"
                                    r="12"
                                    fill="#2281c2"
                                  ></circle>
                                </g>
                                <path
                                  fill="#2281c2"
                                  d="m0 4c0-2.20914 1.79086-4 4-4h18c2.2091 0 4 1.79086 4 4v34h-26z"
                                  fillRule="nonzero"
                                  opacity=".05"
                                  transform="translate(56 96)"
                                ></path>
                                <path
                                  fill="#2281c2"
                                  d="m0 4c0-2.20914 1.79086-4 4-4h18c2.2091 0 4 1.79086 4 4v56h-26z"
                                  fillRule="nonzero"
                                  opacity=".25"
                                  transform="translate(90 74)"
                                ></path>
                                <path
                                  fill="#2281c2"
                                  d="m0 4c0-2.20914 1.79086-4 4-4h18c2.2091 0 4 1.79086 4 4v90h-26z"
                                  fillRule="nonzero"
                                  opacity=".35"
                                  transform="translate(124 40)"
                                ></path>
                                <path
                                  fill="#2281c2"
                                  d="m0 4c0-2.20914 1.79086-4 4-4h18c2.2091 0 4 1.79086 4 4v102h-26z"
                                  fillRule="nonzero"
                                  opacity=".45"
                                  transform="translate(158 28)"
                                ></path>
                              </g>
                              <path
                                d="m40 137c0-1.65685 1.34315-3 3-3h154c1.657 0 3 1.34315 3 3s-1.343 3-3 3h-154c-1.65685 0-3-1.34315-3-3z"
                                fill="#e8e9ea"
                                fillRule="nonzero"
                              ></path>
                            </g>
                          </svg> */}
                        </Box>
                        <Typography variant="h5" textAlign="center">
                          {"There haven't been any clicks yet"}
                        </Typography>
                      </Box>
                    )}
                  </Grid>
                </Grid>
              </Container>
            </Box>
          </>
        )}
      </Box>
    </Main>
  );
};

export default Home;
