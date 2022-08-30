import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import Wrapper from './components/Wrapper/Wrapper';
import './fontawesome/fontawesome.css';

import { configure } from 'mobx';

configure({
  enforceActions: 'never',
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Wrapper />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
