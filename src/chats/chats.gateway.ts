import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  } from '@nestjs/websockets';
  import { Logger } from '@nestjs/common';
  import { Socket, Server } from 'socket.io';
  
  @WebSocketGateway({namespace: 'messages'})
  export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() 
    server: Server;
  
    private logger: Logger = new Logger('AppGateway');
    private connections:string[] = [];
    
    @SubscribeMessage('msgToServer')
    handleMessage(client: Socket, payload: any): void {
      this.server.emit('msgToClient', payload);
      
      if (this.connections.indexOf(payload.chatId) === -1) {
        this.connections.push(payload.chatId);
      }
      console.log(this.connections);
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