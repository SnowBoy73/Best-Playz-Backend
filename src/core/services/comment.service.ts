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

  async addComment(text: string, clientId: string): Promise<Comment> {
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
    /*const comment: Comment = {
      highscoreId: highscoreId,
      text: text,
      sender: client,
      posted: sentAt,
    };*/
    // this.allComments.push(comment);
    // return comment;
    let comment = this.commentRepository.create();
    // ID???
    comment.highscoreId = highscoreId;
    comment.text = text;
    comment.sender = clientId; // Maybe id, but is currently a number.
    comment.posted = sentAt;
    comment = await this.commentRepository.save(comment);

    console.log('added comment', comment);
    console.log('added comment id', comment.id);
    // const returnComment: Comment =
    return {
      id: '' + comment.id,
      highscoreId: comment.highscoreId,
      text: comment.text,
      sender: client.nickname,
      posted: comment.posted,
    };
    //return returnComment;
  }

  async addClient(id: string, nickname: string): Promise<CommentClient> {
    console.log('id: ', id, 'nickname ', nickname);
    const clientDB = await this.clientRepository.findOne({ nickname: nickname})
    if (!clientDB) {
      let client = this.clientRepository.create();
      client.id = id;
      client.nickname = nickname;
      client = await this.clientRepository.save(client);
      return { id: '' + client.id, nickname: client.nickname }; // maybe
    }
    if (clientDB.id === id) {
      return { id: '' + clientDB.id, nickname: clientDB.nickname };
    } else {
      throw new Error(' Nickname already used');
    }
  }

  async getClients(): Promise<CommentClient[]> {
    const clients = await this.clientRepository.find();
    const commentClients: CommentClient[] = JSON.parse(JSON.stringify(clients));
    return commentClients;
  }

  async getComments(): Promise<Comment[]> {
    const commentsDB = await this.commentRepository.find();
    const modelComments: Comment[] = JSON.parse(JSON.stringify(commentsDB));
    return modelComments;
  }

  async deleteClient(id: string): Promise<void> {
    await this.clientRepository.delete({ id: id });
  }
}
