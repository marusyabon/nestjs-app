import * as mongoose from 'mongoose';
import { User } from '../users/user.model';

const ObjectId = mongoose.Schema.Types.ObjectId;

export const MessageSchema = mongoose.Schema({
  user: { type: ObjectId, ref: 'User' },
  date: { type: Date, required: true },
  text: String
});

export interface Message extends mongoose.Document {
  id: string;
  user: User;
  date: Date;
  text: string;
}