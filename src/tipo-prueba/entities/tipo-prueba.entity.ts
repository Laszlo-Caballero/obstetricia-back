import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TipoPrueba {
  @PrimaryGeneratedColumn()
  tipoId: number;

  @Column()
  nombre: string;

  @Column({ default: true })
  estado: boolean;
}
