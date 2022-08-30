import { DataTypes } from 'sequelize';
import sequelizeRepository from '../repositories/sequelizeRepository';
import { postModelType } from './../types/modelsTypes';
import userSchema from './userModel';

const postModel = sequelizeRepository.sequelize.define<postModelType>('Post', {
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
  name: { type: DataTypes.STRING(100), allowNull: false },
  description: { type: DataTypes.ARRAY(DataTypes.TEXT), allowNull: true },
  photoName: { type: DataTypes.STRING, allowNull: true },
  date: { type: DataTypes.STRING, defaultValue: new Date().toLocaleString(), allowNull: false },
  viewsUsers: { type: DataTypes.ARRAY(DataTypes.UUID), allowNull: false },
});

export default postModel;
