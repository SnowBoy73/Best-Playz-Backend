import { Injectable } from '@nestjs/common';

@Injectable()
export class CommentService {
  allComments: string[] = []; // TEMP
  clients: Map<string, string> = new Map<string, string>();

  addComment(comment: string): void {
    this.allComments.push(comment);
  }

  addClient(id: string, nickname: string): void {
    this.clients.set(id, nickname);
  }

  getClients() {
    return Array.from(this.clients.values());
  }

  getComments(): string[] {
    return this.allComments;
  }
}
