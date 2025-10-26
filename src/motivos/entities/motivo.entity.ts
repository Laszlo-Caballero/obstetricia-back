import { Medicina } from '../../farmacia/medicina/entities/medicina.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  @OneToMany(() => Medicina, (medicina) => medicina.motivo)
  medicina: Medicina[];
}
