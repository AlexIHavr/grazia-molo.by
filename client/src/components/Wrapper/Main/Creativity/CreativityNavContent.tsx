import React from 'react';
import { observer } from 'mobx-react';
import { NavLink } from 'react-router-dom';

import creativityReducer from './creativityReducer';

const CreativityNavContent: React.FC = () => {
  const state = creativityReducer.state;

  const getNavCreativity = (): JSX.Element[] => {
    return state.creations.map((value) => {
      return (
        <NavLink key={value.creation} to={'/Creativity/' + value.creation}>
          {value.creationName}
        </NavLink>
      );
    });
  };

  return <>{getNavCreativity()}</>;
};

export default observer(CreativityNavContent);
