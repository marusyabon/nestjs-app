import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Chat } from './chat.model';

@Injectable()
export class ChatsService {
  constructor(
      @InjectModel('Chat') private readonly chatModel: Model<Chat>
    ) {}

  async getChats() {
    const chats = await this.chatModel.find().exec();
    return chats as Chat[];
  }

  async insertChat(name: string, userIds: Array<string>) {
    const newChat = await new this.chatModel({name, userIds});
    const result = await newChat.save();
    return result._id as string;
  }
}