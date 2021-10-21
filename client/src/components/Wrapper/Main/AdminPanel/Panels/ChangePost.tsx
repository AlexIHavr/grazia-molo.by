import React from 'react';
import { observer } from 'mobx-react';
import preloaderReducer from '../../../Windows/Preloader/preloaderReducer';
import adminPanelReducer from '../adminPanelReducer';
import Select from '../../../../JSXElements/Select/Select';
import FileInputContainer from '../../../../JSXElements/FileInputContainer/FileInputContainer';
import forumReducer from '../../Forum/forumReducer';

const ChangePost: React.FC = () => {
  const state = adminPanelReducer.state;

  const adminPanel = state.panels.find((adminPanel) => adminPanel._id === 'ChangePost');
  const changedPost = state.changedPost;

  return (
    <div className={adminPanel._id + ' window'} data-selected={adminPanel._id}>
      <form
        onSubmit={(e) => {
          adminPanelReducer.changePost(e);
        }}
      >
        <h1>{adminPanel.section}</h1>
        <label htmlFor="ChoosePost">Изменяемый пост</label>
        <div className="InputContainer">
          <i className="fas fa-clipboard"></i>
          <Select
            inputName="postId"
            onSelect={adminPanelReducer.selectPost.bind(adminPanelReducer)}
            options={state.posts.map(({ _id, name }) => ({ _id, name }))}
            defaultTitle="Выберите пост"
          ></Select>
        </div>
        {changedPost ? (
          <>
            <label htmlFor="NewPostName">Имя поста</label>
            <div className="InputContainer">
              <i className="fas fa-pencil-alt"></i>
              <input
                id="NewPostName"
                name="name"
                type="text"
                defaultValue={changedPost.name}
                required
              />
            </div>
            {changedPost.photoName ? (
              <div className="PostPhoto">
                <img
                  src={forumReducer.state.postImgUrl + changedPost.photoName}
                  alt="Картинка не загрузилась"
                />
              </div>
            ) : (
              ''
            )}
            <label htmlFor="NewPostDescription">Описание поста</label>
            <textarea
              id="NewPostDescription"
              name="description"
              defaultValue={changedPost.description.join('\n')}
            />
            <FileInputContainer
              id="ChangePostPhoto"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                adminPanelReducer.uploadPhotos(e, 'ChangePost');
              }}
              onDelete={() => adminPanelReducer.deletePostPhoto()}
            ></FileInputContainer>
            <button
              className="DeletePost deleteButton"
              onClick={() => {
                adminPanelReducer.deletePost();
              }}
              disabled={preloaderReducer.state.activatePreloader}
            >
              <i className="fas fa-minus-circle"></i>Удалить пост
            </button>
            <div className="Errors">{adminPanel.errorMessage}</div>
            <div className="Successes">{adminPanel.successMessage}</div>
            <button
              type="submit"
              className="button"
              disabled={preloaderReducer.state.activatePreloader}
            >
              {adminPanel.section}
            </button>
          </>
        ) : (
          ''
        )}
      </form>
    </div>
  );
};

export default observer(ChangePost);
