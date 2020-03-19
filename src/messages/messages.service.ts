import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Message } from './message.model';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel('Message') private readonly messageModel: Model<Message>
  ) {}

  async insertMessage(chatId: string, userId: string, date: Date, text: string, ) {
    const newMessage = new this.messageModel({chatId, userId, date, text});
    const result = await newMessage.save();
    return result._id as string;
  }

  async getByChatId(chatId: string) {
    const messages = await this.messageModel.find({chatId}).lean();
    return messages as Message[];
  }
}