import { Module } from '@nestjs/common';
import { CommentModule } from './api/comment.module';
import { CommentService } from './core/services/comment.service';
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    CommentModule,
    ConfigModule.forRoot(),
  ],
  controllers: [],
  providers: [CommentService],
})
export class AppModule {}
