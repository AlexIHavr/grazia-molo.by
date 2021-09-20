import { Schema, model } from 'mongoose';
import { lessonModelType } from '../types/modelsTypes';

const lessonModel = new Schema({
  day: { type: String, require: true },
  time: { type: String, require: true },
  hours: { type: Number, require: true },
  group: { type: String, require: true },
});

export default model<lessonModelType>('Lesson', lessonModel);
