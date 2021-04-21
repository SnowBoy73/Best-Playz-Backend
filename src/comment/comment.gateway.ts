import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway()
export class CommentGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server;

  @SubscribeMessage('comment')
  handleEvent(@MessageBody() data: string): string {
    console.log('works ' + data);
    this.server.emit('comments', data);
    return data + 'boo';
  }

  handleConnection(client: Socket, ...args: any[]): any {
    console.log('Client Connect', client.id);
    // client.emit('allMessages', this.chatService.getMessages());
    // this.server.emit('clients', this.chatService.getClients());
  }

  handleDisconnect(client: Socket): any {
    // this.chatService.delete(client.id);
    // this.server.emit('clients', this.chatService.getClients());
    console.log('Client Disconnect', client.id);
  }
}
