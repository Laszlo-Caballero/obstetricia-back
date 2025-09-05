import { Module } from '@nestjs/common';
import { TurnosService } from './turnos.service';
import { TurnosController } from './turnos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Turno } from './entities/turno.entity';
import { RedisModule } from 'src/redis/redis.module';

@Module({
  imports: [TypeOrmModule.forFeature([Turno]), RedisModule],
  controllers: [TurnosController],
  providers: [TurnosService],
})
export class TurnosModule {}
