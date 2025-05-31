import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from 'src/authors/entities/author.entity';
import { Bookreview } from 'src/bookreviews/entities/bookreview.entity';
import { Book } from 'src/books/entities/book.entity';
import { Categoy } from 'src/categoies/entities/categoy.entity';
import { Profile } from 'src/profiles/entities/profile.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';
import { DataSource } from 'typeorm';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    // Inject any required services here, e.g., database service, user service, etc.
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    @InjectRepository(Bookreview)
    private readonly bookreviewRepository: Repository<Bookreview>,
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
    @InjectRepository(Categoy)
    private readonly categoryRepository: Repository<Categoy>,
    private readonly dataSource: DataSource,
  ) {}

  async seed() {
    this.logger.log('Starting the seeding process...');

    try {
      // Clear all tables using a transaction
      await this.clearTables();

      const users = await this.seedUsers();
      const authors = await this.seedAuthors();
      const categories = await this.seedCategories();
      const books = await this.seedBooks(authors, categories);
      const bookReviews = await this.seedBookReviews();

      this.logger.log('Seeding completed successfully');
      return { message: 'Database seeded successfully' };
    } catch (error) {
      this.logger.error('Error during seeding:', error);
      throw error;
    }
  }
  private async clearTables() {
    this.logger.log('Clearing existing data...');
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.query('DELETE FROM book_categoys_categoy'); // Delete from junction table first
      await queryRunner.query('DELETE FROM bookreview');
      await queryRunner.query('DELETE FROM book');
      await queryRunner.query('DELETE FROM profile'); // Appointment has FK to Patient and Doctor
      await queryRunner.query('DELETE FROM categoy'); // Student has FK to Profile
      await queryRunner.query('DELETE FROM author');
      await queryRunner.query('DELETE FROM "user"');

      await queryRunner.commitTransaction();
      this.logger.log('All tables cleared successfully');
    } catch (err) {
      await queryRunner.rollbackTransaction();
      this.logger.error('Failed to clear tables', err);
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
  private async seedBookReviews() {
    this.logger.log('Seeding book reviews...');
    const bookReviews: Bookreview[] = [];

    for (let i = 1; i <= 50; i++) {
      const bookReview = new Bookreview();
      bookReview.rating = faker.number.int({ min: 1, max: 5 });
      bookReview.content = faker.lorem.paragraph();

      bookReviews.push(await this.bookreviewRepository.save(bookReview));
    }
    this.logger.log(`Created ${bookReviews.length} appointments`);

    return bookReviews;
  }

  private async seedUsers(bookReviews: Bookreview[] = []) {
    this.logger.log('Seeding users...');
    const profiles: Profile[] = [];

    for (let i = 1; i <= 10; i++) {
      const user = new User();
      user.name = faker.person.fullName();
      user.email = faker.internet.email({
        firstName: user.name.split(' ')[0],
        lastName: user.name.split(' ')[1],
        provider: 'gohealth.hos',
      });
      user.password = faker.internet.password();
      user.is_active = true;

      const savedUser = await this.userRepository.save(user);
      this.logger.log(`User ${i} created: ${savedUser.email}`);

      const profile = new Profile();
      profile.bio = faker.lorem.sentence();
      profile.dob = faker.date
        .birthdate({ min: 18, max: 65, mode: 'age' })
        .toISOString();
      profile.location = faker.location.city();
      profile.user = savedUser;

      const savedProfile = await this.profileRepository.save(profile);
      this.logger.log(`Profile for user ${i} created: ${savedProfile.bio}`);

      //create a randomn number of book reviews for each profile
      const bookReviewsCount = faker.number.int({ min: 1, max: 3 });
      const profileReviews: Bookreview[] = [];
      const savedReviews = [...bookReviews];
      for (let j = 0; j < bookReviewsCount; j++) {
        if (savedReviews.length === 0) break;
        const randomnIndex = faker.number.int({
          min: 0,
          max: savedReviews.length - 1,
        });
        const selectedReviews = savedReviews.splice(randomnIndex, 1)[0];
        profileReviews.push(selectedReviews);
      }
      savedProfile.bookreview = profileReviews;
      await this.profileRepository.save(savedProfile);
      profiles.push(savedProfile);
    }
  }
  private async seedAuthors() {
    this.logger.log('Seeding authors...');
    const authors: Author[] = [];
    for (let i = 1; i <= 10; i++) {
      const author = new Author();
      author.name = faker.person.fullName();
      author.bio = faker.lorem.sentence();
        author.birthdate = faker.date
            .birthdate({ min: 18, max: 65, mode: 'age' })
            .toISOString();
      authors.push(await this.authorRepository.save(author));
    }
    this.logger.log(`Created ${authors.length} authors`);
    return authors;
  }

  private async seedCategories() {
    this.logger.log('Seeding categories...');
    const categories: Categoy[] = [];
    for (let i = 1; i <= 5; i++) {
      const category = new Categoy();
      category.name = faker.commerce.department();
      category.description = faker.lorem.sentence();
      categories.push(await this.categoryRepository.save(category));
    }
    this.logger.log(`Created ${categories.length} categories`);
    return categories;
  }

  private async seedBooks(
    authors: Author[],
    categories: Categoy[],
  ): Promise<Book[]> {
    this.logger.log('Seeding books...');
    const books: Book[] = [];
    for (let i = 1; i <= 20; i++) {
      const book = new Book();
      book.title = faker.commerce.productName();
      book.desciption = faker.lorem.paragraph();
      book.publicationYear = faker.date.past({ years: 20 }).getFullYear().toString();
      book.is_available = faker.datatype.boolean();

      // Assign a random author
      const randomAuthor =
        authors[faker.number.int({ min: 0, max: authors.length - 1 })];
      book.authors = randomAuthor.id;

      // Assign 1-3 random categories
      const shuffledCategories = [...categories].sort(
        () => 0.5 - Math.random(),
      );
      book.categoys = shuffledCategories.slice(
        0,
        faker.number.int({ min: 1, max: 3 }),
      );

      books.push(await this.bookRepository.save(book));
    }
    this.logger.log(`Created ${books.length} books`);
    return books;
  }
}
