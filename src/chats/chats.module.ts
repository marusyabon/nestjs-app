import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ChatsController } from './chats.controller';
import { ChatsService } from './chats.service';
import { ChatSchema } from './chat.model';
import { AppGateway } from './chats.gateway';

@Module({
  imports: [MongooseModule.forFeature([
    { name: 'Chat', schema: ChatSchema }
  ])],
  controllers: [ChatsController],
  providers: [ChatsService, AppGateway],
})
export class ChatsModule {}