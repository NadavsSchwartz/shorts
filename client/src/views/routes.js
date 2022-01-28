import React from 'react';

import {
  IndexView,
  Home as HomeView,
  Faq as FaqView,
  NotFound as NotFoundView,
  NotFoundCover as NotFoundCoverView,
  Signin as SigninSimpleView,
  Signup as SignupSimpleView,
} from 'views';

const routes = [
  {
    path: '/',
    renderer: (params = {}) => <IndexView {...params} />,
  },
  {
    path: '/home',
    renderer: (params = {}) => <HomeView {...params} />,
  },
  {
    path: '/faq',
    renderer: (params = {}) => <FaqView {...params} />,
  },
  {
    path: '/not-found',
    renderer: (params = {}) => <NotFoundView {...params} />,
  },
  {
    path: '/not-found-cover',
    renderer: (params = {}) => <NotFoundCoverView {...params} />,
  },
  {
    path: '/signin',
    renderer: (params = {}) => <SigninSimpleView {...params} />,
  },

  {
    path: '/signup',
    renderer: (params = {}) => <SignupSimpleView {...params} />,
  },
];
export default routes;
