import { Request, Response, NextFunction } from 'express';
import userService from '../services/userService';
import config from 'config';
import ApiError from '../errors/apiError';
import tokenService from '../services/tokenService';
import { isBanUsersRequest, loginRequestType, registrationRequestType, userSettingsRequestType } from '../types/servicesTypes';
import fileService from '../services/fileService';

class UserController {
  async registration(req: Request<{}, {}, registrationRequestType>, res: Response, next: NextFunction) {
    try {
      ApiError.CheckValidationError(req);

      await userService.registration(req.body);

      res.status(200).json({ status: 'OK' });
    } catch (e) {
      next(e);
    }
  }

  async login(req: Request<{}, {}, loginRequestType>, res: Response, next: NextFunction) {
    try {
      const userData = await userService.login(req.body);

      tokenService.setCookies(res, { refreshToken: userData.refreshToken, userId: userData._id });
      res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async loginAfterActivate(req: Request<{}, {}, { activationLink: string }>, res: Response, next: NextFunction) {
    try {
      const userData = await userService.loginAfterActivate(req.body.activationLink);

      tokenService.setCookies(res, { refreshToken: userData.refreshToken, userId: userData._id });
      res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      await userService.logout(refreshToken);
      res.clearCookie('refreshToken');
      res.clearCookie('userId');
      res.status(200).json({ status: 'OK' });
    } catch (e) {
      next(e);
    }
  }

  async activate(req: Request, res: Response, next: NextFunction) {
    try {
      await userService.activate(req.params.link);
      res.redirect(`${config.get('CLIENT_URL')}/ActivateEmail/${req.params.link}`);
    } catch (e) {
      next(e);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);

      tokenService.setCookies(res, { refreshToken: userData.refreshToken, userId: userData._id });
      res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async changeUserSettings(req: Request<{}, {}, userSettingsRequestType>, res: Response, next: NextFunction) {
    try {
      ApiError.CheckValidationError(req);

      req.body.photoName = fileService.getPhotoName(req);
      const userData = await userService.changeUserSettings(req.body, req.cookies.userId);
      res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async deleteUserPhoto(req: Request, res: Response, next: NextFunction) {
    try {
      userService.deleteUserPhoto(req.cookies.userId);
      res.status(200).json({ status: 'OK' });
    } catch (e) {
      next(e);
    }
  }

  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userService.getUsers();
      res.json(users);
    } catch (e) {
      next(e);
    }
  }

  async changeIsBanUsers(req: Request<{}, {}, isBanUsersRequest>, res: Response, next: NextFunction) {
    try {
      userService.changeIsBanUsers(req.body);
      res.status(200).json({ status: 'OK' });
    } catch (e) {
      next(e);
    }
  }
}

export default new UserController();
