import path from 'path';
import fs from 'fs';
import config from 'config';

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
}

export default new FileService();
