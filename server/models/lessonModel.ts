import { DataTypes } from 'sequelize';
import sequelizeRepository from '../repositories/sequelizeRepository';
import { lessonModelType } from '../types/modelsTypes';

const lessonModel = sequelizeRepository.sequelize.define<lessonModelType>('Lesson', {
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
  day: { type: DataTypes.STRING, allowNull: false },
  time: { type: DataTypes.STRING, allowNull: false },
  hours: { type: DataTypes.SMALLINT, allowNull: false },
  group: { type: DataTypes.STRING, allowNull: false },
});

export default lessonModel;
