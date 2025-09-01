import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Posta } from './posta.entity';

@Entity()
export class Region {
  @PrimaryGeneratedColumn()
  regionId: number;

  @Column()
  nombre: string;

  @OneToMany(() => Posta, (posta) => posta.region)
  postas: Posta[];
}
