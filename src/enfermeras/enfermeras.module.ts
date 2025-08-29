import { Module } from '@nestjs/common';
import { EnfermerasService } from './enfermeras.service';
import { EnfermerasController } from './enfermeras.controller';

@Module({
  controllers: [EnfermerasController],
  providers: [EnfermerasService],
})
export class EnfermerasModule {}
