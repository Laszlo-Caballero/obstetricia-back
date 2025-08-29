import { Receta } from 'src/receta/entities/receta.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Medicina {
  @PrimaryGeneratedColumn()
  medicinaId: number;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @Column()
  stock: number;

  @Column({ default: true })
  estado: boolean;

  @ManyToMany(() => Receta, (receta) => receta.medicamentos)
  receta: Receta[];
}
