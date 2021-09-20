import React from 'react';
import { observer } from 'mobx-react';

import dancesReducer from './dancesReducer';
import mainReducer from '../mainReducer';

const DancesNavContent: React.FC = () => {
  const state = dancesReducer.state;

  return <>{mainReducer.getSimpleNavContent(state.dances, 'dance')}</>;
};

export default observer(DancesNavContent);
