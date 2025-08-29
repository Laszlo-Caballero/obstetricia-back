import { Auth } from '../../auth/entities/auth.entity';
import { Especialidad } from '../../especialidad/entities/especialidad.entity';
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
} from 'typeorm';

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
  user: Relation<Auth>;

  @OneToMany(() => Cita, (cita) => cita.enfermera)
  citas: Cita[];

  @ManyToOne(() => Especialidad, (especialidad) => especialidad.enfermeras)
  especialidad: Especialidad;

  @ManyToOne(() => Posta, (posta) => posta.enfermeras)
  posta: Posta;

  @ManyToOne(() => Turno, (turno) => turno.enfermeras)
  turno: Turno;
}
