import { Container, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import { Main } from 'layouts';
import React, { useEffect, useState } from 'react';
import Form from './components/Form';
import { Graph } from './components/Stats';
import { LinksCard, ClicksCard, LatestLinkCard } from './components/Cards';
import TrafficByState from './components/TrafficByState';
import axios from 'axios';
const Home = () => {
  const [userStats, SetUserStats] = useState({});
  useEffect(() => {
    async function getUserStats() {
      const { data } = await axios.get('http://localhost:4000/user/stats', {
        withCredentials: true,
      });
      await SetUserStats(data);
    }
    getUserStats();
  }, []);
  const Analytics = userStats && userStats.Analytics;
  const LatestAnalytic = Analytics && Analytics.slice(-1);
  return (
    <Main style={{ minHeight: '100vh' }}>
      <Box
        component="main"
        sx={{
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} lg={2.5}>
              <LinksCard TotalLinks={userStats && userStats.TotalLinks} />
            </Grid>
            <Grid item xs={12} sm={6} lg={2.5}>
              <ClicksCard TotalClicks={userStats && userStats.TotalClicks} />
            </Grid>
            <Grid item xs={12} sm={5} lg={2.5}>
              <Form />
            </Grid>
            <Grid item xs={12} sm={7} lg={4.5}>
              <LatestLinkCard LatestLink={userStats && LatestAnalytic} />
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box component="main">
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8} xl={9}>
              <Graph />
            </Grid>
            <Grid item xs={12} md={6} lg={4} xl={3}>
              <TrafficByState />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Main>
  );
};

export default Home;
