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

class PostService {
  async createPost({ name, description, photoName }: postRequestType, userId: string) {
    await postModel.create({ name, description, photoName, viewsUsers: [userId] });
  }

  async changePost({ postId, name, description, photoName }: changePostRequestType) {
    const post = await postModel.findById(postId);

    if (!post) {
      throw ApiError.BadRequest('Пост не найден');
    }

    //удаление существующей картинки
    if (photoName) {
      fileService.unlinkPhoto(post.photoName, 'Forum/Posts');
      post.photoName = photoName;
      await post.save();
    }

    await post.updateOne({
      name,
      description,
      dateCreation: new Date(),
      date: new Date().toLocaleString(),
    });
  }

  async deletePostPhoto({ postId }: deletePostRequestType) {
    const post = await postModel.findById(postId);

    if (!post) {
      throw ApiError.BadRequest('Пост не найден');
    }

    fileService.unlinkPhoto(post.photoName, 'Forum/Posts');

    await post.updateOne({
      photoName: '',
      dateCreation: new Date(),
      date: new Date().toLocaleString(),
    });
  }

  async deletePost({ postId }: deletePostRequestType) {
    const post = await postModel.findById(postId);

    if (!post) {
      throw ApiError.BadRequest('Пост не найден');
    }

    //удаление комментариев к этому посту
    const postComments = await commentModel.find({ post: post._id });
    await Promise.all(
      postComments.map(async (postComment) => {
        await postComment.deleteOne();
      })
    );

    fileService.unlinkPhoto(post.photoName, 'Forum/Posts');

    await post.deleteOne();
  }

  async createPostComment({ user, post, text }: postCommentRequestType) {
    await commentModel.create({ user, post, text });
  }

  async getPostComments(post: string) {
    const postComments = await commentModel
      .find({
        post,
        isValidated: true,
      })
      .sort({ dateCreation: -1 });

    if (!postComments) {
      return null;
    }

    return await new CommentsDto().createCommentsDto(postComments);
  }

  async getUnvalidatedComments() {
    const comments = await commentModel.find({ isValidated: false }).sort({ dateCreation: -1 });

    if (!comments) {
      return null;
    }

    return await new CommentsDto().createCommentsDto(comments);
  }

  changeIsValidatedComments({ comments }: isValidatedCommentsRequest) {
    comments.forEach(async ({ _id, isValidated }) => {
      const changedComment = await commentModel.findById(_id);

      if (!changedComment) {
        throw ApiError.BadRequest('Комментарий не найден');
      }

      //удаление невалидных комментариев
      if (!isValidated) {
        await changedComment.deleteOne();
      } else {
        await changedComment.updateOne({ isValidated });
      }
    });
  }

  async getPosts() {
    return await postModel.find().sort({ dateCreation: -1 });
  }

  async addPostViews({ _id }: postViewsRequest, userId: string) {
    const viewedPost = await postModel.findById(_id);

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
