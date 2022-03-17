/* eslint-disable react/prop-types */
import QRCode from 'qrcode.react';
import React, { useState } from 'react';
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
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Box, Grid, Typography } from '@mui/material';
const SocialShare = ({ data }) => {
  const [openDialog, SetOpenDialog] = useState(false);
  const handleChange = () => {
    SetOpenDialog(!openDialog);
  };

  return (
    <>
      <TwitterShareButton url={data.shortUrl}>
        <TwitterIcon size={36} round={true} />
      </TwitterShareButton>{' '}
      <FacebookShareButton url={data.shortUrl}>
        <FacebookIcon size={36} round={true} />
      </FacebookShareButton>{' '}
      <WhatsappShareButton title={data.shortUrl}>
        <WhatsappIcon size={36} round={true} />
      </WhatsappShareButton>{' '}
      <TelegramShareButton url={data.shortUrl}>
        <TelegramIcon size={36} round={true} />
      </TelegramShareButton>{' '}
      <RedditShareButton url={data.shortUrl}>
        <RedditIcon size={36} round={true} />
      </RedditShareButton>{' '}
      <Box component={'span'} onClick={handleChange}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 12.58 12.58"
          width={34}
          color="#fff"
        >
          <path d="M4.42 6.86a1.32 1.32 0 011 .33 1.24 1.24 0 01.3.81v3.22a1.38 1.38 0 01-.33 1 1.21 1.21 0 01-.82.32H1.31a1.32 1.32 0 01-1-.32 1.24 1.24 0 01-.31-.8V8.19a1.35 1.35 0 01.33-1 1.21 1.21 0 01.82-.33h3.27zm4.07 4c.09 0 .14 0 .14.15v1.09c0 .1-.05.16-.14.16H7.32c-.09 0-.14-.06-.14-.16V11c0-.1.05-.15.14-.15h1.17zm3.63 0c.09 0 .14 0 .14.15v1.09c0 .1 0 .16-.14.16H11c-.09 0-.14-.06-.14-.16V11c0-.1 0-.15.14-.15h1.17zm-7.72-3H1.32a.37.37 0 00-.27.09.37.37 0 00-.08.2v3.14a.38.38 0 00.09.28.48.48 0 00.19.09H4.4a.37.37 0 00.27-.09.31.31 0 00.09-.19V8.2a.4.4 0 00-.09-.29.37.37 0 00-.27-.09zM10.32 9c.09 0 .14.05.14.15v1.13c0 .11-.05.17-.14.17H9.15c-.09 0-.13-.06-.13-.17H9V9.15c0-.1 0-.15.13-.15h1.17zM3.45 9c.09 0 .13.05.13.15v1.13c0 .11 0 .17-.13.17H2.28c-.09 0-.14-.06-.14-.17V9.15c0-.1 0-.15.14-.15h1.17zm5-1.82c.09 0 .14.05.14.15v1.14c0 .1-.05.16-.14.16H7.32c-.09 0-.14-.06-.14-.16V7.33c0-.1.05-.15.14-.15h1.17zm3.63 0c.09 0 .14.05.14.15v1.14c0 .1 0 .16-.14.16H11c-.09 0-.14-.06-.14-.16V7.33c0-.1 0-.15.14-.15h1.17zM11.28 0a1.33 1.33 0 011 .33 1.24 1.24 0 01.32.84v3.22a1.38 1.38 0 01-.32 1 1.23 1.23 0 01-.82.32H8.17a1.34 1.34 0 01-1-.33 1.34 1.34 0 01-.32-.85v-3.2a1.4 1.4 0 01.32-1A1.25 1.25 0 018 0h3.27zM4.42 0a1.32 1.32 0 011 .33 1.24 1.24 0 01.32.84v3.22a1.38 1.38 0 01-.33 1 1.21 1.21 0 01-.82.32H1.31a1.32 1.32 0 01-1-.33A1.29 1.29 0 010 4.55V1.33a1.35 1.35 0 01.33-1A1.21 1.21 0 011.15 0h3.27zm6.85 1H8.18a.33.33 0 00-.27.1.28.28 0 00-.08.19v3.1a.39.39 0 00.09.28.29.29 0 00.19.09h3.17a.3.3 0 00.35-.28V1.33a.41.41 0 00-.08-.27.33.33 0 00-.28-.06zM4.4 1H1.32a.33.33 0 00-.27.1.33.33 0 00-.05.15v3.14a.39.39 0 00.09.28.31.31 0 00.19.09H4.4a.37.37 0 00.27-.09.31.31 0 00.09-.19V1.33a.37.37 0 00-.09-.27A.33.33 0 004.4 1zm-1 1.18c.09 0 .13 0 .13.15v1.09c0 .11 0 .16-.13.16H2.28c-.09 0-.14-.05-.14-.16V2.29c0-.1 0-.15.14-.15h1.17zm6.89 0a.13.13 0 01.15.15v1.09c0 .11-.05.16-.15.16H9.17c-.08 0-.13-.05-.13-.16H9V2.29c0-.1.05-.15.13-.15h1.17z"></path>
        </svg>
      </Box>
      <Dialog onClose={handleChange} open={openDialog}>
        <DialogTitle>Your newly Generated QR Code</DialogTitle>{' '}
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="caption" sx={{ mb: 1 }}>
            {data.shortUrl}
          </Typography>
          <Grid container justifyContent="center" sx={{ mb: 4 }}>
            <QRCode value={data.shortUrl} level={'H'} />
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
};

export default SocialShare;
