import { Request, Response, NextFunction } from 'express';
import timetableService from '../services/timetableService';
import { lessonsRequestType } from '../types/servicesTypes';

class TimetableController {
  async getLessons(req: Request, res: Response, next: NextFunction) {
    try {
      const lessons = await timetableService.getLessons();
      res.json(lessons);
    } catch (e) {
      next(e);
    }
  }

  async changeTimetable(
    req: Request<{}, {}, lessonsRequestType>,
    res: Response,
    next: NextFunction
  ) {
    try {
      await timetableService.changeTimetable(req.body);
      res.status(200).json({ status: 'OK' });
    } catch (e) {
      next(e);
    }
  }
}

export default new TimetableController();
