import React, { lazy } from 'react';

const Faq = lazy(() => import('./Faq'));
const Home = lazy(() => import('./Home'));
const Landing = lazy(() => import('./Landing/Landing'));
const Signup = lazy(() => import('./Signup'));
const Signin = lazy(() => import('./Signin'));
const NotFound = lazy(() => import('./NotFound'));
const routes = [
  {
    path: '/',
    renderer: (params = {}) => <Landing {...params} />,
  },
  {
    path: '/home',
    renderer: (params = {}) => <Home {...params} />,
  },
  {
    path: '/faq',
    renderer: (params = {}) => <Faq {...params} />,
  },
  {
    path: '/not-found',
    renderer: (params = {}) => <NotFound {...params} />,
  },

  {
    path: '/signin',
    renderer: (params = {}) => <Signin {...params} />,
  },

  {
    path: '/signup',
    renderer: (params = {}) => <Signup {...params} />,
  },
];
export default routes;
