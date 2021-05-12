import { Inject, Injectable } from '@nestjs/common';
import { ClientModel } from '../models/client.model';
import { CommentModel } from '../models/comment.model';
import { ICommentService, ICommentServiceProvider } from "../primary-ports/comment.service.interface";
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from '../../infrastructure/data-source/entities/comment.entity';
import { Repository } from 'typeorm';
import { ClientEntity } from '../../infrastructure/data-source/entities/client.entity';
import { SharedService } from '../services/shared.service';
import { ISharedService, ISharedServiceProvider } from "../primary-ports/shared.service.interface";
import { HighscoreModel } from "../models/highscore.model";

@Injectable()
export class CommentService implements ICommentService {
  currentHighscore: HighscoreModel = null;

  constructor(
    @Inject(ISharedServiceProvider) private sharedService: ISharedService,
    @InjectRepository(CommentEntity) private commentRepository: Repository<CommentEntity>,
    @InjectRepository(ClientEntity) private clientRepository: Repository<ClientEntity>,
  ) {}

  async addComment(newComment: CommentModel): Promise<CommentModel> {
    const sentAt = this.sharedService.generateDateTimeNowString();
    const highscoreId = '1'; // MOCK !!!
    const clientDB = await this.clientRepository.findOne({ nickname: newComment.sender});
    if (!clientDB) {
      console.log('added comment client NOT FOUND !!');
    } else {
      console.log( 'added comment client found - id:' + clientDB.id + '  nickname: ' + clientDB.nickname);
      let comment = this.commentRepository.create();
      comment.highscoreId = highscoreId;
      comment.text = newComment.text;
      comment.sender = clientDB.nickname;
      comment.posted = sentAt;
      comment = await this.commentRepository.save(comment);
      const addedComment = JSON.parse(JSON.stringify(comment));
      return addedComment;
    }
  }

  async addClient(commentClient: ClientModel): Promise<ClientModel> {
    const commentClientFoundById = await this.clientRepository.findOne({ id: commentClient.id});
    if (commentClientFoundById) {
      return JSON.parse(JSON.stringify(commentClientFoundById));
    }
    const commentClientFoundByNickname = await this.clientRepository.findOne({ nickname: commentClient.nickname});
    if (commentClientFoundByNickname) {
      throw new Error(' Nickname already used');
    }
    let client = this.clientRepository.create();
    client.nickname = commentClient.nickname;
    client = await this.clientRepository.save(client);
    const newCommentClient = JSON.parse(JSON.stringify(client));
    return newCommentClient; // maybe
  }

  async getClients(): Promise<ClientModel[]> {
    const clients = await this.clientRepository.find();
    const commentClients: ClientModel[] = JSON.parse(JSON.stringify(clients));
    return commentClients;
  }

  async getComments(highscore: HighscoreModel): Promise<CommentModel[]> {
    console.log('getComments HighscoreModel: id= ', highscore.id, ' by ', highscore.nickname)

    // const mockId = '73784766-53eb-4384-989e-3a6472cc74b1'; // MOCK
      if (highscore != null) {
        try {  // Try - catch not working
          const commentsDB = await this.commentRepository.find({ where: { highscoreId: highscore.id} })  // WORKS!!!
        /*   .then((commentsDB) => { // NOT WORKING YET - blue null id error
             console.log('Comments found: ', commentsDB);
           }) .catch((err) => {
             console.log('Error: ', err);
           })
           .finally(() => {  // cuts of line 79-100 ish ???
             console.log('Finally called');
           });*/
          const highscoreComments: CommentModel[] = JSON.parse(JSON.stringify(commentsDB));
          console.log('modelComments = ', highscoreComments);
          return highscoreComments;
        } catch (e) {
          Error(e.message);
        }
        } else {
        try {  // Try - catch not working
          const emptyComments: CommentModel[] = [];
          const warningComment: CommentModel = {
            id: 'c4badc0b-f47f-45a8-a217-1443ce4c6103', // MOCK - maybe change to ''
            highscoreId: 'No highscore selected',
            text: 'Please select a Highscore to view its comments',
            sender: 'Admin',
            posted: 'null',
          };
          emptyComments.push(warningComment);
          return emptyComments;
      } catch (e) {
      Error(e.message);
    }
        }

  }

  async deleteClient(id: string): Promise<void> {
    await this.clientRepository.delete({ id: id });
  }

  getCurrentHighscore(): HighscoreModel {
    return this.currentHighscore;
  }
}
