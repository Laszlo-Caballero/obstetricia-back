import { Medicina } from '../../../farmacia/medicina/entities/medicina.entity';
import { Receta } from '../../../farmacia/receta/entities/receta.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';

@Entity()
export class RecetaMedicina {
  @PrimaryGeneratedColumn()
  recetamedicinaId: number;

  @Column()
  dosis: string;

  @Column()
  indicacion: string;

  @Column({ default: true })
  estado: boolean;

  @ManyToOne(() => Receta, (receta) => receta.recetaMedicinas)
  receta: Relation<Receta>;

  @ManyToOne(() => Medicina, (medicina) => medicina.detalles)
  medicina: Relation<Medicina>;
}
