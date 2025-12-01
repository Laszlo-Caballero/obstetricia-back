import { Cita } from '../../cita/entities/cita.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Diagnostico {
  @PrimaryGeneratedColumn()
  diagnosticoId: number;

  @Column()
  nombre: string;

  @Column({ type: 'varchar', length: 'max' })
  descripcion: string;

  @Column({ default: true })
  estado: boolean;

  @ManyToMany(() => Cita, (cita) => cita.diagnosticos)
  cita: Cita[];
}
