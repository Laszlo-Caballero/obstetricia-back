import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TipoPersonalService } from './tipo-personal.service';
import { CreateTipoPersonalDto } from './dto/create-tipo-personal.dto';
import { UpdateTipoPersonalDto } from './dto/update-tipo-personal.dto';

@Controller('tipo-personal')
export class TipoPersonalController {
  constructor(private readonly tipoPersonalService: TipoPersonalService) {}

  @Post()
  create(@Body() createTipoPersonalDto: CreateTipoPersonalDto) {
    return this.tipoPersonalService.create(createTipoPersonalDto);
  }

  @Get()
  findAll() {
    return this.tipoPersonalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoPersonalService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTipoPersonalDto: UpdateTipoPersonalDto) {
    return this.tipoPersonalService.update(+id, updateTipoPersonalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipoPersonalService.remove(+id);
  }
}
