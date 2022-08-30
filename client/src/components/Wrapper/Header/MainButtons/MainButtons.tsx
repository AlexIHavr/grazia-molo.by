import React from 'react';
import { observer } from 'mobx-react';
import loginReducer from '../../Windows/Login/loginReducer';
import registrationReducer from '../../Windows/Registration/registrationReducer';
import './mainButtonsStyles.scss';
import userSettingsReducer from '../../Windows/UserSettings/userSettingsReducer';
import forumReducer from '../../Main/Forum/forumReducer';
import UserPhoto from '../../../JSXElements/UserPhoto/UserPhoto';
import OnlineRequestReducer from '../../Windows/OnlineRequest/OnlineRequestReducer';

const Header: React.FC = () => {
  return (
    <div className="MainButtons">
      <button
        className="OnlineButton button"
        onClick={() => OnlineRequestReducer.openOnlineRequest()}
      >
        <i className="fas fa-user-plus"></i>
      </button>
      <button
        className={'LoginButton button ' + (loginReducer.state.isAuth ? 'closeElement' : '')}
        onClick={() => {
          loginReducer.openLogin();
        }}
      >
        Войти
      </button>
      <div
        className={'IconUser ' + (loginReducer.state.isAuth ? 'openElementFlex' : '')}
        onClick={() => {
          userSettingsReducer.openUserSettings();
        }}
      >
        <UserPhoto>
          <img
            src={forumReducer.state.userImgUrl + loginReducer.state.userData.photoName}
            alt="Картинка не загрузилась"
          />
        </UserPhoto>
        <span>{loginReducer.state.userData.fullName}</span>
      </div>
      <button
        className={'RegistrationButton button ' + (loginReducer.state.isAuth ? 'closeElement' : '')}
        onClick={() => {
          registrationReducer.openRegistration();
        }}
      >
        Регистрация
      </button>
    </div>
  );
};

export default observer(Header);
