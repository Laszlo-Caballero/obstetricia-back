import { Personal } from '../../personal/entities/personal.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TipoPersonal {
  @PrimaryGeneratedColumn()
  tipoPersonalId: number;

  @Column()
  nombre: string;

  @Column({ default: true })
  estado: boolean;

  @OneToMany(() => Personal, (personal) => personal.tipoPersonal)
  personal: Personal[];
}
