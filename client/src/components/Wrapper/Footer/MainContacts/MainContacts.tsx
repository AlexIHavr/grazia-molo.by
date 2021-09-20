import React from 'react';

import './mainContacts.scss';

const MainContacts: React.FC = () => {
  return (
    <div className="MainContacts">
      <div>
        <i className="fas fa-phone"></i>
        <span>+375 (29) 375-06-24</span>
      </div>
      <div>
        <i className="fas fa-envelope"></i>
        <span>harmonymolod@yandex.ru</span>
      </div>
      <div>
        <a className="VkLink" href="https://vk.com/clubgraciamol" target="_blank" rel="noreferrer">
          <i className="fab fa-vk"></i>
          <span>clubgraciamol</span>
        </a>
      </div>
      <div>
        <a
          className="InstaLink"
          href="https://www.instagram.com/harmonymolod/"
          target="_blank"
          rel="noreferrer"
        >
          <i className="fab fa-instagram"></i>
          <span>harmonymolod</span>
        </a>
      </div>
    </div>
  );
};

export default MainContacts;
