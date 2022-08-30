import { userModelType } from '../types/modelsTypes';

class TokensDto {
  _id: string;
  fullName: string;
  isActivated: boolean;
  refreshToken: string | null;
  accessToken: string;
  photoName: string;
  roles: string[];

  constructor(model: userModelType, accessToken: string) {
    this._id = model._id;
    this.fullName = model.fullName;
    this.isActivated = model.isActivated;
    this.refreshToken = model.refreshToken;
    this.accessToken = accessToken;
    this.photoName = model.photoName;
    this.roles = model.roles;
  }
}

export default TokensDto;
