import React from 'react';
import { observer } from 'mobx-react';

import historyReducer from './historyReducer';
import mainReducer from '../mainReducer';

const HistoryContent: React.FC = () => {
  const state = historyReducer.state;

  return <>{mainReducer.getSimpleContent(state.historyYears, 'year')}</>;
};

export default observer(HistoryContent);
