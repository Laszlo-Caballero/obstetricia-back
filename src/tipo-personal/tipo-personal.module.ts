import { Module } from '@nestjs/common';
import { TipoPersonalService } from './tipo-personal.service';
import { TipoPersonalController } from './tipo-personal.controller';
import { TipoPersonal } from './entities/tipo-personal.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from 'src/redis/redis.module';

@Module({
  imports: [RedisModule, TypeOrmModule.forFeature([TipoPersonal])],
  controllers: [TipoPersonalController],
  providers: [TipoPersonalService],
})
export class TipoPersonalModule {}
