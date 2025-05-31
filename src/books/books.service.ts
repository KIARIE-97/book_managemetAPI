import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';
import { Categoy } from 'src/categoies/entities/categoy.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private bookRepository: Repository<Book>,
    @InjectRepository(Categoy) private categoyRepository: Repository<Categoy>,
  ) {}
  create(createBookDto: CreateBookDto) {
    return 'This action adds a new book';
  }
  async assignCategoryToBook(
    bookId: number,
    categoryId: number,
  ): Promise<Book> {
    // Find the book with categories relation
    const book = await this.bookRepository.findOne({
      where: { id: bookId },
      relations: ['categories'],
    });

    if (!book) {
      throw new NotFoundException(`Book with ID ${bookId} not found`);
    }

    // Find the category
    const category = await this.categoyRepository.findOneBy({ id: categoryId });
    if (!category) {
      throw new NotFoundException(`Category with ID ${categoryId} not found`);
    }

    // Initialize categories array if it doesn't exist
    if (!book.categoys) {
      book.categoys = [];
    }

    // Check if already assigned
    const isAlreadyAssigned = book.categoys.some(
      (assignedCategory) => assignedCategory.id === categoryId,
    );

    if (!isAlreadyAssigned) {
      book.categoys.push(category);
      await this.bookRepository.save(book);
    }

    return book;
  }

  findAll() {
    return `This action returns all books`;
  }

  findOne(id: number) {
    return `This action returns a #${id} book`;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
