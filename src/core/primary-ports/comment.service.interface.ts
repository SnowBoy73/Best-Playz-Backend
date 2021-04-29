import { CommentClient } from '../models/comment-client.model';
import { Comment } from '../models/comment';

export const ICommentServiceProvider = 'ICommentServiceProvider';
export interface ICommentService {
  addComment(text: string, clientId: string): Comment;

  addClient(id: string, nickname: string): CommentClient;

  getClients(): CommentClient[];

  getComments(): Comment[];

  deleteClient(id: string): void;
}
