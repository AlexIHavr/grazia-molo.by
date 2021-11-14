import React from 'react';
import { observer } from 'mobx-react';
import loginReducer from '../Login/loginReducer';
import userSettingsReducer from './userSettingsReducer';
import CloseButton from '../../../JSXElements/CloseButton/CloseButton';
import preloaderReducer from '../Preloader/preloaderReducer';
import FileInputContainer from '../../../JSXElements/FileInputContainer/FileInputContainer';
import UserPhoto from '../../../JSXElements/UserPhoto/UserPhoto';
import forumReducer from '../../Main/Forum/forumReducer';
import { NavLink } from 'react-router-dom';
import './userSettingsStyle.scss';
import mainReducer from '../../Main/mainReducer';

const UserSettings: React.FC = () => {
  const state = userSettingsReducer.state;

  return (
    <div className={'UserSettings window ' + (state.activateUserSettings ? 'activateWindow' : '')}>
      <CloseButton
        onClick={() => {
          userSettingsReducer.closeUserSettings();
        }}
      ></CloseButton>

      {loginReducer.state.userData.roles.includes('ADMIN') ? (
        <NavLink
          to="/AdminPanel"
          className="GoToAdminPanel button"
          onClick={(e) => {
            mainReducer.setCurrentPage(e);
            userSettingsReducer.closeUserSettings();
          }}
        >
          <i className="fas fa-cog"></i>
        </NavLink>
      ) : (
        ''
      )}

      <h1>Настройки</h1>
      <form
        onSubmit={(e) => {
          userSettingsReducer.changeUserSettings(e);
        }}
      >
        <label htmlFor="ChangeFullName">Изменить полное имя</label>
        <div className="InputContainer">
          <i className="fas fa-user-edit"></i>
          <input
            id="ChangeFullName"
            type="text"
            defaultValue={loginReducer.state.userData.fullName}
            name="fullName"
            required
          />
        </div>
        <label>Изменить фото</label>
        <UserPhoto>
          <img
            className={userSettingsReducer.state.zoomInPhoto ? 'zoomInPhoto' : ''}
            src={forumReducer.state.userImgUrl + loginReducer.state.userData.photoName}
            alt="Картинка не загрузилась"
            onClick={() => userSettingsReducer.toggleZoomPhoto()}
          />
        </UserPhoto>
        <FileInputContainer
          id="ChangeUserPhoto"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            userSettingsReducer.uploadUserPhoto(e);
          }}
          onDelete={() => userSettingsReducer.deleteUserPhoto()}
        ></FileInputContainer>
        <div className="Errors">{state.errorMessage}</div>
        <div className="Successes">{state.successMessage}</div>
        <button
          type="submit"
          className="button"
          disabled={preloaderReducer.state.activatePreloader}
        >
          Применить
        </button>
        <button
          className={'LogoutButton deleteButton'}
          onClick={() => {
            loginReducer.logout();
            userSettingsReducer.closeUserSettings();
          }}
          disabled={preloaderReducer.state.activatePreloader}
        >
          Выйти
        </button>
      </form>
    </div>
  );
};

export default observer(UserSettings);
