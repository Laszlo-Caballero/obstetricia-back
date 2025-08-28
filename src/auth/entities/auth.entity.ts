import { Roles } from '../../role/entities/roles.entity';
import { Obstetra } from '../../obstetra/entities/obstetra.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';

@Entity('user')
export class Auth {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  user: string;

  @Column()
  password: string;

  @OneToOne(() => Obstetra, (obstetra) => obstetra.user)
  obstetra: Relation<Obstetra>;

  @ManyToOne(() => Roles, (role) => role.users)
  role: Relation<Roles>;
}
