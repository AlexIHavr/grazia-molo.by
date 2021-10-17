import React from 'react';
import FileInputContainer from '../../../JSXElements/FileInputContainer/FileInputContainer';
import './adminPanelStyle.scss';
import adminPanelReducer from './adminPanelReducer';
import preloaderReducer from '../../Windows/Preloader/preloaderReducer';
import { observer } from 'mobx-react';
import Select from '../../../JSXElements/Select/Select';
import { useEffect } from 'react';
import forumReducer from '../Forum/forumReducer';
import UserPhoto from '../../../JSXElements/UserPhoto/UserPhoto';
import timetableReducer from '../Timetable/timetableReducer';
import eventsReducer from '../Events/eventsReducer';

const AdminPanelContent: React.FC = () => {
  const state = adminPanelReducer.state;

  const createPost = () => {
    const adminPanel = state.panels.find((adminPanel) => adminPanel.panel === 'CreatePost');

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

  const changePost = () => {
    const adminPanel = state.panels.find((adminPanel) => adminPanel.panel === 'ChangePost');
    const changedPost = state.changedPost;

    return (
      <div className={adminPanel.panel + ' window'} data-selected={adminPanel.panel}>
        <form
          onSubmit={(e) => {
            adminPanelReducer.changePost(e);
          }}
        >
          <h1>{adminPanel.panelName}</h1>
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
                  adminPanelReducer.uploadPostPhoto(e, 'ChangePost');
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
                {adminPanel.panelName}
              </button>
            </>
          ) : (
            ''
          )}
        </form>
      </div>
    );
  };

  const validationComments = () => {
    const adminPanel = state.panels.find((adminPanel) => adminPanel.panel === 'ValidationComments');
    return (
      <div className={adminPanel.panel + ' window'} data-selected={adminPanel.panel}>
        <form
          onSubmit={(e) => {
            adminPanelReducer.changeIsValidatedComments(e);
          }}
        >
          <h1>{adminPanel.panelName}</h1>
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
                      onClick={() => adminPanelReducer.toogleIsValidatedComment(comment)}
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
              onClick={(e) => adminPanelReducer.toogleIsValidatedComments(e)}
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

  const banUsers = () => {
    const adminPanel = state.panels.find((adminPanel) => adminPanel.panel === 'BanUsers');
    return (
      <div className={adminPanel.panel + ' window'} data-selected={adminPanel.panel}>
        <form
          onSubmit={(e) => {
            adminPanelReducer.changeIsBanUsers(e);
          }}
        >
          <h1>{adminPanel.panelName}</h1>
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
                      onClick={() => adminPanelReducer.toogleIsBanUser(user)}
                    >
                      {user.isBan ? (
                        <i className="fas fa-ban"></i>
                      ) : (
                        <i className="fas fa-user"></i>
                      )}
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

  const manageTimetable = () => {
    const adminPanel = state.panels.find((adminPanel) => adminPanel.panel === 'ManageTimetable');

    const getLessons = (day: string) => {
      return state.lessons.map((lesson, i) => {
        if (lesson.day === day) {
          const id = lesson._id || Math.random().toString(16).slice(2) + '';
          return (
            <div key={id}>
              <label htmlFor={`time/${id}`}>Время</label>
              <input
                id={`time/${id}`}
                onBlur={(e) => adminPanelReducer.changeTimeLesson(e, lesson)}
                type="text"
                defaultValue={lesson.time}
                required
              />
              <label htmlFor={`group/${id}`}>Группа</label>
              <input
                id={`group/${id}`}
                onBlur={(e) => adminPanelReducer.changeGroupLesson(e, lesson)}
                type="text"
                defaultValue={lesson.group}
                required
              />
              <div
                className="DeleteLesson"
                onClick={() => adminPanelReducer.deleteLesson(lesson, i)}
              >
                <i className="fas fa-minus"></i>
              </div>
            </div>
          );
        }
        return false;
      });
    };

    return (
      <div className={adminPanel.panel + ' window'} data-selected={adminPanel.panel}>
        <form
          onSubmit={(e) => {
            adminPanelReducer.changeTimetable(e);
          }}
        >
          <h1>{adminPanel.panelName}</h1>
          <div className="Timetable">
            {timetableReducer.state.days.map((day) => {
              return (
                <div key={day}>
                  <h3>{day}</h3>
                  {getLessons(day)}
                  <div className="AddLesson" onClick={() => adminPanelReducer.addLesson(day)}>
                    <i className="fas fa-plus"></i>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="Errors">{adminPanel.errorMessage}</div>
          <div className="Successes">{adminPanel.successMessage}</div>
          <button
            type="submit"
            className="button"
            disabled={preloaderReducer.state.activatePreloader}
          >
            Сохранить
          </button>
        </form>
      </div>
    );
  };

  const createEvent = () => {
    const adminPanel = state.panels.find((adminPanel) => adminPanel.panel === 'CreateEvent');

    return (
      <div className={adminPanel.panel + ' window'} data-selected={adminPanel.panel}>
        <form
          onSubmit={(e) => {
            adminPanelReducer.createEvent(e);
          }}
        >
          <h1>{adminPanel.panelName}</h1>

          <label htmlFor="EventYear">Год события</label>
          <div className="InputContainer">
            <i className="far fa-calendar-alt"></i>
            <input
              id="EventYear"
              name="year"
              type="text"
              placeholder="Введите год события"
              required
            />
          </div>

          <label htmlFor="EventName">Имя события</label>
          <div className="InputContainer">
            <i className="fas fa-pencil-alt"></i>
            <input
              id="EventName"
              name="name"
              type="text"
              placeholder="Введите имя события"
              required
            />
          </div>

          <label htmlFor="EventDescription">Описание события</label>
          <textarea
            id="EventDescription"
            name="description"
            placeholder="Введите описание события"
          />

          <label htmlFor="VideosNames">Имена видео</label>
          <div className="InputContainer">
            <i className="fas fa-video"></i>
            <input
              id="VideosNames"
              name="videoNames"
              type="text"
              placeholder="Введите имена видео, разделенные знаком '/'"
            />
          </div>

          <label htmlFor="VideosLinks">Ссылки видео в ютубе</label>
          <div className="InputContainer">
            <i className="fab fa-youtube"></i>
            <input
              id="VideosLinks"
              name="videoLinks"
              type="text"
              placeholder="Введите ссылки на видео, разделенные знаком '/'"
            />
          </div>

          <FileInputContainer
            id="AddEventPhotos"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              adminPanelReducer.uploadPostPhoto(e, 'CreateEvent');
            }}
            multiple={true}
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

  const changeEvent = () => {
    const adminPanel = state.panels.find((adminPanel) => adminPanel.panel === 'ChangeEvent');
    const changedEvent = state.changedEvent;

    return (
      <div className={adminPanel.panel + ' window'} data-selected={adminPanel.panel}>
        <form
          onSubmit={(e) => {
            adminPanelReducer.changeEvent(e);
          }}
        >
          <h1>{adminPanel.panelName}</h1>

          <label htmlFor="ChooseEventYear">Год события</label>
          <div className="InputContainer">
            <i className="far fa-calendar-alt"></i>
            <Select
              inputName="changedYear"
              onSelect={adminPanelReducer.selectYearEvents.bind(adminPanelReducer)}
              options={eventsReducer.getUniqueYears().map((elem) => ({ _id: elem, name: elem }))}
              defaultTitle="Выберите год события"
            ></Select>
          </div>

          <label htmlFor="ChooseEvent">Изменяемое событие</label>
          <div className="InputContainer">
            <i className="fas fa-calendar-day"></i>
            <Select
              inputName="eventId"
              onSelect={adminPanelReducer.selectEvent.bind(adminPanelReducer)}
              options={state.yearEvents.map(({ _id, name }) => ({ _id, name }))}
              defaultTitle="Выберите событие"
            ></Select>
          </div>

          {changedEvent ? (
            <>
              <label htmlFor="NewEventYear">Год события</label>
              <div className="InputContainer">
                <i className="far fa-calendar-alt"></i>
                <input
                  id="NewEventYear"
                  name="year"
                  type="text"
                  placeholder="Введите год события"
                  defaultValue={changedEvent.year}
                  required
                />
              </div>

              <label htmlFor="NewEventName">Имя события</label>
              <div className="InputContainer">
                <i className="fas fa-pencil-alt"></i>
                <input
                  id="NewEventName"
                  name="name"
                  type="text"
                  placeholder="Введите имя события"
                  defaultValue={changedEvent.name}
                  required
                />
              </div>

              <label htmlFor="NewEventDescription">Описание события</label>
              <textarea
                id="NewEventDescription"
                name="description"
                placeholder="Введите описание события"
                defaultValue={changedEvent.description}
              />

              <label htmlFor="NewVideosNames">Имена видео</label>
              <div className="InputContainer">
                <i className="fas fa-video"></i>
                <input
                  id="NewVideosNames"
                  name="videoNames"
                  type="text"
                  placeholder="Введите имена видео, разделенные знаком '/'"
                  defaultValue={changedEvent.videoNames.join('/')}
                />
              </div>

              <label htmlFor="NewVideosLinks">Ссылки видео в ютубе</label>
              <div className="InputContainer">
                <i className="fab fa-youtube"></i>
                <input
                  id="NewVideosLinks"
                  name="videoLinks"
                  type="text"
                  placeholder="Введите ссылки на видео, разделенные знаком '/'"
                  defaultValue={changedEvent.videoLinks.join('/')}
                />
              </div>

              {changedEvent.photoNames.length ? (
                <>
                  <label htmlFor="NewEventPhotos">Фото события</label>
                  <div className="SelectedEventPhotos">
                    {changedEvent.photoNames.map((photoName) => {
                      return (
                        <div key={photoName}>
                          <img
                            src={
                              eventsReducer.state.imagesUrl + changedEvent.year + '/' + photoName
                            }
                            alt="Картинка не загрузилась"
                          />
                          <button
                            className="DeleteEventPhoto deleteButton"
                            onClick={() => {
                              adminPanelReducer.deleteEventPhoto(photoName);
                            }}
                            disabled={preloaderReducer.state.activatePreloader}
                          >
                            Удалить фото
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                ''
              )}

              <FileInputContainer
                id="AddNewEventPhotos"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  adminPanelReducer.uploadPostPhoto(e, 'ChangeEvent');
                }}
                multiple={true}
              ></FileInputContainer>

              <button
                className="DeleteEvent deleteButton"
                onClick={() => {
                  adminPanelReducer.deleteEvent();
                }}
                disabled={preloaderReducer.state.activatePreloader}
              >
                <i className="fas fa-minus-circle"></i>Удалить событие
              </button>
            </>
          ) : (
            ''
          )}

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

  useEffect(() => {
    adminPanelReducer.loadPosts();
    adminPanelReducer.loadUnvalidatedComments();
    adminPanelReducer.getUsers();
    adminPanelReducer.getLessons();
    adminPanelReducer.getEvents();
  }, []);

  return (
    <>
      {createPost()}
      {changePost()}
      {validationComments()}
      {banUsers()}
      {manageTimetable()}
      {createEvent()}
      {changeEvent()}
    </>
  );
};

export default observer(AdminPanelContent);
