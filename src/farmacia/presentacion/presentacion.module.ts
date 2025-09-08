import { Module } from '@nestjs/common';
import { PresentacionService } from './presentacion.service';
import { PresentacionController } from './presentacion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Presentacion } from './entities/presentacion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Presentacion])],
  controllers: [PresentacionController],
  providers: [PresentacionService],
})
export class PresentacionModule {}
