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
import {
  ISharedService,
  ISharedServiceProvider,
} from '../../core/primary-ports/shared.service.interface';
import { HighscoreDto } from '../dtos/highscore.dto';
import { HighscoreModel } from '../../core/models/highscore.model';

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
    @MessageBody() highscoreDto: HighscoreDto,
    @ConnectedSocket() client: Socket, // NEEDED??
  ): Promise<void> {
    console.log('handleGetHighscoreCommentsEvent called');
    try {
      const highscoreModel: HighscoreModel = JSON.parse(
        JSON.stringify(highscoreDto),
      );

      const highscoreComments: CommentModel[] = await this.commentService.getComments(highscoreModel);
      console.log(highscoreComments.length, ' highscoreComments found ');
      this.server.emit('highscoreComments', highscoreComments);
    } catch (e) {
      client.error(e.message);
    }
  }

  @SubscribeMessage('login')
  async handleLoginEvent(
    @MessageBody() loginCommentClientDto: loginDto,
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    console.log('DTO nickname ', loginCommentClientDto.nickname);
    console.log('handleLoginEvent called');

    // Return Client to controller for REST api
    try {
      let newClient: ClientModel = JSON.parse(
        JSON.stringify(loginCommentClientDto),
      );
      console.log('newClient ', newClient);

      newClient = await this.commentService.addClient(newClient);
      console.log('newClient2 ', newClient);

      const clients = await this.commentService.getClients();
      console.log('clients ', clients);

      //const allComments = await this.commentService.getComments(this.commentService.getCurrentHighscore());  // old.. remove??
      //console.log('allComments = ', allComments);

      const welcome: WelcomeDto = {
        clients: clients,
        client: newClient,
        comments: null,  //allComments,  // old.. remove??
      };
      console.log('welcomeDto ', welcome);

      console.log('All nicknames ', clients);
      client.emit('welcome', welcome);
      this.server.emit('clients', clients);
    } catch (e) {
      client.error(e.message);
    }
  }

  @SubscribeMessage('logout')
  async handleLogoutEvent(
    @MessageBody() loggedInUserId: string,
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    console.log('comment Gate logout id: ', loggedInUserId);

    // Return Client to controller for REST api
    try {
      await this.commentService.deleteClient(loggedInUserId);
    } catch (e) {
      client.error(e.message);
    }
  }

  async handleConnection(client: Socket, ...args: any[]): Promise<any> {
    console.log('Comment Client Connect', client.id);
    client.emit('allComments', this.commentService.getComments(null));
    this.server.emit('clients', await this.commentService.getClients());
  }

  async handleDisconnect(client: Socket): Promise<any> {
    // await this.commentService.deleteClient(client.id); // Disconnect error is here!!
    this.server.emit('clients', await this.commentService.getClients());
  }
}
