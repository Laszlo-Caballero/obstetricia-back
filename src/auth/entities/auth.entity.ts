import { Roles } from '../../role/entities/roles.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { Consulta } from '../../ayuda/consulta/entities/consulta.entity';
import { Personal } from '../../personal/entities/personal.entity';

@Entity('user')
export class Auth {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  user: string;

  @Column()
  password: string;

  @OneToOne(() => Personal, (personal) => personal.user)
  @JoinColumn()
  personal: Personal;

  @OneToMany(() => Consulta, (consulta) => consulta.user)
  consultas: Consulta[];

  @ManyToOne(() => Roles, (role) => role.users)
  role: Relation<Roles>;
}
