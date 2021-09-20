import { NextFunction, Request, Response } from 'express';
import ApiError from '../errors/apiError';

const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err);

  //несуществующая почта
  if (err.responseCode === 550) {
    err = ApiError.UnrouteableAddress(req.body.email);
  }

  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message });
  }
  return res.status(500).json({ message: 'Серверная ошибка' });
};

export default errorMiddleware;
