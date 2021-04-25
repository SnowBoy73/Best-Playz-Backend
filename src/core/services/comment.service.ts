import { Injectable } from '@nestjs/common';
import { ClientComment } from "../models/client-comment.model";

@Injectable()
export class CommentService {
  allComments: string[] = []; // TEMP
  clients: ClientComment[] = [];
  // clients: Map<string, string> = new Map<string, string>();

  addComment(comment: string): void {
    this.allComments.push(comment);
  }

  addClient(id: string, nickname: string): void {
    this.clients.push({id: id, nickname: nickname});
  }

  getClients() {
    return this.clients;
  }

  getComments(): string[] {
    return this.allComments;
  }

  deleteClient(id: string): void {
    this.clients = this.clients.filter((c) => c.id !== id);
  }
}
