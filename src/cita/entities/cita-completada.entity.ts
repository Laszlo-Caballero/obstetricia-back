import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Receta } from '../../farmacia/receta/entities/receta.entity';
import { Diagnostico } from '../../diagnostico/entities/diagnostico.entity';
import { Paciente } from '../../pacientes/entities/paciente.entity';
import { PruebaLaboratorio } from '../../prueba-laboratorio/entities/prueba-laboratorio.entity';
import { Personal } from '../../personal/entities/personal.entity';
import { Turno } from '../../turnos/entities/turno.entity';
import { Programa } from '../../programa/entities/programa.entity';
import { Motivo } from '../../motivos/entities/motivo.entity';

export type CitaCompletadaDocument = HydratedDocument<CitaCompletada>;

@Schema({ collection: 'citas_completadas' })
export class CitaCompletada {
  @Prop()
  citaId: number;

  @Prop({ type: Object })
  receta: Receta;

  @Prop({ type: Object })
  personal: Personal;

  @Prop({ type: Object })
  creadoPor: Personal;

  @Prop({ type: Object })
  paciente: Paciente;

  @Prop({ type: [Object] })
  laboratorios: PruebaLaboratorio[];

  @Prop({ type: [Object] })
  diagnosticos: Diagnostico[];

  @Prop({ type: Object })
  turno: Turno;

  @Prop({ type: Object })
  programa: Programa;

  @Prop()
  fecha: Date;

  @Prop()
  nota: string;

  @Prop()
  estado: string;

  @Prop({ type: [Object] })
  motivos: Motivo[];
}

export const CitaCompletadaSchema = SchemaFactory.createForClass(CitaCompletada);
