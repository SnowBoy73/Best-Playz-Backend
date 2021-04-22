import { Module } from '@nestjs/common';
import { CommentModule } from './comment/comment.module';
import { CommentService } from './core/services/comment.service';

@Module({
  imports: [CommentModule],
  controllers: [],
  providers: [CommentService],
})
export class AppModule {}
