import { Controller, Get, Body, Param, Delete, Query } from '@nestjs/common';
import { PruebaLaboratorioService } from './prueba-laboratorio.service';
import { QueryPruebaLaboratorioDto } from './dto/query.dto';

@Controller('prueba-laboratorio')
export class PruebaLaboratorioController {
  constructor(
    private readonly pruebaLaboratorioService: PruebaLaboratorioService,
  ) {}

  @Get()
  findAll(@Query() query: QueryPruebaLaboratorioDto) {
    return this.pruebaLaboratorioService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pruebaLaboratorioService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pruebaLaboratorioService.remove(+id);
  }
}
