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
export class CommentGateway
  implements OnGatewayConnection, OnGatewayDisconnect {
  allComments: string[] = [];  // TEMP
  @WebSocketServer() server;
  @SubscribeMessage('comment')
  handleEvent(@MessageBody() comment: string): string {
    console.log('works ' + comment);
    this.allComments.push(comment);
    this.server.emit('newComment', comment);
    return comment + 'boo';
  }

  handleConnection(client: Socket, ...args: any[]): any {
    console.log('Client Connect', client.id);
     client.emit('allComments', this.allComments); // chatService.getMessages());
    // this.server.emit('clients', this.chatService.getClients());
  }

  handleDisconnect(client: Socket): any {
    // this.chatService.delete(client.id);
    // this.server.emit('clients', this.chatService.getClients());
    console.log('Client Disconnect', client.id);
  }
}
