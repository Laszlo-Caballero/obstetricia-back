import { Obstetra } from '../../obstetra/entities/obstetra.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Especialidad {
  @PrimaryGeneratedColumn()
  especialidadId: number;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @Column({ default: true })
  estado: boolean;

  @OneToMany(() => Obstetra, (obstetra) => obstetra.especialidad)
  obstetras: Obstetra[];
}
