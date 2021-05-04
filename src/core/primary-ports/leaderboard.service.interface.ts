
export const ILeaderboardServiceProvider = 'ILeaderboardServiceProvider';
export interface ILeaderboardService {
  addHighscore(highscore: string): void;

  getHighScores(): string[];
}
