import { Module } from '@nestjs/common';
import { TipoPruebaService } from './tipo-prueba.service';
import { TipoPruebaController } from './tipo-prueba.controller';

@Module({
  controllers: [TipoPruebaController],
  providers: [TipoPruebaService],
})
export class TipoPruebaModule {}
