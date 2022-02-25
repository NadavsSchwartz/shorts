import React from 'react';

import {
  Faq as FaqView,
  NotFound as NotFoundView,
  Signin as SigninSimpleView,
  Signup as SignupSimpleView,
} from 'views';
import Landing from './Landing';

const routes = [
  {
    path: '/',
    renderer: (params = {}) => <Landing {...params} />,
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
    path: '/signin',
    renderer: (params = {}) => <SigninSimpleView {...params} />,
  },

  {
    path: '/signup',
    renderer: (params = {}) => <SignupSimpleView {...params} />,
  },
];
export default routes;
