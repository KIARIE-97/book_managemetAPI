import { Module } from '@nestjs/common';
import { ProfilesModule } from './profiles/profiles.module';
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';
import { CategoiesModule } from './categoies/categoies.module';
import { BookreviewsModule } from './bookreviews/bookreviews.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ProfilesModule,
    UsersModule,
    BooksModule,
    CategoiesModule,
    BookreviewsModule,
    ProfilesModule,
    UsersModule,
    BooksModule,
    CategoiesModule,
    BookreviewsModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
