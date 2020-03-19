import * as mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;

export const MessageSchema = mongoose.Schema({
  chatId: { type: ObjectId, ref: 'Chat' },
  userId: { type: ObjectId, ref: 'User' },
  date: { type: Date, required: true },
  text: String
});

export interface Message extends mongoose.Document {
  id: string;
  chatId: string;
  userId: string;
  date: Date;
  text: string;
}