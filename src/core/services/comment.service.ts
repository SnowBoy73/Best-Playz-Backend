import { Injectable } from '@nestjs/common';
import { CommentClient } from '../models/comment-client.model';
import { Comment } from '../models/comment';
import { ICommentService } from '../primary-ports/comment.service.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from '../../infrastructure/data-source/entities/comment.entity';
import { Repository } from 'typeorm';
import { ClientEntity } from '../../infrastructure/data-source/entities/client.entity';

@Injectable()
export class CommentService implements ICommentService {
  allComments: Comment[] = []; // TEMP
  clients: CommentClient[] = [];

  constructor(
    @InjectRepository(CommentEntity)
    private commentRepository: Repository<CommentEntity>,
    @InjectRepository(ClientEntity)
    private clientRepository: Repository<ClientEntity>,
  ) {}

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
    const sentAt =
      year +
      '-' +
      mthZero +
      month +
      '-' +
      dateZero +
      date +
      '@' +
      hourZero +
      hour +
      ':' +
      minZero +
      minute +
      ':' +
      secZero +
      second;
    console.log('time: ', sentAt);

    const highscoreId = '1'; // MOCK !!!
    const client = this.clients.find((c) => c.id === clientId);
    const comment: Comment = {
      highscoreId: highscoreId,
      text: text,
      sender: client,
      posted: sentAt,
    };
    this.allComments.push(comment);
    return comment;
  }

  addClient(id: string, nickname: string): CommentClient {
    let commentClient = this.clients.find(
      (c) => c.nickname === nickname && c.id === id,
    );
    if (commentClient) {
      return commentClient;
    }
    if (this.clients.find((c) => c.nickname === nickname)) {
      throw new Error('Nickname is already in use');
    }
    commentClient = { id: id, nickname: nickname };
    // this.clients.push(commentClient);
    // return commentClient;
    const client = this.clientRepository.create();
    client.nickname = nickname;
    this.clientRepository.save(client);
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
