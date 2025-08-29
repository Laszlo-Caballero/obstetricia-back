import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PruebaLaboratorioService } from './prueba-laboratorio.service';
import { CreatePruebaLaboratorioDto } from './dto/create-prueba-laboratorio.dto';
import { UpdatePruebaLaboratorioDto } from './dto/update-prueba-laboratorio.dto';

@Controller('prueba-laboratorio')
export class PruebaLaboratorioController {
  constructor(private readonly pruebaLaboratorioService: PruebaLaboratorioService) {}

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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePruebaLaboratorioDto: UpdatePruebaLaboratorioDto) {
    return this.pruebaLaboratorioService.update(+id, updatePruebaLaboratorioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pruebaLaboratorioService.remove(+id);
  }
}
