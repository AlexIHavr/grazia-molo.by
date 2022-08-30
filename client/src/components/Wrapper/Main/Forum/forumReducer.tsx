import React from 'react';
import { makeAutoObservable } from 'mobx';
import { userApi } from '../../../../api/api';
import {
  forumType,
  postCommentRequestType,
  postCommentsResponseType,
  postResponseType,
  postType,
  postViewsRequest,
} from './forumType';
import mainReducer from '../mainReducer';
import loginReducer from '../../Windows/Login/loginReducer';

class ForumReducer {
  constructor() {
    makeAutoObservable(this);
  }

  state: forumType = {
    posts: [],
    postImgUrl: process.env.PUBLIC_URL + '/Images/Wrapper/Main/Forum/Posts/',
    userImgUrl: process.env.PUBLIC_URL + '/Images/Wrapper/Main/Forum/Users/',
    viewedPosts: [],
  };

  //загрузить все посты
  async loadPosts() {
    try {
      const posts = await userApi.get<postResponseType[]>('/getPosts');

      this.state.posts = posts.data.map((post) => {
        return Object.assign(post, {
          section: post.name,
          showComments: false,
          showCreateComment: false,
          showThanksComment: false,
          textNewComment: '',
          errorMessage: '',
          isLoadedComments: false,
          comments: [],
        });
      });

      this.plusActivePostCountViews();
    } catch (e: any) {
      console.log(e.response?.data || e);
    }
  }

  //поменять показ комментариев поста
  async toggleComments(post: postType) {
    post.showComments = !post.showComments;

    if (!post.isLoadedComments) {
      this.loadPostComments(post);
      post.isLoadedComments = true;
    }

    //скрытие всех увеличивающих фото
    if (post.comments.length) {
      post.comments = post.comments.map((comment) => ({ ...comment, zoomInPhoto: false }));
    }
  }

  //поменять показ добавление комментария
  toggleCreateComment(post: postType) {
    post.showCreateComment = !post.showCreateComment;
  }

  //загрузить комментарии поста
  async loadPostComments(post: postType) {
    try {
      const postComments = await userApi.get<postCommentsResponseType>(
        `/getPostComments/${post._id}`
      );
      post.comments = postComments.data;

      //добавление флага на увеличение фото
      post.comments = post.comments.map((comment) => ({ ...comment, zoomInPhoto: false }));
    } catch (e: any) {
      console.log(e.response?.data || e);
    }
  }

  //установка значения texarea в пост
  setPostTextareaValue(post: postType, value: string) {
    post.textNewComment = value;
  }

  //создание комментария поста и добавление в БД
  async createPostComment(e: React.FormEvent<HTMLFormElement>, post: postType) {
    e.preventDefault();

    try {
      const postCommentRequest: postCommentRequestType = {
        user: loginReducer.state.userData._id,
        post: post._id,
        text: post.textNewComment,
      };

      await userApi.post(`/createPostComment`, postCommentRequest);
      post.showThanksComment = true;
      post.textNewComment = '';
      post.errorMessage = '';
    } catch (e: any) {
      post.errorMessage = e.response?.data?.message || e.message;
    }
  }

  //закрыть окно спасибо за комментарий при клике на ОК
  closeThanksComment(post: postType) {
    post.showThanksComment = false;
  }

  //увеличить количество просмотров активному посту
  async plusActivePostCountViews(idPost?: string) {
    const arrChildren = Array.from(
      mainReducer.state.refNavContent.current.children
    ) as HTMLElement[];
    const idSelectedPost =
      idPost ?? arrChildren.find((child) => child.classList.contains('active'))?.dataset.selected;

    if (idSelectedPost && !this.state.viewedPosts.includes(idSelectedPost)) {
      try {
        const postViewsRequest: postViewsRequest = {
          _id: idSelectedPost,
        };

        await userApi.put('/addPostViews', postViewsRequest);
        this.state.viewedPosts.push(idSelectedPost);

        //повторение для последнего активного элемента при активации предпоследнего
        if (arrChildren.length - mainReducer.state.iSelectedItem === 1) {
          this.plusActivePostCountViews(this.state.posts[this.state.posts.length - 1]._id);
        }
      } catch (e: any) {
        console.log(e.response?.data || e);
      }
    }
  }
}

export default new ForumReducer();
