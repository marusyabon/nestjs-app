import {
  Controller,
  Get,
  Post,
  Body
} from '@nestjs/common';

import { ChatsService } from './chats.service';

@Controller('chats')
  export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Get()
  getAllChats() {
    return this.chatsService.getChats();
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