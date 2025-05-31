import { Book } from 'src/books/entities/book.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn, Relation } from 'typeorm';

@Entity()
export class Categoy {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToMany(() => Book, (book) => book.categoys)
  books: Relation<Book[]>;
}
