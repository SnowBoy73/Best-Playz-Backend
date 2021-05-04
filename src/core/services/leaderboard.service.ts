import { Injectable } from '@nestjs/common';
import { HighscoreModel } from '../models/highscore.model';

@Injectable()
export class LeaderboardService {
  allHighscores: HighscoreModel[] = [];


  addHighscore(highscore: HighscoreModel): void {
    console.log( 'HS model: ', highscore.nickname, highscore.score, highscore.date);
    this.allHighscores.push(highscore);
  }

  getHighScores(): HighscoreModel[] {
    return this.allHighscores;
  }
}
