import config from 'config';
import { NextFunction, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import ApiError from '../errors/apiError';

const multerMiddleware = (baseDir: string, fileName: string) => {
  const multerSettings = multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, `${config.get('IMAGES_URL')}/${baseDir}/`);
      },
      filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
      },
    }),
    fileFilter: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
        return cb(
          ApiError.BadRequest('Неверное расширение файла. Допустимые расширения: png, jpg, jpeg')
        );
      }
      cb(null, true);
    },
  }).single(fileName);

  return (req: Request, res: Response, next: NextFunction) => {
    if (req.method === 'OPTIONS') {
      next();
    }

    try {
      multerSettings(req, res, next);
    } catch (e) {
      return next(e);
    }
  };
};

export default multerMiddleware;
