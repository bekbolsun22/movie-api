import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Movie, MovieSchema } from './schemas';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://db/movies'),
    // MongooseModule.forRoot('mongodb://localhost/movies'),
    MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
