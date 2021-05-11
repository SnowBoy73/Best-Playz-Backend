import { ClientModel } from '../models/client.model';
import { CommentModel } from '../models/comment.model';

export const ICommentServiceProvider = 'ICommentServiceProvider';
export interface ICommentService {
  addComment(commentModel: CommentModel): Promise<CommentModel>;

  addClient(commentClient: ClientModel): Promise<ClientModel>;

  getClients(): Promise<ClientModel[]>;

  getComments(): Promise<CommentModel[]>;

  deleteClient(id: string): Promise<void>;
}
