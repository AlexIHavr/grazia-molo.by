import {
  changePostRequestType,
  deletePostRequestType,
  isValidatedCommentsRequest,
  postRequestType,
  postViewsRequest,
} from './../types/servicesTypes';
import commentModel from '../models/commentModel';
import postModel from '../models/postModel';
import CommentsDto from '../dtos/commentsDto';
import { postCommentRequestType } from '../types/servicesTypes';
import ApiError from '../errors/apiError';
import fileService from './fileService';
import textService from './textService';

class PostService {
  async createPost({ name, description, photoName }: postRequestType, userId: string) {
    await postModel.create({
      name,
      description: textService.getTextArr(description, '\n'),
      photoName,
      viewsUsers: [userId],
    });
  }

  async changePost({ postId, name, description, photoName }: changePostRequestType) {
    const post = await postModel.findByPk(postId);

    if (!post) {
      throw ApiError.BadRequest('Пост не найден');
    }

    //удаление существующей картинки
    if (photoName) {
      fileService.unlinkPhoto(post.photoName, 'Forum/Posts');
      post.photoName = photoName;
      await post.save();
    }

    await post.update({
      name,
      description: textService.getTextArr(description, '\n'),
      date: new Date().toLocaleString(),
    });
  }

  async deletePostPhoto({ postId }: deletePostRequestType) {
    const post = await postModel.findByPk(postId);

    if (!post) {
      throw ApiError.BadRequest('Пост не найден');
    }

    fileService.unlinkPhoto(post.photoName, 'Forum/Posts');

    await post.update({
      photoName: '',
      date: new Date().toLocaleString(),
    });
  }

  async deletePost({ postId }: deletePostRequestType) {
    const post = await postModel.findByPk(postId);

    if (!post) {
      throw ApiError.BadRequest('Пост не найден');
    }

    //удаление комментариев к этому посту
    const postComments = await commentModel.findAll({ where: { post: post._id } });
    await Promise.all(
      postComments.map(async (postComment) => {
        await postComment.destroy();
      }),
    );

    fileService.unlinkPhoto(post.photoName, 'Forum/Posts');

    await post.destroy();
  }

  async createPostComment({ user, post, text }: postCommentRequestType) {
    await commentModel.create({ user, post, text: textService.getTextArr(text, '\n') });
  }

  async getPostComments(post: string) {
    const postComments = await commentModel.findAll({
      where: {
        post,
        isValidated: true,
      },
      order: [['createdAt', 'DESC']],
    });

    if (!postComments) {
      return null;
    }

    return await new CommentsDto().createCommentsDto(postComments);
  }

  async getInvalidatedComments() {
    const comments = await commentModel.findAll({ where: { isValidated: false }, order: [['createdAt', 'DESC']] });

    if (!comments) {
      return null;
    }

    return await new CommentsDto().createCommentsDto(comments);
  }

  changeIsValidatedComments({ comments }: isValidatedCommentsRequest) {
    comments.forEach(async ({ _id, isValidated }) => {
      const changedComment = await commentModel.findByPk(_id);

      if (!changedComment) {
        throw ApiError.BadRequest('Комментарий не найден');
      }

      //удаление невалидных комментариев
      if (!isValidated) {
        await changedComment.destroy();
      } else {
        await changedComment.update({ isValidated });
      }
    });
  }

  async getPosts() {
    return await postModel.findAll({ order: [['createdAt', 'DESC']] });
  }

  async addPostViews({ _id }: postViewsRequest, userId: string) {
    const viewedPost = await postModel.findByPk(_id);

    if (!viewedPost) {
      throw ApiError.BadRequest('Пост не найден');
    }

    if (!viewedPost.viewsUsers.includes(userId)) {
      viewedPost.viewsUsers.push(userId);
      await viewedPost.save();
    }
  }
}

export default new PostService();
