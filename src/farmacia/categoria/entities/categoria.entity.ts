import { Medicina } from '../../../farmacia/medicina/entities/medicina.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Categoria {
  @PrimaryGeneratedColumn()
  categoriaId: number;

  @Column()
  nombre: string;

  @Column({ default: true })
  estado: boolean;

  @OneToMany(() => Medicina, (medicina) => medicina.categoria)
  medicinas: Medicina[];
}
