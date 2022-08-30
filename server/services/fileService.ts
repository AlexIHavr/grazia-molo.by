import fs from 'fs';
import config from 'config';
import { Request } from 'express';

class FileService {
  unlinkPhoto(photoName: string | null, dir: string) {
    if (photoName) {
      fs.unlinkSync(`${config.get('IMAGES_URL')}/${dir}/${photoName}`);
    }
  }

  rmdirForPhotos(dir: string) {
    if (!fs.readdirSync(`${config.get('IMAGES_URL')}/${dir}`).length) {
      fs.rmdirSync(`${config.get('IMAGES_URL')}/${dir}`);
    }
  }

  mkdirForPhotos(dir: string) {
    if (!fs.existsSync(`${config.get('IMAGES_URL')}/${dir}`)) {
      fs.mkdirSync(`${config.get('IMAGES_URL')}/${dir}`);
    }
  }

  renameForPhotos(oldDir: string, newDir: string) {
    if (oldDir !== newDir && fs.existsSync(`${config.get('IMAGES_URL')}/${oldDir}`)) {
      fs.renameSync(`${config.get('IMAGES_URL')}/${oldDir}`, `${config.get('IMAGES_URL')}/${newDir}`);
    }
  }

  getPhotoNames(req: Request) {
    return Array.isArray(req.files) ? req.files.map((file) => file.filename) : [];
  }

  getPhotoName(req: Request) {
    return req.files && Array.isArray(req.files) ? (req.files[0] ? req.files[0].filename : '') : '';
  }
}

export default new FileService();
