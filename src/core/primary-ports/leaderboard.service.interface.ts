import { HighscoreModel } from '../models/highscore.model';

export const ILeaderboardServiceProvider = 'ILeaderboardServiceProvider';
export interface ILeaderboardService {
  addHighscore(highscore: HighscoreModel): void;

  getHighScores(): HighscoreModel[];
}
