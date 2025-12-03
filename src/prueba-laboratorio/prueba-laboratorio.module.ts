import { Module } from '@nestjs/common';
import { PruebaLaboratorioService } from './prueba-laboratorio.service';
import { PruebaLaboratorioController } from './prueba-laboratorio.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PruebaLaboratorio } from './entities/prueba-laboratorio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PruebaLaboratorio])],
  controllers: [PruebaLaboratorioController],
  providers: [PruebaLaboratorioService],
})
export class PruebaLaboratorioModule {}
