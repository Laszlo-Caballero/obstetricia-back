import { RecetaMedicina } from '../../../farmacia/receta-medicina/entities/receta-medicina.entity';
import { Cita } from '../../../cita/entities/cita.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { Motivo } from '../../../motivos/entities/motivo.entity';

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

  @OneToMany(() => Motivo, (motivo) => motivo.receta)
  motivos: Relation<Motivo[]>;

  @OneToMany(() => RecetaMedicina, (recetaMedicina) => recetaMedicina.receta)
  recetaMedicinas: RecetaMedicina[];
}
