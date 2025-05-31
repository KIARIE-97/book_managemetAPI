
import { Book } from "src/books/entities/book.entity";
import { Profile } from "src/profiles/entities/profile.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Bookreview {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rating: number;

  @Column()
  content: string;

  @ManyToOne(() => Profile, (profile) => profile.id)
  profile: Profile['id'];

  @ManyToOne(() => Book, (book) => book.id)
  books: Book['id'];

  
}
