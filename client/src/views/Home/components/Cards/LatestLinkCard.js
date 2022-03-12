/* eslint-disable react/prop-types */
import React from 'react';
import { format } from 'timeago.js';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { ReactComponent as NoLinksSvg } from '../../../../assets/NoLinksSvg.svg';
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

const useWidth = () => {
  const [width, setWidth] = React.useState(window.innerWidth);
  React.useEffect(() => {
    const onResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return width;
};

export const LatestLinkCard = ({ LatestLink, ...props }) => {
  const width = useWidth();

  const timeAgo = format(
    LatestLink && LatestLink.length !== 0 ? LatestLink[0].createdAt : '',
  );
  const data = LatestLink && LatestLink.length !== 0 ? LatestLink[0] : null;

  return (
    <Card {...props} sx={{ height: '100%' }}>
      <CardContent>
        {data === null ? (
          <Box sx={{ textAlign: 'center' }}>
            <NoLinksSvg />

            <Typography> Start by creating Your first Short Link</Typography>
          </Box>
        ) : (
          <>
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
                    width: width * 0.25,
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
                  <TwitterShareButton url={data.longUrl}>
                    <TwitterIcon size={36} round={true} />
                  </TwitterShareButton>{' '}
                  <FacebookShareButton url={data.longUrl}>
                    <FacebookIcon size={36} round={true} />
                  </FacebookShareButton>{' '}
                  <WhatsappShareButton title={data.longUrl}>
                    <WhatsappIcon size={36} round={true} />
                  </WhatsappShareButton>{' '}
                  <TelegramShareButton url={data.longUrl}>
                    <TelegramIcon size={36} round={true} />
                  </TelegramShareButton>{' '}
                  <RedditShareButton url={data.longUrl}>
                    <RedditIcon size={36} round={true} />
                  </RedditShareButton>
                </Grid>
                <Grid item sx={{ display: { xs: 'none', sm: 'block' } }}>
                  <Grid item sx={{ pl: 4 }}>
                    <Typography color="textPrimary" variant="h4">
                      {data && data.analytics.TotalClicks}
                    </Typography>
                  </Grid>
                  <Typography color="textSecondary" variant="overline">
                    clicks so far
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </>
        )}
      </CardContent>
    </Card>
  );
};
export default LatestLinkCard;
