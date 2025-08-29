import { Enfermera } from '../../enfermeras/entities/enfermera.entity';
import { Obstetra } from '../../obstetra/entities/obstetra.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Turno {
  @PrimaryGeneratedColumn()
  turnoId: number;

  @Column()
  horaInicio: string;

  @Column()
  horaFin: string;

  @Column({ default: true })
  estado: boolean;

  @OneToMany(() => Enfermera, (enfermera) => enfermera.turno)
  enfermeras: Enfermera[];

  @OneToMany(() => Obstetra, (obstetra) => obstetra.turno)
  obstetras: Obstetra[];
}
