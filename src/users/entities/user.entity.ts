import { Profile } from "src/profiles/entities/profile.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn, Relation } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  is_active: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;

  @OneToOne(() => Profile, (profile) => profile.user)
  profile: Relation<Profile>;
}
