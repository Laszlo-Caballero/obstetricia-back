import { Module } from '@nestjs/common';
import { UtilsService } from './utils.service';
import { UtilsController } from './utils.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Region } from 'src/posta/entities/region.entity';
import { RedisModule } from 'src/redis/redis.module';

@Module({
  imports: [TypeOrmModule.forFeature([Region]), RedisModule],
  controllers: [UtilsController],
  providers: [UtilsService],
})
export class UtilsModule {}
