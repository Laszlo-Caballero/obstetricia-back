import { Cita } from '../../cita/entities/cita.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  @OneToMany(() => Cita, (cita) => cita.programa)
  citas: Cita[];
}
