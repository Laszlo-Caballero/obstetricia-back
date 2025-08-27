import { Obstetra } from '../../obstetra/entities/obstetra.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class Auth {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  user: string;

  @Column()
  password: string;

  @OneToOne(() => Obstetra, (obstetra) => obstetra.user)
  obstetra: Obstetra;
}
