import { Module } from '@nestjs/common';
import { MedicinaService } from './medicina.service';
import { MedicinaController } from './medicina.controller';

@Module({
  controllers: [MedicinaController],
  providers: [MedicinaService],
})
export class MedicinaModule {}
