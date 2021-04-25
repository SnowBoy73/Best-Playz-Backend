import {CommentClient} from "./comment-client.model";

export interface CommentModel {
  // id: string;  // ???
  highscoreId: string;  // highscoreClient??
  text: string;
  sender: CommentClient;
  posted: string;
}
