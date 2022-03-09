import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Context from './Context/index';
import Routes from 'Routes';
import Page from 'components/Page';
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-image-lightbox/style.css';
import 'aos/dist/aos.css';
import { CircularProgress } from '@mui/material';

ReactDOM.render(
  <BrowserRouter>
    <Context>
      <Suspense
        fallback={
          <CircularProgress
            style={{
              margin: 'auto',
              left: '0',
              right: '0',
              top: '0',
              bottom: '0',
              position: 'fixed',
            }}
          />
        }
      >
        <Page>
          <Routes />
        </Page>
      </Suspense>
    </Context>
  </BrowserRouter>,
  document.getElementById('root'),
);
