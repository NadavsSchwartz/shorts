/* eslint-disable react/prop-types */
import React from 'react';
import { format } from 'timeago.js';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Skeleton,
  Typography,
} from '@mui/material';
import { ReactComponent as NoLinksSvg } from '../../../../assets/NoLinksSvg.svg';

import { SocialShare } from '../SocialShare';

export const LatestLinkCard = ({ LatestLink, loading, theme }) => {
  const timeAgo = format(
    LatestLink && LatestLink.length !== 0 ? LatestLink[0].createdAt : '',
  );
  const data = LatestLink && LatestLink.length !== 0 ? LatestLink[0] : null;

  return (
    <Card sx={{ height: '97%' }}>
      {loading ? (
        <>
          <Skeleton
            variant="text"
            sx={{ bgcolor: theme.palette.primary.main }}
          />
          <Skeleton
            variant="circular"
            width={40}
            height={40}
            sx={{ bgcolor: theme.palette.primary.main }}
          />
          <Skeleton
            variant="rectangular"
            width={210}
            height={118}
            sx={{ bgcolor: theme.palette.primary.main }}
          />
        </>
      ) : data !== null ? (
        <>
          <CardContent>
            <Grid container sx={{ justifyContent: 'space-between' }}>
              <Grid item>
                <Typography color="textPrimary" variant="body4">
                  Destination:
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
                    href={data && data.longUrl}
                    style={{ textDecoration: 'none' }}
                  >
                    <Typography noWrap color="textPrimary" variant="body4">
                      <Box component="span" fontWeight="fontWeightMedium">
                        {data && data.longUrl}
                      </Box>{' '}
                    </Typography>
                  </a>{' '}
                </Grid>
              </Grid>

              <Grid item sx={{ display: { sm: 'none', md: 'block' } }}>
                Created: {timeAgo}
              </Grid>
            </Grid>
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
              }}
            >
              <Grid container sx={{ justifyContent: 'space-between' }}>
                <Grid item sx={{ pt: 3 }}>
                  <SocialShare data={data && data} />
                </Grid>
                <Grid item sx={{ display: { sm: 'none', md: 'block' } }}>
                  <Grid item sx={{ pl: 4 }}>
                    <Typography color="textPrimary" variant="h4">
                      {data && data.analytics.totalClicks}
                    </Typography>
                  </Grid>
                  <Typography color="textSecondary" variant="overline">
                    clicks so far
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </>
      ) : (
        <Box sx={{ textAlign: 'center', mt: '15px' }}>
          <NoLinksSvg />
          <Typography> Start by creating Your first Short Link</Typography>
        </Box>
      )}
    </Card>
  );
};
export default LatestLinkCard;
