import { Module } from '@nestjs/common';
import { RecursoService } from './recurso.service';
import { RecursoController } from './recurso.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recurso } from './entities/recurso.entity';
import { RedisModule } from 'src/redis/redis.module';

@Module({
  imports: [TypeOrmModule.forFeature([Recurso]), RedisModule],
  controllers: [RecursoController],
  providers: [RecursoService],
})
export class RecursoModule {}
