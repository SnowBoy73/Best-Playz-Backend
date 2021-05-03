import { Module } from '@nestjs/common';
import { LeaderboardGateway } from './gateways/leaderboard.gateway';

@Module({
  providers: [LeaderboardGateway],
})
export class LeaderboardModule {}
