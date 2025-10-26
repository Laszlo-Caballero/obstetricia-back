import { Module } from '@nestjs/common';
import { MotivosService } from './motivos.service';
import { MotivosController } from './motivos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Motivo } from './entities/motivo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Motivo])],
  controllers: [MotivosController],
  providers: [MotivosService],
})
export class MotivosModule {}
