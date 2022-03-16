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
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Grid, Typography } from '@mui/material';
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
      <QrCodeScannerIcon onClick={handleChange} />
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
