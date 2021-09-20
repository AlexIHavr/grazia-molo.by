import React from 'react';
import { observer } from 'mobx-react';

import './shadowStyles.scss';
import onlineRequestReducer from '../OnlineRequest/OnlineRequestReducer';
import loginReducer from '../Login/loginReducer';
import registrationReducer from '../Registration/registrationReducer';
import { useParams } from 'react-router-dom';
import userSettingsReducer from '../UserSettings/userSettingsReducer';

const Shadow: React.FC = () => {
  const { path } = useParams<{ path: string }>();

  return (
    <div
      className={
        'ShadowWindow ' +
        (onlineRequestReducer.state.activateOnlineRequest ||
        loginReducer.state.activateLogin ||
        registrationReducer.state.activateRegistration ||
        userSettingsReducer.state.activateUserSettings ||
        path === 'ActivateEmail'
          ? 'openElement'
          : '')
      }
    ></div>
  );
};

export default observer(Shadow);
