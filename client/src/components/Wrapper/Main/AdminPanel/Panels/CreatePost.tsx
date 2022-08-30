import React from 'react';
import { observer } from 'mobx-react';
import preloaderReducer from '../../../Windows/Preloader/preloaderReducer';
import adminPanelReducer from '../adminPanelReducer';
import FileInputContainer from '../../../../JSXElements/FileInputContainer/FileInputContainer';

const CreatePost: React.FC = () => {
  const adminPanel = adminPanelReducer.state.panels.find(
    (adminPanel) => adminPanel._id === 'CreatePost'
  );

  return (
    <div className={adminPanel._id + ' window'} data-selected={adminPanel._id}>
      <form
        onSubmit={(e) => {
          adminPanelReducer.createPost(e);
        }}
      >
        <h1>{adminPanel.section}</h1>
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
            adminPanelReducer.uploadPhotos(e, 'CreatePost');
          }}
        ></FileInputContainer>
        <div className="Errors">{adminPanel.errorMessage}</div>
        <div className="Successes">{adminPanel.successMessage}</div>
        <button
          type="submit"
          className="button"
          disabled={preloaderReducer.state.activatePreloader}
        >
          {adminPanel.section}
        </button>
      </form>
    </div>
  );
};

export default observer(CreatePost);
