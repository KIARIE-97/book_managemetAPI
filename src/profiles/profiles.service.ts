import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';


@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async create(createProfileDto: CreateProfileDto) {
    const existingUser = await this.userRepository.findOneBy({
      id: createProfileDto.user_id,
    });

    if (!existingUser) {
      throw new NotFoundException(
        `Profile with id ${createProfileDto.user_id} not found`,
      );
    }
    const newprofile = this.profileRepository.create({
      bio: createProfileDto.bio,
      dob: createProfileDto.dob,
      location: createProfileDto.location,
      user: existingUser,
    });

    return this.profileRepository.save(newprofile);
  }

  async findAll(name?: string): Promise<Profile[] | Profile> {
    if (name) {
      return await this.profileRepository.find({
        where: {
          user: {
            name: name,
          },
        },
        relations: ['user', 'bookreview'],
      });
    }
    return await this.profileRepository.find({
      relations: ['user', 'bookreview'],
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} profile`;
  }

  update(id: number, updateProfileDto: UpdateProfileDto) {
    return `This action updates a #${id} profile`;
  }

  async remove(id: number): Promise<string> {
    return await this.profileRepository
      .delete(id)
      .then((result) => {
        if (result.affected === 0) {
          return `No profile found with id ${id}`;
        }
        return `profile with id ${id} has been removed`;
      })
      .catch((error) => {
        console.error('Error removing profile:', error);
        throw new Error(`Failed to remove profile with id ${id}`);
      });
  }
}
