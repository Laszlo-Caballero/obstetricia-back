import { Module } from '@nestjs/common';
import { PostaService } from './posta.service';
import { PostaController } from './posta.controller';
import { RedisModule } from 'src/redis/redis.module';
import { Posta } from './entities/posta.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Region } from './entities/region.entity';

@Module({
  imports: [RedisModule, TypeOrmModule.forFeature([Posta, Region])],
  controllers: [PostaController],
  providers: [PostaService],
})
export class PostaModule {}
