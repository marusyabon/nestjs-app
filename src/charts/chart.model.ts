import * as mongoose from 'mongoose';

export const ChartSchema = mongoose.Schema({
    name: String,
    userIds: [String]
});

export interface Chart {
  id: string;
  name: string;
  userIds: Array<string>;
}