/* eslint-disable react/prop-types */
import React from 'react';
import { format } from 'timeago.js';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';

import {
  FacebookIcon,
  FacebookShareButton,
  RedditIcon,
  RedditShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'react-share';

export const LatestLinkCard = ({ LatestLink, ...props }) => {
  const timeAgo = format(LatestLink && LatestLink[0].createdAt);

  return (
    <Card {...props} sx={{ maxHeight: '95%' }}>
      <CardContent>
        <Grid container sx={{ justifyContent: 'space-between' }}>
          <Grid item>
            <Typography color="textPrimary" variant="body4">
              Destination:
            </Typography>
            <Grid item>
              <a
                href={LatestLink && LatestLink[0].longUrl}
                style={{ textDecoration: 'none' }}
              >
                <Typography color="textPrimary" variant="body4">
                  <Box component="span" fontWeight="fontWeightMedium">
                    {LatestLink && LatestLink[0].longUrl}
                  </Box>{' '}
                </Typography>
              </a>{' '}
            </Grid>
          </Grid>

          <Grid item>Created: {timeAgo}</Grid>
        </Grid>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
          }}
        >
          <Grid container sx={{ justifyContent: 'space-between' }}>
            <Grid item sx={{ pt: 3 }}>
              <TwitterShareButton url={10} title={1} via={1}>
                <TwitterIcon size={36} round={true} />
              </TwitterShareButton>{' '}
              <FacebookShareButton url={25} quote={1}>
                <FacebookIcon size={36} round={true} />
              </FacebookShareButton>{' '}
              <WhatsappShareButton title={10}>
                <WhatsappIcon size={36} round={true} />
              </WhatsappShareButton>{' '}
              <TelegramShareButton url={25} title={10}>
                <TelegramIcon size={36} round={true} />
              </TelegramShareButton>{' '}
              <RedditShareButton url={25} title={10}>
                <RedditIcon size={36} round={true} />
              </RedditShareButton>
            </Grid>
            <Grid item>
              <Grid item sx={{ pl: 4 }}>
                <Typography color="textPrimary" variant="h4">
                  {LatestLink && LatestLink[0].analytics.clicks}
                </Typography>
              </Grid>
              <Typography color="textSecondary" variant="overline">
                clicks so far
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};
export default LatestLinkCard;
