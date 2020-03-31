import { Injectable } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  } from '@nestjs/websockets';
  import { Logger } from '@nestjs/common';
  import { ChatsService } from './chats.service';
  import { Socket, Server } from 'socket.io';

  @Injectable()
  @WebSocketGateway({namespace: 'chats'})
  export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    constructor(
      private readonly chatsService: ChatsService
    ) {}
    @WebSocketServer() 
    server: Server;
  
    private logger: Logger = new Logger('AppGateway');
    private rooms:[] = [];
    
    @SubscribeMessage('msgToServer')
    async handleMessage(client: Socket, userData: any): Promise<void> {
      const {chatId, message} = userData;
      this.server.emit(`msgToClient_${chatId}`, message);

      await this.chatsService.saveMessage(
        chatId,
        message
      );
    }

    @SubscribeMessage('createChat')
    async createNewChat(client: Socket, userData: any): Promise<string> {
      const { chatName, users } = userData;

      this.server.emit('newChat', chatName);

      const generatedId = await this.chatsService.insertChat(
        chatName,
        users
      );
      return generatedId;
    }
  
    afterInit(server: Server) {
      this.logger.log('Init');
    }
  
    handleDisconnect(client: Socket) {
      this.logger.log(`Client disconnected: ${client.id}`);
    }
  
    handleConnection(client: Socket, ...args: any[]) {
      this.logger.log(`Client connected: ${client}`);
    }
  }