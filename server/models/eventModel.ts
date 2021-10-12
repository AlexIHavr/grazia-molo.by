import { Schema, model } from 'mongoose';
import { eventModelType } from './../types/modelsTypes';

const eventModel = new Schema({
  year: { type: Number, require: true },
  name: { type: String, require: true },
  description: { type: String },
  photoNames: [String],
  videoNames: [String],
  videoLinks: [String],
});

export default model<eventModelType>('Event', eventModel);
