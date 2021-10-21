import React from 'react';
import { observer } from 'mobx-react';
import { NavLink } from 'react-router-dom';

import './mainMenuStyles.scss';

import mainReducer from '../../Main/mainReducer';
import adminPanelReducer from '../../Main/AdminPanel/adminPanelReducer';

const MainMenu: React.FC = () => {
  return (
    <>
      <div
        className={
          'BarsMainMenu ' + (mainReducer.state.activateMainMenu ? 'rotateBarsMainMenu' : '')
        }
        onClick={() => mainReducer.toogleActivateMainMenu()}
      >
        <i className={'fas fa-chevron-circle-down'}></i>
      </div>
      <div
        className={'MainMenu ' + (mainReducer.state.activateMainMenu ? 'activateMainMenu' : '')}
        onClick={(e) => mainReducer.setCurrentPage(e)}
      >
        {adminPanelReducer.state.mainNavigation.map(({ _id, name }) => {
          return _id === 'MainPage' ? (
            <NavLink key={_id} to={`/`} exact>
              {name}
            </NavLink>
          ) : (
            <NavLink key={_id} to={`/${_id}`}>
              {name}
            </NavLink>
          );
        })}
      </div>
    </>
  );
};

export default observer(MainMenu);
