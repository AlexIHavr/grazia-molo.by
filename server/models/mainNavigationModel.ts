import { DataTypes } from 'sequelize';
import sequelizeRepository from '../repositories/sequelizeRepository';
import { mainNavigationModelType } from '../types/modelsTypes';

const mainNavigationModel = sequelizeRepository.sequelize.define<mainNavigationModelType>('MainNavigation', {
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
  category: { type: DataTypes.STRING, allowNull: false, unique: true },
  name: { type: DataTypes.STRING(100), allowNull: false, unique: true },
  changeable: { type: DataTypes.BOOLEAN, allowNull: false },
  withSubCategories: { type: DataTypes.BOOLEAN, allowNull: false },
});

export default mainNavigationModel;
