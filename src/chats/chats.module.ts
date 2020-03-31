import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ChatsController } from './chats.controller';
import { ChatsService } from './chats.service';
import { ChatSchema } from './chat.model';
import { MessageSchema } from '../messages/message.model';
import { AppGateway } from './chats.gateway';

@Module({
  imports: [MongooseModule.forFeature([
    { name: 'Chat', schema: ChatSchema },
    { name: 'Message', schema: MessageSchema },
  ])],
  controllers: [ChatsController],
  providers: [ChatsService, AppGateway],
})
export class ChatsModule {}