import { Personal } from '../../personal/entities/personal.entity';
import { Cita } from '../../cita/entities/cita.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';

@Entity()
export class Programa {
  @PrimaryGeneratedColumn()
  programaId: number;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @Column({ default: true })
  estado: boolean;

  @Column()
  cupoMaximo: number;

  @Column()
  deribacion: boolean;

  @OneToMany(() => Cita, (cita) => cita.programa)
  citas: Cita[];

  @ManyToOne(() => Personal, (personal) => personal.programa)
  @JoinColumn({ name: 'responsableId' })
  responsable: Relation<Personal>;

  @OneToMany(() => Personal, (personal) => personal.asignado)
  personal: Personal[];
}
