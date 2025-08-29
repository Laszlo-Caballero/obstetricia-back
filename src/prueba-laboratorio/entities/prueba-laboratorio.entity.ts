import { Cita } from '../../cita/entities/cita.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class PruebaLaboratorio {
  @PrimaryGeneratedColumn()
  pruebaId: number;

  @Column()
  nombre: string;

  @Column({ default: true })
  estado: boolean;

  @ManyToMany(() => Cita, (cita) => cita.laboratorios)
  @JoinTable({
    name: 'laboratorio-cita',
  })
  cita: Cita[];
}
