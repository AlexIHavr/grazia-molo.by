import { Request, Response, NextFunction } from 'express';
import ApiError from '../errors/apiError';
import mailService from '../services/mailService';
import { onlineMailRequestType } from '../types/servicesTypes';

class MailController {
  async sendOnlineMail(
    req: Request<{}, {}, onlineMailRequestType>,
    res: Response,
    next: NextFunction
  ) {
    try {
      ApiError.CheckValidationError(req);

      await mailService.sendOnlineMail(req.body);
      res.status(200).json({ status: 'OK' });
    } catch (e) {
      next(e);
    }
  }
}

export default new MailController();
