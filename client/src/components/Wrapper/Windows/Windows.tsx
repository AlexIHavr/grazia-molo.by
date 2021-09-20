import React from 'react';
import { Route } from 'react-router-dom';
import { observer } from 'mobx-react';
import './windowsStyles.scss';

import UserSettings from './UserSettings/UserSettings';
import Login from './Login/Login';
import Registration from './Registration/Registration';
import OnlineRequest from './OnlineRequest/OnlineRequest';
import Preloader from './Preloader/Preloader';
import Shadow from './Shadow/Shadow';
import ActivateEmail from './ActivateEmail/ActivateEmail';

const Windows: React.FC = () => {
  return (
    <div className="Windows">
      <UserSettings></UserSettings>
      <Login></Login>
      <Registration></Registration>
      <OnlineRequest></OnlineRequest>
      <Preloader></Preloader>
      <Route path="/:path?" component={Shadow}></Route>
      <Route path="/ActivateEmail/:link" component={ActivateEmail} exact></Route>
    </div>
  );
};

export default observer(Windows);
