import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ILeaderboardService } from '../primary-ports/leaderboard.service.interface';
import { HighscoreModel } from '../models/highscore.model';
@Controller('higescore')
export class higeScoreController {
  constructor(private readonly servies: ILeaderboardService) {}

  @Get()
  async index() {
    return await this.servies.getHighScores();
  }

  @Post()
  async create(@Body() highscoreModel: HighscoreModel) {
    return await this.servies.addHighscore(highscoreModel);
  }
}
