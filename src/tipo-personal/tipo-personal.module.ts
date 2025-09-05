import { Module } from '@nestjs/common';
import { TipoPersonalService } from './tipo-personal.service';
import { TipoPersonalController } from './tipo-personal.controller';

@Module({
  controllers: [TipoPersonalController],
  providers: [TipoPersonalService],
})
export class TipoPersonalModule {}
