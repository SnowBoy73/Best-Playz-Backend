import { Inject, Injectable } from '@nestjs/common';
import { HighscoreModel } from '../models/highscore.model';
import { ILeaderboardService } from '../primary-ports/leaderboard.service.interface';
import { SharedService } from '../services/shared.service';
import { ISharedService, ISharedServiceProvider } from "../primary-ports/shared.service.interface";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HighscoreEntity } from "../../infrastructure/data-source/entities/highscore.entity";

@Injectable()
export class LeaderboardService implements ILeaderboardService {
  gameHighscores: HighscoreModel[] = [];

  constructor(
    @Inject(ISharedServiceProvider) private sharedService: ISharedService,

   @InjectRepository(HighscoreEntity) private highscoreRepository: Repository<HighscoreEntity>,  // new
   ) {}

  addHighscore(highscore: HighscoreModel): HighscoreModel {
    const posted = this.sharedService.generateDateTimeNowString();
    highscore.date = posted;
    console.log( 'HS model: ', highscore.nickname, highscore.score, highscore.date);
    this.gameHighscores.push(highscore);
    return highscore;
  }

  getHighScores(): HighscoreModel[] {
    return this.gameHighscores;
  }
}
