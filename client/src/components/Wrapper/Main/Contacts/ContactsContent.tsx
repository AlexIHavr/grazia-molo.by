import React from 'react';
import MainContacts from '../../Footer/MainContacts/MainContacts';

import './contactsStyles.scss';

const ContactsContent: React.FC = () => {
  return (
    <>
      <div className="Description">
        <div className="Admin">
          <a href="https://vk.com/id39527276" target="_blank" rel="noreferrer">
            <i className="fas fa-user-tie"></i>
            <span>Руководитель - Хавронин Дмитрий Алексеевич</span>
          </a>
        </div>
        <MainContacts />
        <div className="Location">
          <a
            href="https://yandex.by/maps/org/gimnaziya_10/1114837153/?ll=26.843271%2C54.301563&z=17"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fas fa-map-marker-alt"></i>
            <span>г. Молодечно, ул. Богдана Хмельницкого, 20, Гимназия № 10, 222306</span>
          </a>
        </div>
        <div className="Map">
          <iframe title="YandexMap" src="https://yandex.by/map-widget/v1/-/CCUimSDbWC"></iframe>
        </div>
      </div>
    </>
  );
};

export default ContactsContent;
