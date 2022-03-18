import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { alpha, useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import LightLogo from '../../../../assets/LightLogo.png';
import DarkLogo from '../../../../assets/DarkLogo.png';
import ThemeModeToggler from 'components/ThemeModeToggler';
import { Avatar, Typography, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLogOut } from 'store/actions/userActions';
import { ShortLinkForm } from 'views/Landing/components/Hero/components';

const Topbar = ({ onSidebarOpen, colorInvert = false }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { mode } = theme.palette;
  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });
  const logout = () => {
    dispatch(userLogOut());
  };
  return (
    <Box
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
      width={1}
    >
      {user && !user.email ? (
        <Box
          display={'flex'}
          component="a"
          href={user && !user.email ? '/' : '/home'}
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
      ) : (
        <>
          <Box
            sx={{ display: { xs: 'none', md: 'flex' } }}
            display={'flex'}
            component="a"
            href={user && !user.email ? '/' : '/home'}
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

          <Box width={isMd ? 0.5 : 0.7}>
            <ShortLinkForm />
          </Box>
        </>
      )}
      <Box sx={{ display: { xs: 'none', md: 'flex' } }} alignItems={'center'}>
        <Box>
          <Button component={'a'} href="/faq">
            <Typography fontWeight={700} color="text.primary">
              {'FAQ'}
            </Typography>
          </Button>
        </Box>

        <Box marginLeft={4}>
          {user && !user.email ? (
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
                  <Avatar src={user.avatar} />
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
        <Box marginLeft={5}>
          <ThemeModeToggler />
        </Box>
      </Box>
      <Box sx={{ display: { xs: 'flex', md: 'none' } }} alignItems={'center'}>
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
