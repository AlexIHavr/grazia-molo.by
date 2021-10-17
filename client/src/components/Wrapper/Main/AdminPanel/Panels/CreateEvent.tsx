import React from 'react';
import { observer } from 'mobx-react';
import preloaderReducer from '../../../Windows/Preloader/preloaderReducer';
import adminPanelReducer from '../adminPanelReducer';
import FileInputContainer from '../../../../JSXElements/FileInputContainer/FileInputContainer';

const CreateEvent: React.FC = () => {
  const adminPanel = adminPanelReducer.state.panels.find(
    (adminPanel) => adminPanel.panel === 'CreateEvent'
  );
  return (
    <div className={adminPanel.panel + ' window'} data-selected={adminPanel.panel}>
      <form
        onSubmit={(e) => {
          adminPanelReducer.createEvent(e);
        }}
      >
        <h1>{adminPanel.panelName}</h1>

        <label htmlFor="EventYear">Год события</label>
        <div className="InputContainer">
          <i className="far fa-calendar-alt"></i>
          <input
            id="EventYear"
            name="year"
            type="text"
            placeholder="Введите год события"
            required
          />
        </div>

        <label htmlFor="EventName">Имя события</label>
        <div className="InputContainer">
          <i className="fas fa-pencil-alt"></i>
          <input
            id="EventName"
            name="name"
            type="text"
            placeholder="Введите имя события"
            required
          />
        </div>

        <label htmlFor="EventDescription">Описание события</label>
        <textarea id="EventDescription" name="description" placeholder="Введите описание события" />

        <label htmlFor="VideosNames">Имена видео</label>
        <div className="InputContainer">
          <i className="fas fa-video"></i>
          <input
            id="VideosNames"
            name="videoNames"
            type="text"
            placeholder="Введите имена видео, разделенные знаком '/'"
          />
        </div>

        <label htmlFor="VideosLinks">Ссылки видео в ютубе</label>
        <div className="InputContainer">
          <i className="fab fa-youtube"></i>
          <input
            id="VideosLinks"
            name="videoLinks"
            type="text"
            placeholder="Введите ссылки на видео, разделенные знаком '/'"
          />
        </div>

        <FileInputContainer
          id="AddEventPhotos"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            adminPanelReducer.uploadPostPhoto(e, 'CreateEvent');
          }}
          multiple={true}
        ></FileInputContainer>

        <div className="Errors">{adminPanel.errorMessage}</div>
        <div className="Successes">{adminPanel.successMessage}</div>

        <button
          type="submit"
          className="button"
          disabled={preloaderReducer.state.activatePreloader}
        >
          {adminPanel.panelName}
        </button>
      </form>
    </div>
  );
};

export default observer(CreateEvent);
