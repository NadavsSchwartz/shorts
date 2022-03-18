import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import LightLogo from '../../../../../../assets/LightLogo.png';
import DarkLogo from '../../../../../../assets/DarkLogo.png';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { userLogOut } from 'store/actions/userActions';
const SidebarNav = () => {
  const theme = useTheme();
  const { mode } = theme.palette;
  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  const dispatch = useDispatch();

  const logout = () => {
    dispatch(userLogOut());
  };
  return (
    <Box>
      <Box width={1} paddingX={2} paddingY={1}>
        <Box
          display={'flex'}
          component="a"
          href={user && !user.email ? '/' : '/home'}
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
          {user && !user.email ? (
            <Link to="/signin" style={{ textDecoration: 'none' }}>
              <Button
                variant="contained"
                color="primary"
                target="blank"
                fullWidth
                href="/signin"
                size="large"
              >
                Sign In
              </Button>
            </Link>
          ) : (
            <div>
              <Button
                variant="contained"
                color="primary"
                target="blank"
                size="large"
                fullWidth
                onClick={logout}
              >
                Log out
              </Button>
            </div>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default SidebarNav;
