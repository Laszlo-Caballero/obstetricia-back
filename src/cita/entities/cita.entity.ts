import { Receta } from '../../receta/entities/receta.entity';
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
} from 'typeorm';
import { PruebaLaboratorio } from '../../prueba-laboratorio/entities/prueba-laboratorio.entity';
import { Personal } from '../../personal/entities/personal.entity';

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
}
