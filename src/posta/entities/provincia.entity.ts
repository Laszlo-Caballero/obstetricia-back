import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { Posta } from './posta.entity';
import { Distrito } from './distrito.entity';
import { Region } from './region.entity';

@Entity()
export class Provincia {
  @PrimaryGeneratedColumn()
  provinciaId: number;
  @Column()
  nombre: string;

  @OneToMany(() => Distrito, (distrito) => distrito.provincia)
  distritos: Distrito[];

  @ManyToOne(() => Region, (region) => region.provincias)
  region: Relation<Region>;

  @OneToMany(() => Posta, (posta) => posta.provincia)
  postas: Posta[];
}
