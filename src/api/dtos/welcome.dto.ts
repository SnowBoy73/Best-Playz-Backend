import { CommentClient } from '../../core/models/comment-client.model';
import { CommentModel } from '../../core/models/comment.model';

export interface WelcomeDto {
  clients: CommentClient[];
  client: CommentClient;
  comments: CommentModel[];
}
