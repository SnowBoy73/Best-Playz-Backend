import { Injectable } from '@nestjs/common';
import { CommentClient } from "../models/comment-client.model";
import { CommentModel } from "../models/comment.model";

@Injectable()
export class CommentService {
  allComments: CommentModel[] = []; // TEMP
  clients: CommentClient[] = [];

  addComment(text: string, clientId: string): CommentModel {
    const ts = Date.now();
    console.log('time: ', ts);
    const date_ob = new Date(ts);
    const date = date_ob.getDate();
    const month = date_ob.getMonth() + 1;
    const year = date_ob.getFullYear();
    const hour = date_ob.getHours();
    const minute = date_ob.getMinutes();
    const second = date_ob.getSeconds();
    let minZero = '';
    if (minute < 10) {
      minZero = '0';
    }
    let secZero = '';
    if (second < 10) {
      secZero = '0';
    }
    const sentAt = year + '-' + month + '-' + date + '@' + hour + ':' + minZero + minute + ':' + secZero + second;
    const highscoreId = "1"; // MOCK !!!
    const client = this.clients.find((c) => c.id === clientId);
    const comment: CommentModel =  {highscoreId: highscoreId, text: text, sender: client, posted: sentAt };
    this.allComments.push(comment);
    return comment;
  }

  addClient(id: string, nickname: string): void {
    this.clients.push({id: id, nickname: nickname});
  }

  getClients() {
    return this.clients;
  }

  getComments(): CommentModel[] {
    return this.allComments;
  }

  deleteClient(id: string): void {
    this.clients = this.clients.filter((c) => c.id !== id);
  }
}
