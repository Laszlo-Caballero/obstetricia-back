import { Module } from '@nestjs/common';
import { PrioridadService } from './prioridad.service';
import { PrioridadController } from './prioridad.controller';
import { RedisService } from 'src/redis/redis.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prioridad } from './entities/prioridad.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Prioridad]) 
  ],
  controllers: [PrioridadController],
  providers: [PrioridadService, RedisService],
})
export class PrioridadModule {}
