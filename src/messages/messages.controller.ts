import {
    Controller,
    Get,
    Post,
    Body
  } from '@nestjs/common';
  
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
    constructor(private readonly messagesService: MessagesService) {}

    @Get()
    getMessagesByChatId(chatId: string) {
        return this.messagesService.getByChatId(chatId);
    }

    @Post()
    async addMessage(
        @Body('chatId') chatId: string,
        @Body('userId') userId: string,
        @Body('date') date: Date,
        @Body('text') text: string
    ) {
        const generatedId = await this.messagesService.insertMessage(
            chatId,
            userId,
            date,
            text
        );
        return { id: generatedId };
    }
}