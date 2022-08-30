import React from 'react';
import { Route } from 'react-router-dom';

import Windows from './Windows/Windows';
import Header from './Header/Header';
import Slider from './Slider/Slider';
import Main from './Main/Main';
import Footer from './Footer/Footer';

import './wrapperStyles.scss';

const Wrapper: React.FC = () => {
  return (
    <div className="Wrapper">
      <Windows></Windows>
      <Header></Header>
      <Route path="/" exact>
        <Slider></Slider>
      </Route>
      <Main></Main>
      <Footer></Footer>
    </div>
  );
};

export default Wrapper;
