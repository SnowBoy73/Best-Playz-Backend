import { Module } from '@nestjs/common';
import { CommentGateway } from './gateways/comment.gateway';
import { CommentService } from "../core/services/comment.service";
import { ICommentServiceProvider } from "../core/primary-ports/comment.service.interface";

@Module({
  providers: [
    CommentGateway,
    {
      provide: ICommentServiceProvider,
      useClass: CommentService,
    },
  ],
})
export class CommentModule {}
