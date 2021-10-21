import config from 'config';
import { NextFunction, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import ApiError from '../errors/apiError';
import fileService from '../services/fileService';

const multerMiddleware = (baseDir: string, addDir?: string, renameDir?: string) => {
  const multerSettings = multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        let dir = baseDir;

        //создание доп. папки
        if (addDir) {
          dir = `${req.body[baseDir]}/${req.body[addDir] ?? ''}`;

          //переименование существующей папки
          if (renameDir) {
            fileService.renameForPhotos(`${req.body[baseDir]}/${req.body[renameDir]}`, dir);
          }

          fileService.mkdirForPhotos(dir);
        }

        cb(null, `${config.get('IMAGES_URL')}/${dir}/`);
      },
      filename: (req, file, cb) => {
        cb(null, Math.random().toString(16).slice(2) + path.extname(file.originalname));
      },
    }),
    fileFilter: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg' && ext !== '.JPG') {
        return cb(
          ApiError.BadRequest('Неверное расширение файла. Допустимые расширения: png, jpg, jpeg')
        );
      }
      cb(null, true);
    },
  }).array('photo');

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
