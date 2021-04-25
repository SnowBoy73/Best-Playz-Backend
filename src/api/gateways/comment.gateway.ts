import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { CommentService } from '../../core/services/comment.service';

@WebSocketGateway()
export class CommentGateway
  implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private commentService: CommentService) {}

  @WebSocketServer() server;
  @SubscribeMessage('comment')
  handleCommentEvent(@MessageBody() comment: string): void {
    console.log('comment: ' + comment);
    this.commentService.addComment(comment);
    this.server.emit('newComment', comment);
  }

  @SubscribeMessage('login')
  handleLoginEvent(@MessageBody() nickname: string,
    @ConnectedSocket() client: Socket,
  ): void {
    this.commentService.addClient(client.id, nickname);
    console.log('All nicknames ', this.commentService.getClients());
    this.server.emit('clients',this.commentService.getClients());
  }

  handleConnection(client: Socket, ...args: any[]): any {
    console.log('Client Connect', client.id);
    client.emit('allComments', this.commentService.getComments());
    this.server.emit('clients', this.commentService.getClients());
  }

  handleDisconnect(client: Socket): any {
    this.commentService.deleteClient(client.id);
    // this.server.emit('clients', this.chatService.getClients());
    console.log('Client Disconnect', client.id);
  }
}
