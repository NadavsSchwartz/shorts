/* eslint-disable react/prop-types */
import React from 'react';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

import BarChartIcon from '@mui/icons-material/BarChart';
// import PeopleIcon from '@mui/icons-material/PeopleOutlined';

export const TotalClicks = ({ TotalClicks, ...props }) => {
  const Percentage = Math.floor(TotalClicks / 1) * 100;
  return (
    <Card {...props}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              Total Clicks
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {TotalClicks}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: `${
                  Percentage < 0
                    ? 'error.main'
                    : Percentage === 0
                      ? ''
                      : 'success.main'
                }`,
                height: 56,
                width: 56,
              }}
            >
              <BarChartIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            pt: 2,
          }}
        >
          {Percentage > 0 ? (
            <ArrowUpwardIcon color="success" />
          ) : Percentage === 0 ? (
            ''
          ) : (
            <ArrowDownwardIcon color="error" />
          )}
          <Typography
            variant="body2"
            sx={{
              mr: 1,
            }}
          >
            {Percentage}%
          </Typography>
          <Typography color="textSecondary" variant="caption">
            Since last month
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
export default TotalClicks;
