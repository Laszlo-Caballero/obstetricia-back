import { Module } from '@nestjs/common';
import { PostaService } from './posta.service';
import { PostaController } from './posta.controller';
import { RedisModule } from 'src/redis/redis.module';
import { Posta } from './entities/posta.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [RedisModule, TypeOrmModule.forFeature([Posta])],
  controllers: [PostaController],
  providers: [PostaService],
})
export class PostaModule {}
