import React from 'react';
import { observer } from 'mobx-react';
import { NavLink } from 'react-router-dom';

import './mainMenuStyles.scss';

import mainReducer from '../../Main/mainReducer';

const MainMenu: React.FC = () => {
  return (
    <>
      <div
        className={
          'BarsMainMenu ' + (mainReducer.state.activateMainMenu ? 'rotateBarsMainMenu' : '')
        }
        onClick={() => mainReducer.toggleActivateMainMenu()}
      >
        <i className={'fas fa-chevron-circle-down'}></i>
      </div>
      <div
        className={'MainMenu ' + (mainReducer.state.activateMainMenu ? 'activateMainMenu' : '')}
        onClick={(e) => mainReducer.setCurrentPage(e)}
      >
        {mainReducer.state.mainNavigations.map(({ category, name }) => {
          return category === 'MainPage' ? (
            <NavLink key={category} to={`/`} exact>
              {name}
            </NavLink>
          ) : (
            <NavLink key={category} to={`/${category}`}>
              {name}
            </NavLink>
          );
        })}
      </div>
    </>
  );
};

export default observer(MainMenu);
