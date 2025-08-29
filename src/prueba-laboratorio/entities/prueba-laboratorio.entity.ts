import { Cita } from '../../cita/entities/cita.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PruebaLaboratorio {
  @PrimaryGeneratedColumn()
  pruebaId: number;

  @Column()
  nombre: string;

  @Column({ default: true })
  estado: boolean;

  @ManyToMany(() => Cita, (cita) => cita.laboratorios)
  cita: Cita[];
}
