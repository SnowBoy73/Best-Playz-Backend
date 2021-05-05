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
import { loginDto } from '../dtos/login.dto';
import { ClientModel } from '../../core/models/client.model';
import { CommentDto } from '../dtos/comment.dto';
import { CommentEntity } from '../../infrastructure/data-source/entities/comment.entity';
import { CommentModel } from '../../core/models/comment.model';
import { HighscoreModel } from "../../core/models/highscore.model";

@WebSocketGateway()
export class CommentGateway
  implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    @Inject(ICommentServiceProvider) private commentService: ICommentService,

  ) {}

  @WebSocketServer() server;
  @SubscribeMessage('postComment')
  async handlePostCommentEvent(
    @MessageBody() commentDto: CommentDto,
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    // Return CommentModel to controller for REST api
    console.log(
      'comment: ' +
        commentDto.text +
        ':  client id: ' +
        client.id +
        '  nickname: ' +
        commentDto.sender,
    );
    try {
      let comment: CommentModel = JSON.parse(JSON.stringify(commentDto));
      comment = await this.commentService.addComment(comment);
      this.server.emit('newComment', comment);
    } catch (e) {
      client.error(e.message);
    }
  }

  @SubscribeMessage('requestHighscoreComments')
  async handleGetHighscoreCommentsEvent(
    @MessageBody() highscoreId: string,
    // @ConnectedSocket() client: Socket, // NEEDED??
  ): Promise<void> {
    console.log('handleGetHighscoreCommentsEvent called');
    const highscoreComments: CommentModel[] = await this.commentService.getComments(); // put highscoreId in here
    this.server.emit('highscoreComments', highscoreComments);
    // return highscore + ' Leaderboard';
  }

  @SubscribeMessage('login')
  async handleLoginEvent(
    @MessageBody() loginCommentClientDto: loginDto,
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    console.log('safari nickname ', loginCommentClientDto.nickname);

    // Return CommentClient to controller for REST api
    try {
      let commentClient: ClientModel = JSON.parse(
        JSON.stringify(loginCommentClientDto),
      );
      commentClient = await this.commentService.addClient(commentClient);
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
    console.log('Comment Client Connect', client.id);
    client.emit('allComments', this.commentService.getComments());
    this.server.emit('clients', await this.commentService.getClients());
  }

  async handleDisconnect(client: Socket): Promise<any> {
    console.log('Comment Client Disconnect', client.id);
    // const disconnectingClient: ClientModel = this.
    // await this.commentService.deleteClient(client.id); // Disconnect error is here!!
    this.server.emit('clients', await this.commentService.getClients());
  }
}
