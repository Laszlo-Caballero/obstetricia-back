import { Obstetra } from 'src/obstetra/entities/obstetra.entity';
import { Enfermera } from '../../enfermeras/entities/enfermera.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Posta {
  @PrimaryGeneratedColumn()
  postaId: number;

  @Column()
  nombre: string;

  @Column()
  direccion: string;

  @Column()
  ipress: string;

  @Column({ default: true })
  estado: boolean;

  @OneToMany(() => Enfermera, (enfermera) => enfermera.especialidad)
  enfermeras: Enfermera[];

  @OneToMany(() => Obstetra, (obstetra) => obstetra.especialidad)
  obstetras: Obstetra[];
}
