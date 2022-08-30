import { DataTypes } from 'sequelize';
import sequelizeRepository from '../repositories/sequelizeRepository';
import { USER } from '../roles/roles';
import { userModelType } from '../types/modelsTypes';

const userSchema = sequelizeRepository.sequelize.define<userModelType>('User', {
  _id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    validate: {
      isUUID: {
        args: 4,
        msg: 'Id must be UUID type.',
      },
    },
  },
  fullName: { type: DataTypes.STRING(30), unique: true, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  age: { type: DataTypes.SMALLINT, allowNull: false },
  isClubMember: { type: DataTypes.BOOLEAN, allowNull: false },
  isActivated: { type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false },
  date: { type: DataTypes.STRING, defaultValue: new Date().toLocaleString(), allowNull: false },
  activationLink: { type: DataTypes.STRING, allowNull: true },
  refreshToken: { type: DataTypes.STRING, allowNull: true },
  roles: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [USER],
    allowNull: false,
    validate: {
      validateRolesOnDuplicate(arr: string[]) {
        if (!arr.every((elem, i, arr) => arr.every((nextElem, nextI) => (nextI !== i ? elem !== nextElem : true))))
          throw new Error('Role should be unique one.');
      },
    },
  },
  isBan: { type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false },
  photoName: { type: DataTypes.STRING, defaultValue: '', allowNull: false },
});

export default userSchema;
