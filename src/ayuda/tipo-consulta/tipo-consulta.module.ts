import { Module } from '@nestjs/common';
import { TipoConsultaService } from './tipo-consulta.service';
import { TipoConsultaController } from './tipo-consulta.controller';
import { RedisService } from 'src/redis/redis.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoConsulta } from './entities/tipo-consulta.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TipoConsulta]) 
  ],
  controllers: [TipoConsultaController],
  providers: [TipoConsultaService, RedisService],
})
export class TipoConsultaModule {}
