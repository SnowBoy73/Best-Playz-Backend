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

@Injectable()
export class CommentService implements ICommentService {
  constructor(
    @Inject(ISharedServiceProvider) private sharedService: ISharedService, // NEW working

    @InjectRepository(CommentEntity)
    private commentRepository: Repository<CommentEntity>,
    @InjectRepository(ClientEntity)
    private clientRepository: Repository<ClientEntity>,
  ) {}

  async addComment(newComment: CommentModel): Promise<CommentModel> {

     const sentAt = this.sharedService.generateDateTimeNowString();  // NEW working
    const highscoreId = '1'; // MOCK !!!

    const clientDB = await this.clientRepository.findOne({ nickname: newComment.sender});
    if (!clientDB) {
      console.log('added comment client NOT FOUND !!');
    } else {
      console.log( 'added comment client found - id:' + clientDB.id + '  nickname: ' + clientDB.nickname);
      let comment = this.commentRepository.create();
      // comment.id = uuidv4(); // NEWish
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

  async getComments(): Promise<CommentModel[]> {
    const commentsDB = await this.commentRepository.find(); // later find by HighscoreId
    const modelComments: CommentModel[] = JSON.parse(JSON.stringify(commentsDB));
    return modelComments;
  }

  async deleteClient(id: string): Promise<void> {
    await this.clientRepository.delete({ id: id });
  }
}
