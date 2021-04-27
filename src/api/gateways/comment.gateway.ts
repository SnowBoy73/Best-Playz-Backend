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
import { WelcomeDto } from "../dtos/welcome.dto";
import { Inject } from "@nestjs/common";
import { ICommentService, ICommentServiceProvider } from "../../core/primary-ports/comment.service.interface";

@WebSocketGateway()
export class CommentGateway
  implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(@Inject(ICommentServiceProvider) private commentService: ICommentService) {}

  @WebSocketServer() server;
  @SubscribeMessage('comment')
  handleCommentEvent(
    @MessageBody() text: string,
    @ConnectedSocket() client: Socket,
  ): void {
    console.log('comment: ' + text);
    const comment = this.commentService.addComment(text, client.id);
    this.server.emit('newComment', comment);
  }

  @SubscribeMessage('login')
  handleLoginEvent(@MessageBody() nickname: string,
    @ConnectedSocket() client: Socket,
  ): void {
    try {
      const commentClient = this.commentService.addClient(client.id, nickname);
      const welcome: WelcomeDto = {
        clients: this.commentService.getClients(),
        client: commentClient,
        comments: this.commentService.getComments()}
      console.log('All nicknames ', this.commentService.getClients());
      client.emit('welcome', welcome);
      this.server.emit('clients',this.commentService.getClients());
    } catch (e) {
      client.error(e.message);
    }

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
