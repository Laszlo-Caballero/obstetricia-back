import { Cita } from '../../cita/entities/cita.entity';
import { Personal } from '../../personal/entities/personal.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Turno {
  @PrimaryGeneratedColumn()
  turnoId: number;

  @Column()
  horaInicio: string;

  @Column()
  horaFin: string;

  @Column({ default: true })
  estado: boolean;

  @OneToMany(() => Personal, (personal) => personal.turno)
  personal: Personal[];

  @OneToMany(() => Cita, (cita) => cita.turno)
  citas: Cita[];
}
