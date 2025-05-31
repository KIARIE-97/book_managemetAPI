import { Module } from '@nestjs/common';
import { CategoiesService } from './categoies.service';
import { CategoiesController } from './categoies.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from 'src/books/entities/book.entity';
import { Categoy } from './entities/categoy.entity';

@Module({
   imports: [
      DatabaseModule,
      TypeOrmModule.forFeature([Book, Categoy]),
    ],
  controllers: [CategoiesController],
  providers: [CategoiesService],
})
export class CategoiesModule {}
