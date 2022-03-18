/* eslint-disable react/prop-types */
import React from 'react';
import { format } from 'timeago.js';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { ReactComponent as NoLinksSvg } from '../../../../assets/NoLinksSvg.svg';

import { SocialShare } from '../SocialShare';

export const LatestLinkCard = ({ LatestLink }) => {
  const timeAgo = format(
    LatestLink && LatestLink[0] ? LatestLink[0].createdAt : '',
  );
  return (
    <Card sx={{ height: '100%' }}>
      {LatestLink && LatestLink.length !== 0 ? (
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
                    maxWidth: '250px',
                  }}
                >
                  <a
                    href={
                      LatestLink && LatestLink[0] ? LatestLink[0].longUrl : ''
                    }
                    style={{ textDecoration: 'none' }}
                  >
                    <Typography noWrap color="textPrimary" variant="body4">
                      <Box component="span" fontWeight="fontWeightMedium">
                        {LatestLink && LatestLink[0]
                          ? LatestLink[0].longUrl
                          : ''}
                      </Box>{' '}
                    </Typography>
                  </a>{' '}
                </Grid>
              </Grid>

              <Grid item sx={{ display: { xs: 'none', md: 'block' } }}>
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
                  <SocialShare
                    Link={LatestLink && LatestLink[0] ? LatestLink[0] : ''}
                  />
                </Grid>
                <Grid item sx={{ display: { xs: 'none', md: 'block' } }}>
                  <Grid item sx={{ pl: 4 }}>
                    <Typography color="textPrimary" variant="h4">
                      {LatestLink && LatestLink[0]
                        ? LatestLink[0].totalClicks
                        : ''}
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
        <Box sx={{ textAlign: 'center', m: 2 }}>
          <NoLinksSvg />
          <Typography> Start by creating Your first Short Link</Typography>
        </Box>
      )}
    </Card>
  );
};
export default LatestLinkCard;
