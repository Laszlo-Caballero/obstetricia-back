import { Categoria } from '../../../farmacia/categoria/entities/categoria.entity';
import { Presentacion } from '../../../farmacia/presentacion/entities/presentacion.entity';
import { RecetaMedicina } from '../../../farmacia/receta-medicina/entities/receta-medicina.entity';

import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Medicina {
  @PrimaryGeneratedColumn()
  medicinaId: number;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @Column()
  codigo: string;

  @Column()
  stock: number;

  @Column({ type: 'date', default: () => 'GETDATE()' })
  fechaCreacion: Date;

  @Column({ default: true })
  estado: boolean;

  @ManyToOne(() => Categoria, (categoria) => categoria.medicinas)
  categoria: Categoria;

  @ManyToOne(() => Presentacion, (presentacion) => presentacion.medicinas)
  presentacion: Presentacion;

  @OneToMany(() => RecetaMedicina, (recetamedicina) => recetamedicina.medicina)
  detalles: RecetaMedicina[];
}
