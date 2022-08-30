import { makeAutoObservable } from 'mobx';
import { visitorApi } from '../../../api/api';
import { sliderResponseType } from '../Main/AdminPanel/adminPanelType';

import { sliderType } from './sliderType';

class SliderReducer {
  constructor() {
    makeAutoObservable(this);
  }

  state: sliderType = {
    framesUrl: process.env.PUBLIC_URL + '/Images/Wrapper/Main/Slider/',
    frames: [],
    activeFrame: 0,
    sliderTimer: setInterval(() => {}, 0),
    settings: {
      timeRepeatFrames: 5,
    },
  };

  //запуск слайдера
  runSlider() {
    clearInterval(this.state.sliderTimer);
    this.state.sliderTimer = setInterval(() => {
      this.changeFrameSlider('next');
    }, this.state.settings.timeRepeatFrames * 1000);
  }

  //изменить кадр слайдера
  changeFrameSlider(indexElem: 'next' | 'prev' | number) {
    const iLastFrame = this.state.frames.length - 1;

    let iElem: number = this.state.activeFrame;

    if (indexElem === 'next') {
      iElem < iLastFrame ? iElem++ : (iElem = 0);
    } else if (indexElem === 'prev') {
      iElem > 0 ? iElem-- : (iElem = iLastFrame);
    } else {
      iElem = indexElem;
    }

    this.state.activeFrame = iElem;

    this.runSlider();
  }

  //получить перемешанный в случайном порядке массив
  getShuffledRandomArr(arr: any[]) {
    for (let i = arr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr;
  }

  //получить кадры слайдера
  async getSliderFrames() {
    try {
      const sliders = await visitorApi.get<sliderResponseType[]>('/getSliders');
      this.state.frames = this.getShuffledRandomArr(sliders.data[0].photoNames);
    } catch (e: any) {
      console.log(e.response?.data || e);
    }
  }
}

export default new SliderReducer();
