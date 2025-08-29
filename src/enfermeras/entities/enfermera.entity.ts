import { Auth } from '../../auth/entities/auth.entity';
import { Posta } from '../../posta/entities/posta.entity';
import { Turno } from '../../turnos/entities/turno.entity';
import { Cita } from '../../cita/entities/cita.entity';
import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Programa } from '../../programa/entities/programa.entity';

@Entity()
export class Enfermera {
  @PrimaryGeneratedColumn()
  enfermeraId: number;

  @Column()
  nombre: string;

  @Column()
  apellido_paterno: string;

  @Column()
  apellido_materno: string;

  @Column()
  cep: string;

  @Column({ default: true })
  estado: boolean;

  @OneToOne(() => Auth, (auth) => auth.enfermera)
  @JoinColumn()
  user: Relation<Auth>;

  @OneToMany(() => Cita, (cita) => cita.enfermera)
  citas: Cita[];

  @ManyToOne(() => Programa, (programa) => programa.enfermeras)
  programa: Programa;

  @ManyToOne(() => Posta, (posta) => posta.enfermeras)
  posta: Relation<Posta>;

  @ManyToOne(() => Turno, (turno) => turno.enfermeras)
  turno: Turno;
}
