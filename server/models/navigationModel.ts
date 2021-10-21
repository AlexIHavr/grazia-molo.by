import { Schema, model } from 'mongoose';
import { navigationModelType } from '../types/modelsTypes';

const navigationModel = new Schema({
  category: { type: String, require: true },
  subCategory: { type: String },
  section: { type: String },
  startDescription: [String],
  description: [String],
  photoNames: [String],
  videoNames: [String],
  videoLinks: [String],
});

export default model<navigationModelType>('Navigation', navigationModel);
