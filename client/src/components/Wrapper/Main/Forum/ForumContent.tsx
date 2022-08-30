import React from 'react';
import { observer } from 'mobx-react';
import loginReducer from '../../Windows/Login/loginReducer';
import forumReducer from './forumReducer';
import './forumStyles.scss';
import { useEffect } from 'react';
import { postType } from './forumType';
import mainReducer from '../mainReducer';
import UserPhoto from '../../../JSXElements/UserPhoto/UserPhoto';
import preloaderReducer from '../../Windows/Preloader/preloaderReducer';

const ForumContent: React.FC = () => {
  const state = forumReducer.state;

  const getPosts = () => {
    return state.posts.map((post) => {
      return (
        <div key={post._id} className="Post" data-selected={post._id}>
          <div className="PostContent">
            <h3 className="PostName">{post.name}</h3>
            <span className="PostDate">{post.date}</span>
            {post.photoName ? (
              <div className="PostImg">
                <img src={state.postImgUrl + post.photoName} alt="Картинка не найдена" />
              </div>
            ) : (
              ''
            )}
            <div className="PostDescription Description">
              {post.description.map((text, i) => {
                return <div key={i}>{text}</div>;
              })}
            </div>
            <div className="PostViews">
              <i className="far fa-eye"></i>
              <span className="PostCountViews">{post.viewsUsers.length}</span>
            </div>
            <div className="PostButtons">
              <button
                className="ShowComments button"
                onClick={() => forumReducer.toggleComments(post)}
                disabled={preloaderReducer.state.activatePreloader}
              >
                {post.showComments ? 'Скрыть комментарии' : 'Показать комментарии'}
              </button>
              <button
                className="AddComment button"
                onClick={() => forumReducer.toggleCreateComment(post)}
              >
                {post.showCreateComment ? 'Отменить комментарий' : 'Добавить комментарий'}
              </button>
            </div>
          </div>
          {getPostComments(post)}
          {getCreateComment(post)}
        </div>
      );
    });
  };

  const getCreateComment = (post: postType) => {
    return (
      <div className={'CreateComment ' + (post.showCreateComment ? 'OpenCreateComment' : '')}>
        <form
          className={post.showThanksComment ? 'closeElement' : ''}
          onSubmit={(e) => forumReducer.createPostComment(e, post)}
        >
          <textarea
            onChange={(e) => {
              forumReducer.setPostTextareaValue(post, e.target.value);
            }}
            placeholder="Оставить комментарий..."
            value={post.textNewComment}
            required
          ></textarea>
          <div className="Errors">{post.errorMessage}</div>
          <button className="button" disabled={preloaderReducer.state.activatePreloader}>
            Отправить комментарий
          </button>
        </form>
        <div className={'ThanksComment ' + (post.showThanksComment ? 'openElement' : '')}>
          <h3>
            Комментарий отправлен. <br /> Ваш комментарий будет рассмотрен администратором, после
            чего будет добавлен на сайт.
          </h3>
          <button onClick={() => forumReducer.closeThanksComment(post)} className="button">
            ОК
          </button>
        </div>
      </div>
    );
  };

  const getPostComments = (post: postType) => {
    return (
      <div className={'PostComments ' + (post.showComments ? 'OpenComments ' : '')}>
        {!post.comments.length ? (
          <h3>Комментарии отсутствуют.</h3>
        ) : (
          post.comments.map((comment) => {
            return (
              <div key={comment._id}>
                <div className="PostInfoUser">
                  <div className="PostIconUser">
                    <UserPhoto photoName={comment.photoName}>
                      <img
                        className={comment.zoomInPhoto ? 'zoomInPhoto zoomInPostPhoto' : ''}
                        src={forumReducer.state.userImgUrl + comment.photoName}
                        alt="Картинка не загрузилась"
                        onClick={() => (comment.zoomInPhoto = !comment.zoomInPhoto)}
                      />
                    </UserPhoto>
                  </div>
                  <div className="UserNameComment">{comment.fullName}</div>
                  <div>{comment.date}</div>
                </div>
                <div className="UserComment Description">
                  {comment.text.map((text, i) => {
                    return <div key={i}>{text}</div>;
                  })}
                </div>
              </div>
            );
          })
        )}
      </div>
    );
  };

  useEffect(() => {
    //загрузить посты
    if (!state.posts.length) {
      forumReducer.loadPosts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //увеличение просмотров постов
  useEffect(() => {
    if (loginReducer.state.isAuth) {
      forumReducer.plusActivePostCountViews();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainReducer.state.iSelectedItem]);

  return (
    <>
      {!loginReducer.state.isAuth ? (
        <h3>
          Форум доступен только зарегистрированным пользователям.
          <br /> Для просмотра форума авторизуйтесь.
        </h3>
      ) : state.posts.length ? (
        getPosts()
      ) : (
        <h3>
          Посты отсутствуют. <br /> Они появятся в ближайшее время.
        </h3>
      )}
    </>
  );
};

export default observer(ForumContent);
