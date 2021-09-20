import { Schema, model } from 'mongoose';
import { USER } from '../roles/roles';
import { userModelType } from '../types/modelsTypes';

const validateRolesOnDublicate = (arr: string[]) => {
  return arr.every((elem, i, arr) =>
    arr.every((nextElem, nextI) => (nextI !== i ? elem !== nextElem : true))
  );
};

const userSchema = new Schema({
  fullName: { type: String, unique: true, require: true },
  email: { type: String, unique: true, require: true },
  password: { type: String, require: true },
  age: { type: Number, require: true },
  isClubMember: { type: Boolean, require: true },
  isActivated: { type: Boolean, default: false },
  dateCreation: { type: Date, default: new Date() },
  date: { type: String, default: new Date().toLocaleString() },
  activationLink: { type: String },
  refreshToken: { type: String, require: true },
  roles: {
    type: [String],
    default: [USER],
    require: true,
    validate: (arr: string[]) => validateRolesOnDublicate(arr),
  },
  isBan: { type: Boolean, default: false },
  photoName: { type: String, default: '' },
});

export default model<userModelType>('User', userSchema);
