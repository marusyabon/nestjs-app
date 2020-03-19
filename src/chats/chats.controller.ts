import {
  Controller,
  Get,
  Post,
  Body,
  Param
} from '@nestjs/common';

import { ChatsService } from './chats.service';

@Controller('chats')
  export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Get()
  getAllChats() {
    return this.chatsService.getChats();
  }

  @Get(':id')
  getChat(@Param('id') chatId: string) {
    return this.chatsService.getById(chatId);
  }

  @Post()
  async addChat(
    @Body('name') chatName: string,
    @Body('userIds') userIds: [string]
  ) {
    const generatedId = await this.chatsService.insertChat(
      chatName,
      userIds
    )
    return { id: generatedId };
  }
}