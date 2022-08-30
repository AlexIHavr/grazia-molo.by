import {
  changePostRequestType,
  deletePostRequestType,
  isValidatedCommentsRequest,
  postRequestType,
  postViewsRequest,
} from './../types/servicesTypes';
import { Request, Response, NextFunction } from 'express';
import ApiError from '../errors/apiError';
import postService from '../services/postService';
import { postCommentRequestType } from '../types/servicesTypes';
import fileService from '../services/fileService';

class PostController {
  async createPost(req: Request<{}, {}, postRequestType>, res: Response, next: NextFunction) {
    try {
      ApiError.CheckValidationError(req);
      req.body.photoName = fileService.getPhotoName(req);
      await postService.createPost(req.body, req.cookies.userId);
      res.status(200).json({ status: 'OK' });
    } catch (e) {
      next(e);
    }
  }

  async changePost(req: Request<{}, {}, changePostRequestType>, res: Response, next: NextFunction) {
    try {
      ApiError.CheckValidationError(req);

      req.body.photoName = fileService.getPhotoName(req);
      await postService.changePost(req.body);
      res.status(200).json({ status: 'OK' });
    } catch (e) {
      next(e);
    }
  }

  async deletePostPhoto(req: Request<{}, {}, deletePostRequestType>, res: Response, next: NextFunction) {
    try {
      await postService.deletePostPhoto(req.body);
      res.status(200).json({ status: 'OK' });
    } catch (e) {
      next(e);
    }
  }

  async deletePost(req: Request<{}, {}, deletePostRequestType>, res: Response, next: NextFunction) {
    try {
      await postService.deletePost(req.body);
      res.status(200).json({ status: 'OK' });
    } catch (e) {
      next(e);
    }
  }

  async createPostComment(req: Request<{}, {}, postCommentRequestType>, res: Response, next: NextFunction) {
    try {
      ApiError.CheckValidationError(req);
      await postService.createPostComment(req.body);
      res.status(200).json({ status: 'OK' });
    } catch (e) {
      next(e);
    }
  }

  async getPostComments(req: Request, res: Response, next: NextFunction) {
    try {
      const postComments = await postService.getPostComments(req.params.postId);
      res.json(postComments);
    } catch (e) {
      next(e);
    }
  }

  async getInvalidatedComments(req: Request, res: Response, next: NextFunction) {
    try {
      const comments = await postService.getInvalidatedComments();
      res.json(comments);
    } catch (e) {
      next(e);
    }
  }

  async changeIsValidateComments(req: Request<{}, {}, isValidatedCommentsRequest>, res: Response, next: NextFunction) {
    try {
      postService.changeIsValidatedComments(req.body);
      res.status(200).json({ status: 'OK' });
    } catch (e) {
      next(e);
    }
  }

  async getPosts(req: Request, res: Response, next: NextFunction) {
    try {
      const posts = await postService.getPosts();
      res.json(posts);
    } catch (e) {
      next(e);
    }
  }

  async addPostViews(req: Request<{}, {}, postViewsRequest>, res: Response, next: NextFunction) {
    try {
      await postService.addPostViews(req.body, req.cookies.userId);
      res.status(200).json({ status: 'OK' });
    } catch (e) {
      next(e);
    }
  }
}

export default new PostController();
