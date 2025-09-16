import { Module } from '@nestjs/common';
import { DocumentacionService } from './documentacion.service';
import { DocumentacionController } from './documentacion.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Documentacion,
  DocumentacionSchema,
} from './entities/documentacion.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recurso } from 'src/recurso/entities/recurso.entity';
import { Auth } from 'src/auth/entities/auth.entity';
import { RedisModule } from 'src/redis/redis.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Documentacion.name,
        schema: DocumentacionSchema,
      },
    ]),
    TypeOrmModule.forFeature([Recurso, Auth]),
    RedisModule,
  ],
  controllers: [DocumentacionController],
  providers: [DocumentacionService],
})
export class DocumentacionModule {}
