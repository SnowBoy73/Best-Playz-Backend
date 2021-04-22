import { Module } from '@nestjs/common';
import { CommentGateway } from '../api/gateways/comment.gateway';
import { CommentService } from "../core/services/comment.service";

@Module({
  providers: [CommentGateway, CommentService],
})
export class CommentModule {}
