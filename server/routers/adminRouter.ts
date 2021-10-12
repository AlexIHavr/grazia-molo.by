import { Router } from 'express';
import postController from '../controllers/postController';
import userController from '../controllers/userController';
import timetableController from '../controllers/timetableController';
import multerMiddleware from '../middlewares/multerMiddleware';
import validationMiddleware from '../middlewares/validationMiddleware';
import eventController from '../controllers/eventController';

const adminRouter: Router = Router();

adminRouter.get('/getUnvalidatedComments', postController.getUnvalidatedComments);
adminRouter.get('/getUsers', userController.getUsers);

adminRouter.post(
  '/createPost',
  multerMiddleware('Forum/Posts'),
  validationMiddleware(['name']),
  postController.createPost
);
adminRouter.post(
  '/createEvent',
  multerMiddleware('Events', 'year'),
  validationMiddleware(['year', 'name']),
  eventController.createEvent
);

adminRouter.put(
  '/changePost',
  multerMiddleware('Forum/Posts'),
  validationMiddleware(['name']),
  postController.changePost
);
adminRouter.put('/changeIsValidatedComments', postController.changeIsValidateComments);
adminRouter.put('/changeIsBanUsers', userController.changeIsBanUsers);
adminRouter.put('/changeTimetable', timetableController.changeTimetable);

adminRouter.delete('/deletePostPhoto', postController.deletePostPhoto);
adminRouter.delete('/deletePost', postController.deletePost);

export default adminRouter;
