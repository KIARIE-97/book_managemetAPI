import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from 'src/books/entities/book.entity';
import { Bookreview } from 'src/bookreviews/entities/bookreview.entity';
import { User } from 'src/users/entities/user.entity';
import { Profile } from 'src/profiles/entities/profile.entity';
import { Author } from 'src/authors/entities/author.entity';
import { Categoy } from 'src/categoies/entities/categoy.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Bookreview, User, Profile, Author, Categoy])],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}
