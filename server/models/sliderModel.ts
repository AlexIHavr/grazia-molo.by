import { DataTypes } from 'sequelize';
import sequelizeRepository from '../repositories/sequelizeRepository';
import { sliderModelType } from '../types/modelsTypes';

const sliderModel = sequelizeRepository.sequelize.define<sliderModelType>('Slider', {
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
  photoNames: { type: DataTypes.ARRAY(DataTypes.STRING) },
});

export default sliderModel;
