import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';

// import NavItem from './components/NavItem';
import LightLogo from '../../../../../../assets/LightLogo.png';
import DarkLogo from '../../../../../../assets/DarkLogo.png';
import { Typography } from '@mui/material';
const SidebarNav = () => {
  const theme = useTheme();
  const { mode } = theme.palette;

  return (
    <Box>
      <Box width={1} paddingX={2} paddingY={1}>
        <Box
          display={'flex'}
          component="a"
          href="/"
          title="Shorts"
          width={{ xs: 100, md: 120 }}
        >
          <Box
            component={'img'}
            src={mode === 'light' ? LightLogo : DarkLogo}
            height={1}
            width={1}
          />
        </Box>
      </Box>
      <Box paddingX={2} paddingY={2}>
        <Box>
          <Button
            component={'a'}
            href="/faq"
            fullWidth
            sx={{
              justifyContent: 'flex-start',
            }}
          >
            {' '}
            <Typography fontWeight={600} color="text.primary">
              {'FAQ'}
            </Typography>
          </Button>
        </Box>

        <Box marginTop={1}>
          <Button
            size={'large'}
            variant="contained"
            color="primary"
            fullWidth
            component="a"
            target="blank"
            href="/signin"
          >
            Log In
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SidebarNav;
