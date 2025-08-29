import { Receta } from '../../receta/entities/receta.entity';
import { Diagnostico } from '../../diagnostico/entities/diagnostico.entity';
import { Enfermera } from '../../enfermeras/entities/enfermera.entity';
import { Paciente } from '../../pacientes/entities/paciente.entity';
import { Obstetra } from '../../obstetra/entities/obstetra.entity';

import {
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { PruebaLaboratorio } from 'src/prueba-laboratorio/entities/prueba-laboratorio.entity';

@Entity()
export class Cita {
  @PrimaryGeneratedColumn()
  citaId: number;

  @OneToOne(() => Receta, (receta) => receta.cita)
  receta: Receta;

  @ManyToOne(() => Enfermera, (enfermera) => enfermera.citas)
  enfermera: Enfermera;

  @ManyToOne(() => Paciente, (paciente) => paciente.citas)
  paciente: Paciente;

  @ManyToOne(() => Obstetra, (obstetra) => obstetra.citas)
  obstetra: Obstetra;

  @ManyToMany(() => PruebaLaboratorio, (laboratorio) => laboratorio.cita)
  @JoinColumn({
    name: 'laboratorio-cita',
  })
  laboratorios: PruebaLaboratorio[];

  @ManyToMany(() => Diagnostico, (diagnostico) => diagnostico.cita)
  @JoinColumn({
    name: 'diagnostico-cita',
  })
  diagnosticos: Diagnostico[];
}
