import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { Posta } from './posta.entity';
import { Provincia } from './provincia.entity';
import { Region } from './region.entity';

@Entity()
export class Distrito {
  @PrimaryGeneratedColumn()
  distritoId: number;

  @Column()
  nombre: string;

  @ManyToOne(() => Provincia, (provincia) => provincia.distritos)
  provincia: Relation<Provincia>;

  @ManyToOne(() => Region, (region) => region.distritos)
  region: Relation<Region>;

  @OneToMany(() => Posta, (posta) => posta.distrito)
  postas: Posta[];
}
