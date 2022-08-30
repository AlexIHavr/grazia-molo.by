import { DataTypes } from 'sequelize';
import sequelizeRepository from '../repositories/sequelizeRepository';
import { navigationModelType } from '../types/modelsTypes';
import mainNavigationModel from './mainNavigationModel';

const navigationModel = sequelizeRepository.sequelize.define<navigationModelType>('Navigation', {
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
  category: { type: DataTypes.STRING, allowNull: false, references: { model: mainNavigationModel, key: 'category' } },
  subCategory: { type: DataTypes.STRING(50), allowNull: true },
  section: { type: DataTypes.STRING(100), allowNull: true },
  startDescription: { type: DataTypes.ARRAY(DataTypes.TEXT), defaultValue: [], allowNull: false },
  description: { type: DataTypes.ARRAY(DataTypes.TEXT), defaultValue: [], allowNull: false },
  photoNames: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: [], allowNull: false },
  videoNames: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: [], allowNull: false },
  videoLinks: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: [], allowNull: false },
});

export default navigationModel;
