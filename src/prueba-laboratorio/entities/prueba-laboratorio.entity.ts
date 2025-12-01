import { Recurso } from '../../recurso/entities/recurso.entity';
import { Cita } from '../../cita/entities/cita.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { Personal } from '../../personal/entities/personal.entity';
import { Motivo } from '../../motivos/entities/motivo.entity';

@Entity()
export class PruebaLaboratorio {
  @PrimaryGeneratedColumn()
  pruebaId: number;

  @Column()
  nombre: string;

  @Column()
  estado: string;

  @Column({ default: () => 'GETDATE()' })
  fechaCreacion: Date;

  @ManyToOne(() => Recurso, (recurso) => recurso.pruebasLaboratorio)
  documento: Relation<Recurso>;

  @ManyToOne(() => Personal, (personal) => personal.pruebasLaboratorio)
  responsable: Relation<Personal>;

  @OneToMany(() => Motivo, (motivo) => motivo.pruebaLaboratorio)
  motivos: Motivo[];

  @ManyToMany(() => Cita, (cita) => cita.laboratorios)
  cita: Cita[];
}
