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
import { LeaderboardService } from '../../core/services/leaderboard.service';
import {
  ILeaderboardService,
  ILeaderboardServiceProvider,
} from '../../core/primary-ports/leaderboard.service.interface';
import { HighscoreDto } from '../dtos/highscore.dto';
import { HighscoreModel } from '../../core/models/highscore.model';

@WebSocketGateway()
export class LeaderboardGateway {
  constructor(
    @Inject(ILeaderboardServiceProvider) private leaderboardService: ILeaderboardService) {}
  @WebSocketServer() server;

  @SubscribeMessage('postHighscore')
  handleNewHighscoreEvent(
    @MessageBody() highscoreDto: HighscoreDto,
    // @ConnectedSocket() client: Socket, // NEEDED??

  ): void {
    console.log('HighscoreDto  = ' + highscoreDto);
    let highscore: HighscoreModel = JSON.parse(JSON.stringify(highscoreDto));
    console.log('HighscoreModel  = ' + highscoreDto);


    this.leaderboardService.addHighscore(highscore);
    this.server.emit('newHighscore', highscore);
    // return highscore + ' Leaderboard';
  }

  @SubscribeMessage('requestGameHighscores')
  handleGetGameHighscoresEvent(
     @MessageBody() gameId: number,
    // @ConnectedSocket() client: Socket, // NEEDED??
  ): void {
    console.log('handleGetGameHighscoresEvent called');
    const gameHighscores: HighscoreModel[] = this.leaderboardService.getHighScores(); // put gameId in here
    this.server.emit('gameHighscores', gameHighscores);
    // return highscore + ' Leaderboard';
  }

  handleConnect(client: Socket, ...args: any[]): any { // Promise<any> {
    console.log('Leaderboard Client Connect', client.id);
    client.emit('gameHighscores', this.leaderboardService.getHighScores());
    // this.server.emit('clients', await this.commentService.getClients());
  }

  async handleDisconnect(client: Socket): Promise<any> {
    console.log('Leaderboard Client Disconnect', client.id);
    //  await this.commentService.deleteClient(client.id);
    // this.server.emit('clients', await this.commentService.getClients());
  }
}
