import { Router } from 'express';
import postController from '../controllers/postController';
import userController from '../controllers/userController';
import multerMiddleware from '../middlewares/multerMiddleware';
import validationMiddleware from '../middlewares/validationMiddleware';

const userRouter: Router = Router();

userRouter.post(
  '/createPostComment',
  validationMiddleware(['text']),
  postController.createPostComment
);

userRouter.get('/getPostComments/:postId', postController.getPostComments);
userRouter.get('/getPosts', postController.getPosts);

userRouter.put('/addPostViews', postController.addPostViews);
userRouter.put(
  '/changeUserSettings',
  multerMiddleware('Forum/Users'),
  validationMiddleware(['fullName']),
  userController.changeUserSettings
);

userRouter.delete('/deleteUserPhoto', userController.deleteUserPhoto);

export default userRouter;
