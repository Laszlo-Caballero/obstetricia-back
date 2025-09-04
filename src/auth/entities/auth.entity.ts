import { Roles } from '../../role/entities/roles.entity';
import { Obstetra } from '../../obstetra/entities/obstetra.entity';
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
import { Enfermera } from '../../enfermeras/entities/enfermera.entity';
import { Consulta } from '../../ayuda/consulta/entities/consulta.entity';

@Entity('user')
export class Auth {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  user: string;

  @Column()
  password: string;

  @OneToOne(() => Obstetra, (obstetra) => obstetra.user)
  @JoinColumn()
  obstetra: Relation<Obstetra>;

  @OneToOne(() => Enfermera, (enfermera) => enfermera.user)
  enfermera: Enfermera;

  @OneToMany(() => Consulta, (consulta) => consulta.user)
  consultas: Consulta[];

  @ManyToOne(() => Roles, (role) => role.users)
  role: Relation<Roles>;
}
