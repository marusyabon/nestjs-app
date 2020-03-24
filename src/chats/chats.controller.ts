import {
  Controller,
  Get,
  Delete,
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

  @Delete(':id')
  removeChat(@Param('id') chatId: string) {
    this.appGateway.server.emit('chat-removed', chatId);
    return this.chatsService.removeChat(chatId);
  }
}