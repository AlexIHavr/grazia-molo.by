import { Router } from 'express';
import postController from '../controllers/postController';
import userController from '../controllers/userController';
import timetableController from '../controllers/timetableController';
import multerMiddleware from '../middlewares/multerMiddleware';
import validationMiddleware from '../middlewares/validationMiddleware';

const adminRouter: Router = Router();

adminRouter.get('/getUnvalidatedComments', postController.getUnvalidatedComments);
adminRouter.get('/getUsers', userController.getUsers);

adminRouter.post(
  '/createPost',
  multerMiddleware('Posts', 'photo'),
  validationMiddleware(['name']),
  postController.createPost
);

adminRouter.put(
  '/changePost',
  multerMiddleware('Posts', 'photo'),
  validationMiddleware(['name']),
  postController.changePost
);
adminRouter.put('/changeIsValidatedComments', postController.changeIsValidateComments);
adminRouter.put('/changeIsBanUsers', userController.changeIsBanUsers);
adminRouter.put('/changeTimetable', timetableController.changeTimetable);

adminRouter.delete('/deletePostPhoto', postController.deletePostPhoto);
adminRouter.delete('/deletePost', postController.deletePost);

export default adminRouter;
