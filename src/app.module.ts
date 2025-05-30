import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfileModule } from './profile/profile.module';
import { UserModule } from './user/user.module';
import { BookModule } from './book/book.module';
import { CategoryModule } from './category/category.module';
import { BookreviewModule } from './bookreview/bookreview.module';
import { ProfilesModule } from './profiles/profiles.module';
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';
import { CategoiesModule } from './categoies/categoies.module';
import { BookreviewsModule } from './bookreviews/bookreviews.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [ProfileModule, UserModule, BookModule, CategoryModule, BookreviewModule, ProfilesModule, UsersModule, BooksModule, CategoiesModule, BookreviewsModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
