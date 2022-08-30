import React from 'react';
import { observer } from 'mobx-react';
import preloaderReducer from '../../../Windows/Preloader/preloaderReducer';
import adminPanelReducer from '../adminPanelReducer';
import UserPhoto from '../../../../JSXElements/UserPhoto/UserPhoto';
import forumReducer from '../../Forum/forumReducer';

const BanUsers: React.FC = () => {
  const state = adminPanelReducer.state;

  const adminPanel = state.panels.find((adminPanel) => adminPanel._id === 'BanUsers');

  return (
    <div className={adminPanel._id + ' window'} data-selected={adminPanel._id}>
      <form
        onSubmit={(e) => {
          adminPanelReducer.changeIsBanUsers(e);
        }}
      >
        <h1>{adminPanel.section}</h1>
        <div className="PostComments">
          {state.users.map((user) => {
            return (
              <div key={user._id} className={!user.isBan ? 'ValitedComment' : ''}>
                <div className="PostInfoUser">
                  <div className="PostIconUser">
                    <UserPhoto photoName={user.photoName}>
                      <img
                        className={user.zoomInPhoto ? 'zoomInPhoto' : ''}
                        src={forumReducer.state.userImgUrl + user.photoName}
                        alt="Картинка не загрузилась"
                        onClick={() => (user.zoomInPhoto = !user.zoomInPhoto)}
                      />
                    </UserPhoto>
                  </div>
                  <div className="UserNameComment">{user.fullName}</div>
                  <div>{user.date}</div>
                  <div
                    className="IsValidatedComment"
                    onClick={() => adminPanelReducer.toggleIsBanUser(user)}
                  >
                    {user.isBan ? <i className="fas fa-ban"></i> : <i className="fas fa-user"></i>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="Errors">{adminPanel.errorMessage}</div>
        <div className="Successes">{adminPanel.successMessage}</div>
        {state.users.length ? (
          <>
            <button
              type="submit"
              className="button"
              disabled={preloaderReducer.state.activatePreloader}
            >
              Принять
            </button>
          </>
        ) : (
          <h3>Нет зарегистрированных пользователей</h3>
        )}
      </form>
    </div>
  );
};

export default observer(BanUsers);
