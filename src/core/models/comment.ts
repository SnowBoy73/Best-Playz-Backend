import { CommentClient } from './comment-client.model';

export interface Comment {
  id: string;
  highscoreId: string;
  text: string;
  sender: string;
  posted: string;
}
