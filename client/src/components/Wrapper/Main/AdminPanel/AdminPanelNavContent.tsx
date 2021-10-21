import React from 'react';
import { observer } from 'mobx-react';
import adminPanelReducer from './adminPanelReducer';
import mainReducer from '../mainReducer';

const AdminPanelNavContent: React.FC = () => {
  return (
    <>{mainReducer.getSectionNavContentWithoutSubCategories(adminPanelReducer.state.panels)}</>
  );
};

export default observer(AdminPanelNavContent);
