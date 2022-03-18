/* eslint-disable indent */
/* eslint-disable react/prop-types */
// eslint-disable-next-line indent
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
import MouseIcon from '@mui/icons-material/Mouse';

export const LinksCard = ({ TotalLinks }) => {
  const Percentage = Math.floor(TotalLinks / 1) * 100;

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              Total Links
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {TotalLinks}
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
              <MouseIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box
          sx={{
            pt: 2,
            display: 'flex',
            alignItems: 'center',
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
            color={Percentage < 0 ? 'error' : Percentage === 0 ? '' : 'success'}
            sx={{
              mr: 1,
            }}
            variant="body2"
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
export default LinksCard;
