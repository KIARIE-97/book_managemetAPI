import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsController } from './authors.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from 'src/books/entities/book.entity';
import { Author } from './entities/author.entity';

@Module({
  imports: [
      DatabaseModule,
      TypeOrmModule.forFeature([Book, Author]),
    ],
  controllers: [AuthorsController],
  providers: [AuthorsService],
})
export class AuthorsModule {}
