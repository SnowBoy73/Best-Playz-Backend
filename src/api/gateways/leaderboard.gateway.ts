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
import { CommentClient } from '../../core/models/comment-client.model';
import { CommentDto } from '../dtos/comment.dto';
import { CommentEntity } from '../../infrastructure/data-source/entities/comment.entity';
import { CommentModel } from '../../core/models/comment.model';

@WebSocketGateway()
export class LeaderboardGateway {
  @WebSocketServer() server;

  @SubscribeMessage('highscore')
  handleHighscoreEvent(@MessageBody() data: string): string {
    return data + ' Leaderboard';
  }
}
