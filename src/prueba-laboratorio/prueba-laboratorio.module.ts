import { Module } from '@nestjs/common';
import { PruebaLaboratorioService } from './prueba-laboratorio.service';
import { PruebaLaboratorioController } from './prueba-laboratorio.controller';

@Module({
  controllers: [PruebaLaboratorioController],
  providers: [PruebaLaboratorioService],
})
export class PruebaLaboratorioModule {}
