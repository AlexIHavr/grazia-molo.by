import React from 'react';
import { observer } from 'mobx-react';
import mainReducer from '../mainReducer';
import forumReducer from './forumReducer';
import loginReducer from '../../Windows/Login/loginReducer';

const ForumNavContent: React.FC = () => {
  const state = forumReducer.state;

  return (
    <>
      {!state.posts.length || !loginReducer.state.isAuth ? (
        <div className="active">Форум</div>
      ) : (
        mainReducer.getSectionNavContentWithoutSubCategories(state.posts)
      )}
    </>
  );
};

export default observer(ForumNavContent);
