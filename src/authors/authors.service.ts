import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Author } from './entities/author.entity';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private authorRepository: Repository<Author>,
  ) {}

  async findAll(search?: string) {
    if (search) {
      return this.authorRepository.find({
        where: [{ name: `%${search}%` }],
        relations: ['books'],
      });
    }
    return this.authorRepository.find({
      relations: ['books'],
    });
  }

  create(createAuthorDto: CreateAuthorDto) {
    return 'This action adds a new author';
  }

  // findAll() {
  //   return `This action returns all authors`;
  // }

  findOne(id: number) {
    return `This action returns a #${id} author`;
  }

  update(id: number, updateAuthorDto: UpdateAuthorDto) {
    return `This action updates a #${id} author`;
  }

  remove(id: number) {
    return `This action removes a #${id} author`;
  }
}
