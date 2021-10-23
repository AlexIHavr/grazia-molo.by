import { Request, Response, NextFunction } from 'express';
import ApiError from '../errors/apiError';
import navigationtService from '../services/navigationService';
import fileService from '../services/fileService';
import {
  changeSectionRequestType,
  deleteSectionPhotoRequestType,
  deleteSectionRequestType,
  navigationRequestType,
} from '../types/servicesTypes';

class NavigationController {
  async createSection(
    req: Request<{}, {}, navigationRequestType>,
    res: Response,
    next: NextFunction
  ) {
    try {
      ApiError.CheckValidationError(req);

      req.body.photoNames = fileService.getPhotoNames(req);

      await navigationtService.createSection(req.body);
      res.status(200).json({ status: 'OK' });
    } catch (e) {
      next(e);
    }
  }

  async getNavigations(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await navigationtService.getNavigations();
      res.json(data);
    } catch (e) {
      next(e);
    }
  }

  async getMainNavigations(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await navigationtService.getMainNavigations();
      res.json(data);
    } catch (e) {
      next(e);
    }
  }

  async changeSection(
    req: Request<{}, {}, changeSectionRequestType>,
    res: Response,
    next: NextFunction
  ) {
    try {
      ApiError.CheckValidationError(req);

      req.body.photoNames = fileService.getPhotoNames(req);

      await navigationtService.changeSection(req.body);
      res.status(200).json({ status: 'OK' });
    } catch (e) {
      next(e);
    }
  }

  async deleteSectionPhoto(
    req: Request<{}, {}, deleteSectionPhotoRequestType>,
    res: Response,
    next: NextFunction
  ) {
    try {
      await navigationtService.deleteSectionPhoto(req.body);
      res.status(200).json({ status: 'OK' });
    } catch (e) {
      next(e);
    }
  }

  async deleteSection(
    req: Request<{}, {}, deleteSectionRequestType>,
    res: Response,
    next: NextFunction
  ) {
    try {
      await navigationtService.deleteSection(req.body);
      res.status(200).json({ status: 'OK' });
    } catch (e) {
      next(e);
    }
  }
}

export default new NavigationController();
