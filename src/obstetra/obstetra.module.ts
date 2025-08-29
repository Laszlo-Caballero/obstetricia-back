import { Module } from '@nestjs/common';
import { ObstetraService } from './obstetra.service';
import { ObstetraController } from './obstetra.controller';
import { RedisModule } from 'src/redis/redis.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Obstetra } from './entities/obstetra.entity';
import { Programa } from 'src/programa/entities/programa.entity';
import { Posta } from 'src/posta/entities/posta.entity';

@Module({
  imports: [RedisModule, TypeOrmModule.forFeature([Obstetra, Programa, Posta])],
  controllers: [ObstetraController],
  providers: [ObstetraService],
})
export class ObstetraModule {}
