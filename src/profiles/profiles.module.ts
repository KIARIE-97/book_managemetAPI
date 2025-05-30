import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { User } from 'src/users/entities/user.entity';
import { DatabaseModule } from 'src/database/database.module';
import { Bookreview } from 'src/bookreviews/entities/bookreview.entity';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Profile, User, Bookreview])],
  controllers: [ProfilesController],
  providers: [ProfilesService],
})
export class ProfilesModule {}
