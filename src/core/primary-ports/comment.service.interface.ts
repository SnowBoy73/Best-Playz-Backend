import { CommentClient } from '../models/comment-client.model';
import { CommentModel } from '../models/comment.model';

export const ICommentServiceProvider = 'ICommentServiceProvider';
export interface ICommentService {
  addComment(commentModel: CommentModel): Promise<CommentModel>;

  addClient(commentClient: CommentClient): Promise<CommentClient>;

  getClients(): Promise<CommentClient[]>;

  getComments(): Promise<CommentModel[]>;

  deleteClient(id: string): Promise<void>;
}
