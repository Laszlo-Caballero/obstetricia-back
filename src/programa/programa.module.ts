import { Module } from '@nestjs/common';
import { ProgramaService } from './programa.service';
import { ProgramaController } from './programa.controller';
import { RedisModule } from 'src/redis/redis.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Programa } from './entities/programa.entity';

@Module({
  imports: [RedisModule, TypeOrmModule.forFeature([Programa])],
  controllers: [ProgramaController],
  providers: [ProgramaService],
})
export class ProgramaModule {}
