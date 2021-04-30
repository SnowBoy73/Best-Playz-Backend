import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import {
  ICommentService,
  ICommentServiceProvider,
} from '../../core/primary-ports/comment.service.interface';
import { Socket } from 'socket.io';
import { CommentService } from '../../core/services/comment.service';
import { WelcomeDto } from '../dtos/welcome.dto';
import { Inject } from '@nestjs/common';

@WebSocketGateway()
export class CommentGateway
  implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(@Inject(ICommentServiceProvider) private commentService: ICommentService) {}

  @WebSocketServer() server;
  @SubscribeMessage('comment')
  async handleCommentEvent(
    @MessageBody() text: string,
    @ConnectedSocket() client: Socket,
  ): Promise<void> { // Return Comment to controller for REST api
    console.log('comment: ' + text);
    try {
      const comment = await this.commentService.addComment(text, client.id);
      this.server.emit('newComment', comment);
    } catch (e) {
      client.error(e.message);
    }
  }

  @SubscribeMessage('login')
  async handleLoginEvent(
    @MessageBody() nickname: string,
    @ConnectedSocket() client: Socket,
  ): Promise<void> { // Return CommentClient to controller for REST api
    try {
      const commentClient = await this.commentService.addClient( client.id, nickname);
      const commentClients = await this.commentService.getClients();
      const allComments = await this.commentService.getComments();
      const welcome: WelcomeDto = {
        clients: commentClients,
        client: commentClient,
        comments: allComments,
      };
      console.log('All nicknames ', commentClients);
      client.emit('welcome', welcome);
      this.server.emit('clients', commentClients);
    } catch (e) {
      client.error(e.message);
    }

  }

  async handleConnection(client: Socket, ...args: any[]): Promise<any> {
    console.log('Client Connect', client.id);
    client.emit('allComments', this.commentService.getComments());
    this.server.emit('clients', await this.commentService.getClients());
  }

  async handleDisconnect(client: Socket): Promise<any> {
    console.log('Client Disconnect', client.id);
    await this.commentService.deleteClient(client.id);
    this.server.emit('clients', await this.commentService.getClients());
  }
}
