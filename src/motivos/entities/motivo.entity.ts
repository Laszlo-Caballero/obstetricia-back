import { Medicina } from '../../farmacia/medicina/entities/medicina.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { Programa } from '../../programa/entities/programa.entity';

@Entity()
export class Motivo {
  @PrimaryGeneratedColumn()
  motivoId: number;

  @Column()
  nombreTabla: string;

  @Column({ type: 'varchar', length: 'max' })
  razon: string;

  @Column({ default: true })
  estado: boolean;

  @ManyToOne(() => Programa, (programa) => programa.motivos)
  @JoinColumn({ name: 'programaId' })
  programa: Relation<Programa>;

  @ManyToOne(() => Medicina, (medicina) => medicina.motivo)
  medicina: Relation<Medicina>;
}
