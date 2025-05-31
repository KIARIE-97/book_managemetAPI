import { Injectable } from '@nestjs/common';
import { CreateCategoyDto } from './dto/create-categoy.dto';
import { UpdateCategoyDto } from './dto/update-categoy.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/books/entities/book.entity';
import { Repository } from 'typeorm';
import { Categoy } from './entities/categoy.entity';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class CategoiesService {
  constructor(
    @InjectRepository(Book) private bookRepository: Repository<Book>,
    @InjectRepository(Categoy) private categoyRepository: Repository<Categoy>,
  ) {}
  create(createCategoyDto: CreateCategoyDto) {
    return 'This action adds a new categoy';
  }
  async getBooksInCategory(categoryId: number): Promise<Book[]> {
    const category = await this.categoyRepository.findOne({
      where: { id: categoryId },
      relations: ['books'],
    });

    if (!category) {
      throw new NotFoundException(`Category with ID ${categoryId} not found`);
    }

    return category.books || [];
  }
  async addBookToCategory(
    categoryId: number,
    bookId: number,
  ): Promise<Categoy> {
    const category = await this.categoyRepository.findOne({
      where: { id: categoryId },
      relations: ['books'],
    });

    if (!category) {
      throw new NotFoundException(`Category with ID ${categoryId} not found`);
    }

    const book = await this.bookRepository.findOneBy({ id: bookId });
    if (!book) {
      throw new NotFoundException(`Book with ID ${bookId} not found`);
    }

    if (!category.books) {
      category.books = [];
    }

    const isAlreadyAdded = category.books.some((b) => b.id === bookId);

    if (!isAlreadyAdded) {
      category.books.push(book);
      await this.categoyRepository.save(category);
    }

    return category;
  }
  async removeBookFromCategory(
    categoryId: number,
    bookId: number,
  ): Promise<Categoy> {
    const category = await this.categoyRepository.findOne({
      where: { id: categoryId },
      relations: ['books'],
    });

    if (!category) {
      throw new NotFoundException(`Category with ID ${categoryId} not found`);
    }

    if (!category.books || category.books.length === 0) {
      throw new NotFoundException(
        `Category with ID ${categoryId} has no books`,
      );
    }

    category.books = category.books.filter((book) => book.id !== bookId);

    return this.categoyRepository.save(category);
  }
  findAll() {
    return `This action returns all categoies`;
  }

  findOne(id: number) {
    return `This action returns a #${id} categoy`;
  }

  update(id: number, updateCategoyDto: UpdateCategoyDto) {
    return `This action updates a #${id} categoy`;
  }

  remove(id: number) {
    return `This action removes a #${id} categoy`;
  }
}
