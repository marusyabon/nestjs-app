import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { MessageSchema } from './message.model';
import { AppGateway } from './messages.gateway';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Message', schema: MessageSchema}])],
  controllers: [MessagesController],
  providers: [MessagesService, AppGateway],
})
export class MessagesModule {}