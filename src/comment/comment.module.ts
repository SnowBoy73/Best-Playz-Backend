import { Module } from '@nestjs/common';
import { CommentGateway } from '../api/gateways/comment.gateway';

@Module({
  providers: [CommentGateway],
})
export class CommentModule {}
