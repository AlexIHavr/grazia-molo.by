import { Router } from 'express';
import navigationController from '../controllers/navigationController';
import mailController from '../controllers/mailController';
import timetableController from '../controllers/timetableController';
import userController from '../controllers/userController';
import validationMiddleware from '../middlewares/validationMiddleware';
import sliderController from '../controllers/sliderController';

const visitorRouter: Router = Router();

visitorRouter.post(
  '/sendOnlineMail',
  validationMiddleware(['name', 'phone', 'age']),
  mailController.sendOnlineMail
);
visitorRouter.post(
  '/registration',
  validationMiddleware(['fullName', 'email', 'password', 'age']),
  userController.registration
);
visitorRouter.post('/login', userController.login);
visitorRouter.post('/loginAfterActivate', userController.loginAfterActivate);
visitorRouter.post('/logout', userController.logout);

visitorRouter.get('/activate/:link', userController.activate);
visitorRouter.get('/refresh', userController.refresh);
visitorRouter.get('/getLessons', timetableController.getLessons);
visitorRouter.get('/getMainNavigations', navigationController.getMainNavigations);
visitorRouter.get('/getNavigations', navigationController.getNavigations);
visitorRouter.get('/getSliders', sliderController.getSliders);

export default visitorRouter;
