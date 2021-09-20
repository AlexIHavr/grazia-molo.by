import React from 'react';
import { observer } from 'mobx-react';
import adminPanelReducer from './adminPanelReducer';
import mainReducer from '../mainReducer';

const AdminPanelNavContent: React.FC = () => {
  const state = adminPanelReducer.state;

  return <>{mainReducer.getSimpleNavContent(state.panels, 'panel')}</>;
};

export default observer(AdminPanelNavContent);
