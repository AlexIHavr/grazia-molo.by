import React from 'react';
import { observer } from 'mobx-react';

import dancesReducer from './dancesReducer';
import mainReducer from '../mainReducer';

const DancesContent: React.FC = () => {
  const state = dancesReducer.state;
  return <>{mainReducer.getSimpleContent(state.dances, 'dance', state.imagesUrl)}</>;
};

export default observer(DancesContent);
