import { Controller, Get } from '@nestjs/common';
import { InicioService } from './inicio.service';

@Controller('inicio')
export class InicioController {
  constructor(private readonly inicioService: InicioService) {}

  @Get()
  findAll() {
    return this.inicioService.findAll();
  }
}
