import { CommentClient } from './comment-client.model';

export interface CommentModel {
  id: string;
  highscoreId: string;
  text: string;
  sender: string;
  posted: string;
}
