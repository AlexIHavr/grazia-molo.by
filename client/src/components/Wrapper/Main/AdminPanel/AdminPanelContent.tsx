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
import CreateEvent from './Panels/CreateEvent';
import ChangeEvent from './Panels/ChangeEvent';

const AdminPanelContent: React.FC = () => {
  useEffect(() => {
    adminPanelReducer.loadPosts();
    adminPanelReducer.loadUnvalidatedComments();
    adminPanelReducer.getUsers();
    adminPanelReducer.getLessons();
    adminPanelReducer.getEvents();
  }, []);

  return (
    <>
      <CreatePost />
      <ChangePost />
      <ValidationComments />
      <BanUsers />
      <ManageTimetable />
      <CreateEvent />
      <ChangeEvent />
    </>
  );
};

export default observer(AdminPanelContent);
