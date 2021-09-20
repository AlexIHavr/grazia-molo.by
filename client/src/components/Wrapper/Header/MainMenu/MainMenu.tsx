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
        onClick={() => mainReducer.toogleActivateMainMenu()}
      >
        <i className={'fas fa-chevron-circle-down'}></i>
      </div>
      <div
        className={'MainMenu ' + (mainReducer.state.activateMainMenu ? 'activateMainMenu' : '')}
        onClick={(e) => mainReducer.setCurrentPage(e)}
      >
        <NavLink to="/" exact>
          Главная
        </NavLink>
        <NavLink to="/Dances">Танцы</NavLink>
        <NavLink to="/Timetable">Расписание</NavLink>
        <NavLink to="/Events">События</NavLink>
        <NavLink to="/Creativity">Творчество</NavLink>
        <NavLink to="/History">История</NavLink>
        <NavLink to="/Forum">Форум</NavLink>
        <NavLink to="/Contacts">Контакты</NavLink>
      </div>
    </>
  );
};

export default observer(MainMenu);
