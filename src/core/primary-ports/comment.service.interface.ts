import { CommentClient } from '../models/comment-client.model';
import { Comment } from '../models/comment';

export const ICommentServiceProvider = 'ICommentServiceProvider';
export interface ICommentService {
  addComment(text: string, clientId: string): Promise<Comment>;

  addClient(id: string, nickname: string): Promise<CommentClient>;

  getClients(): Promise<CommentClient[]>;

  getComments(): Promise<Comment[]>;

  deleteClient(id: string): Promise<void>;
}
