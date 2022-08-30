import { cookiesType } from './../types/servicesTypes';
import { NextFunction, Request, Response } from 'express';
import ApiError from '../errors/apiError';
import userModel from '../models/userModel';
import { userModelType } from '../types/modelsTypes';

const roleMiddleware = (roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (req.method === 'OPTIONS') {
      next();
    }

    try {
      const user: userModelType | null = await userModel.findByPk(req.cookies.userId);

      if (!user) {
        return next(ApiError.BadRequest('Пользователь не найден'));
      }

      const userRoles: string[] = user.roles;
      let hasRole: boolean = false;

      userRoles.forEach((role) => {
        if (roles.includes(role)) {
          hasRole = true;
        }
      });

      if (!hasRole) {
        return next(ApiError.Forbidden());
      }

      next();
    } catch (e) {
      return next(ApiError.UnauthorizedError());
    }
  };
};

export default roleMiddleware;
