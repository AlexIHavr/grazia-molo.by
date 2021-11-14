import React from 'react';
import { observer } from 'mobx-react';
import preloaderReducer from '../../../Windows/Preloader/preloaderReducer';
import adminPanelReducer from '../adminPanelReducer';
import UserPhoto from '../../../../JSXElements/UserPhoto/UserPhoto';
import forumReducer from '../../Forum/forumReducer';

const ValidationComments: React.FC = () => {
  const state = adminPanelReducer.state;

  const adminPanel = state.panels.find((adminPanel) => adminPanel._id === 'ValidationComments');
  return (
    <div className={adminPanel._id + ' window'} data-selected={adminPanel._id}>
      <form
        onSubmit={(e) => {
          adminPanelReducer.changeIsValidatedComments(e);
        }}
      >
        <h1>{adminPanel.section}</h1>
        <div className="PostComments">
          {state.comments.map((comment) => {
            return (
              <div key={comment._id} className={comment.isValidated ? 'ValitedComment' : ''}>
                <div className="PostInfoUser">
                  <div className="PostIconUser">
                    <UserPhoto photoName={comment.photoName}>
                      <img
                        className={comment.zoomInPhoto ? 'zoomInPhoto' : ''}
                        src={forumReducer.state.userImgUrl + comment.photoName}
                        alt="Картинка не загрузилась"
                        onClick={() => (comment.zoomInPhoto = !comment.zoomInPhoto)}
                      />
                    </UserPhoto>
                  </div>
                  <div className="UserNameComment">{comment.fullName}</div>
                  <div>{comment.date}</div>
                  <div
                    className="IsValidatedComment"
                    onClick={() => adminPanelReducer.toggleIsValidatedComment(comment)}
                  >
                    {comment.isValidated ? (
                      <i className="fas fa-check"></i>
                    ) : (
                      <i className="fas fa-times"></i>
                    )}
                  </div>
                </div>
                <div className="UserComment">
                  {comment.text.map((text, i) => {
                    return <div key={i}>{text}</div>;
                  })}
                </div>
              </div>
            );
          })}
        </div>
        {state.comments.length ? (
          <button
            className="IsValidatedAllComment button"
            onClick={(e) => adminPanelReducer.toggleIsValidatedComments(e)}
          >
            {state.isValidatedAll ? (
              <>
                <i className="fas fa-times"></i>
                <span>Снять все</span>
              </>
            ) : (
              <>
                <i className="fas fa-check"></i>
                <span>Отметить все</span>
              </>
            )}
          </button>
        ) : (
          ''
        )}
        <div className="Errors">{adminPanel.errorMessage}</div>
        <div className="Successes">{adminPanel.successMessage}</div>

        {state.comments.length ? (
          <button
            type="submit"
            className="button"
            disabled={preloaderReducer.state.activatePreloader}
          >
            Принять
          </button>
        ) : (
          <h3>Нет невалидных комментариев</h3>
        )}
      </form>
    </div>
  );
};

export default observer(ValidationComments);
