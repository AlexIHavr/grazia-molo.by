import { userModelType } from '../types/modelsTypes';

class UserSettingsDto {
  fullName: string;
  photoName: string;

  constructor(model: userModelType) {
    this.fullName = model.fullName;
    this.photoName = model.photoName;
  }
}

export default UserSettingsDto;
