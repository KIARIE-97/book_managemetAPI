import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { Book } from './entities/book.entity';
import { Categoy } from 'src/categoies/entities/categoy.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/database/database.module';
import { Author } from 'src/authors/entities/author.entity';
import { Bookreview } from 'src/bookreviews/entities/bookreview.entity';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([Book, Categoy, Author, Bookreview]),
  ],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
