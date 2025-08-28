import { Auth } from '../../auth/entities/auth.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Roles {
  @PrimaryGeneratedColumn()
  roleId: number;

  @Column()
  roleName: string;

  @OneToMany(() => Auth, (auth) => auth.role)
  users: Auth[];
}
