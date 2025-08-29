import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TipoPruebaService } from './tipo-prueba.service';
import { CreateTipoPruebaDto } from './dto/create-tipo-prueba.dto';
import { UpdateTipoPruebaDto } from './dto/update-tipo-prueba.dto';

@Controller('tipo-prueba')
export class TipoPruebaController {
  constructor(private readonly tipoPruebaService: TipoPruebaService) {}

  @Post()
  create(@Body() createTipoPruebaDto: CreateTipoPruebaDto) {
    return this.tipoPruebaService.create(createTipoPruebaDto);
  }

  @Get()
  findAll() {
    return this.tipoPruebaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoPruebaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTipoPruebaDto: UpdateTipoPruebaDto) {
    return this.tipoPruebaService.update(+id, updateTipoPruebaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipoPruebaService.remove(+id);
  }
}
