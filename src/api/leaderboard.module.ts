import { Module } from '@nestjs/common';
import { LeaderboardGateway } from './gateways/leaderboard.gateway';
import { LeaderboardService } from '../core/services/leaderboard.service';
import { ILeaderboardServiceProvider } from '../core/primary-ports/leaderboard.service.interface';

@Module({
  providers: [
    LeaderboardGateway,
    {
      provide: ILeaderboardServiceProvider,
      useClass: LeaderboardService,
    },
  ],
})
export class LeaderboardModule {}
