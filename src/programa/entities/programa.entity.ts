import { Enfermera } from '../../enfermeras/entities/enfermera.entity';
import { Obstetra } from '../../obstetra/entities/obstetra.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Programa {
  @PrimaryGeneratedColumn()
  programaId: number;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @Column({ default: true })
  estado: boolean;

  @OneToMany(() => Enfermera, (enfermera) => enfermera.programa)
  enfermeras: Enfermera[];

  @OneToMany(() => Obstetra, (obstetra) => obstetra.programa)
  obstetras: Obstetra[];
}
