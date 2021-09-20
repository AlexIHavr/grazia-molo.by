import React from 'react';
import { observer } from 'mobx-react';

import MainLog from './MainLog/MainLog';
import MainMenu from './MainMenu/MainMenu';
import MainButtons from './MainButtons/MainButtons';

import './headerStyles.scss';

const Header: React.FC = () => {
  return (
    <>
      <header>
        <MainLog></MainLog>
        <MainMenu></MainMenu>
        <MainButtons></MainButtons>
      </header>
      <div className="FixedHeader"></div>
    </>
  );
};

export default observer(Header);
