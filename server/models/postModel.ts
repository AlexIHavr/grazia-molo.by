import { postModelType } from './../types/modelsTypes';
import { Schema, model, Types } from 'mongoose';

const postModel = new Schema({
  name: { type: String, require: true },
  description: { type: String, require: true },
  photoName: { type: String },
  date: { type: String, default: new Date().toLocaleString() },
  dateCreation: { type: Date, default: new Date() },
  viewsUsers: [{ type: Types.ObjectId, ref: 'User', require: true }],
});

export default model<postModelType>('Post', postModel);
