import React from 'react';

import './footerStyles.scss';

import MainContacts from './MainContacts/MainContacts';

const Footer: React.FC = () => {
  return (
    <footer>
      <img
        src={process.env.PUBLIC_URL + '/Images/Wrapper/Footer/LogGrazia.png'}
        alt="Картинка не загрузилась"
      />
      <MainContacts />
      <img
        src={process.env.PUBLIC_URL + '/Images/Wrapper/Footer/LogHarmony.png'}
        alt="Картинка не загрузилась"
      />
    </footer>
  );
};

export default Footer;
