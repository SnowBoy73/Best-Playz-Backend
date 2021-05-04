import { Inject, Injectable } from '@nestjs/common';
import { HighscoreModel } from '../models/highscore.model';
import { ILeaderboardService } from '../primary-ports/leaderboard.service.interface';
import { SharedService } from '../services/shared.service';
import { ISharedService, ISharedServiceProvider } from "../primary-ports/shared.service.interface";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class LeaderboardService implements ILeaderboardService {
  allHighscores: HighscoreModel[] = [];

  constructor(
    // @Inject(ISharedServiceProvider) private sharedService: ISharedService,  // NEW not working
  ) /*
    @InjectRepository(CommentEntity)
    private highscoreRepository: Repository<HighscoreEntity>,
  ) */ {}

  addHighscore(highscore: HighscoreModel): HighscoreModel {
    const ts = Date.now();  // move to SharedService - from here
    const date_ob = new Date(ts);
    const date = date_ob.getDate();
    const month = date_ob.getMonth() + 1;
    const year = date_ob.getFullYear();
    const hour = date_ob.getHours();
    const minute = date_ob.getMinutes();
    const second = date_ob.getSeconds();
    let mthZero = '';
    if (month < 10) mthZero = '0';
    let dateZero = '';
    if (date < 10) dateZero = '0';
    let hourZero = '';
    if (hour < 10) hourZero = '0';
    let minZero = '';
    if (minute < 10) minZero = '0';
    let secZero = '';
    if (second < 10) secZero = '0';
    const posted = year + '-' + mthZero + month + '-' + dateZero + date + '@' + hourZero + hour + ':' + minZero + minute + ':' + secZero + second;
    // to here
    // const posted = this.sharedService.generateDateTimeNowString();  // NEW working

    highscore.date = posted;
    console.log( 'HS model: ', highscore.nickname, highscore.score, highscore.date);
    this.allHighscores.push(highscore);
    return highscore;
  }

  getHighScores(): HighscoreModel[] {
    return this.allHighscores;
  }
}
