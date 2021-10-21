import { Schema, model } from 'mongoose';
import { sliderModelType } from '../types/modelsTypes';

const sliderModel = new Schema({
  photoNames: [String],
});

export default model<sliderModelType>('Slider', sliderModel);
