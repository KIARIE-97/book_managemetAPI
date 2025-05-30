import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookreviewDto } from './dto/create-bookreview.dto';
import { UpdateBookreviewDto } from './dto/update-bookreview.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'src/profiles/entities/profile.entity';
import { Repository } from 'typeorm';
import { Bookreview } from './entities/bookreview.entity';

@Injectable()
export class BookreviewsService {
  constructor(
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    @InjectRepository(Bookreview)
    private bookreviewRepository: Repository<Bookreview>,
  ) {}

  async create(createBookreviewDto: CreateBookreviewDto): Promise<Bookreview> {
    // Find the department
    const profile = await this.profileRepository.findOne({
      where: { id: createBookreviewDto.profile_id },
    });

    if (!profile) {
      throw new NotFoundException(
        `profile with ID ${createBookreviewDto.profile_id} not found`,
      );
    }

    // Create a new course instance
    const newBookreview = this.bookreviewRepository.create({
      rating: createBookreviewDto.rating,
      content: createBookreviewDto.content,
      profile: createBookreviewDto.profile_id,
    });

    // Save the course to the database
    return this.bookreviewRepository.save(newBookreview);
  }

  async findAll(search?: string): Promise<Bookreview[]> {
    if (search) {
      return this.bookreviewRepository.find({
        where: [ { content: `%${search}%` }],
        relations: ['profile'],
      });
    }
    return this.bookreviewRepository.find({
      relations: ['profile'],
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} bookreview`;
  }

  update(id: number, updateBookreviewDto: UpdateBookreviewDto) {
    return `This action updates a #${id} bookreview`;
  }

  remove(id: number) {
    return `This action removes a #${id} bookreview`;
  }
}
