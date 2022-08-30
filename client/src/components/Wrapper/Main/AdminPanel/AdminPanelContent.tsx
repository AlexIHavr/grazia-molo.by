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
import ChangeSlider from './Panels/ChangeSlider';

const AdminPanelContent: React.FC = () => {
  useEffect(() => {
    adminPanelReducer.loadPosts();
    adminPanelReducer.loadUnvalidatedComments();
    adminPanelReducer.getUsers();
    adminPanelReducer.getLessons();
    adminPanelReducer.getSliders();
  }, []);

  return (
    <>
      <CreateSection />
      <ChangeSection />
      <ChangeSlider />
      <ManageTimetable />
      <CreatePost />
      <ChangePost />
      <ValidationComments />
      <BanUsers />
    </>
  );
};

export default observer(AdminPanelContent);
