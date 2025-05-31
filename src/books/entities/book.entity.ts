import { Author } from "src/authors/entities/author.entity";
import { Bookreview } from "src/bookreviews/entities/bookreview.entity";
import { Categoy } from "src/categoies/entities/categoy.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, Relation } from "typeorm";

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  desciption: string;

  @Column()
  publicationYear: string;

  @Column()
  is_available: boolean;

  @ManyToMany(() => Categoy, (categoy) => categoy.books)
  @JoinTable() // Important! This creates the join table in the database
  categoys: Relation<Categoy[]>;

  @ManyToOne(() => Author, (author) => author.id)
  authors: Author['id'];

  @OneToMany(() => Bookreview, (bookreview) => bookreview.books)
  bookreviews: Bookreview[];
}
