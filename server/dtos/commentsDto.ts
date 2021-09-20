import ApiError from '../errors/apiError';
import userModel from '../models/userModel';
import { commentModelType } from '../types/modelsTypes';

class CommentsDto {
  #comments: {
    _id: string;
    date: string;
    text: string;
    fullName: string;
    photoName: string;
  }[] = [];

  async createCommentsDto(comments: commentModelType[]) {
    this.#comments = await Promise.all(
      comments.map(async (comment) => {
        const userComment = await userModel.findById(comment.user);

        if (!userComment) {
          throw ApiError.BadRequest('Пользователь не найден');
        }

        return {
          _id: comment._id,
          date: comment.date,
          text: comment.text,
          fullName: userComment.fullName,
          photoName: userComment.photoName,
        };
      })
    );

    return this.#comments;
  }
}

export default CommentsDto;
