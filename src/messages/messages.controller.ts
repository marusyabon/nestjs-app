import {
    Controller,
    Get,
    Post,
    Body
  } from '@nestjs/common';
  
import { MessagesService } from './messages.service';
import { User } from '../users/user.model';

@Controller('messages')
export class MessagesController {
    constructor(private readonly messagesService: MessagesService) {}

    @Get()
    getMessagesByChatId(chatId: string) {
        return this.messagesService.getByChatId(chatId);
    }

    @Post()
    async addMessage(
        @Body('user') user: User,
        @Body('date') date: Date,
        @Body('text') text: string
    ) {
        const generatedId = await this.messagesService.insertMessage(
            user,
            date,
            text
        );
        return { id: generatedId };
    }
}
