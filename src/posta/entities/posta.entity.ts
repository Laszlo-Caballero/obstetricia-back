import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Region } from './region.entity';
import { Provincia } from './provincia.entity';
import { Distrito } from './distrito.entity';
import { Personal } from '../../personal/entities/personal.entity';
import { Programa } from '../../programa/entities/programa.entity';

@Entity()
export class Posta {
  @PrimaryGeneratedColumn()
  postaId: number;
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

  @ManyToMany(() => Personal, (personal) => personal.posta)
  @JoinTable()
  personal: Personal[];

  @ManyToOne(() => Region, (region) => region.postas)
  @JoinColumn({ name: 'regionId' })
  region: Region;

  @ManyToOne(() => Provincia, (provincia) => provincia.postas)
  @JoinColumn({ name: 'provinciaId' })
  provincia: Provincia;

  @ManyToOne(() => Distrito, (distrito) => distrito.postas)
  @JoinColumn({ name: 'distritoId' })
  distrito: Distrito;

  @OneToMany(() => Programa, (programa) => programa.posta)
  programas: Programa[];
}
