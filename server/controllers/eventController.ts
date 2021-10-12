import { Request, Response, NextFunction } from 'express';
import ApiError from '../errors/apiError';
import eventService from '../services/eventService';
import { eventRequestType } from '../types/servicesTypes';

class EventController {
  async createEvent(req: Request<{}, {}, eventRequestType>, res: Response, next: NextFunction) {
    try {
      ApiError.CheckValidationError(req);

      req.body.photoNames = Array.isArray(req.files) ? req.files.map((file) => file.filename) : [];

      await eventService.createEvent(req.body);
      res.status(200).json({ status: 'OK' });
    } catch (e) {
      next(e);
    }
  }
}

export default new EventController();
