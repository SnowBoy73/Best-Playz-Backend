import { CommentClient } from "../../core/models/comment-client.model";
import { Comment} from "../../core/models/comment";

export interface WelcomeDto {
  clients: CommentClient[];
  client: CommentClient;
  comments: Comment[];
}
