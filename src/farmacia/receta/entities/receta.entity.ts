import { RecetaMedicina } from '../../../farmacia/receta-medicina/entities/receta-medicina.entity';
import { Cita } from '../../../cita/entities/cita.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';

@Entity()
export class Receta {
  @PrimaryGeneratedColumn()
  recetaId: number;

  @Column()
  detalle: string;

  // @ManyToMany(() => Medicina, (medicina) => medicina.receta)
  // @JoinTable({
  //   name: 'medicamentos-receta',
  // })
  // medicamentos: Medicina[];

  @OneToOne(() => Cita, (cita) => cita.receta)
  @JoinColumn()
  cita: Relation<Cita>;

  @OneToMany(() => RecetaMedicina, (recetaMedicina) => recetaMedicina.receta)
  recetaMedicinas: RecetaMedicina[];
}
