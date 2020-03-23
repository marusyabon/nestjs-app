import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param
} from '@nestjs/common';

import { ChatsService } from './chats.service';
import { User } from '../users/user.model';
import { AppGateway } from './chats.gateway';

@Controller('chats')
  export class ChatsController {
  constructor(
    private readonly chatsService: ChatsService,
    private readonly appGateway: AppGateway,
  ) {}

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
    @Body('users') users: [User]
  ) {
    const generatedId = await this.chatsService.insertChat(
      chatName,
      users
    );

    this.appGateway.server.emit('chat-created', generatedId);
    return { id: generatedId, name: chatName };
  }

  @Delete(':id')
  removeChat(@Param('id') chatId: string) {
    return this.chatsService.removeChat(chatId);
  }
}