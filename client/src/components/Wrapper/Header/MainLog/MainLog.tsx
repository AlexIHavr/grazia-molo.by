import React from 'react';
import { NavLink } from 'react-router-dom';

import './mainLogStyles.scss';

const MainLog: React.FC = () => {
  return (
    <div className="MainLog">
      <NavLink to="/" exact activeClassName="">
        <img
          src={process.env.PUBLIC_URL + '/Images/Wrapper/Footer/LogGrazia.png'}
          alt="Картинка не загрузилась"
        />
      </NavLink>
    </div>
  );
};

export default MainLog;
