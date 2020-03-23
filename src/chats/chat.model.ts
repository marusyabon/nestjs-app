import * as mongoose from 'mongoose';
import { User } from '../users/user.model';
import { Message, MessageSchema } from '../messages/message.model';

const ObjectId = mongoose.Schema.Types.ObjectId;

export const ChatSchema = mongoose.Schema({
    name: String,
    users: [{ type: ObjectId, ref: 'User' }],
    messages: [MessageSchema]
});

export interface Chat extends mongoose.Document {
  id: string;
  name: string;
  users: Array<User>;
  messages: Array<Message>
}