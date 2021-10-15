import { Request, Response, NextFunction } from 'express';
import ApiError from '../errors/apiError';
import eventService from '../services/eventService';
import fileService from '../services/fileService';
import { eventRequestType } from '../types/servicesTypes';

class EventController {
  async createEvent(req: Request<{}, {}, eventRequestType>, res: Response, next: NextFunction) {
    try {
      ApiError.CheckValidationError(req);

      req.body.photoNames = fileService.getPhotoNames(req);

      await eventService.createEvent(req.body);
      res.status(200).json({ status: 'OK' });
    } catch (e) {
      next(e);
    }
  }

  async getEvents(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await eventService.getEvents();
      res.json(data);
    } catch (e) {
      next(e);
    }
  }
}

export default new EventController();
