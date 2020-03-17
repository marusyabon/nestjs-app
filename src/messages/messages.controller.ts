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
    getMessagesByChartId(chartId: string) {
        return this.messagesService.getByChartId(chartId);
    }

    @Post()
    async addMessage(
        @Body('chartId') chartId: string,
        @Body('userId') userId: string,
        @Body('date') date: Date,
        @Body('text') text: string
    ) {
        const generatedId = await this.messagesService.insertMessage(
            chartId,
            userId,
            date,
            text
        );
        return { id: generatedId };
    }
}