import { Module } from '@nestjs/common';
import { PostaService } from './posta.service';
import { PostaController } from './posta.controller';
import { Posta } from './entities/posta.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Region } from './entities/region.entity';
import { Provincia } from './entities/provincia.entity';
import { Distrito } from './entities/distrito.entity';

import { Motivo } from 'src/motivos/entities/motivo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Posta, Region, Provincia, Distrito, Motivo]),
  ],
  controllers: [PostaController],
  providers: [PostaService],
})
export class PostaModule {}
