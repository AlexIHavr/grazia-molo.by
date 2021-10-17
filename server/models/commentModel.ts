import { Schema, model, Types } from 'mongoose';
import { commentModelType } from '../types/modelsTypes';

const commentModel = new Schema({
  user: { type: Types.ObjectId, ref: 'User', require: true },
  post: { type: Types.ObjectId, ref: 'Post', require: true },
  date: { type: String, default: new Date().toLocaleString() },
  dateCreation: { type: Date, default: new Date() },
  text: [String],
  isValidated: { type: Boolean, default: false },
});

export default model<commentModelType>('Comment', commentModel);
