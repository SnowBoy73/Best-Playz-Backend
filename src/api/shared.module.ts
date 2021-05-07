import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HighscoreEntity } from '../infrastructure/data-source/entities/highscore.entity';
import { SharedService } from '../core/services/shared.service';
import { LeaderboardGateway } from './gateways/leaderboard.gateway';
import { ILeaderboardServiceProvider } from '../core/primary-ports/leaderboard.service.interface';
import { LeaderboardService } from '../core/services/leaderboard.service';
import { ISharedServiceProvider } from '../core/primary-ports/shared.service.interface';
import { ClientEntity } from '../infrastructure/data-source/entities/client.entity';

@Module({
  //imports: [TypeOrmModule.forFeature([ClientEntity]), SharedService], // Crashes if uncommented
  /*
  providers: [
    LeaderboardGateway,
    {
      provide: ILeaderboardServiceProvider,
      useClass: LeaderboardService,
    },
    {
      // Is this needed??. Not used in GW
      provide: ISharedServiceProvider,
      useClass: SharedService,
    },
  ],*/
})
export class SharedModule {}
