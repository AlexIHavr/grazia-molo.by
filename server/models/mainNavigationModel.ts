import { Schema, model } from 'mongoose';
import { mainNavigationModelType } from '../types/modelsTypes';

const mainNavigationModel = new Schema({
  category: { type: String, require: true, unique: true },
  name: { type: String, require: true, unique: true },
  changeable: { type: Boolean, require: true },
  withSubCategories: { type: Boolean, require: true },
});

export default model<mainNavigationModelType>('MainNavigation', mainNavigationModel);
