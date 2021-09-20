import React from 'react';
import { observer } from 'mobx-react';

import historyReducer from './historyReducer';

import mainReducer from '../mainReducer';

const HistoryNavContent: React.FC = () => {
  const state = historyReducer.state;

  return <>{mainReducer.getSimpleNavContent(state.historyYears, 'year')}</>;
};

export default observer(HistoryNavContent);
