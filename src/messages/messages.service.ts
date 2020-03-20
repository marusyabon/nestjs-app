import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Message } from './message.model';
import { User } from '../users/user.model';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel('Message') private readonly messageModel: Model<Message>
  ) {}

  async insertMessage(user: User, date: Date, text: string, ) {
    const newMessage = new this.messageModel({user, date, text});
    const result = await newMessage.save();
    return result._id as string;
  }

  async getByChatId(chatId: string) {
    const messages = await this.messageModel.find({chatId}).lean();
    return messages as Message[];
  }
}