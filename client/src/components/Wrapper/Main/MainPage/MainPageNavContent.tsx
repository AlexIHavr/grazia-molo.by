import React, { useEffect } from 'react';
import { observer } from 'mobx-react';

import mainPageReducer from './mainPageReducer';
import mainReducer from '../mainReducer';

const MainPageNavContent: React.FC = () => {
  const state = mainPageReducer.state;

  useEffect(() => {
    const scrollFunc: EventListener = () => {
      mainReducer.fixedNavMainPageOnScroll();
    };

    window.addEventListener('scroll', scrollFunc);

    return () => {
      window.removeEventListener('scroll', scrollFunc);
    };
  }, []);

  return <>{mainReducer.getSimpleNavContent(state.aboutParts, 'part')}</>;
};

export default observer(MainPageNavContent);
