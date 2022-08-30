import React, { useEffect } from 'react';
import { observer } from 'mobx-react';

import './sliderStyles.scss';

import sliderReducer from './sliderReducer';
import OnlineRequestReducer from '../Windows/OnlineRequest/OnlineRequestReducer';

const Slider: React.FC = () => {
  const state = sliderReducer.state;

  const setNavSlider = () => {
    return new Array(state.frames.length).fill('').map((_, i) => {
      return (
        <div
          key={i}
          className={state.activeFrame === i ? 'activeNavSlider' : ''}
          onClick={() => sliderReducer.changeFrameSlider(i)}
        ></div>
      );
    });
  };

  const setMainSlider = () => {
    return state.frames.map((frame, i) => {
      return (
        <img
          key={frame}
          src={state.framesUrl + frame}
          className={state.activeFrame === i ? 'activatedImg' : 'deactivatedImg'}
          alt="Картинка не загрузилась"
          onLoad={() => {
            if (i === state.frames.length - 1) sliderReducer.runSlider();
          }}
        />
      );
    });
  };

  useEffect(() => {
    sliderReducer.getSliderFrames();
  }, []);

  return (
    <div className="Slider">
      <div className="OnlineButton button" onClick={() => OnlineRequestReducer.openOnlineRequest()}>
        Записаться онлайн!
      </div>
      <div className="MoveSliderLeft" onClick={() => sliderReducer.changeFrameSlider('prev')}>
        <i className="fas fa-arrow-circle-left"></i>
      </div>
      <div className="MainSlider">{setMainSlider()}</div>
      <div className="MoveSliderRight" onClick={() => sliderReducer.changeFrameSlider('next')}>
        <i className="fas fa-arrow-circle-right"></i>
      </div>
      <div className="NavSlider">{setNavSlider()}</div>
    </div>
  );
};

export default observer(Slider);
