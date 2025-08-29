import { Cita } from 'src/cita/entities/cita.entity';
import { Medicina } from 'src/medicina/entities/medicina.entity';
import {
  Entity,
  JoinColumn,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Receta {
  @PrimaryGeneratedColumn()
  recetaId: number;

  @ManyToMany(() => Medicina, (medicina) => medicina.receta)
  @JoinColumn({
    name: 'medicamentos-receta',
  })
  medicamentos: Medicina[];

  @OneToOne(() => Cita, (cita) => cita.receta)
  cita: Cita;
}
