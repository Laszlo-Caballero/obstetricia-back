import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Posta } from './posta.entity';
import { Provincia } from './provincia.entity';
import { Distrito } from './distrito.entity';

@Entity()
export class Region {
  @PrimaryGeneratedColumn()
  regionId: number;

  @Column()
  nombre: string;

  @OneToMany(() => Provincia, (provincia) => provincia.region)
  provincias: Provincia[];

  @OneToMany(() => Distrito, (distrito) => distrito.region)
  distritos: Distrito[];

  @OneToMany(() => Posta, (posta) => posta.region)
  postas: Posta[];
}
