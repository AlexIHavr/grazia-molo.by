import React from 'react';
import { observer } from 'mobx-react';
import preloaderReducer from './preloaderReducer';
import './preloaderStyles.scss';

const Preloader: React.FC = () => {
  const state = preloaderReducer.state;

  return (
    <div className={'Preloader ' + (state.activatePreloader ? 'openElement' : '')}>
      <i className="fas fa-sync-alt"></i>
    </div>
  );
};

export default observer(Preloader);
