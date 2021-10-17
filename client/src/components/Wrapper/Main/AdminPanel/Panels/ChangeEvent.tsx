import React from 'react';
import { observer } from 'mobx-react';
import preloaderReducer from '../../../Windows/Preloader/preloaderReducer';
import adminPanelReducer from '../adminPanelReducer';
import Select from '../../../../JSXElements/Select/Select';
import eventsReducer from '../../Events/eventsReducer';
import FileInputContainer from '../../../../JSXElements/FileInputContainer/FileInputContainer';

const ChangeEvent: React.FC = () => {
  const state = adminPanelReducer.state;

  const adminPanel = state.panels.find((adminPanel) => adminPanel.panel === 'ChangeEvent');
  const changedEvent = state.changedEvent;

  return (
    <div className={adminPanel.panel + ' window'} data-selected={adminPanel.panel}>
      <form
        onSubmit={(e) => {
          adminPanelReducer.changeEvent(e);
        }}
      >
        <h1>{adminPanel.panelName}</h1>

        <label htmlFor="ChooseEventYear">Год события</label>
        <div className="InputContainer">
          <i className="far fa-calendar-alt"></i>
          <Select
            inputName="changedYear"
            onSelect={adminPanelReducer.selectYearEvents.bind(adminPanelReducer)}
            options={eventsReducer.getUniqueYears().map((elem) => ({ _id: elem, name: elem }))}
            defaultTitle="Выберите год события"
          ></Select>
        </div>

        <label htmlFor="ChooseEvent">Изменяемое событие</label>
        <div className="InputContainer">
          <i className="fas fa-calendar-day"></i>
          <Select
            inputName="eventId"
            onSelect={adminPanelReducer.selectEvent.bind(adminPanelReducer)}
            options={state.yearEvents.map(({ _id, name }) => ({ _id, name }))}
            defaultTitle="Выберите событие"
          ></Select>
        </div>

        {changedEvent ? (
          <>
            <label htmlFor="NewEventYear">Год события</label>
            <div className="InputContainer">
              <i className="far fa-calendar-alt"></i>
              <input
                id="NewEventYear"
                name="year"
                type="text"
                placeholder="Введите год события"
                defaultValue={changedEvent.year}
                required
              />
            </div>

            <label htmlFor="NewEventName">Имя события</label>
            <div className="InputContainer">
              <i className="fas fa-pencil-alt"></i>
              <input
                id="NewEventName"
                name="name"
                type="text"
                placeholder="Введите имя события"
                defaultValue={changedEvent.name}
                required
              />
            </div>

            <label htmlFor="NewEventDescription">Описание события</label>
            <textarea
              id="NewEventDescription"
              name="description"
              placeholder="Введите описание события"
              defaultValue={changedEvent.description}
            />

            <label htmlFor="NewVideosNames">Имена видео</label>
            <div className="InputContainer">
              <i className="fas fa-video"></i>
              <input
                id="NewVideosNames"
                name="videoNames"
                type="text"
                placeholder="Введите имена видео, разделенные знаком '/'"
                defaultValue={changedEvent.videoNames.join('/')}
              />
            </div>

            <label htmlFor="NewVideosLinks">Ссылки видео в ютубе</label>
            <div className="InputContainer">
              <i className="fab fa-youtube"></i>
              <input
                id="NewVideosLinks"
                name="videoLinks"
                type="text"
                placeholder="Введите ссылки на видео, разделенные знаком '/'"
                defaultValue={changedEvent.videoLinks.join('/')}
              />
            </div>

            {changedEvent.photoNames.length ? (
              <>
                <label htmlFor="NewEventPhotos">Фото события</label>
                <div className="SelectedEventPhotos">
                  {changedEvent.photoNames.map((photoName) => {
                    return (
                      <div key={photoName}>
                        <img
                          src={eventsReducer.state.imagesUrl + changedEvent.year + '/' + photoName}
                          alt="Картинка не загрузилась"
                        />
                        <button
                          className="DeleteEventPhoto deleteButton"
                          onClick={() => {
                            adminPanelReducer.deleteEventPhoto(photoName);
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
              id="AddNewEventPhotos"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                adminPanelReducer.uploadPostPhoto(e, 'ChangeEvent');
              }}
              multiple={true}
            ></FileInputContainer>

            <button
              className="DeleteEvent deleteButton"
              onClick={() => {
                adminPanelReducer.deleteEvent();
              }}
              disabled={preloaderReducer.state.activatePreloader}
            >
              <i className="fas fa-minus-circle"></i>Удалить событие
            </button>
          </>
        ) : (
          ''
        )}

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

export default observer(ChangeEvent);
