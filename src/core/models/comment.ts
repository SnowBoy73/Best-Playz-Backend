import { CommentClient } from './comment-client.model';

export interface Comment {
  id: string;
  highscoreId: string;  // highscoreClient??
  text: string;
  sender: string;
  posted: string;
}
