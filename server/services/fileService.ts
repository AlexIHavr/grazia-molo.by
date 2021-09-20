import path from 'path';
import fs from 'fs';
import config from 'config';

class FileService {
  unlinkPhoto(photoName: string, dir: string) {
    if (photoName) {
      fs.unlinkSync(path.join(__dirname, `../${config.get('IMAGES_URL')}`, `${dir}/${photoName}`));
    }
  }
}

export default new FileService();
