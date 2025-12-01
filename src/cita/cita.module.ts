import { Module } from '@nestjs/common';
import { CitaService } from './cita.service';
import { CitaController } from './cita.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Receta } from 'src/farmacia/receta/entities/receta.entity';
import { Personal } from 'src/personal/entities/personal.entity';
import { Paciente } from 'src/pacientes/entities/paciente.entity';
import { PruebaLaboratorio } from 'src/prueba-laboratorio/entities/prueba-laboratorio.entity';
import { Diagnostico } from 'src/diagnostico/entities/diagnostico.entity';
import { Programa } from 'src/programa/entities/programa.entity';
import { Cita } from './entities/cita.entity';
import { Turno } from 'src/turnos/entities/turno.entity';
import { Motivo } from 'src/motivos/entities/motivo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Receta,
      Personal,
      Paciente,
      PruebaLaboratorio,
      Diagnostico,
      Programa,
      Cita,
      Turno,
      Motivo,
    ]),
  ],
  controllers: [CitaController],
  providers: [CitaService],
})
export class CitaModule {}
