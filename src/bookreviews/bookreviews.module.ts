import { Module } from '@nestjs/common';
import { BookreviewsService } from './bookreviews.service';
import { BookreviewsController } from './bookreviews.controller';
import { Profile } from 'src/profiles/entities/profile.entity';
import { Bookreview } from './entities/bookreview.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/database/database.module';
import { Book } from 'src/books/entities/book.entity';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Profile, Bookreview, Book])],
  controllers: [BookreviewsController],
  providers: [BookreviewsService],
})
export class BookreviewsModule {}
