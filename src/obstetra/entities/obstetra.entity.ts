import { Auth } from '../../auth/entities/auth.entity';
import { Posta } from '../../posta/entities/posta.entity';
import { Turno } from '../../turnos/entities/turno.entity';
import { Cita } from '../../cita/entities/cita.entity';

import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Programa } from '../../programa/entities/programa.entity';

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

  @Column()
  cop: string;

  @Column()
  titulo: string;

  @Column({ default: true })
  estado: boolean;

  @OneToMany(() => Cita, (cita) => cita.obstetra)
  citas: Cita[];

  @ManyToOne(() => Programa, (programa) => programa.obstetras)
  programa: Relation<Programa>;

  @ManyToOne(() => Posta, (posta) => posta.obstetras)
  posta: Posta;

  @ManyToOne(() => Turno, (turno) => turno.obstetras)
  turno: Turno;

  @OneToOne(() => Auth, (auth) => auth.obstetra)
  @JoinColumn()
  user: Relation<Auth>;
}
