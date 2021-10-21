import { Router } from 'express';
import postController from '../controllers/postController';
import userController from '../controllers/userController';
import timetableController from '../controllers/timetableController';
import multerMiddleware from '../middlewares/multerMiddleware';
import validationMiddleware from '../middlewares/validationMiddleware';
import navigationController from '../controllers/navigationController';

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
  '/createSection',
  multerMiddleware('category', 'subCategory'),
  validationMiddleware(['section', 'subCategory']),
  navigationController.createSection
);

adminRouter.put(
  '/changePost',
  multerMiddleware('Forum/Posts'),
  validationMiddleware(['name']),
  postController.changePost
);
adminRouter.put(
  '/changeSection',
  multerMiddleware('category', 'oldSubCategory', 'subCategory'),
  validationMiddleware(['section', 'subCategory']),
  navigationController.changeSection
);
adminRouter.put('/changeIsValidatedComments', postController.changeIsValidateComments);
adminRouter.put('/changeIsBanUsers', userController.changeIsBanUsers);
adminRouter.put('/changeTimetable', timetableController.changeTimetable);

adminRouter.delete('/deletePostPhoto', postController.deletePostPhoto);
adminRouter.delete('/deleteSectionPhoto', navigationController.deleteSectionPhoto);
adminRouter.delete('/deletePost', postController.deletePost);
adminRouter.delete('/deleteSection', navigationController.deleteSection);

export default adminRouter;
