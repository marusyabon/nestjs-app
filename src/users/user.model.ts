import * as mongoose from 'mongoose';

export const UserSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true, select: false }
});

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}