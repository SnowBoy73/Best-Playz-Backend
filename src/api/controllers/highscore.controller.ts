import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { HighscoreModel } from '../../core/models/highscore.model';
import {
  ILeaderboardService,
  ILeaderboardServiceProvider,
} from '../../core/primary-ports/leaderboard.service.interface';
import { LeaderboardModule } from "../leaderboard.module";
import { SharedService } from "../../core/services/shared.service";
import { ISharedServiceProvider } from "../../core/primary-ports/shared.service.interface";

@Controller('highscore')
export class HighscoreController {
  constructor(
    @Inject(ILeaderboardServiceProvider)
    private leaderboardService: ILeaderboardService,
    @Inject(ISharedServiceProvider)
    private shared: SharedService,
  ) {}

  @Get()
  async index() {
    return await this.leaderboardService.getHighScores();
  }

  @Post()
  async create(@Body() highscoreModel: HighscoreModel) {
    const hs = await this.leaderboardService.addHighscore(highscoreModel);
    this.shared.newHighScore(hs);
    return hs;
  }
}
