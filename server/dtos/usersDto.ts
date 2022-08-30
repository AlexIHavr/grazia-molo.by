import { userModelType } from './../types/modelsTypes';
class UsersDto {
  _id: string;
  fullName: string;
  photoName: string;
  date: string;
  isBan: boolean;

  constructor(model: userModelType) {
    this._id = model._id;
    this.fullName = model.fullName;
    this.photoName = model.photoName;
    this.date = model.date;
    this.isBan = model.isBan;
  }
}

export default UsersDto;
