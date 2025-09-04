import { Module } from '@nestjs/common';
import { ConsultaService } from './consulta.service';
import { ConsultaController } from './consulta.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Consulta } from './entities/consulta.entity';
import { Modulo } from '../modulo/entities/modulo.entity';
import { Prioridad } from '../prioridad/entities/prioridad.entity';
import { TipoConsulta } from '../tipo-consulta/entities/tipo-consulta.entity';
import { Auth } from 'src/auth/entities/auth.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Consulta, Modulo, Prioridad, TipoConsulta, Auth])],
  controllers: [ConsultaController],
  providers: [ConsultaService],
})
export class ConsultaModule {}
