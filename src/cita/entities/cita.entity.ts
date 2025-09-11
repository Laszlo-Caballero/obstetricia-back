import { Receta } from '../../farmacia/receta/entities/receta.entity';
import { Diagnostico } from '../../diagnostico/entities/diagnostico.entity';
import { Paciente } from '../../pacientes/entities/paciente.entity';

import {
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  ManyToMany,
  ManyToOne,
  JoinTable,
  Relation,
  Column,
} from 'typeorm';
import { PruebaLaboratorio } from '../../prueba-laboratorio/entities/prueba-laboratorio.entity';
import { Personal } from '../../personal/entities/personal.entity';
import { Turno } from '../../turnos/entities/turno.entity';
import { Programa } from '../../programa/entities/programa.entity';

@Entity()
export class Cita {
  @PrimaryGeneratedColumn()
  citaId: number;

  @OneToOne(() => Receta, (receta) => receta.cita)
  receta: Receta;

  @ManyToOne(() => Personal, (personal) => personal.citas)
  personal: Relation<Personal>;

  @ManyToOne(() => Paciente, (paciente) => paciente.citas)
  paciente: Paciente;

  @ManyToMany(() => PruebaLaboratorio, (laboratorio) => laboratorio.cita)
  @JoinTable({
    name: 'laboratorio-cita',
  })
  laboratorios: PruebaLaboratorio[];

  @ManyToMany(() => Diagnostico, (diagnostico) => diagnostico.cita)
  @JoinTable({
    name: 'diagnostico-cita',
  })
  diagnosticos: Diagnostico[];

  @ManyToOne(() => Turno, (turno) => turno.citas)
  turno: Turno;

  @ManyToOne(() => Programa, (programa) => programa.citas)
  programa: Programa;

  @Column()
  fecha: Date;

  @Column({ default: '' })
  nota: string;

  @Column({ default: true })
  estado: boolean;
}
