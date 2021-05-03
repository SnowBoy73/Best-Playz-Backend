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
  allHighscores: string[] = [];
  @WebSocketServer() server;
  @SubscribeMessage('highscore')
  handleHighscoreEvent(@MessageBody() highscore: string): string {
    console.log('Leaderboard entry = ' + highscore);
    this.allHighscores.push(highscore);
    this.server.emit('newHighscore', highscore);
    return highscore + ' Leaderboard';
  }


  handleConnection(client: Socket, ...args: any[]): any { // Promise<any> {
    console.log('Leaderboard Client Connect', client.id);
    client.emit('allHighscores', this.allHighscores);
    // this.server.emit('clients', await this.commentService.getClients());
  }

  async handleDisconnect(client: Socket): Promise<any> {
    console.log('Leaderboard Client Disconnect', client.id);
    //  await this.commentService.deleteClient(client.id);
    // this.server.emit('clients', await this.commentService.getClients());
  }
}
