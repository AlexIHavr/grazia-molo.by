import { DataTypes } from 'sequelize';
import sequelizeRepository from '../repositories/sequelizeRepository';
import { commentModelType } from '../types/modelsTypes';
import postModel from './postModel';
import userSchema from './userModel';

const commentModel = sequelizeRepository.sequelize.define<commentModelType>('Comment', {
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
  user: { type: DataTypes.UUID, references: { model: userSchema, key: '_id' }, allowNull: false },
  post: { type: DataTypes.UUID, references: { model: postModel, key: '_id' }, allowNull: false },
  date: { type: DataTypes.STRING, defaultValue: new Date().toLocaleString(), allowNull: false },
  text: { type: DataTypes.ARRAY(DataTypes.STRING(1000)), allowNull: true },
  isValidated: { type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false },
});

export default commentModel;
