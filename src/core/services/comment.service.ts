import { Injectable } from '@nestjs/common';
import { CommentClient } from "../models/comment-client.model";
import { Comment } from "../models/comment";

@Injectable()
export class CommentService {
  allComments: Comment[] = []; // TEMP
  clients: CommentClient[] = [];

  addComment(text: string, clientId: string): Comment {
    const ts = Date.now();
    const date_ob = new Date(ts);
    const date = date_ob.getDate();
    const month = date_ob.getMonth() + 1;
    const year = date_ob.getFullYear();
    const hour = date_ob.getHours();
    const minute = date_ob.getMinutes();
    const second = date_ob.getSeconds();
    let mthZero = '';
    if (month < 10) {
      mthZero = '0';
    }
    let dateZero = '';
    if (date < 10) {
      dateZero = '0';
    }
    let hourZero = '';
    if (hour < 10) {
      hourZero = '0';
    }
    let minZero = '';
    if (minute < 10) {
      minZero = '0';
    }
    let secZero = '';
    if (second < 10) {
      secZero = '0';
    }
    const sentAt = year + '-' + mthZero + month + '-' + dateZero + date + '@' + hourZero + hour + ':' + minZero + minute + ':' + secZero + second;
    console.log('time: ', sentAt);

    const highscoreId = "1"; // MOCK !!!
    const client = this.clients.find((c) => c.id === clientId);
    const comment: Comment =  {highscoreId: highscoreId, text: text, sender: client, posted: sentAt };
    this.allComments.push(comment);
    return comment;
  }

  addClient(id: string, nickname: string): CommentClient {
    const commentClient: CommentClient = {id: id, nickname: nickname};
    this.clients.push(commentClient);
    return commentClient;
  }

  getClients() {
    return this.clients;
  }

  getComments(): Comment[] {
    return this.allComments;
  }

  deleteClient(id: string): void {
    this.clients = this.clients.filter((c) => c.id !== id);
  }
}
