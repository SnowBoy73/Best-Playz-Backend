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
import { ILeaderboardServiceProvider } from '../../core/primary-ports/leaderboard.service.interface';
import { HighscoreDto } from "../dtos/highscore.dto";
import { CommentModel } from "../../core/models/comment.model";
import { HighscoreModel } from "../../core/models/highscore.model";

@WebSocketGateway()
export class LeaderboardGateway {
  constructor(
    @Inject(ILeaderboardServiceProvider) private leaderboardService: LeaderboardService) {}
  @WebSocketServer() server;
  @SubscribeMessage('highscore')
  handleHighscoreEvent(@MessageBody() highscoreDto: HighscoreDto): void {
    console.log('HighscoreDto  = ' + highscoreDto);
    let highscore: HighscoreModel = JSON.parse(JSON.stringify(highscoreDto));
    console.log('HighscoreModel  = ' + highscoreDto);


    this.leaderboardService.addHighscore(highscore);
    this.server.emit('newHighscore', highscore);
    // return highscore + ' Leaderboard';
  }

  handleConnection(client: Socket, ...args: any[]): any { // Promise<any> {
    console.log('Leaderboard Client Connect', client.id);
    client.emit('allHighscores', this.leaderboardService.getHighScores());
    // this.server.emit('clients', await this.commentService.getClients());
  }

  async handleDisconnect(client: Socket): Promise<any> {
    console.log('Leaderboard Client Disconnect', client.id);
    //  await this.commentService.deleteClient(client.id);
    // this.server.emit('clients', await this.commentService.getClients());
  }
}
