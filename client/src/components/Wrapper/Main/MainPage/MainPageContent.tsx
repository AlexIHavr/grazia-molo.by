import React from 'react';
import { observer } from 'mobx-react';

import mainPageReducer from './mainPageReducer';

const MainPageContent: React.FC = () => {
  const state = mainPageReducer.state;

  const getList = (list: string[]) => {
    return list.map((item) => {
      return <li key={item}>{item}</li>;
    });
  };

  const getContent = () => {
    return state.aboutParts.map((value) => {
      return (
        <div key={value.part} data-selected={value.part}>
          <h3>{value.part}</h3>
          {value.title !== undefined ? (
            <div>
              <div className="Title">{value.title}</div>
              {value.ol !== undefined ? (
                <ol>{getList(value.ol)}</ol>
              ) : value.ul !== undefined ? (
                <ul>{getList(value.ul)}</ul>
              ) : (
                ''
              )}
            </div>
          ) : (
            <div className="Description">{value.description}</div>
          )}
        </div>
      );
    });
  };

  return <>{getContent()}</>;
};

export default observer(MainPageContent);
