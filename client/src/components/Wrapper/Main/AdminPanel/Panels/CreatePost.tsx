import React from 'react';
import { observer } from 'mobx-react';
import preloaderReducer from '../../../Windows/Preloader/preloaderReducer';
import adminPanelReducer from '../adminPanelReducer';
import FileInputContainer from '../../../../JSXElements/FileInputContainer/FileInputContainer';

const CreatePost: React.FC = () => {
  const adminPanel = adminPanelReducer.state.panels.find(
    (adminPanel) => adminPanel.panel === 'CreatePost'
  );

  return (
    <div className={adminPanel.panel + ' window'} data-selected={adminPanel.panel}>
      <form
        onSubmit={(e) => {
          adminPanelReducer.createPost(e);
        }}
      >
        <h1>{adminPanel.panelName}</h1>
        <label htmlFor="PostName">Имя поста</label>
        <div className="InputContainer">
          <i className="fas fa-pencil-alt"></i>
          <input id="PostName" name="name" type="text" placeholder="Введите имя поста" required />
        </div>
        <label htmlFor="PostDescription">Описание поста</label>
        <textarea id="PostDescription" name="description" placeholder="Введите описание поста" />
        <FileInputContainer
          id="AddPostPhoto"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            adminPanelReducer.uploadPostPhoto(e, 'CreatePost');
          }}
        ></FileInputContainer>
        <div className="Errors">{adminPanel.errorMessage}</div>
        <div className="Successes">{adminPanel.successMessage}</div>
        <button
          type="submit"
          className="button"
          disabled={preloaderReducer.state.activatePreloader}
        >
          {adminPanel.panelName}
        </button>
      </form>
    </div>
  );
};

export default observer(CreatePost);
