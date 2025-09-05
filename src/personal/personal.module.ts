import { Module } from '@nestjs/common';
import { PersonalService } from './personal.service';
import { PersonalController } from './personal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Personal } from './entities/personal.entity';
import { Turno } from 'src/turnos/entities/turno.entity';
import { Posta } from 'src/posta/entities/posta.entity';
import { TipoPersonal } from 'src/tipo-personal/entities/tipo-personal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Personal, Turno, Posta, TipoPersonal])],
  controllers: [PersonalController],
  providers: [PersonalService],
})
export class PersonalModule {}
