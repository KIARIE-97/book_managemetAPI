import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';
import { Categoy } from 'src/categoies/entities/categoy.entity';
import { Author } from 'src/authors/entities/author.entity';
import { Bookreview } from 'src/bookreviews/entities/bookreview.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private bookRepository: Repository<Book>,
    @InjectRepository(Author)
    private authorRepository: Repository<Author>,
    @InjectRepository(Categoy) private categoyRepository: Repository<Categoy>,
    @InjectRepository(Bookreview)
    private bookreviewRepository: Repository<Bookreview>,
  ) {}
  async create(createBookDto: CreateBookDto): Promise<Book> {
    // Find the author
    const author = await this.authorRepository.findOne({
      where: { id: createBookDto.author_id },
    });

    if (!author) {
      throw new NotFoundException(
        `Author with id ${createBookDto.author_id} not found`,
      );
    }

    const newBook = this.bookRepository.create({
      title: createBookDto.title,
      desciption: createBookDto.description,
      publicationYear: createBookDto.publicationYear,
      is_available: createBookDto.is_available,
      authors: author.id, // Set the author's ID
    });

    return this.bookRepository.save(newBook);
  }
  async assignCategoryToBook(
    book_id: number,
    categoryId: number,
  ): Promise<Book> {
    // Find the book with categories relation
    const book = await this.bookRepository.findOne({
      where: { id: book_id },
      relations: ['categories'],
    });

    if (!book) {
      throw new NotFoundException(`Book with ID ${book_id} not found`);
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

  async findAll(name?: string): Promise<Book[] | Book> {
    if (name) {
      return await this.bookRepository.find({
        where: {
          title: `%${name}%`,
        },
        relations: ['bookreviews'],
      });
    }
    return await this.bookRepository.find({
      relations: ['bookreviews'],
    });
  }

  async addReviewToBook(book_id: number, review_id: number): Promise<Book> {
    // Find the book with bookreviews relation
    const book = await this.bookRepository.findOne({
      where: { id: book_id },
      relations: ['bookreviews'],
    });

    if (!book) {
      throw new NotFoundException(`Book with ID ${book_id} not found`);
    }

    // Find the review
    const review = await this.bookreviewRepository.findOneBy({ id: review_id });
    if (!review) {
      throw new NotFoundException(`Review with ID ${review_id} not found`);
    }

    // Initialize bookreviews array if it doesn't exist
    if (!book.bookreviews) {
      book.bookreviews = [];
    }

    // Check if already added
    const isAlreadyAdded = book.bookreviews.some((r) => r.id === review_id);

    if (!isAlreadyAdded) {
      book.bookreviews.push(review);
      await this.bookRepository.save(book);
    }

    return book;
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
