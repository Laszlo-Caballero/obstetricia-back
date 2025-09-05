import { Auth } from '../../auth/entities/auth.entity';
import { Cita } from '../../cita/entities/cita.entity';
import { Posta } from '../../posta/entities/posta.entity';
import { TipoPersonal } from '../../tipo-personal/entities/tipo-personal.entity';
import { Turno } from '../../turnos/entities/turno.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';

@Entity()
export class Personal {
  @PrimaryGeneratedColumn()
  personalId: number;

  @Column()
  nombre: string;

  @Column()
  apellidoPaterno: string;

  @Column()
  apellidoMaterno: string;

  @Column({ type: 'date' })
  fechaNacimiento: Date;

  @Column()
  sexo: string;

  @Column()
  telefono: string;

  @Column()
  dni: string;

  @Column()
  codigoColegio: string;

  @Column({ default: true })
  estado: boolean;

  @OneToOne(() => Auth, (auth) => auth.personal)
  @JoinColumn({ name: 'userId' })
  user: Relation<Auth>;

  @ManyToOne(() => Turno, (turno) => turno.personal)
  turno: Turno;

  @ManyToMany(() => Posta, (posta) => posta.personal)
  @JoinTable({
    name: 'personal_postas',
    joinColumn: { name: 'personalId' },
    inverseJoinColumn: { name: 'postaId' },
  })
  posta: Posta[];

  @ManyToOne(() => TipoPersonal, (tipoPersonal) => tipoPersonal.personal)
  tipoPersonal: TipoPersonal;

  @OneToMany(() => Cita, (cita) => cita.personal)
  citas: Cita[];
}
