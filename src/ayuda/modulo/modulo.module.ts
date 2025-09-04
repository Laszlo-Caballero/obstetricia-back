import { Module } from '@nestjs/common';
import { ModuloService } from './modulo.service';
import { ModuloController } from './modulo.controller';
import { RedisService } from '../../redis/redis.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Modulo } from './entities/modulo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Modulo]) 
  ],
  controllers: [ModuloController],
  providers: [ModuloService, RedisService],
})
export class ModuloModule {}
