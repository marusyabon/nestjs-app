import * as mongoose from 'mongoose';

export const ChatSchema = mongoose.Schema({
    name: String,
    userIds: [String]
});

export interface Chat extends mongoose.Document {
  id: string;
  name: string;
  userIds: Array<string>;
}