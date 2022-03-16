/* eslint-disable no-unused-vars */
import { Card, CircularProgress, Container, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import { Main } from 'layouts';
import React, { useEffect } from 'react';
import Form from './components/Form';
import { LinksCard, ClicksCard, LatestLinkCard } from './components/Cards';
import { LinkTable } from './components/LinksTable';
import { useDispatch, useSelector } from 'react-redux';
import Skeleton from '@mui/material/Skeleton';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { getUserStats } from '../../store/actions/userActions';
import TrafficByState from './components/TrafficByState';
const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading: userLoadingData, user } = userDetails;
  const userStats = useSelector((state) => state.userStats);
  const { loading, stats } = userStats;
  useEffect(() => {
    dispatch(getUserStats());
    if (!userLoadingData && !user.email) navigate('/signin');
  }, []);
  const Analytics = stats && stats.Analytics ? stats.Analytics : [];

  const LatestLink = Analytics && Analytics.slice(-1);
  return (
    <Main>
      <Box sx={{ minHeight: '100vh' }}>
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
              component="main"
              sx={{
                py: 12,
              }}
            >
              <Container maxWidth={false}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} lg={2.5}>
                    <LinksCard
                      TotalLinks={stats && stats.TotalLinks}
                      loading={loading && loading ? true : null}
                      theme={theme}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} lg={2.5}>
                    <ClicksCard
                      TotalClicks={stats && stats.TotalClicks}
                      loading={loading && loading ? true : null}
                      theme={theme}
                    />
                  </Grid>
                  <Grid item xs={12} sm={5} lg={2.5}>
                    <Form />
                  </Grid>
                  <Grid item xs={12} sm={7} lg={4.5}>
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
                    <LinkTable
                      AllShortLinks={Analytics && Analytics}
                      sx={{ height: '100%' }}
                    />
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
