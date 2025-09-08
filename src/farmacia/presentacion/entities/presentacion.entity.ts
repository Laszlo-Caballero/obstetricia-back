import { Medicina } from '../../../farmacia/medicina/entities/medicina.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Presentacion {
  @PrimaryGeneratedColumn()
  presentacionId: number;

  @Column()
  nombre: string;

  @Column({ default: true })
  estado: boolean;

  @OneToMany(() => Medicina, (medicina) => medicina.presentacion)
  medicinas: Medicina[];
}
