import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Types } from 'mongoose';

import { Chat } from './chat.model';

@Injectable()
export class ChatsService {
  constructor(
      @InjectModel('Chat') private readonly chatModel: Model<Chat>
    ) {}

  async getChats() {
    const chats = await this.chatModel.find({}).lean();
    return chats as Chat[];
  }

  async getById(chatId: string) {
    const result = await this.chatModel.aggregate([
      { $match: { _id: Types.ObjectId(chatId) } },
      { $lookup:  {
          from: 'messages',
          localField: '_id',
          foreignField: 'chatId',
          as: 'messages'
        }
      },
      { $limit: 1 }
    ]).exec();

    return result[0];
  }

  async insertChat(name: string, userIds: Array<string>) {
    const newChat = await new this.chatModel({name, userIds});
    const result = await newChat.save();
    return result._id as string;
  }
}