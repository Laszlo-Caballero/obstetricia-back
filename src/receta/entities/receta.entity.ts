import { Cita } from '../../cita/entities/cita.entity';
import { Medicina } from '../../medicina/entities/medicina.entity';
import {
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Receta {
  @PrimaryGeneratedColumn()
  recetaId: number;

  @ManyToMany(() => Medicina, (medicina) => medicina.receta)
  @JoinTable({
    name: 'medicamentos-receta',
  })
  medicamentos: Medicina[];

  @OneToOne(() => Cita, (cita) => cita.receta)
  @JoinColumn()
  cita: Cita;
}
