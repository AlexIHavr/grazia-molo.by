import { makeAutoObservable } from 'mobx';

import { preloaderType } from './preloaderType';

class PreloaderReducer {
  constructor() {
    makeAutoObservable(this);
  }

  state: preloaderType = {
    activatePreloader: false,
  };

  enablePreloader() {
    this.state.activatePreloader = true;
  }

  disablePreloader() {
    this.state.activatePreloader = false;
  }
}

export default new PreloaderReducer();
