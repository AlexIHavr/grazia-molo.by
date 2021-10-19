import React from 'react';
import './adminPanelStyle.scss';
import adminPanelReducer from './adminPanelReducer';
import { observer } from 'mobx-react';
import { useEffect } from 'react';

import CreatePost from './Panels/CreatePost';
import ChangePost from './Panels/ChangePost';
import ValidationComments from './Panels/ValidationComments';
import BanUsers from './Panels/BanUsers';
import ManageTimetable from './Panels/ManageTimetable';
import CreateSection from './Panels/CreateSection';
import ChangeSection from './Panels/ChangeSection';

const AdminPanelContent: React.FC = () => {
  useEffect(() => {
    adminPanelReducer.loadPosts();
    adminPanelReducer.loadUnvalidatedComments();
    adminPanelReducer.getUsers();
    adminPanelReducer.getLessons();
  }, []);

  return (
    <>
      <CreatePost />
      <ChangePost />
      <ValidationComments />
      <BanUsers />
      <ManageTimetable />
      <CreateSection />
      <ChangeSection />
    </>
  );
};

export default observer(AdminPanelContent);
