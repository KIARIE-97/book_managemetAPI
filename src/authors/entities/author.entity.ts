import { Book } from "src/books/entities/book.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Author {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column()
  bio: string;

  @Column()
  birthdate: string;

  @OneToMany(() => Book, (book) => book.authors)
  books: Book[];
}
