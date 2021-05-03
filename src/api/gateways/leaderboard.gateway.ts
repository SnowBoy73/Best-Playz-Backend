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
import { Inject } from '@nestjs/common';

@WebSocketGateway()
export class LeaderboardGateway {
  @WebSocketServer() server;
  @SubscribeMessage('highscore')
  handleHighscoreEvent(@MessageBody() data: string): string {
    console.log('Leaderboard entry = ' + data);
    this.server.emit('newHighscore', data);
    return data + ' Leaderboard';
  }
}
