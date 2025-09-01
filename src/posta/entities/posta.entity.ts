import { Enfermera } from '../../enfermeras/entities/enfermera.entity';
import { Obstetra } from '../../obstetra/entities/obstetra.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Region } from './region.entity';

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

  @Column()
  lat: string;

  @Column()
  lng: string;

  @Column()
  capacidad: number;

  @Column({ default: true })
  estado: boolean;

  //   @OneToMany(() => Programa, (programa) => programa.posta)
  //   programas: Programa[];

  @OneToMany(() => Obstetra, (obstetra) => obstetra.posta)
  obstetras: Obstetra[];

  @OneToMany(() => Enfermera, (enfermera) => enfermera.posta)
  enfermeras: Enfermera[];

  @ManyToOne(() => Region, (region) => region.postas)
  region: Region;
}
