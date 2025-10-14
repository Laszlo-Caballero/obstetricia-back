import { Module } from '@nestjs/common';
import { ProgramaService } from './programa.service';
import { ProgramaController } from './programa.controller';
import { RedisModule } from 'src/redis/redis.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Programa } from './entities/programa.entity';
import { Personal } from 'src/personal/entities/personal.entity';

@Module({
  imports: [RedisModule, TypeOrmModule.forFeature([Programa, Personal])],
  controllers: [ProgramaController],
  providers: [ProgramaService],
})
export class ProgramaModule {}
