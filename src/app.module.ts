import { Module } from '@nestjs/common';
import { ProfilesModule } from './profiles/profiles.module';
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';
import { CategoiesModule } from './categoies/categoies.module';
import { BookreviewsModule } from './bookreviews/bookreviews.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { SeedModule } from './seed/seed.module';
import { AuthorsModule } from './authors/authors.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
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
    SeedModule,
    AuthorsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
