import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppGateway } from './app.gateway';
import { UsersModule } from './users/users.module';
import { MessagesModule } from './messages/messages.module';
import { ChartsModule } from './charts/charts.module';

@Module({
  imports: [
    UsersModule,
    MessagesModule,
    ChartsModule,
    MongooseModule.forRoot('mongodb://localhost/nestAppDB')
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
