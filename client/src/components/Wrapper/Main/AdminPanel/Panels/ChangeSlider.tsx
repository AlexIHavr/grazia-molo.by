import React from 'react';
import { observer } from 'mobx-react';
import preloaderReducer from '../../../Windows/Preloader/preloaderReducer';
import adminPanelReducer from '../adminPanelReducer';
import FileInputContainer from '../../../../JSXElements/FileInputContainer/FileInputContainer';
import sliderReducer from '../../../Slider/sliderReducer';

const ChangeSlider: React.FC = () => {
  const state = adminPanelReducer.state;

  const adminPanel = state.panels.find((adminPanel) => adminPanel._id === 'ChangeSlider');
  const slider = state.sliders[0];

  return (
    <div className={adminPanel._id + ' window'} data-selected={adminPanel._id}>
      <form
        onSubmit={(e) => {
          adminPanelReducer.changeSlider(e);
        }}
      >
        <h1>{adminPanel.section}</h1>

        {slider?.photoNames.length ? (
          <>
            <label htmlFor="SliderPhotos">Фото слайдера</label>
            <div className="SelectedSectionPhotos">
              {slider.photoNames.map((photoName) => {
                return (
                  <div key={photoName}>
                    <img src={`${sliderReducer.state.framesUrl}${photoName}`} alt="Картинка не загрузилась" />
                    <button
                      className="deleteButton"
                      onClick={() => {
                        adminPanelReducer.deleteSliderPhoto(photoName);
                      }}
                      disabled={preloaderReducer.state.activatePreloader}
                    >
                      Удалить фото
                    </button>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          ''
        )}

        <FileInputContainer
          id="AddNewSliderPhotos"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            adminPanelReducer.uploadPhotos(e, 'ChangeSlider');
          }}
          multiple={true}
        ></FileInputContainer>

        <div className="Errors">{adminPanel.errorMessage}</div>
        <div className="Successes">{adminPanel.successMessage}</div>

        <button type="submit" className="button" disabled={preloaderReducer.state.activatePreloader}>
          {adminPanel.section}
        </button>
      </form>
    </div>
  );
};

export default observer(ChangeSlider);
