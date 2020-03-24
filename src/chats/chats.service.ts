import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';

import { User } from '../users/user.model';
import { Chat } from './chat.model';
import { Message } from '../messages/message.model';

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
    const result = await this.chatModel
      .findById(chatId)
      .populate('users')
      .exec();
    // console.log(result, 'result');

    return result;
  }

  async insertChat(name: string, users: Array<User>) {
    const newChat = await new this.chatModel({name, users});
    const result = await newChat.save();
    return result._id as string;
  }

  async saveMessage(chatId: string, message: Message) {
    await this.chatModel.update(
      { _id: Schema.Types.ObjectId(chatId) }, 
      { $push: { messages: message } }
    )
  }

  async removeChat(chatId: string) {
    const response = await this.chatModel.deleteOne({_id: chatId});
    return response;
  }
}