import React, { useContext } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import LightLogo from '../../../../assets/LightLogo.png';
import DarkLogo from '../../../../assets/DarkLogo.png';
import { userContext } from 'Context';
const Footer = () => {
  const theme = useTheme();
  const { mode } = theme.palette;
  const userObject = useContext(userContext);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          width={1}
          flexDirection={{ xs: 'column', sm: 'row' }}
        >
          <Box
            display={'flex'}
            component="a"
            href={userObject && !userObject.email ? '/' : '/home'}
            title="Shorts"
            width={80}
          >
            <Box
              component={'img'}
              src={mode === 'light' ? LightLogo : DarkLogo}
              height={1}
              width={1}
            />
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Typography
          align={'center'}
          variant={'subtitle2'}
          color="text.secondary"
          gutterBottom
        >
          &copy; Shorts. 2021, All rights reserved.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Footer;
