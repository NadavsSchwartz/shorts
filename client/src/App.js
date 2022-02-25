import React, { useContext } from 'react';
import Routes from './Routes';
import Page from './components/Page';

import 'react-lazy-load-image-component/src/effects/blur.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-image-lightbox/style.css';
import 'aos/dist/aos.css';
import { userContext } from 'Context';
const App = () => {
  const userObject = useContext(userContext);
  console.log(userObject);
  return (
    <Page>
      <Routes />
    </Page>
  );
};

export default App;
