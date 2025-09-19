import { Medicina } from '../../farmacia/medicina/entities/medicina.entity';
import { Auth } from '../../auth/entities/auth.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Recurso {
  @PrimaryGeneratedColumn()
  recursoId: number;

  @Column()
  nombre: string;

  @Column()
  extension: string;

  @Column()
  url: string;

  @Column({ default: () => 'GETDATE()' })
  fechaSubida: Date;

  @OneToMany(() => Auth, (auth) => auth.recurso)
  users: Auth[];

  @OneToMany(() => Medicina, (medicina) => medicina.recurso)
  medicinas: Medicina[];
}
