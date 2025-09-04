import { Module } from '@nestjs/common';
import { UtilsService } from './utils.service';
import { UtilsController } from './utils.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Region } from 'src/posta/entities/region.entity';
import { RedisModule } from 'src/redis/redis.module';
import { Provincia } from 'src/posta/entities/provincia.entity';
import { Distrito } from 'src/posta/entities/distrito.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Region, Provincia, Distrito]),
    RedisModule,
  ],
  controllers: [UtilsController],
  providers: [UtilsService],
})
export class UtilsModule {}
