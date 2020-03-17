import * as mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;

export const MessageSchema = mongoose.Schema({
  chartId: { type: ObjectId, ref: 'Chart' },
  userId: { type: ObjectId, ref: 'User' },
  date: { type: Date, required: true },
  text: String
});

export interface Message {
  id: string;
  chartId: string;
  userId: string;
  date: Date;
  text: string;
}