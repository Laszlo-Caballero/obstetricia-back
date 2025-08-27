import { Auth } from '../../auth/entities/auth.entity';
import { Especialidad } from '../../especialidad/entities/especialidad.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';

@Entity()
export class Obstetra {
  @PrimaryGeneratedColumn()
  obstetraId: number;

  @Column()
  nombre: string;

  @Column()
  apellido_paterno: string;

  @Column()
  apellido_materno: string;

  @ManyToOne(() => Especialidad, (especialidad) => especialidad.obstetras)
  especialidad: Relation<Especialidad>;

  @OneToOne(() => Auth, (auth) => auth.obstetra)
  user: Auth;
}
