import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { PruebaLaboratorioService } from './prueba-laboratorio.service';
import { CreatePruebaLaboratorioDto } from './dto/create-prueba-laboratorio.dto';

@Controller('prueba-laboratorio')
export class PruebaLaboratorioController {
  constructor(
    private readonly pruebaLaboratorioService: PruebaLaboratorioService,
  ) {}

  @Post()
  create(@Body() createPruebaLaboratorioDto: CreatePruebaLaboratorioDto) {
    return this.pruebaLaboratorioService.create(createPruebaLaboratorioDto);
  }

  @Get()
  findAll() {
    return this.pruebaLaboratorioService.findAll();
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
