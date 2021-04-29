import { Module } from '@nestjs/common';
import { CommentGateway } from './gateways/comment.gateway';
import { CommentService } from '../core/services/comment.service';
import { ICommentServiceProvider } from '../core/primary-ports/comment.service.interface';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from '../infrastructure/data-source/entities/comment.entity';
import { ClientEntity } from '../infrastructure/data-source/entities/client.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity, ClientEntity])],
  providers: [
    CommentGateway,
    {
      provide: ICommentServiceProvider,
      useClass: CommentService,
    },
  ],
})
export class CommentModule {}
