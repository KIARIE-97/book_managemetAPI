import { Bookreview } from "src/bookreviews/entities/bookreview.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, Relation } from "typeorm";

@Entity()
export class Profile {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  bio: string;

  @Column()
  dob: string;

  @Column()
  location: string;

  @OneToOne(() => User, (user) => user.profile, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: Relation<User>;

  @OneToMany(() => Bookreview, (bookreview) => bookreview.profile) // Define the relationship with Course by specifying the inverse side
  bookreview: Bookreview[];
}
