import path from 'path';
import fs from 'fs';
import config from 'config';
import { Request } from 'express';

class FileService {
  unlinkPhoto(photoName: string, dir: string) {
    if (photoName) {
      fs.unlinkSync(path.join(__dirname, `../${config.get('IMAGES_URL')}`, `${dir}/${photoName}`));
    }
  }
  mkdirForPhotos(dir: string) {
    if (!fs.existsSync(`${config.get('IMAGES_URL')}/${dir}`)) {
      fs.mkdirSync(`${config.get('IMAGES_URL')}/${dir}`);
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
