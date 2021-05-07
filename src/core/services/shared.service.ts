import { Inject, Injectable } from "@nestjs/common";
import { ISharedService, ISharedServiceProvider } from "../primary-ports/shared.service.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { ClientEntity } from "../../infrastructure/data-source/entities/client.entity";
import { Repository } from "typeorm";
import { CommentEntity } from '../../infrastructure/data-source/entities/comment.entity';
import { ClientModel } from "../models/client.model";

@Injectable()
export class SharedService implements ISharedService {
  constructor(
    // @InjectRepository(CommentEntity) private commentRepository: Repository<CommentEntity>,
    //@InjectRepository(ClientEntity) private clientRepository: Repository<ClientEntity>,
  ) {}

/*
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

  async deleteClient(id: string): Promise<void> {
    await this.clientRepository.delete({ id: id });
  }
*/
  generateDateTimeNowString(): string {
    const ts = Date.now();
    const date_ob = new Date(ts);
    const date = date_ob.getDate();
    const month = date_ob.getMonth() + 1;
    const year = date_ob.getFullYear();
    const hour = date_ob.getHours();
    const minute = date_ob.getMinutes();
    const second = date_ob.getSeconds();
    let mthZero = '';
    if (month < 10) mthZero = '0';
    let dateZero = '';
    if (date < 10) dateZero = '0';
    let hourZero = '';
    if (hour < 10) hourZero = '0';
    let minZero = '';
    if (minute < 10) minZero = '0';
    let secZero = '';
    if (second < 10) secZero = '0';
    return year + '-' + mthZero + month + '-' + dateZero + date + '@' + hourZero + hour + ':' + minZero + minute + ':' + secZero + second;
  }
}
