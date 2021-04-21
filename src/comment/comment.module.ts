import { Module } from '@nestjs/common';
import { CommentGateway } from './comment.gateway';

@Module({
  providers: [CommentGateway],
})
export class CommentModule {}
