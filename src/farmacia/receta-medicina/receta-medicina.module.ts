import { Module } from '@nestjs/common';
import { RecetaMedicinaService } from './receta-medicina.service';
import { RecetaMedicinaController } from './receta-medicina.controller';

@Module({
  controllers: [RecetaMedicinaController],
  providers: [RecetaMedicinaService],
})
export class RecetaMedicinaModule {}
