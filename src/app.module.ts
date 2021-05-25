import { Module } from '@nestjs/common';
import { CommentModule } from './api/comment.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './infrastructure/data-source/postgres/database.module';
import { LeaderboardModule } from './api/leaderboard.module';
import * as Joi from '@hapi/joi';
import { SharedService } from './core/services/shared.service';
import { HighscoreController } from './api/controllers/highscore.controller';

@Module({
  imports: [
    LeaderboardModule,
    CommentModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number(),
      }),
    }),
    DatabaseModule,
  ],
  // controllers: [HighscoreController],
  providers: [
    SharedService,
    LeaderboardModule, //
  ],
})
export class AppModule {}
