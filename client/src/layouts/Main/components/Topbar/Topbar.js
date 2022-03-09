import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { alpha, useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
// import { NavItem } from './components';
import LightLogo from '../../../../assets/LightLogo.png';
import DarkLogo from '../../../../assets/DarkLogo.png';
import ThemeModeToggler from 'components/ThemeModeToggler';
import { Avatar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { userContext } from 'Context';
import axios from 'axios';

const Topbar = ({ onSidebarOpen, colorInvert = false }) => {
  const theme = useTheme();
  const { mode } = theme.palette;
  const userObject = useContext(userContext);

  const logout = () => {
    axios
      .get('http://localhost:4000/auth/logout', { withCredentials: true })
      .then((res) => {
        if (res.data === 'success') window.location.href = '/';
      });
  };

  return (
    <Box
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
      width={1}
    >
      <Box
        display={'flex'}
        component="a"
        href={userObject && !userObject.email ? '/' : '/home'}
        title="Shorts"
        width={{ xs: 100, md: 120 }}
      >
        <Box
          component={'img'}
          src={mode === 'light' && !colorInvert ? LightLogo : DarkLogo}
          height={1}
          width={1}
        />
      </Box>
      <Box sx={{ display: { xs: 'none', md: 'flex' } }} alignItems={'center'}>
        <Box>
          <Button component={'a'} href="/faq">
            <Typography fontWeight={700} color="text.primary">
              {'FAQ'}
            </Typography>
          </Button>
        </Box>

        <Box marginLeft={4}>
          {userObject && !userObject.email ? (
            <Link to="/signin" style={{ textDecoration: 'none' }}>
              <Button
                variant="contained"
                color="primary"
                target="blank"
                href="/signin"
                size="large"
              >
                Sign In
              </Button>
            </Link>
          ) : (
            <Box
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
              width={1}
            >
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <Box marginRight={2}>
                  <Avatar src={userObject.avatar} />
                </Box>
              </Box>

              <div onClick={logout}>
                <Button
                  variant="contained"
                  color="primary"
                  target="blank"
                  size="medium"
                >
                  Log out
                </Button>{' '}
              </div>
            </Box>
          )}
        </Box>
        <Box marginLeft={2}>
          <ThemeModeToggler />
        </Box>
      </Box>
      <Box sx={{ display: { xs: 'flex', md: 'none' } }} alignItems={'center'}>
        <Box marginRight={2}>
          <Avatar src={userObject.avatar} />
        </Box>
        <Button
          onClick={() => onSidebarOpen()}
          aria-label="Menu"
          variant={'outlined'}
          sx={{
            borderRadius: 2,
            minWidth: 'auto',
            padding: 1,
            borderColor: alpha(theme.palette.divider, 0.2),
          }}
        >
          <MenuIcon />
        </Button>
        <Box marginLeft={2}>
          <ThemeModeToggler />
        </Box>
      </Box>
    </Box>
  );
};

Topbar.propTypes = {
  onSidebarOpen: PropTypes.func,
  pages: PropTypes.object,
  colorInvert: PropTypes.bool,
};

export default Topbar;
