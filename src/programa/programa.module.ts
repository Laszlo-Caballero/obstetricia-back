import { Module } from '@nestjs/common';
import { ProgramaService } from './programa.service';
import { ProgramaController } from './programa.controller';
import { RedisModule } from 'src/redis/redis.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Programa } from './entities/programa.entity';
import { Personal } from 'src/personal/entities/personal.entity';
import { Motivo } from 'src/motivos/entities/motivo.entity';

@Module({
  imports: [
    RedisModule,
    TypeOrmModule.forFeature([Programa, Personal, Motivo]),
  ],
  controllers: [ProgramaController],
  providers: [ProgramaService],
})
export class ProgramaModule {}
