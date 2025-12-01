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
import { Personal } from '../../personal/entities/personal.entity';
import { Posta } from '../../posta/entities/posta.entity';
import { Cita } from '../../cita/entities/cita.entity';

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

  @ManyToOne(() => Personal, (personal) => personal.motivos)
  personal: Relation<Personal>;

  @ManyToOne(() => Posta, (posta) => posta.motivos)
  posta: Relation<Posta>;

  @ManyToOne(() => Cita, (cita) => cita.motivos)
  cita: Relation<Cita>;
}
