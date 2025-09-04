import { Enfermera } from '../../enfermeras/entities/enfermera.entity';
import { Obstetra } from '../../obstetra/entities/obstetra.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Region } from './region.entity';
import { Provincia } from './provincia.entity';
import { Distrito } from './distrito.entity';

@Entity()
export class Posta {
  @PrimaryGeneratedColumn()
  postaId: number;
  //TODO: QUITAR EL DEFALUT
  @Column({ default: '00000000000' })
  ruc: string;

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
  //TODO: QUITAR EL DEFALUT
  @Column({ default: '0' })
  altitud: string;

  @Column()
  capacidad: number;

  //TODO: QUITAR EL nullable
  @Column({ type: 'date', nullable: true })
  fechaInicioActividad: Date;

  @Column({ type: 'date', default: () => 'GETDATE()' })
  fechaCreacion: Date;

  @Column({ default: true })
  estado: boolean;

  //   @OneToMany(() => Programa, (programa) => programa.posta)
  //   programas: Programa[];

  @OneToMany(() => Obstetra, (obstetra) => obstetra.posta)
  obstetras: Obstetra[];

  @OneToMany(() => Enfermera, (enfermera) => enfermera.posta)
  enfermeras: Enfermera[];

  @ManyToOne(() => Region, (region) => region.postas)
  @JoinColumn({ name: 'regionId' })
  region: Region;

  @ManyToOne(() => Provincia, (provincia) => provincia.postas)
  @JoinColumn({ name: 'provinciaId' })
  provincia: Provincia;

  @ManyToOne(() => Distrito, (distrito) => distrito.postas)
  @JoinColumn({ name: 'distritoId' })
  distrito: Distrito;
}
