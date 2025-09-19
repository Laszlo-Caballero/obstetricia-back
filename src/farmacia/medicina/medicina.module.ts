import { Module } from '@nestjs/common';
import { MedicinaService } from './medicina.service';
import { MedicinaController } from './medicina.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medicina } from './entities/medicina.entity';
import { Categoria } from '../categoria/entities/categoria.entity';
import { Presentacion } from '../presentacion/entities/presentacion.entity';
import { Recurso } from 'src/recurso/entities/recurso.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Medicina, Categoria, Presentacion, Recurso]),
  ],
  controllers: [MedicinaController],
  providers: [MedicinaService],
})
export class MedicinaModule {}
